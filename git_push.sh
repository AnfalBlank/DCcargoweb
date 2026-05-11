#!/bin/bash
set -e
REPO="/Users/administrator/DC Solutions Cargo/ditama-cargo"
git -C "$REPO" add -A
git -C "$REPO" commit -m "feat: admin panel lengkap dengan Turso DB - blog, FAQ, settings"
git -C "$REPO" push origin main
