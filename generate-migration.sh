#!/bin/bash

# Note : nécessite chmod +x generate-migration.sh

NAME=$1

npm run build

# npm run typeorm -- migration:generate -d dist/ormconfig.js ./migration/$NAME
npm run typeorm -- migration:generate -d dist/src/ormconfig.js ./migration/$NAME