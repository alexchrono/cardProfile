#!/usr/bin/env python3
"""
SVG Class Adder Script
----------------------
Reads an SVG file, adds CSS classes to paths based on fill color,
and optionally removes the inline styles.
"""

import sys
import xml.etree.ElementTree as ET

def add_classes_to_svg(input_file, output_file):
    # Parse SVG
    tree = ET.parse(input_file)
    root = tree.getroot()

    # SVG namespace handling (Inkscape uses this)
    ns = {'svg': 'http://www.w3.org/2000/svg'}

    # Iterate over all path elements
    for path in root.findall('.//svg:path', ns):
        style = path.attrib.get('style', '')
        style_lower = style.lower()

        # Decide class based on fill color
        if 'fill:#333333' in style_lower or 'fill:#000000' in style_lower:
            path.set('class', 'stroke-lines')
        elif 'fill:#00ff00' in style_lower:  # green fill example
            path.set('class', 'fill-area')
        else:
            # Optional: add a generic class for all other paths
            path.set('class', 'other-path')

        # Remove inline style so CSS takes full control
        if 'style' in path.attrib:
            del path.attrib['style']

    # Write updated SVG
    tree.write(output_file, encoding='utf-8', xml_declaration=True)
    print(f"✅ Done! Output saved to: {output_file}")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python add_svg_classes.py input.svg output.svg")
    else:
        input_svg = sys.argv[1]
        output_svg = sys.argv[2]
        add_classes_to_svg(input_svg, output_svg)
