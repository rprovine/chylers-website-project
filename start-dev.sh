#!/bin/bash

# Development start script for Chyler's Hawaiian Beef Chips

echo "Starting Chyler's Hawaiian Beef Chips Development Environment..."
echo ""

# Function to check if a port is in use
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
        echo "⚠️  Port $1 is already in use. Please stop the process using it."
        return 1
    fi
    return 0
}

# Check if ports are available
echo "Checking ports..."
check_port 8000 || exit 1
check_port 3000 || exit 1

# Start backend
echo ""
echo "Starting Backend API..."
cd backend

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment and start backend
source venv/bin/activate
pip install -r requirements.txt >/dev/null 2>&1

# Start backend in background
echo "Backend starting on http://localhost:8000"
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!

# Wait for backend to start
sleep 3

# Start frontend
echo ""
echo "Starting Frontend..."
cd ../frontend

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
fi

# Start frontend
echo "Frontend starting on http://localhost:3000"
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Development environment started!"
echo ""
echo "🌐 Frontend: http://localhost:3000"
echo "🔧 Backend API: http://localhost:8000"
echo "📚 API Docs: http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop all services"

# Function to handle shutdown
cleanup() {
    echo ""
    echo "Shutting down services..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    exit 0
}

# Set up signal handler
trap cleanup INT TERM

# Wait for processes
wait