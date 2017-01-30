# Install Node

* Connect to server
```sh
ssh ubuntu@xx.xx.xx.xx -i keypair.pem
```

### Get nodejs folder
* For example check out the project
```sh
git clone git@github.com:seek-oss/csp-server.git
```

* Configure application config.js with the relevant values
```sh
vim ~/csp-server/nodejs/config.js
```

###  Install packages

* Ubuntu 16.04 LTS has version 4 so using default repo:
```sh
sudo apt-get install -y nodejs nodejs-legacy npm
sudo npm install pm2 -g
```

* Get package dependencies of this project
```sh
cd ~/csp-server/nodejs
npm install
```

* Create user for Nodejs
```sh
sudo useradd node -s /bin/bash
sudo mkdir -p /home/node
sudo chown node:node /home/node
```

* Install pm2 and run application as service
```sh
sudo su node
pm2 start /home/ubuntu/csp-server/nodejs/server.js
pm2 save
pm2 startup systemd
exit
sudo env PATH=$PATH:/usr/bin /usr/local/lib/node_modules/pm2/bin/pm2 startup systemd -u node --hp /home/node
```

### Tests

* Test node is running:
```sh
service pm2 status
```

* If you need to restart
```
sudo su node
pm2 restart 0
exit
```

* Test health - directly and via Nginx
```sh
curl http://localhost:9000/_healthcheck
curl http://localhost/reportOnly/_healthcheck -H "Host: csp.yoursite.com"
```

