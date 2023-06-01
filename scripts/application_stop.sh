#!/bin/bash

echo "CHECK NODE YG SEDANG BERJALAN"
if ps -C node > /dev/null
then
  echo "MEMATIKAN NODE SERVER YANG ADA"
  pkill node
fi

echo "NODE SERVER TELAH DIMATIKAN"