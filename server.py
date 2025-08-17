#!/usr/bin/env python3
import http.server
import socketserver
import os

PORT = 4173

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=os.getcwd(), **kwargs)

if __name__ == "__main__":
    with socketserver.TCPServer(("0.0.0.0", PORT), Handler) as httpd:
        print(f"Server running at http://0.0.0.0:{PORT}")
        httpd.serve_forever()