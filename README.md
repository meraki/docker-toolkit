# network-maker
Network-maker is a simple web app for making networks and binding them to templates in the Meraki Dashboard.

## Getting started

It's available as a docker container that will host locally on port 3000.  After [installing docker](https://docs.docker.com/engine/installation/#time-based-release-schedule), simply run:

`docker run -p 3000:3000 whitlow/meraki`

You should then be able to access it with your browser at http://localhost:3000/config.html

## Stuff it does

### Config
Setup network-maker by giving it an api key, org id, prefix for network names, and a quantity of how many networks to make.  These are all stored in a cookie locally in your browser, so they should be available across restarts of the app. 

### Deploy
It currently will make however many networks you tell it, in the org you tell it, with the name prefix you tell, using the api-key you tell.

### Reset
This will delete **EVERY NETWORK** in the org - so make sure to use a test org for demos. 

## Updating

Docker is also great for updating containers, you should be able to just do:

`docker pull whitlow/meraki` 

## Current behavior

* networks are now made in batches of 3, so if you ask for 10 - you should get 12
* it binds to the first template in the org (alphabetically)
* created networks are wireless networks
* reset deletes all networks in the org (use a test org)




