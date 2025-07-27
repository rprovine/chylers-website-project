from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from typing import Any
from datetime import timedelta
from ..database import get_db
from ..models.user import User
from ..schemas.auth import Token, UserRegister, PasswordReset
from ..schemas.user import User as UserSchema
from ..utils.auth import (
    authenticate_user,
    create_access_token,
    create_refresh_token,
    get_password_hash,
    get_current_active_user,
    verify_token
)
from ..services.shopify_client import shopify_client
from ..services.email import send_password_reset_email
import logging

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/v1/auth", tags=["authentication"])


@router.post("/register", response_model=UserSchema)
async def register(
    user_data: UserRegister,
    db: Session = Depends(get_db)
) -> Any:
    """Register a new user"""
    # Check if user exists
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create user in database
    db_user = User(
        email=user_data.email,
        password_hash=get_password_hash(user_data.password),
        first_name=user_data.first_name,
        last_name=user_data.last_name,
        phone=user_data.phone
    )
    
    try:
        # Create customer in Shopify
        shopify_customer = await shopify_client.create_customer({
            "email": user_data.email,
            "first_name": user_data.first_name,
            "last_name": user_data.last_name,
            "phone": user_data.phone,
            "verified_email": True,
            "accepts_marketing": False,
            "tags": ["registered-user", "api-created"]
        })
        db_user.shopify_customer_id = shopify_customer["id"]
    except Exception as e:
        logger.error(f"Failed to create Shopify customer: {e}")
        # Continue without Shopify customer ID
    
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    return db_user


@router.post("/login", response_model=Token)
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
) -> Any:
    """Login with email and password"""
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = create_access_token(
        data={"sub": user.email, "user_id": user.id}
    )
    refresh_token = create_refresh_token(
        data={"sub": user.email, "user_id": user.id}
    )
    
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer"
    }


@router.post("/refresh", response_model=Token)
async def refresh_token(
    refresh_token: str,
    db: Session = Depends(get_db)
) -> Any:
    """Refresh access token using refresh token"""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate refresh token",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        token_data = verify_token(refresh_token, credentials_exception)
        user = db.query(User).filter(User.email == token_data.email).first()
        if not user:
            raise credentials_exception
            
        access_token = create_access_token(
            data={"sub": user.email, "user_id": user.id}
        )
        
        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "bearer"
        }
    except Exception:
        raise credentials_exception


@router.post("/password-reset")
async def request_password_reset(
    reset_data: PasswordReset,
    db: Session = Depends(get_db)
) -> Any:
    """Request password reset email"""
    user = db.query(User).filter(User.email == reset_data.email).first()
    if not user:
        # Don't reveal whether email exists
        return {"message": "If your email is registered, you will receive a password reset link"}
    
    # Create reset token
    reset_token = create_access_token(
        data={"sub": user.email, "user_id": user.id, "purpose": "password_reset"},
        expires_delta=timedelta(hours=1)
    )
    
    # Send email
    try:
        await send_password_reset_email(user.email, reset_token)
    except Exception as e:
        logger.error(f"Failed to send password reset email: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to send password reset email"
        )
    
    return {"message": "If your email is registered, you will receive a password reset link"}


@router.get("/me", response_model=UserSchema)
async def get_current_user_info(
    current_user: User = Depends(get_current_active_user)
) -> Any:
    """Get current user information"""
    return current_user


@router.post("/logout")
async def logout(
    current_user: User = Depends(get_current_active_user)
) -> Any:
    """Logout current user"""
    # In a real application, you might want to blacklist the token
    return {"message": "Successfully logged out"}