#!/usr/bin/env bash
# Genera los PDF públicos del CV (sin teléfono) a partir de cv-en.html y cv-es.html.
# Requiere Google Chrome. Uso: ./cv-src/build.sh
set -euo pipefail
cd "$(dirname "$0")"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
OUT="../assets/cv"
mkdir -p "$OUT"
for lang in EN ES; do
  lower=$(echo "$lang" | tr '[:upper:]' '[:lower:]')
  "$CHROME" --headless=new --disable-gpu --no-pdf-header-footer \
    --print-to-pdf="$OUT/Pedro-Vazquez-CV-$lang.pdf" "file://$PWD/cv-$lower.html"
done
ls -la "$OUT"
# Imagen para compartir en redes (1200x630)
mkdir -p ../assets/img
"$CHROME" --headless=new --disable-gpu --hide-scrollbars --window-size=1200,630 \
  --screenshot="$PWD/../assets/img/og.png" "file://$PWD/og.html"
ls -la ../assets/img/og.png
