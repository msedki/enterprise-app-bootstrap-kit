#!/usr/bin/env bash
set -euo pipefail

REMOTE_URL="${1:-}"
if [[ -z "$REMOTE_URL" ]]; then
  echo "Usage: $0 https://github.com/OWNER/REPOSITORY.git" >&2
  exit 2
fi

git remote remove origin 2>/dev/null || true
git remote add origin "$REMOTE_URL"
git push -u origin main
