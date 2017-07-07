var network_name_prefix = Cookies.get("network-prefix");
var network_qty = Cookies.get("network-qty");
var wait_time = 10;
var batch_size = 3;

$.wait = function(ms) {
    var defer = $.Deferred();
    setTimeout(defer.resolve, ms);
    return defer;
};

function log_table(message) {
    $("table > tbody:last-child").append('<tr><td>' + message + '</td></tr>');
    $("tr:last").delay(3000).fadeOut(1000);
}

function create_and_bind_network(network,template,cb) {
    log_table("Creating network '" + network.name + "'");
    create_network(network, function(network) {
        $.wait(wait_time).then(
            function() {
                log_table("Binding '" + network.name + "' to '" + template.name + "' template");
                bind_network_to_template(network,template, function(response) {
                    cb();
                });
            }
        )
    })
}

function recur_create_and_bind_networks(i,template) {
    if (i <= network_qty) {
        for (x = 0; x < batch_size; x++) {
            new_network = {
                "name": network_name_prefix + " " + (i + x),
                "type": "wireless"
            }

            if (x==0) {
                create_and_bind_network(new_network, template, 
                    function() {
                        recur_create_and_bind_networks(i + batch_size,template);
                    }
                )
            } else {
                create_and_bind_network(new_network, template, 
                    function() {}
                )
            }
        }
    }
}