#!/usr/bin/env python3
"""
Performance optimization script for the portfolio
- Bundles CSS files into optimized bundles
- Minifies CSS and JavaScript
- Updates HTML files to use bundled resources
"""

import os
import re
from pathlib import Path

def read_file(file_path):
    """Read file content with error handling"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return f.read()
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
        return ""

def write_file(file_path, content):
    """Write file content with error handling"""
    try:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    except Exception as e:
        print(f"Error writing {file_path}: {e}")
        return False

def minify_css(css_content):
    """Minify CSS content"""
    try:
        # Basic CSS minification
        # Remove comments
        css_content = re.sub(r'/\*.*?\*/', '', css_content, flags=re.DOTALL)
        # Remove extra whitespace
        css_content = re.sub(r'\s+', ' ', css_content)
        # Remove whitespace around specific characters
        css_content = re.sub(r'\s*([{}:;,>+~])\s*', r'\1', css_content)
        # Remove trailing semicolons before }
        css_content = re.sub(r';\s*}', '}', css_content)
        return css_content.strip()
    except Exception as e:
        print(f"Error minifying CSS: {e}")
        return css_content

def bundle_css_files():
    """Bundle CSS files into optimized bundles"""
    css_dir = Path('./css')
    
    # Define CSS bundles
    bundles = {
        'main.min.css': [
            'general_root.css',
            'background_effect.css',
            'enhanced_components.css',
            'mobile_responsive.css',
            'layout_fixes.css',
            'design_fixes.css',
            'final_fixes.css'
        ],
        'courses.min.css': [
            'courses/comprehensive_course_styling.css',
            'courses/courses.css',
            'courses/enhanced_course_styling.css'
        ],
        'components.min.css': [
            'project_showcase_fixed.css',
            'skills_alternative.css',
            'skills_icons_fix.css',
            'skill_modal.css',
            'slider.css',
            'contact_fix.css'
        ]
    }
    
    # Create optimized directory
    optimized_dir = Path('./css/optimized')
    optimized_dir.mkdir(exist_ok=True)
    
    for bundle_name, css_files in bundles.items():
        print(f"Creating bundle: {bundle_name}")
        bundled_content = ""
        
        for css_file in css_files:
            css_path = css_dir / css_file
            if css_path.exists():
                content = read_file(css_path)
                if content:
                    bundled_content += f"/* {css_file} */\n{content}\n\n"
                    print(f"  Added: {css_file}")
            else:
                print(f"  Warning: {css_file} not found")
        
        # Minify the bundled content
        minified_content = minify_css(bundled_content)
        
        # Write the bundled and minified file
        bundle_path = optimized_dir / bundle_name
        if write_file(bundle_path, minified_content):
            print(f"  Created: {bundle_path} ({len(minified_content)} bytes)")
        
    return True

def update_html_files():
    """Update HTML files to use bundled CSS"""
    html_files = list(Path('.').rglob('*.html'))
    
    # CSS replacement mappings
    css_replacements = {
        # Main bundle replacements
        r'<link rel="stylesheet" href="([^"]*/)css/general_root\.css"[^>]*>': '',
        r'<link rel="stylesheet" href="([^"]*/)css/background_effect\.css"[^>]*>': '',
        r'<link rel="stylesheet" href="([^"]*/)css/enhanced_components\.css"[^>]*>': '',
        r'<link rel="stylesheet" href="([^"]*/)css/mobile_responsive\.css"[^>]*>': '',
        r'<link rel="stylesheet" href="([^"]*/)css/layout_fixes\.css"[^>]*>': '',
        r'<link rel="stylesheet" href="([^"]*/)css/design_fixes\.css"[^>]*>': '',
        r'<link rel="stylesheet" href="([^"]*/)css/final_fixes\.css"[^>]*>': '',
        
        # Components bundle replacements
        r'<link rel="stylesheet" href="([^"]*/)css/project_showcase_fixed\.css"[^>]*>': '',
        r'<link rel="stylesheet" href="([^"]*/)css/skills_alternative\.css"[^>]*>': '',
        r'<link rel="stylesheet" href="([^"]*/)css/skills_icons_fix\.css"[^>]*>': '',
        r'<link rel="stylesheet" href="([^"]*/)css/skill_modal\.css"[^>]*>': '',
        r'<link rel="stylesheet" href="([^"]*/)css/slider\.css"[^>]*>': '',
        r'<link rel="stylesheet" href="([^"]*/)css/contact_fix\.css"[^>]*>': '',
    }
    
    processed = 0
    
    for html_file in html_files:
        content = read_file(html_file)
        if not content:
            continue
            
        original_content = content
        
        # Determine the relative path to CSS directory
        depth = len(html_file.parts) - 1
        css_prefix = '../' * depth if depth > 0 else ''
        
        # Remove individual CSS files
        for pattern, replacement in css_replacements.items():
            content = re.sub(pattern, replacement, content)
        
        # Add bundled CSS files after the first existing CSS link or in head
        if html_file.name == 'index.html' and str(html_file.parent) == '.':
            # Main page - add all bundles
            bundle_links = f'''    <link rel="stylesheet" href="{css_prefix}css/optimized/main.min.css">
    <link rel="stylesheet" href="{css_prefix}css/optimized/components.min.css">
    <link rel="stylesheet" href="{css_prefix}css/optimized/courses.min.css">'''
        elif 'courses/' in str(html_file):
            # Course pages - add main and courses bundles
            bundle_links = f'''    <link rel="stylesheet" href="{css_prefix}css/optimized/main.min.css">
    <link rel="stylesheet" href="{css_prefix}css/optimized/courses.min.css">'''
        else:
            # Other pages - add main bundle
            bundle_links = f'''    <link rel="stylesheet" href="{css_prefix}css/optimized/main.min.css">'''
        
        # Insert bundle links after the first CSS link or in head
        css_link_pattern = r'(<link rel="stylesheet"[^>]*>)'
        if re.search(css_link_pattern, content):
            # Insert after first CSS link
            content = re.sub(css_link_pattern, r'\1\n' + bundle_links, content, count=1)
        else:
            # Insert in head section
            head_pattern = r'(<head[^>]*>)'
            content = re.sub(head_pattern, r'\1\n' + bundle_links, content)
        
        # Clean up multiple empty lines
        content = re.sub(r'\n\s*\n\s*\n', '\n\n', content)
        
        if content != original_content:
            if write_file(html_file, content):
                processed += 1
                print(f"Updated: {html_file}")
    
    print(f"Updated {processed} HTML files with bundled CSS")
    return True

def optimize_javascript():
    """Basic JavaScript optimization"""
    js_files = list(Path('.').rglob('*.js'))
    
    for js_file in js_files:
        content = read_file(js_file)
        if not content:
            continue
        
        # Basic JS minification
        # Remove comments (simple approach)
        content = re.sub(r'//.*$', '', content, flags=re.MULTILINE)
        content = re.sub(r'/\*.*?\*/', '', content, flags=re.DOTALL)
        
        # Remove extra whitespace
        content = re.sub(r'\n\s*\n', '\n', content)
        content = re.sub(r'^\s+', '', content, flags=re.MULTILINE)
        
        # Create minified version
        minified_path = js_file.with_suffix('.min.js')
        if write_file(minified_path, content):
            print(f"Minified: {js_file} -> {minified_path}")
    
    return True

def main():
    """Main optimization function"""
    print("Starting performance optimization...")
    
    print("\n1. Bundling CSS files...")
    bundle_css_files()
    
    print("\n2. Updating HTML files...")
    update_html_files()
    
    print("\n3. Optimizing JavaScript...")
    optimize_javascript()
    
    print("\nPerformance optimization complete!")
    print("\nOptimizations applied:")
    print("- CSS files bundled into 3 optimized bundles")
    print("- CSS content minified")
    print("- HTML files updated to use bundled CSS")
    print("- JavaScript files minified")
    print("- Reduced HTTP requests from 25+ CSS files to 3 bundles")

if __name__ == "__main__":
    main()

