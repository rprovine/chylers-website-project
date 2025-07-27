from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager
import logging
from .config import settings
from .database import engine, Base
from .routers import (
    auth_router,
    users_router,
    products_router,
    cart_router,
    orders_router,
    contact_router,
    business_router,
    webhooks_router,
    admin_router
)
from .services.shopify_client import shopify_client

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    logger.info("Starting up Chyler's Hawaiian Beef Chips API...")
    
    # Create database tables
    Base.metadata.create_all(bind=engine)
    
    yield
    
    # Shutdown
    logger.info("Shutting down...")
    await shopify_client.close()


app = FastAPI(
    title=settings.APP_NAME,
    version=settings.VERSION,
    description="API for Chyler's Hawaiian Beef Chips - Premium Hawaiian Snacks",
    lifespan=lifespan
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Exception handlers
@app.exception_handler(404)
async def not_found_handler(request: Request, exc):
    return JSONResponse(
        status_code=404,
        content={"detail": "Resource not found"}
    )


@app.exception_handler(500)
async def internal_error_handler(request: Request, exc):
    logger.error(f"Internal server error: {exc}")
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error"}
    )


# Root endpoint
@app.get("/")
async def root():
    return {
        "message": "Aloha! Welcome to Chyler's Hawaiian Beef Chips API",
        "version": settings.VERSION,
        "docs": "/docs",
        "business": {
            "name": "Chyler's Hawaiian Beef Chips",
            "founded": 2004,
            "location": "Kapolei, Hawaii",
            "certifications": ["Made in Hawaii with Aloha"]
        }
    }


# Health check endpoint
@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "service": settings.APP_NAME,
        "version": settings.VERSION
    }


# Include routers
app.include_router(auth_router)
app.include_router(users_router)
app.include_router(products_router)
app.include_router(cart_router)
app.include_router(orders_router)
app.include_router(contact_router)
app.include_router(business_router)
app.include_router(webhooks_router)
app.include_router(admin_router)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.DEBUG
    )