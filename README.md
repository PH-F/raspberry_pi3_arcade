# Raspberry PI3

1. download and install SD cardFormatter for Mac (or windows) https://www.sdcard.org/downloads/formatter_4/index.html
2. download NOOffBS https://www.raspberrypi.org/downloads/noobs/
3. Format the SDcard
4. Extract the NOOBS zipfile and copy the contents to the SDcard (1.83GB)
5. Eject the SDcard
6. Put in the raspberry pi connect keyboard monitor, mouse and power
7. On the installation menu choose Raspbian (debian)
8. Launch the terminal on the raspberry and:
    1. sudo apt-get install apache2
    2. sudo pip install flask
    3. sudo apt-get install git-core

    5. cd /home/Pi
    6. git clone git://git.drogon.net/wiringPi
    7. cd wiringPi
    8. ./build
    10. cd /var
    11. sudo chown pi:pi www
    12. cd /var/www
    13. git clone https://github.com/PH-F/raspberry_pi3_arcade.git
    14. mv /var/www/raspberry_pi3_arcade /var/www/app
    15. test with python /var/www/app/python/app.py & open the browser to http://localhost:5000
    
9. Start the pythonscript at boot
	1. sudo chmod 755 /var/www/app/boot.sh
	2. sudo mkdir var/log/cron
	3. sudo chmod 777 var/log/cron/
	4. sudo crontab -e 
		Add:  @reboot sh /var/www/app/boot.sh > /var/log/cron/cronlog 2>&1
		
10. Start the browser at boot
	1. Open the teminal and type: 	sudo nano /home/pi/.config/lxsession/LXDE-pi/autostart
    2. 
    ```
    #@xscreensaver -no-splash # comment this line out to disable screensaver
    @xset s off
    @xset -dpms
    @xset s noblank
    @chromium-browser --incognito --kiosk http://localhost:5000
	```
	3. save and reboot
	4. Note:   crtl W   will close the browser!


# Run (in the background)
sudo python python/emulateKeyBoard.py

# Build with Python & Javascript

## GamePlay
- key 1 = game
- key 2 = movie
- key 3 = quiz
- key q = option 1
- key w = option 2
- key e = option 3
- key r = option 4