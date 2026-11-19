#!/usr/bin/env python3
"""Submit every sitemap URL to IndexNow."""
from __future__ import annotations

import json
import re
import sys
import urllib.error
import urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
HOST = "modernizedministry.com"
ENDPOINT = "https://api.indexnow.org/indexnow"
SITEMAP = ROOT / "sitemap.xml"
NS = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}


def find_key() -> tuple[str, Path]:
    matches = [
        path for path in sorted(ROOT.glob("*.txt")) if re.fullmatch(r"[0-9a-f]{32}", path.stem)
    ]
    if len(matches) != 1:
        raise SystemExit(f"Expected one 32-hex IndexNow key file, found {len(matches)}")
    key_path = matches[0]
    key = key_path.read_text(encoding="utf-8").strip()
    if key != key_path.stem:
        raise SystemExit(f"IndexNow key file {key_path.name} does not contain its filename")
    return key, key_path


def sitemap_urls() -> list[str]:
    root = ET.parse(SITEMAP).getroot()
    urls = [node.text.strip() for node in root.findall("sm:url/sm:loc", NS) if node.text]
    if not urls:
        urls = [node.text.strip() for node in root.iter() if node.tag.endswith("loc") and node.text]
    if not urls:
        raise SystemExit("No URLs found in sitemap.xml")
    return urls


def main() -> int:
    key, key_path = find_key()
    payload = {
        "host": HOST,
        "key": key,
        "keyLocation": f"https://{HOST}/{key_path.name}",
        "urlList": sitemap_urls(),
    }
    request = urllib.request.Request(
        ENDPOINT,
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json; charset=utf-8"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            body = response.read().decode("utf-8", errors="replace")
            print(f"IndexNow {response.status} {response.reason}")
            if body:
                print(body)
            print(f"Submitted {len(payload['urlList'])} URLs with key file {key_path.name}")
            return 0 if response.status in (200, 202) else 1
    except urllib.error.HTTPError as exc:
        body = exc.read().decode("utf-8", errors="replace")
        print(f"IndexNow {exc.code} {exc.reason}", file=sys.stderr)
        if body:
            print(body, file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
