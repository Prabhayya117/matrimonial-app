#!/bin/bash
# Quick Start Script for Matrimonial Matching Platform

echo "🎉 Starting Matrimonial Matchmaking Platform"
echo "==========================================="
echo ""

# Check if MongoDB is running
echo "📍 Checking MongoDB connection..."
if nc -z localhost 27017 2>/dev/null; then
  echo "✅ MongoDB is running on 127.0.0.1:27017"
else
  echo "⚠️  MongoDB doesn't appear to be running"
  echo "   Please start MongoDB before proceeding"
  exit 1
fi

echo ""
echo "🚀 Starting Backend Server..."
cd server
node server/server.js &
BACKEND_PID=$!

echo ""
echo "✅ Backend server started with PID: $BACKEND_PID"
echo ""
echo "🌐 Frontend is being served from http://localhost:5000"
echo ""
echo "📋 Available Endpoints:"
echo "   - Home/Landing: http://localhost:5000/"
echo "   - Register: http://localhost:5000/"
echo "   - Login: http://localhost:5000/"
echo "   - Profile: http://localhost:5000/ (after login)"
echo "   - Matches: http://localhost:5000/matrimony (after login)"
echo "   - Shortlist: http://localhost:5000/shortlist (after login)"
echo "   - Media: http://localhost:5000/media (after login)"
echo "   - Family: http://localhost:5000/family (after login)"
echo "   - Premium: http://localhost:5000/membership (after login)"
echo ""
echo "🛑 To stop the server, press Ctrl+C"
echo ""

# Keep the script running
wait $BACKEND_PID
