var googleMapsApi = (function () {
    var map = null;
    // Markers' List
    var markerList = [];

    var infowindow;

    // This function is related to init the Christchurch Map.
    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
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

        var content = '<address>' +
            '<strong>' +
            '<a href="' + url + '">' + name + '</a>' +
            '</strong><br>' +
            address + '<br>' +
            '<p>Rating: ' + rating +  '</p>'  +
            '</address>';

        var marker = new google.maps.Marker({
            position: {lat:lat, lng:lng},
            animation: google.maps.Animation.DROP,
            map: map,
            // Marker Icon
            icon: 'food.png',
            title: name
        });

        // Add new marker to markers list
        markerList.push(marker);

        // infoWindow click event
        marker.addListener('click', function() {
            infowindow.setContent(content);
            infowindow.open(map, marker);
            // Animate marker
            marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function () {
                marker.setAnimation(null);
            }, 750);
        });

        return true;
    }

    // Update markers to visible if its title is in array. Otherwise remove visibility.google.maps.event.trigger(marker, 'click');
    function setVisible(array) {
        markerList.forEach(function (marker) {
            var title = marker.title;

            if (array.indexOf(title) >= 0) {
                marker.setVisible(true);
            } else
                marker.setVisible(false);
        })
    }

    function selectMarkerByName(name) {
        markerList.forEach(function (marker) {
            var title = marker.title;

            if (name === title) {
                google.maps.event.trigger(marker, 'click');
            }
        });

    }

    // Inform if map is loaded.
    function isReady() {
        return map != null;
    }

    function closeInfoWindow() {
        if (infowindow) {
            infowindow.close();
        }
    }

    return {
        initMap: initMap,
        addMarker: addMarker,
        closeInfoWindow: closeInfoWindow,
        setVisible: setVisible,
        selectMarkerByName: selectMarkerByName
    };
})();