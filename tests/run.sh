#!/usr/bin/env bash
# Runs the automated test suite for Cute Combat Dojo.
#
# Usage: bash tests/run.sh   (from anywhere)
#
# Requires `gjs` (GNOME JavaScript / SpiderMonkey), a standalone JS engine -
# this project has no npm/node/build step, so there's no `npm test`. gjs
# lets us load and execute the real app files (js/lib.js, js/curriculum.js,
# script.js) outside a browser, with tests/dom-stub.js standing in for the
# DOM/localStorage/timers those files expect.
#
# This is logic/data-level testing only - it cannot confirm the page
# actually renders correctly in a browser. See tests/run.js's header
# comment for what it does and doesn't cover.

set -euo pipefail

if ! command -v gjs >/dev/null 2>&1; then
  echo "gjs not found. Install it (e.g. 'apt install gjs' / 'brew install gjs') to run this suite." >&2
  exit 2
fi

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

TMP="$(mktemp)"
trap 'rm -f "$TMP"' EXIT

cat tests/dom-stub.js js/lib.js js/curriculum.js script.js tests/run.js > "$TMP"
gjs "$TMP"
