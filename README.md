# meraki-api-toolbox
Meraki-api-toolbox is a simple web app wrapper for creating specialty tools for things best done through the Meraki dashboard API.  All information like your api-key is stored in a cookie in your browser, so there's no state or information stored anywhere else by the app.

The tools are all written in react with a plain javascript API library for talking to Meraki.  It's intended to be run locally so it also includes a proxy service for getting around JS's cross origin limitations.  If you are going to host it centrally, put an https reverse proxy in front of it so you're not sending your api key in the clear.

## Getting started

It's available as a docker container that will host locally on port 80.  After [installing docker](https://docs.docker.com/engine/installation/#time-based-release-schedule), simply run:

`docker run -p 80:3000 whitlow/meraki-api-toolbox`

You should then be able to access it with your browser at http://localhost/

## Getting stopped

To stop the docker container you'll need the container ID.  Get it by running:
`docker ps`

Once you have that you can stop it by running 'docker stop [container_id]'.  It should look something like this:
`docker stop cd04fbb33586`

## Tools in the box

### Configure
Saves your API key in a cookie for authenticating you to dashboard.

### Change addresses
This tool will change the physical address of each device in the network.  Optionally tell dashboard to also move the map marker or also write the address into the notes field (useful since you can't show the address in the AP list).

### Logs
This will show logs that each of the tools publish. 

## Updating

Docker is also great for updating containers, you should be able to just do:

`docker pull whitlow/meraki-api-toolbox` 

## Current behavior notes

* The toolbox doesn't respect dashboard's 5 calls per second limit.  If any update requests fail, they are scheduled to retry 2-8 seconds later.  If the request fails 6 times then it dies.  Failures are not currently logged.
* The 'Change addresses' tool has only been tested on wireless networks, ymmv for networks with switches or MX's in them.



