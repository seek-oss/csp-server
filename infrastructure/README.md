# Create EC2 instance

###  Install AWS-CLI

You will need AWS Credentials in your computer (for debian based see below):
```sh
sudo apt-get install python-pip -y
sudo apt-get install jq curl sed -y
sudo pip install awscli
aws configure
```

### Create AWS EC2 server 
You will the following information:
```sh
imageid=ami-xxxxxxxx
type=t2.micro
keyname=MyKeyPair
securitygroup=sg-xxxxxxxx
subnetid=subnet-xxxxxxxx
```

You will find the righ AMI for Ubuntu here: https://cloud-images.ubuntu.com/locator/ec2/
```sh
aws ec2 run-instances --image-id $imageid --count 1 --instance-type $type \
--key-name $keyname --security-group-ids $securitygroup --subnet-id $subnetid \
--user-data file://UserData-csp01.txt
```

Output will give you the IP, instance-id, etc. You should tag the instance now (at least name). TODO: Scripts to tag instance.

Get the IP from the output and SSH to the machine
```sh
ssh ubuntu@xx.xx.xx.xx -i keypair.pem
```

Find your external IP and write it down (run this under the server you just created):
```sh
curl ifconfig.co
exit
```


### Create AWS Elasticsearch

Run command to create an AWS Elasticsearch domain
```sh
RESULT=$(aws es create-elasticsearch-domain --domain-name csp-server --elasticsearch-version 2.3)
echo $RESULT | jq -r '.DomainStatus.ARN'
```

* Update permission policy template [aws-es-access-policy.json](./aws-es-access-policy.json) with
your ARN and the IPs you want to grant access, these are the server external IP and your computer external IP I assume.
You can do it with these commands:
```sh
# Edit this xx.xx.xx.xx with the external IPs
IPs=xx.xx.xx.xx\",\"xx.xx.xx.xx

# Update local policy template
ARN=$(echo $RESULT | jq -r '.DomainStatus.ARN')
sed -i "s/##IPs##/$IPs/" ./aws-es-access-policy.json
sed -i "s/##ARN##/${ARN/\//\\\/}\/*/" ./aws-es-access-policy.json
```

* Configure the new Elasticsearch applying the new policy
```sh
aws es update-elasticsearch-domain-config --domain-name csp-server --access-policies file://aws-es-access-policy.json
```

* Test you can hit Elasticsearch from your computer and the server
```sh
DOMAIN=$(aws es describe-elasticsearch-domain --domain-name csp-server)
ENDPOINT=$(echo $DOMAIN | jq -r '.DomainStatus.Endpoint')
curl $ENDPOINT
```