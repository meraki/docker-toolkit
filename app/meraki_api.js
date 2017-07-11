

export default class MerakiApi {

    constructor() {
        this.org_id = Cookies.get("org-id");
        this.api_key = Cookies.get("api-key");
        this.api_url = "http://localhost:3000/api/v0";
    }

    fetch_init() {
        return {
            headers: {'X-Cisco-Meraki-API-Key': this.api_key},
            contentType: 'application/json; charset=utf-8'
        }
    }

    get_api_resource(resource){
        return fetch(this.api_url + resource, this.fetch_init())
    }

    get_organizations() {
        return this.get_api_resource("/organizations")
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
