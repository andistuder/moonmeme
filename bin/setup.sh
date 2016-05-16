#!/bin/sh

echo 'installing midori and unclutter'
sudo apt-get update
sudo apt-get install midori
sudo apt-get install unclutter

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

echo 'now reboot!'
