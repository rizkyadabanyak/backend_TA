#!/bin/bash

# install nvm dan node
echo "CEK NVM"
if [ ! command -v nvm &> /dev/null ]; then
  echo "NVM TIDAK DITEMUKAN"
  echo "NVM AKAN DIINSTALL"

  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
  . ~/.nvm/nvm.sh
  echo "NVM BERHASIL DIINSTALL"
  nvm install 16
  node -e "console.log('NODEJS ' + process.version + ' BERHASIL DIINSTALL')"
fi

# CEK DIREKTORI
DIR="/home/ubuntu/backend"
echo "CEK DIRECTORY $DIR"
if [ -d "$DIR" ]; then
  echo "$DIR TELAH ADA"
else
  echo "$DIR BELUM ADA"
  echo "MEMBUAT DIRECTORY"
  mkdir ${DIR}
  sudo chmod -R 777 "$DIR"
fi