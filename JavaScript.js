myApp = {};
myApp.pageLoad = function () {
    this.twuits = [];
    this.URL = 'https://twuit.firebaseio.com';


    
    this.addFriend = function (address) {

        if (address === "") {
        } else {
            var request = new XMLHttpRequest();
            request.open('POST', this.URL + '/profile/friends' + '.json', true);
            request.onload = function () {
                if (this.status >= 200 && this.status < 400) {
                    data = JSON.parse(this.response);
                } else { }
            };
            request.send(JSON.stringify({ address: 'https://' + address + '.firebaseio.com' }));
            this.twuits.push({ address: address });
            document.getElementById('address').value = "";
        }

    };

    this.deleteTwuit = function () {
        var x = document.getElementById('key-id').innerHTML;
        var request = new XMLHttpRequest();
        request.open('Delete', this.URL + '/tweets' + '/' + x + '/' + '.json', true);
        request.onload = function () {
            if (this.status >= 200 && this.status < 400) {
                data = JSON.parse(this.response);
            } else { }
        };
        request.send(JSON.stringify(this.response));
        var disappear = document.getElementById('selfDestruct');
        disappear.parentElement.removeChild(disappear);
    };


    this.showTwuits = function () {
        var request = new XMLHttpRequest();
        request.open('GET', this.URL + '/tweets' + '.json', true);
        request.onload = function () {
            if (this.status >= 200 && this.status < 400) {
                data = JSON.parse(this.response);

                document.getElementById("torchedMessage").innerHTML = "";

                for (var x in data) {
                    for (var y in data[x]) {

                        if (typeof data[x][y] === "string") {

                            document.getElementById("torchedMessage").innerHTML += "<div id='selfDestruct' class='panel panel-default resize'>" +
                            data[x][y] +
                            "<div class='btn btn-danger btn-sm' id='deleteButton' onclick='myApp.deleteTwuit()'><span class='glyphicon glyphicon-remove'></span></div>" +
                            "<div id='key-id'>" + x + "</div>" + "</div>";

                        }
                    }
                }
            }
        };
        request.send(JSON.stringify(this.response));
    };




    this.refreshFeed = function () {
        var request = new XMLHttpRequest();
        request.open('GET', this.URL + '/profile/friends' + '.json', true);
        request.onload = function () {
            if (this.status >= 200 && this.status < 400) {
                data = JSON.parse(this.response);
                document.getElementById("torchedMessage").innerHTML = "";
                for (var name in data) {
                    for (var address in data[name]) {
                        var request = new XMLHttpRequest();
                        request.open('GET', data[name][address] + '/tweets' + '.json', true);
                        request.onload = function () {
                            if (this.status >= 200 && this.status < 400) {
                                data = JSON.parse(this.response);
                                for (var x in data) {
                                    for (var y in data[x]) {

                                        if (typeof data[x][y] === "string") {
                                            document.getElementById("torchedMessage").innerHTML += "<div id='selfDestruct' class='panel panel-default resize'>" +
                                            "@Your friend: " + data[x][y] +
                                            "<div class='btn btn-danger btn-sm' id='deleteButton' onclick='myApp.deleteTwuit()'><span class='glyphicon glyphicon-remove'></span></div>" +
                                            "<div id='key-id'>" + x + "</div>" + "</div>";

                                        }
                                    }
                                }
                            } else { }
                        };
                        request.send(JSON.stringify(this.response))
                    }
                }
            }
        };
        request.send(JSON.stringify(this.response));
    };


    this.sendTwuit = function (message) {
        var timestamp = Date.now();
        if (message === "") {
        } else {
            var request = new XMLHttpRequest();
            request.open('GET', this.URL + '/profile/friends' + '.json', true);
            request.onload = function () {
                if (this.status >= 200 && this.status < 400) {
                    data = JSON.parse(this.response);
                    for (var name in data) {
                        for (var address in data[name]) {
                            var request = new XMLHttpRequest();
                            request.open('POST', data[name][address] + '/tweets' + '.json', true);
                            request.onload = function () {
                                if (this.status >= 200 && this.status < 400) {

                                    data = JSON.parse(this.response);
                                } else { }
                            };
                            request.send(JSON.stringify({ message: "@Victor: " + message, timestamp: timestamp }));
                        }
                    }
                }
            };
            request.send(JSON.stringify({ message: "@Victor: " + message, timestamp: timestamp }));
            document.getElementById('torchIt').value = "";
        }
        this.showTwuits();
    };




    this.showFriends = function () {
        document.getElementById("friendsList").innerHTML = "";

        var request = new XMLHttpRequest();
        request.open('GET', this.URL + '/profile/friends' + '.json', true);
        request.onload = function () {
            if (this.status >= 200 && this.status < 400) {
                data = JSON.parse(this.response);
                for (var x in data) {
                    for (var y in data[x]) {
                        document.getElementById("friendsList").innerHTML += "<div id='selfDestruct' class='panel panel-default resize'>" +
                         data[x][y] +
                        "<div class='btn btn-danger btn-sm' id='deleteButton' onclick='myApp.deleteTwuit()'><span class='glyphicon glyphicon-remove'></span></div>" +
                        "<div id='key-id'>" + x + "</div>" + "</div>";
                    }
                }
            }
        };
        request.send(JSON.stringify(this.response));
    };



};
myApp.pageLoad();
