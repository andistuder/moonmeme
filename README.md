# Moonmeme

This project is an adaptation of Liliane Lijn's [Moonmeme](http://www.lilianelijn.com/portfolio-item/moonmeme/) artwork to a stand-alone audio-visual installation.

## Prerequisites
- a Raspberry Pi, model A+ works well
- a Real Time Clock module
- a screen, cables, keyboard

## Setup

in raspi-config
- set to boot to graphic user interface

get source files

```
git clone https://github.com/andistuder/moonmeme.git /home/pi/Documents/moonmeme
```
cd to folder with source files and run

```
./bin/setup.sh
```

### Audio

Set in `raspi-config` or edit `/bin/config.txt`

More details in
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
