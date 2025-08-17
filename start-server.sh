#!/bin/bash
cd /home/runner/workspace
echo "Starting simple server..."
python3 -m http.server 4173 --bind 0.0.0.0