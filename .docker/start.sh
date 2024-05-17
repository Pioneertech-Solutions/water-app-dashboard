#!/bin/bash

#! install dependencies if not installed
if [ ! -d "node_modules" ]; then
  npm install
fi

#! start the server
npm run dev -- --host=0.0.0.0 --port=3000
