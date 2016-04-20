#!/bin/sh

echo 'installing midori and unclutter'
sudo apt-get update
sudo apt-get install midori
sudo apt-get install unclutter

echo 'update autostart'
cat ./setup/autostart >> ~/.config/lxsession/LXDE-pi/autostart
