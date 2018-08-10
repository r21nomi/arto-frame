#!/usr/bin/env bash

# install nvm
curl https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
echo "source nvm"
. ~/.nvm/nvm.sh
echo "install node"
nvm install 8.11.2
nvm alias default v8.11.2
source ~/.bashrc

# install shaderarts-frame
mkdir -p ~/.shaderarts_frame
cd ~/.shaderarts_frame
npm install -g shaderarts-frame

# install glslViewer
sudo apt-get install glslviewer