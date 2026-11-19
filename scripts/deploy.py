#!/usr/bin/env python3
"""Stage reviewed static site files for Cloudflare Pages without regenerating them."""
import re
from pathlib import Path
from shutil import copy2, rmtree

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "dist"
if DIST.exists():
    rmtree(DIST)
DIST.mkdir()

files = [
    "index.html",
    "404.html",
    "_headers",
    "robots.txt",
    "sitemap.xml",
    "manifest.webmanifest",
    "favicon.ico",
]
key_files = sorted(
    path.name for path in ROOT.glob("*.txt") if re.fullmatch(r"[0-9a-f]{32}", path.stem)
)
if len(key_files) != 1:
    raise FileNotFoundError(f"Expected one IndexNow key file, found {key_files}")
files.append(key_files[0])
for section in ["flagship", "solutions", "impact", "outreach", "work",
                "packages", "process", "contact", "privacy"]:
    files.append(f"{section}/index.html")

for source in sorted((ROOT / "assets").iterdir()):
    if source.is_file() and source.suffix.lower() in {".css", ".js", ".svg", ".webp", ".png", ".jpg", ".jpeg", ".ico"}:
        files.append(f"assets/{source.name}")

for path in files:
    source = ROOT / path
    if not source.is_file():
        raise FileNotFoundError(f"Cannot deploy, missing required file: {path}")
    target = DIST / path
    target.parent.mkdir(parents=True, exist_ok=True)
    copy2(source, target)
print(f"Prepared {len(files)} reviewed public files in {DIST}")
