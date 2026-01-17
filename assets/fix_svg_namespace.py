# fix_svg_namespace.py
import sys
import re

if len(sys.argv) != 3:
    print("Usage: python3 fix_svg_namespace.py input.svg output.svg")
    sys.exit(1)

input_file = sys.argv[1]
output_file = sys.argv[2]

# Read the SVG
with open(input_file, 'r', encoding='utf-8') as f:
    svg_content = f.read()

# Remove ns0: prefixes from tags and attributes
svg_fixed = re.sub(r'\bns0:', '', svg_content)

# Optional: remove xml version header if you want a "clean" SVG
# svg_fixed = re.sub(r"<\?xml.*?\?>\n?", "", svg_fixed, flags=re.DOTALL)
# svg_fixed = re.sub(r"<!--.*?-->\n?", "", svg_fixed, flags=re.DOTALL)  # remove comments

# Write fixed SVG
with open(output_file, 'w', encoding='utf-8') as f:
    f.write(svg_fixed)

print(f"✅ Done! Output saved to: {output_file}")
