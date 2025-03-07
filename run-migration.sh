#!/bin/bash

# Note : nécessite chmod +x run-migration.sh

npm run build

npm run typeorm -- -d dist/src/ormconfig.js migration:run