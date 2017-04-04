var googleMapsApi = (function () {
    var map = null;
    // Markers' List
    var markerList = [];

    // This function is releated to init the Christchurch Map.
    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
            // Christchurch location
            center: {lat: -43.532054, lng: 172.636225},
            zoom: 13
        });
    }

    // This function add markers and infoWindow.
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

        markerList.push(marker);

        // infoWindow click event
        marker.addListener('click', function() {
            infowindow.open(map, marker);
        });

        return true;
    }

    function isReady() {
        return map != null;
    }

    // This function clean all markers
    function cleanAllMarkers() {
        markerList.forEach(function (marker) {
            marker.setMap(null);
        });
        markerList = [];
    }

    return {
        initMap: initMap,
        addMarker: addMarker,
        isReady: isReady,
        cleanAllMarkers: cleanAllMarkers
    };
})();