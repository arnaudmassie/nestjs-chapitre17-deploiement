#!/bin/bash

# Note : nécessite chmod +x create-migration.sh

NAME=$1

npm run build

npm run typeorm -- migration:create migration/$NAME