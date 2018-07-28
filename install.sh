#!/usr/bin/env bash

# install nvm
curl https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
echo "source nvm"
. ~/.nvm/nvm.sh
echo "install node"
nvm install 8.11.2
nvm alias default v8.11.2
source ~/.bashrc

# install arto-frame
mkdir -p ~/.arto_frame
cd ~/.arto_frame
npm install -g arto-frame

# install glslViewer
sudo apt-get install glslviewer