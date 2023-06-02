in linux or ubuntu server which not have display, you need to install bellow:
sudo apt update 
sudo apt install -y libgtk2.0-0 libgtk-3-0 libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb libgbm-dev

xvfb-run --server-args="-screen 0 1024x768x24" pm2 start "nodemon ai/wabot.js" --name wabot