#!/bin/bash

echo "🚀 Testing Wool Shop Admin Panel..."

# Check if MongoDB is running
echo "📊 Checking MongoDB connection..."
if ! mongosh --eval "db.adminCommand('ping')" > /dev/null 2>&1; then
    echo "❌ MongoDB is not running. Please start MongoDB first."
    exit 1
fi

echo "✅ MongoDB is running"

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing root dependencies..."
    npm install
fi

if [ ! -d "server/node_modules" ]; then
    echo "📦 Installing server dependencies..."
    cd server && npm install && cd ..
fi

if [ ! -d "client/node_modules" ]; then
    echo "📦 Installing client dependencies..."
    cd client && npm install && cd ..
fi

# Check if .env files exist
if [ ! -f "server/.env" ]; then
    echo "⚠️  Creating server/.env from example..."
    cp server/.env.example server/.env
    echo "📝 Please update MONGODB_URI in server/.env"
fi

if [ ! -f "client/.env" ]; then
    echo "⚠️  Creating client/.env from example..."
    cp client/.env.example client/.env
fi

# Seed data if needed
echo "🌱 Seeding sample data..."
npm run seed

echo "🎯 Starting development servers..."
echo "📍 Admin Panel will be available at: http://localhost:5173/admin/login"
echo "📍 Demo login: admin / admin123"
echo ""

# Start both servers
npm run dev
