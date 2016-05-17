#!/bin/bash
set -e

sudo modprobe rtc-ds1307

sudo bash
echo ds1307 0x68 > /sys/class/i2c-adapter/i2c-1/new_device
exit
echo HWCLOCK: $(sudo hwclock -r)
echo DATE: $(date)
sudo hwclock -w
echo HWCLOCK: $(sudo hwclock -r)

echo 'rtc-ds1307' | sudo tee -a /etc/modules

echo 'Editing rc.local'
echo 'echo ds1307 0x68 > /sys/class/i2c-adapter/i2c-1/new_device' | sudo tee -a /etc/rc.local
echo 'sudo hwclock -s' | sudo tee -a /etc/rc.local
echo 'date' | sudo tee -a /etc/rc.local
echo 'NOW: move "exit O" to end of file /etc/rc.local'
