---
title: How to setup an Ubuntu server
description: The basic building blocks of setting up an Ubuntu server
slug: how-to-setup-ubuntu-server
date: 2016-05-29
---

Let's face it. It can be overwhelming starting at a blank terminal thinking of how to initially get our server going. I've been playing around with servers at [Digital Ocean](http://digitalocean.com) and wanted to write down my workflow not only to help others, but for my reference as well. I may also use server and box synonymously.

## First Login
There are a few simple steps to get going in the right direction after logging into the server for the first time.

1. Login via SSH
  * `ssh root@<ipaddr>`
2. Change root password
  * `passwd`
3. Create a new user
  * `adduser <newuser>`
4. Give user sudo access
  * `gpasswd -a <newuser> sudo`

## Add Public/Private Key Authentication
Next, it's time to set up SSH logins. It's tedious to have to input our password everytime we log into our box, so let's get rid of that step.

First, on your local machine, we'll need to generate an RSA public and private key. You may skip this if you already have a generated key.

``` shell
# Generate our RSA key and go through the steps. Default path is fine and I recommend no password
$ ssh-keygen -t rsa

# Print out our new public key so we can copy
$ cat ~/.ssh/id_rsa.pub
```

Let's log back into our server as the root user and configure the user we created in the previous section to accept our newly generated key as a login.

``` shell
# On server as root, enter in new user’s shell
$ su - <newuser>

# Now create the ssh directory in the new users home directory
$ cd ~
$ mkdir .ssh
$ chmod -R 700 .ssh
$ vim .ssh/authorized_keys
# Paste in public key
$ chmod 600 .ssh/authorized_keys
$ exit
```

Sweet. Now we should be able to login directly to our server without having to input our password. Try it out to verify.
``` shell
# Back on local machine
$ ssh <newuser>@<ipaddr>
```

## Securing SSH
Now that we can login directly to our server using SSH, we will want to make SSH a bit more secure to prevent any breaches. Some security experts recommend to change the SSH port off of 22, as this is the most common port that hackers use to try and brute force their way into your server. We also disallow the root user from logging in remotely to the server as we do not want anyone unwarranted with super capabilities. We may also choose to restrict which users are allowed to SSH into the box, but that's up to you.

``` shell
# Back on local machine
# Open up etc/ssh/sshd_config
Port <portno>
PermitRootLogin no
...
UseDNS no
AllowUsers <newuser>

# Back in the shell, we need to restart ssh using one of the following commands
# depending on your environment. Sudo may also need to be used.
reload ssh or service ssh restart

# Check to see whether new settings work
ssh -p <portno> <newuser>@<ipaddr>
```

## Firewall
To be extra secure, we may want to setup a firewall to restrict our server's port access.

``` shell
$ apt-get install ufw
$ ufw logging low
$ ufw limit <portno>/tcp #ssh
$ ufw allow 25/tcp       #mail
$ ufw allow 80/tcp       #http
$ ufw allow 443/tcp      #https
$ ufw enable
```

## Installing Ruby
We are going to use [RVM](http://rvm.io) to manage our Ruby installation. Run the following commands to get RVM onto our machine

``` shell
# You may optionally append '-s stable --rails' to the second command install rails simultaneously
$ gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3
$ curl -sSL https://get.rvm.io | bash
```

This will append a couple lines to source RMV scripts upon shell login and we should be good to go! The script will install the latest stable version of ruby. Let's verify ruby was installed successfully and check our ruby version.

``` shell
$ ruby -v
# ruby 2.3.0p0 (2015-12-25 revision 53290) [x86_64-linux]
```

Nice, Ruby and Ruby on Rails (if you installed rails as well) are up and running on our machine.

## Installing Node
We'll use [NVM](https://github.com/creationix/nvm) (Node Version Manager) to install and manage NodeJs on our server.

``` shell
# Always start by updating our packages
$ apt-get update

# Next, we'll install two necessary libraries for nvm to run properly.
$ apt-get install build-essential libssl-dev

# Finally, we'll install NVM using curl
$ curl https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash
```

Make sure to restart your terminal or source your profile after installation to load NVM initially. 0.31.0 is the current version at the time of writing this, but you may replace it with whatever the current version is. You may find this by visiting the [NVM](https://github.com/creationix/nvm) repo on Github. This will append a few lines to your user profile that will automatically source NVM on login. We can now install Node on our Machine!

``` shell
$ nvm --version
# 0.31.0

# Install the latest stable version of Node
$ nvm install 5.0.0

$ node -v
# v5.0.0

$ npm -v
# 3.3.6
```

Boom! We now have [Node](https://nodejs.org/en/) and [NPM](https://www.npmjs.com/) installed and running on our system. We can now install any Node packages we want such as pm2 for Node app deployment by running `npm install -g pm2.`

## Nginx

First, install nginx from apt-get

``` shell
$ apt-get update
$ apt-get install nginx
```

That was easy. Go ahead and navigate to your IP address in the browser or a REST client such as Postman and you should see a welcome page.

## MongoDB
