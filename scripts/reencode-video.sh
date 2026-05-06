#!/usr/bin/env bash
set -euo pipefail

INPUT="${1:-public/video.mp4}"
OUTPUT="${2:-public/video.scrub.mp4}"

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "ffmpeg not found. Install ffmpeg and try again." >&2
  exit 1
fi

ffmpeg -y -i "$INPUT" \
  -vf fps=60 \
  -c:v libx264 \
  -preset slow \
  -crf 18 \
  -g 1 \
  -keyint_min 1 \
  -sc_threshold 0 \
  -pix_fmt yuv420p \
  -movflags +faststart \
  -an \
  "$OUTPUT"
