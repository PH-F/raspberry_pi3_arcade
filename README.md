# Raspberry PI3

## Select a branch per for a specific game.

1. download and install SD cardFormatter for Mac (or windows) https://www.sdcard.org/downloads/formatter_4/index.html
2. download NOOffBS https://www.raspberrypi.org/downloads/noobs/
3. Format the SDcard
4. Extract the NOOBS zipfile and copy the contents to the SDcard (1.83GB)
5. Eject the SDcard
6. Put in the raspberry pi connect keyboard monitor, mouse and power
7. On the installation menu choose Raspbian (debian)
8. Launch the terminal on the raspberry and:
    (not required anymore sudo apt-get install apache2)
    1. sudo pip install flask
    2. sudo pip install evdev
    3. sudo apt-get install git-core

    5. cd /home/pi
    6. Install wiringPi >> http://wiringpi.com/download-and-install/
    7. cd /var
    8. sudo chown pi:pi www
    9. cd /var/www
    10. git clone --branch xray https://github.com/PH-F/raspberry_pi3_arcade.git
    11. mv /var/www/raspberry_pi3_arcade /var/www/app
    12. test with python /var/www/app/python/app.py & open the browser to http://localhost:5000
    
9. Start the pythonscript at boot
	1. sudo chmod 755 /var/www/app/boot.sh
	2. sudo mkdir /var/log/cron
	3. sudo chmod 777 var/log/cron/
	4. sudo crontab -e 
		Add:  @reboot sh /var/www/app/boot.sh > /var/log/cron/cronlog 2>&1
	5. sudo nano /etc/rc.local
	    before exit 0 add:
	    ```
	    python /var/www/app/python/app.py
	    ```
		
10. Start the browser at boot
	1. Open the teminal and create the folder:  /home/pi/.config/lxsession/LXDE-pi/
	2. Open the teminal and type: 	sudo nano /home/pi/.config/lxsession/LXDE-pi/autostart
    3. 
    ```
    #@xscreensaver -no-splash # comment this line out to disable screensaver
    @xset s off
    @xset -dpms
    @xset s noblank
    @chromium-browser --incognito --kiosk http://localhost:5000
	```
	4. save and reboot
	5. Note:   ctrl W   will close the browser!
	6. Note:   ctrl+alt+t will start the terminal
	7. If you want the desktop back then rename the /home/pi/.config/lxsession/LXDE-pi/autostart file


# Run (in the background)
sudo python python/emulateKeyBoard.py

# Build with Python & Javascript

## Wiring
![Image](https://github.com/PH-F/raspberry_pi3_arcade/blob/xray/tests/pinout.png)

## GamePlay


## Using a 800*480 display
(https://www.kiwi-electronics.nl/7-inch-raspberry-pi-dsi-touchscreen-display?search=raspberry%20Pi%207)
#### Change  in /boot/config.txt:
framebuffer_width=800
framebuffer_height=480

#### Change/ add  in /boot/config.txt
hdmi_group=2
hdmi_mode=87
hdmi_cvt=800 480 60 6 0 0 0
hdmi_drive=1

#### rotate screen  in /boot/config.txt
lcd_rotate=2