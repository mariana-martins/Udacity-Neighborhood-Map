var googleMapsApi = (function () {
    var map = null;
    // Markers' List
    var markerList = [];

    var infowindow;

    // This function is related to init the Christchurch Map.
    function initMap() {
        map = new google.maps.Map(document.getElementById("map"), {
            // Christchurch location
            center: {lat: -43.532054, lng: 172.636225},
            zoom: 12
        });
        infowindow = new google.maps.InfoWindow({});
    }

    // This function add marker and its infoWindow.
    function addMarker(lat, lng, name, address, url, rating) {
        if (!isReady()) {
            return false;
        }

        var content = "<address>" +
            "<strong>" +
            "<a href='" + url + "'>" + name + "</a>" +
            "</strong><br>" +
            address + "<br>" +
            "<p>Rating: " + rating +  "</p>"  +
            "</address>";

        var marker = new google.maps.Marker({
            position: {lat:lat, lng:lng},
            animation: google.maps.Animation.DROP,
            map: map,
            // Marker Icon
            icon: "food.png"
        });

        // Add new marker to markers list
        markerList.push(marker);

        // infoWindow click event
        marker.addListener("click", function() {
            infowindow.setContent(content);
            infowindow.open(map, marker);
        });

        return true;
    }

    // Inform if map is loaded.
    function isReady() {
        return map != null;
    }

    return {
        initMap: initMap,
        addMarker: addMarker,
        isReady: isReady
    };
})();