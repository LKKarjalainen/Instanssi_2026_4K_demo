import http.server
import socketserver

class CORSRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Sallii pyynnöt mistä tahansa alkuperästä
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

PORT = 8000
with socketserver.TCPServer(("", PORT), CORSRequestHandler) as httpd:
    print(f"CORS-vapaa palvelin portissa {PORT}")
    httpd.serve_forever()