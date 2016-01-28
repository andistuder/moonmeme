# Moonmeme

This project is an adaptation of Liliane Lijn's [Moonmeme](http://www.lilianelijn.com/portfolio-item/moonmeme/) artwork to a stand-alone audio-visual installation.

## Prerequisites
- a Raspberry Pi, model A+ works well
- a Real Time Clock module
- a screen, cables, keyboard

## Setup

in raspi-config
- set to boot to graphic user interface

full screen mode, run in terminal:

```
sudo apt-get update
apt-get install midori
apt-get install unclutter
```

edit ~/.config/lxsession/LXDE-pi/autostart

```
@lxpanel --profile LXDE
@pcmanfm --desktop --profile LXDE
#@xscreensaver -no-splash
@xset s off
@xset -dpms
@xset s noblank
@unclutter -idle 0 -root
@midori -e Fullscreen -a /home/pi/Documents/moonmeme/index.html
```

get source files

```
git clone https://github.com/andistuder/moonmeme.git /home/pi/Documents/moonmeme
```

### Audio
https://www.raspberrypi.org/documentation/configuration/audio-config.md

### Real Time Clock

https://learn.adafruit.com/adafruits-raspberry-pi-lesson-4-gpio-setup/configuring-i2c

http://thepihut.com/blogs/raspberry-pi-tutorials/17209332-adding-a-real-time-clock-to-your-raspberry-pi

## Boot

Plug and play.

## Troubleshooting

Unplug, count to 5, plug and play.

## License

Unauthorised reproduction infringes copyright.

© 2016 Liliane Lijn
