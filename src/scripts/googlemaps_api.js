var googleMapsApi = (function () {
    var map = null;
    // Markers' List
    var markerList = [];

    // This function is related to init the Christchurch Map.
    function initMap() {
        map = new google.maps.Map(document.getElementById("map"), {
            // Christchurch location
            center: {lat: -43.532054, lng: 172.636225},
            zoom: 12
        });
    }

    // This function add marker and its infoWindow.
    function addMarker(lat, lng, name, address, url, rating) {
        if (!isReady()) {
            return false;
        }
        var marker = new google.maps.Marker({
            position: {lat:lat, lng:lng},
            animation: google.maps.Animation.DROP,
            map: map,
            // Marker Icon
            icon: "food.png"
        });

        var contentString = "<address>" +
            "<strong>" +
                "<a href='" + url + "'>" + name + "</a>" +
            "</strong><br>" +
            address + "<br>" +
            "<p>Rating: " + rating +  "</p>"  +
            "</address>";

        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        // Add new marker to markers list
        markerList.push(marker);

        // infoWindow click event
        marker.addListener("click", function() {
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
        isReady: isReady,
        cleanAllMarkers: cleanAllMarkers
    };
})();