---
title: How To Setup Github Pages
description: A detailed description on how to setup a Github Pages website with a custom domain.
slug: how-to-setup-github-pages
date: 2018-01-10
---

## Overview

The documentation is a little confusing when it comes to project pages, as opposed to user pages. It feels like you should have to do more, but actually the process is very easy.

It involves:

- Setting up 2 static A records for the naked (no www) domain.
- Creating one CNAME record for www which will point to a GitHub URL. This will handle www redirection for you.
- Creating a file called CNAME (capitalised) in your project root in your site repository. This will tell Github what URL to respond to.
- Wait for everything to propagate.

## What You Get

Your content will be served from a URL of the form `http://kylealwyn.com`.

Visiting [http://www.kylealwyn.com](http://www.kylealwyn.com) will return a 301 redirect to the naked domain. The path will be respected by the redirect, so traffic to [http://www.kylealwyn.com/pomodoro](http://www.kylealwyn.com/pomodoro) will be redirected to [http://kylealwyn.com/pomodoro](http://www.kylealwyn.com/pomodoro). You can have one project page per repository, so if your repos are open, you can have as many as you like.

## The Process

__1. Create your site github repository__

Github will, by default, serve your website if you setup a a repository named githubusername.github.io. Github username is, you guessed it your github username. My github username is kylealwyn, so I created a respository dubbed [kylealwyn.github.io](https://github.com/kylealwyn/kylealwyn.github.io). This site's code is hosted in the master branch of that repository. All you need to test your new Github-powered website is an index.html file.

__2. Create a CNAME file__

Add a file called CNAME to the root of your new repository. This should contain the domain you want to serve and nothing more. No http:// and no www. Make sure you commit and push.

``` shell
kylealwyn.com
```

__3. Create A records__

This step and the next will require you to login to your domain name provider. For the A records, point @ to the following ip addresses:

@: 192.30.252.154

@: 192.30.252.153

These are the static Github IP addresses from which your content will be served.

__4. Create a CNAME Record__

For the CNAME record, point www to githubusername.github.io. Note the trailing period. Also note that this is your github username. You don't need to specify the project name yet. Github will use the CNAME file to determine which project to serve content from.

e.g.

www: kylealwyn.github.io.

The purpose of the CNAME is to redirect all www subdomain traffic to a GitHub page which will 301 redirect to the naked domain. This file tells GitHub to use this repo to handle traffic to this domain.

__5. Wait__

Now wait 5 minutes, possibly even longer in some cases, and your project page should now be live.

## Done!

Your website should now be available at the domain you configured. Please feel free to shoot me an email or leave me a comment if this did not make sense or you need any extra help. Cheers!
