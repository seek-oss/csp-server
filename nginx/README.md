# Install Nginx

Nginx will act as web server (proxy to Node) and SSL offloader.

You would need:
* A domain (DNS name like csp.yoursite.com) pointing to the server. 

###  Install
* Connect to server
```sh
ssh ubuntu@xx.xx.xx.xx -i keypair.pem
```

* Install Nginx
```sh
sudo apt-get install nginx -y
sudo sed -i 's/# server_tokens off;/server_tokens off;/' /etc/nginx/nginx.conf
sudo sh -c "echo 'OK' >> /var/www/html/index.html"
```

* (Optional) Get the relevant SSL certificate for the site
In fact this kind of site should be https only
If so edit the [csp-server](./csp-server) file accordingly (enable the commented lines)

* To the get config from repo
```sh
wget https://raw.githubusercontent.com/SEEK-Jobs/csp-server/master/nginx/csp-server
sudo mv csp-server /etc/nginx/sites-available
sudo ln -s /etc/nginx/sites-available/csp-server /etc/nginx/sites-enabled/csp-server
sudo rm /etc/nginx/sites-enabled/default
sudo service nginx restart
```

* Test Nginx
```sh
curl http://localhost/
```
