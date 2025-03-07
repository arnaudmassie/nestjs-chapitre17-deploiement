#!/bin/bash

# Note : nécessite chmod +x revert-migration.sh

npm run build

npm run typeorm -- -d dist/src/ormconfig.js migration:revert