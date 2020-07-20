#!/bin/sh
set -e

# if no configuration exists, create it
if (! [ -e pagic.config.tsx ]) && (! [ -e pagic.config.ts ]); then
  echo "export default {}" > pagic.config.ts
fi

if [ -z "$(command -v "${1}")" ]; then
  set -- pagic "$@"
fi

exec "$@"