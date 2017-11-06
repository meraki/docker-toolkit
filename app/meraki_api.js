var JSONbig = require('json-bigint')({"storeAsString": true});

export default class MerakiApi {

    constructor() {
        //this stuff should get passed in so the dependency is cleaner
        this.org_id = Cookies.get("org-id");
        this.api_key = Cookies.get("api-key");
        this.api_url = "/np/v0";
    }

    get_random_number(min, max) {
        return Math.random() * (max - min) + min;
    }

    set_container_component(component) {
        this.container_component = component;
    }

    update_container_component() {
        if (typeof this.container_component != 'undefined') {
            this.container_component.setState({meraki_api: this})
        }
    }

    get_api_key() {
        return this.api_key;
    }

    set_api_key(key) {
        Cookies.set("api-key",key);
        this.api_key = Cookies.get("api-key");
        this.update_container_component();
    }

    test_log(log) {
        if (typeof this.container_component != 'undefined') {
            this.container_component.log(log);
        }
    }

    //actual meraki api stuff
    //abstract utils
    fetch_init() {
        return {
            headers: {
                'X-Cisco-Meraki-API-Key': this.api_key,
                'Content-Type': 'application/json; charset=UTF-8'
            }
        }
    }

    get_api_resource(resource){
        return fetch(this.api_url + resource, this.fetch_init()).then((response) => {
            return response.text();
        }).then((text) => {
            return JSONbig.parse(text);
        })
    }

    put_api_resource(resource, payload, retry_count=0) {
        let fetch_config = this.fetch_init();
        fetch_config.method = 'PUT';    
        fetch_config.body = JSON.stringify(payload);

        return fetch(this.api_url + resource, fetch_config).then((response) => {
            //console.log(response);
            if (!response.ok) {
                throw Error("fetch not ok!");
            }
            return response.text();
        }).then((text) => {
            console.log("retries to success: " + retry_count);
            return JSONbig.parse(text);
        }).catch((err) => {
            //console.log(err);
            //console.log(resource);
            //console.log(payload);

            let random_wait = this.get_random_number(2000,10000);

            if (retry_count > 5) {
                console.log("too many retries");
            } else {
                //console.log("retry: " + retry_count);
                console.log("retrying in: " + (random_wait / 1000));

                var promise = new Promise((resolve) => {
                    setTimeout(() => {
                        //console.log("stop wait " + random_wait);
                        resolve(this.put_api_resource(resource,payload,retry_count + 1));
                    }, random_wait);
                })

                return promise;
            }
        })
    }

    //api wrappers
    get_organizations() {
        return this.get_api_resource("/organizations")
    }

    get_templates(org) {
        return this.get_api_resource("/organizations/" + org.id + "/configTemplates")
    }

    get_networks(org) {
        return this.get_api_resource("/organizations/" + org.id + "/networks")
    }

    get_devices(network) {
        return this.get_api_resource("/networks/" + network.id + "/devices")
    }

    update_device(device) {
        return this.put_api_resource("/networks/" + device.networkId + "/devices/" + device.serial, device)
    }

}


// var api_url = "http://localhost:3000/go/api/v0";
// var req_headers = {'X-Cisco-Meraki-API-Key': api_key, 'ContentType': 'application/json'};

// var templates_url = api_url + "/organizations/" + org_id + "/configTemplates";
// var networks_url = api_url + "/organizations/" + org_id + "/networks";

// // $.ajaxSetup({
// //     headers: {'X-Cisco-Meraki-API-Key': api_key},
// //     contentType: 'application/json; charset=utf-8',
// // })

// var network_bind_url = function(network) {
//     return api_url + "/networks/" + network.id + "/bind"
// }

// var network_delete_url = function(network) {
//     return api_url + "/networks/" + network.id;
// }

// var get_templates = function(cb) {
//     $.ajax({
//         url: templates_url,
//         complete: function(result) {
//             console.log("get templates");
//             cb(result.responseJSON);
//         }
//     });
// }

// var get_networks = function(cb) {
//     $.ajax({
//         url: networks_url,
//         complete: function(result) {
//             //$("p").html(result.responseText);
//             console.log("get networks");
//             cb(result.responseJSON);
//         }
//     });
// }

// var create_network = function(params, cb) {
//     $.ajax({
//         method: "POST",
//         url: networks_url,
//         data: JSON.stringify(params),
//         dataType: "json",
//         success: function(network) {
//             console.log("created network");
//             cb(network);
//         },
//         error: function(result, status) {
            
//             if (result.status == 429) {
//                 //too many requests
//                 console.log("error creating network, going too fast, retrying...");
//                 $.wait(1000).then(function() {
//                     create_network(params,cb);
//                 })
//             } else if (result.status == 0) {
//                 //too many requests
//                 console.log("error creating network, going too fast, retrying...");
//                 $.wait(1000).then(function() {
//                     create_network(params,cb);
//                 })
//             } else {
//                 console.log("create network error status:\t" + status);
//                 console.dir(result);
//             }
//         }
//     });
// }

// var delete_network = function(network,cb) {
//     $.ajax({
//         method: "DELETE",
//         url: network_delete_url(network),
//         dataType: "json",
//         complete: function(result) {
//             console.log("deleted network");
//             cb(result.responseJSON);
//         }
//     });
// }

// var bind_network_to_template = function(network,template,cb) {
//     $.ajax({
//         method: "POST",
//         url: network_bind_url(network),
//         data: JSON.stringify({
//             "configTemplateId": template.id
//         }),
        
//         success: function(data,status) {
//             console.log("bound network");
            
//             cb(data);
//         },

//         error: function(result,status) {
//             console.log("error binding network, retrying...");
//             $.wait(1000).then(function() {
//                 bind_network_to_template(network,template,cb)
//             });
//         }
//     });
// }
