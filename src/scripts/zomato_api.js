var zomatoApi = (function () {
    // Zomato User Key
    var userKey = global.zomatoUserKey;

    // Zomato City Id related to Christchurch
    var christchurchId = 90;

    // Request to Zomato API
    function getRestaurants(callback) {
        $.ajax({
            url: "https://developers.zomato.com/api/v2.1/search?entity_id=" + christchurchId + "&entity_type=city",
            headers: {
                "user-key": userKey
            }
        }).done(function(data) {
            callback(null, data);
        }).fail(function (error) {
            callback(error);
        });
    }

    return {
        getRestaurants: getRestaurants
    };
})();