var googleMapsApi = (function () {
    var map = null;
    var markerList = [];

    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
            // Christchurch location
            center: {lat: -43.532054, lng: 172.636225},
            zoom: 13
        });
    }

    function addMarker(lat, lng) {
        if (!isReady()) {
            return false;
        }
        var marker = new google.maps.Marker({
            position: {lat:lat, lng:lng},
            map: map
        });
        markerList.push(marker);
        return true;
    }

    function isReady() {
        return map != null;
    }

    return {
        initMap: initMap,
        addMarker: addMarker,
        isReady: isReady
    };
})();