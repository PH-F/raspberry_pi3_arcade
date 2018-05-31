# Raspberry PI3

1. download and install SD cardFormatter for Mac (or windows) https://www.sdcard.org/downloads/formatter_4/index.html
2. download NOOBS https://www.raspberrypi.org/downloads/noobs/
3. Format the SDcard
4. Extract the NOOBS zipfile and copy the contents to the SDcard (1.83GB)
5. Eject the SDcard
6. Put in the raspberry pi connect keyboard monitor, mouse and power
7. On the installation menu choose Raspbian (debian)
8. Launch the terminal on the rasberry and:
    1. sudo apt-get install apache2 php
    2. sudo apt-get install php-xml
    3. sudo apt-get install git-core
    4. sudo a2enmod rewrite
    5. cd /home/Pi
    6. git clone git://git.drogon.net/wiringPi
    7. cd wiringPi
    8. ./build
    9. sudo apt-get install composer
    10. cd /var
    11. sudo chown pi:pi www
    12. cd /var/www
    13. git clone https://github.com/PH-F/raspberry_pi3_arcade.git
    14. composer install
    15. chmod 777 logs
    16. sudo nano /etc/apache2/sites-available/000-default.conf
        1. replace /var/www/html -> /var/www/app/public
        2. add <Directory /var/www/app>AllowOverride All</Directory> above the </VirtualHost>
        3. sudo /etc/init.d/apache2 restart
    17. sudo usermod -a -G gpio www-data
    18. sudo /etc/init.d/apache2 restart
    19. sudo chmod 777 /sys/class/gpio/gpio18/
    20. sudo apt-get install python-dev python-pip gcc
    21. sudo pip install evdev
    22. sudo modprobe uinput

# Run (in the background)
sudo python python/emulateKeyBoard.py

# Build with Python and Slim Framework 3
