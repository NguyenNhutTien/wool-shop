#!/bin/bash

echo "🚀 Setting up Wool Shop project..."

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install server dependencies
echo "📦 Installing server dependencies..."
cd server
npm install
cd ..

# Install client dependencies
echo "📦 Installing client dependencies..."
cd client
npm install
cd ..

# Copy environment files
echo "⚙️ Setting up environment files..."
if [ ! -f server/.env ]; then
    cp server/.env.example server/.env
    echo "✅ Created server/.env (please update MongoDB URI)"
fi

if [ ! -f client/.env ]; then
    cp client/.env.example client/.env
    echo "✅ Created client/.env"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update server/.env with your MongoDB URI"
echo "2. Run 'npm run seed' to add sample data"
echo "3. Run 'npm run dev' to start development servers"
echo ""
echo "Server will run on: http://localhost:5000"
echo "Client will run on: http://localhost:5173"
