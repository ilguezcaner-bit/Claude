import subprocess, sys

# Try cairosvg first
try:
    import cairosvg
    cairosvg.svg2png(url="/home/user/Claude/smoke-pack-poster.svg",
                     write_to="/home/user/Claude/smoke-pack-poster.png",
                     output_width=840, output_height=1190)
    print("Done with cairosvg")
    sys.exit(0)
except ImportError:
    pass

# Try inkscape
r = subprocess.run(["which","inkscape"], capture_output=True, text=True)
if r.returncode == 0:
    subprocess.run(["inkscape","--export-type=png","--export-width=840",
                    "--export-filename=/home/user/Claude/smoke-pack-poster.png",
                    "/home/user/Claude/smoke-pack-poster.svg"])
    print("Done with inkscape")
    sys.exit(0)

# Fallback: PIL + render via html
print("No SVG converter found, installing cairosvg...")
subprocess.run([sys.executable,"-m","pip","install","cairosvg","-q"])
import cairosvg
cairosvg.svg2png(url="/home/user/Claude/smoke-pack-poster.svg",
                 write_to="/home/user/Claude/smoke-pack-poster.png",
                 output_width=840, output_height=1190)
print("Done")
