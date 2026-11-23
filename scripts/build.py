#!/usr/bin/env python3
"""Compatibility build entry point: stage reviewed site files without regenerating pages.

This project uses hand-reviewed static HTML as the source of truth. Older
Cloudflare Pages setups may still invoke scripts/build.py. Keeping that command
as an alias prevents legacy page templates from overwriting current content.
"""
from pathlib import Path
import runpy

runpy.run_path(str(Path(__file__).with_name("deploy.py")), run_name="__main__")
