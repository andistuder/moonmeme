#!/bin/bash
set -e

echo 'installing midori and unclutter'
sudo apt-get update
sudo apt-get install xz-utils
sudo apt-get install midori
sudo apt-get install unclutter

echo 'installing node and dependencies'
wget https://nodejs.org/dist/v6.9.4/node-v6.9.4-linux-armv6l.tar.xz
cd /usr/local && sudo tar xz ~/node-v6.9.4-linux-armv6l.tar.xz --strip=1
cd /home/pi/Documents/moonmeme/ && npm install
node /home/pi/Documents/moonmeme/server/import_data.js

echo  'installing dependencies to enable RTC'
sudo apt-get install python-smbus
sudo apt-get install i2c-tools
echo 'i2c-bcm2708' | sudo tee -a /etc/modules
echo 'i2c-dev' | sudo tee -a /etc/modules

echo 'ensure spi-bcm2708 and i2c-bcm2708 are not blacklisted in /etc/modprobe.d/raspi-blacklist.conf'

echo 'add below to /boot/config.txt'
echo 'dtparam=i2c1=on'
echo 'dtparam=i2c_arm=on'

echo 'update autostart'
cat ./setup/autostart >> ~/.config/lxsession/LXDE-pi/autostart

echo 'NOW reboot, and then run setup-rtc.sh'
