#!/usr/bin/env python3
"""
Script to add security meta tags to all HTML files in the portfolio
"""

import os
import re
from pathlib import Path

def add_security_headers(file_path):
    """Add security meta tags to an HTML file if not already present"""
    
    security_headers = '''    <!-- Security Meta Tags -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://cdn.jsdelivr.net https://unpkg.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com; img-src 'self' data: https:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self';">
    <meta http-equiv="X-Frame-Options" content="DENY">
    <meta http-equiv="X-Content-Type-Options" content="nosniff">
    <meta http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin">
    <meta http-equiv="Permissions-Policy" content="geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=(), speaker=()">
    
'''
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Skip if security headers already exist
        if 'Content-Security-Policy' in content:
            print(f"Security headers already exist in {file_path}")
            return False
        
        # Find the position after <head> tag
        head_pattern = r'(<head[^>]*>)'
        match = re.search(head_pattern, content, re.IGNORECASE)
        
        if match:
            # Insert security headers after <head> tag
            insert_pos = match.end()
            new_content = content[:insert_pos] + '\n' + security_headers + content[insert_pos:]
            
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            
            print(f"Added security headers to {file_path}")
            return True
        else:
            print(f"No <head> tag found in {file_path}")
            return False
            
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return False

def main():
    """Process all HTML files in the portfolio"""
    portfolio_dir = Path('.')
    html_files = list(portfolio_dir.rglob('*.html'))
    
    print(f"Found {len(html_files)} HTML files to process")
    
    processed = 0
    skipped = 0
    
    for html_file in html_files:
        # Skip the main index.html as it's already processed
        if html_file.name == 'index.html' and str(html_file.parent) == '.':
            print(f"Skipping main index.html (already processed)")
            skipped += 1
            continue
            
        if add_security_headers(html_file):
            processed += 1
        else:
            skipped += 1
    
    print(f"\nProcessing complete:")
    print(f"- Files processed: {processed}")
    print(f"- Files skipped: {skipped}")
    print(f"- Total files: {len(html_files)}")

if __name__ == "__main__":
    main()

