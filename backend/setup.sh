#!/bin/bash

# Backend Setup Script for Chyler's Hawaiian Beef Chips

echo "Setting up Chyler's Backend..."

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "Error: Python 3 is not installed. Please install Python 3.9 or later."
    exit 1
fi

# Create virtual environment
echo "Creating virtual environment..."
python3 -m venv venv

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Upgrade pip
echo "Upgrading pip..."
pip install --upgrade pip

# Install dependencies
echo "Installing dependencies..."
pip install -r requirements.txt

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "Creating .env file from example..."
    cp .env.example .env
    echo ""
    echo "⚠️  IMPORTANT: Please edit the .env file with your actual configuration:"
    echo "   - Database credentials"
    echo "   - Shopify API credentials"
    echo "   - Secret key for JWT"
    echo ""
fi

# Check if PostgreSQL is running
if command -v pg_isready &> /dev/null; then
    if pg_isready; then
        echo "✅ PostgreSQL is running"
    else
        echo "⚠️  PostgreSQL is not running. Please start PostgreSQL."
    fi
else
    echo "⚠️  PostgreSQL may not be installed. Please ensure PostgreSQL is installed and running."
fi

echo ""
echo "Setup complete! Next steps:"
echo "1. Edit the .env file with your configuration"
echo "2. Create the database: createdb chylers_db"
echo "3. Run migrations: alembic upgrade head"
echo "4. Start the server: python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000"