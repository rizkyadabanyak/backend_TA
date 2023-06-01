#!/bin/bash

DIR="$HOME/backend"
cd $DIR

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

npm install

node ./src/server.js > app.out.log 2> app.err.log < /dev/null &