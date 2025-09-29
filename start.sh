#!/bin/sh

echo "Building project (plugins + backend)..."
npm run build || echo "Build failed, continuing..."

echo "Running database migrations..."
npx medusa db:migrate

echo "Seeding database..."
npm run seed || echo "Seeding failed, continuing..."

echo "Starting Medusa development server..."
npm run dev
