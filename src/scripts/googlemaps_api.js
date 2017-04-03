var googleMapsApi = (function () {
    var map;

    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
            // Christchurch location
            center: {lat: -43.532054, lng: 172.636225},
            zoom: 13
        });
    }

    return {
        initMap: initMap
    };
})();