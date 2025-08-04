#!/usr/bin/env python3
"""
Automatic Sitemap Generator for Abedelrahman Sholi QA Portfolio
This script scans the portfolio directory and generates an updated sitemap.xml
"""

import os
import xml.etree.ElementTree as ET
from datetime import datetime
from pathlib import Path

class SitemapGenerator:
    def __init__(self, base_url="https://abedelrahman-sholi-qa-portfolio.com", portfolio_dir="./"):
        self.base_url = base_url.rstrip('/')
        self.portfolio_dir = Path(portfolio_dir)
        self.current_date = datetime.now().strftime('%Y-%m-%d')
        
        # Priority mapping for different page types
        self.priorities = {
            'index.html': 1.0,
            'overview.html': 0.9,
            'enhanced.html': 0.9,  # QA Roadmap
            'Module_1': 0.9,  # First modules get higher priority
            'Module_': 0.8,   # Other modules
            'intro.html': 0.8,
            'exercises.html': 0.7,
            'default': 0.6
        }
        
        # Change frequency mapping
        self.change_freq = {
            'index.html': 'weekly',
            'overview.html': 'monthly',
            'enhanced.html': 'monthly',
            'default': 'monthly'
        }

    def get_priority(self, filename):
        """Determine priority based on filename"""
        for key, priority in self.priorities.items():
            if key in filename:
                return priority
        return self.priorities['default']

    def get_change_freq(self, filename):
        """Determine change frequency based on filename"""
        for key, freq in self.change_freq.items():
            if key in filename:
                return freq
        return self.change_freq['default']

    def find_html_files(self):
        """Find all HTML files in the portfolio directory"""
        html_files = []
        
        # Add main index file
        index_file = self.portfolio_dir / 'index.html'
        if index_file.exists():
            html_files.append({
                'path': 'index.html',
                'full_path': index_file,
                'priority': self.get_priority('index.html'),
                'changefreq': self.get_change_freq('index.html')
            })

        # Find course files
        courses_dir = self.portfolio_dir / 'courses'
        if courses_dir.exists():
            for html_file in courses_dir.rglob('*.html'):
                relative_path = html_file.relative_to(self.portfolio_dir)
                html_files.append({
                    'path': str(relative_path).replace('\\', '/'),
                    'full_path': html_file,
                    'priority': self.get_priority(html_file.name),
                    'changefreq': self.get_change_freq(html_file.name)
                })

        return sorted(html_files, key=lambda x: x['priority'], reverse=True)

    def generate_sitemap(self):
        """Generate the sitemap.xml file"""
        # Create root element
        urlset = ET.Element('urlset')
        urlset.set('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9')
        urlset.set('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance')
        urlset.set('xsi:schemaLocation', 
                  'http://www.sitemaps.org/schemas/sitemap/0.9 '
                  'http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd')

        # Find all HTML files
        html_files = self.find_html_files()
        
        print(f"Found {len(html_files)} HTML files to include in sitemap:")
        
        for file_info in html_files:
            # Create URL element
            url = ET.SubElement(urlset, 'url')
            
            # Location
            loc = ET.SubElement(url, 'loc')
            if file_info['path'] == 'index.html':
                loc.text = f"{self.base_url}/"
            else:
                loc.text = f"{self.base_url}/{file_info['path']}"
            
            # Last modified
            lastmod = ET.SubElement(url, 'lastmod')
            lastmod.text = self.current_date
            
            # Change frequency
            changefreq = ET.SubElement(url, 'changefreq')
            changefreq.text = file_info['changefreq']
            
            # Priority
            priority = ET.SubElement(url, 'priority')
            priority.text = str(file_info['priority'])
            
            print(f"  {file_info['path']} (priority: {file_info['priority']})")

        # Create tree and write to file
        tree = ET.ElementTree(urlset)
        ET.indent(tree, space="    ", level=0)
        
        sitemap_path = self.portfolio_dir / 'sitemap.xml'
        tree.write(sitemap_path, encoding='utf-8', xml_declaration=True)
        
        print(f"\nSitemap generated successfully: {sitemap_path}")
        return sitemap_path

    def validate_sitemap(self):
        """Basic validation of the generated sitemap"""
        sitemap_path = self.portfolio_dir / 'sitemap.xml'
        
        if not sitemap_path.exists():
            print("Error: sitemap.xml not found!")
            return False
            
        try:
            tree = ET.parse(sitemap_path)
            root = tree.getroot()
            
            urls = root.findall('.//{http://www.sitemaps.org/schemas/sitemap/0.9}url')
            print(f"Sitemap validation: Found {len(urls)} URLs")
            
            # Check for required elements
            for i, url in enumerate(urls[:5]):  # Check first 5 URLs
                loc = url.find('.//{http://www.sitemaps.org/schemas/sitemap/0.9}loc')
                if loc is None:
                    print(f"Warning: URL {i+1} missing <loc> element")
                else:
                    print(f"  URL {i+1}: {loc.text}")
            
            return True
            
        except ET.ParseError as e:
            print(f"Error parsing sitemap: {e}")
            return False

    def generate_robots_txt(self):
        """Generate or update robots.txt file"""
        robots_content = f"""# Robots.txt for Abedelrahman Sholi QA Portfolio
# Generated on {self.current_date}

User-agent: *
Allow: /

# Disallow access to certain directories
Disallow: /css/
Disallow: /js/
Disallow: /*.css$
Disallow: /*.js$
Disallow: /screenshots/
Disallow: /temp/
Disallow: /backup/

# Allow important files for rendering
Allow: /css/general_root.css
Allow: /css/courses/
Allow: /js/social_sharing.js

# Sitemap location
Sitemap: {self.base_url}/sitemap.xml

# Crawl delay
Crawl-delay: 1

# Allow course content
Allow: /courses/

# Host directive
Host: {self.base_url}
"""
        
        robots_path = self.portfolio_dir / 'robots.txt'
        with open(robots_path, 'w', encoding='utf-8') as f:
            f.write(robots_content)
        
        print(f"Robots.txt updated: {robots_path}")
        return robots_path

def main():
    """Main function to generate sitemap and robots.txt"""
    print("=== Portfolio SEO Files Generator ===")
    print(f"Timestamp: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print()
    
    # Initialize generator
    generator = SitemapGenerator()
    
    # Generate sitemap
    print("Generating sitemap.xml...")
    sitemap_path = generator.generate_sitemap()
    
    # Validate sitemap
    print("\nValidating sitemap...")
    if generator.validate_sitemap():
        print("✓ Sitemap validation passed")
    else:
        print("✗ Sitemap validation failed")
    
    # Generate robots.txt
    print("\nGenerating robots.txt...")
    robots_path = generator.generate_robots_txt()
    
    print("\n=== Generation Complete ===")
    print(f"Files created/updated:")
    print(f"  - {sitemap_path}")
    print(f"  - {robots_path}")
    print("\nNext steps:")
    print("1. Submit sitemap to Google Search Console")
    print("2. Submit sitemap to Bing Webmaster Tools")
    print("3. Test robots.txt using search console tools")

if __name__ == "__main__":
    main()

