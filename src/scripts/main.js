// Restaurant Model Definition
var Restaurant = function (data) {
    this.name = ko.observable(data.name);
    this.url = ko.observable(data.url);
    this.address = ko.observable(data.location.address);
    this.lat = ko.observable(data.location.latitude);
    this.lon = ko.observable(data.location.longitude);
    this.rating = ko.observable(data.user_rating.aggregate_rating);
};

var ViewModel = function () {
    self = this;
    this.restaurantList = ko.observableArray([]);

    // This function load data to Restaurant List.
    var zomatoApiCallback = function (error, data) {
        if (error) {
            alert("Error: Can't access Zomato API");
            return;
        }

        // Wait until maps is ready.
        while (!googleMapsApi.isReady()) { }

        data.restaurants.forEach(function (restaurantItem) {
            self.restaurantList.push( new Restaurant(restaurantItem.restaurant));
            googleMapsApi.addMarker(
                parseFloat(restaurantItem.restaurant.location.latitude),
                parseFloat(restaurantItem.restaurant.location.longitude),
                restaurantItem.restaurant.name,
                restaurantItem.restaurant.location.address,
                restaurantItem.restaurant.url,
                restaurantItem.restaurant.user_rating.aggregate_rating
            );
        });

    };

    // This function call Zomato Api to get Restaurant List.
    zomatoApi.getRestaurants(zomatoApiCallback);

    this.currentFilter = ko.observable("");

    // Function to filter restaurants per name.
    this.filteredRestaurants = ko.computed(function () {
        // Clean all markers
        googleMapsApi.cleanAllMarkers();
        var newList;
        // Get filtered restaurants
        if (!self.currentFilter()) {
            newList = self.restaurantList();
        } else {
            newList = ko.utils.arrayFilter(self.restaurantList(), function(restaurant) {
                return restaurant.name().toLowerCase().match(self.currentFilter().toLowerCase());
            });
        }

        // Add new restaurants as markers.
        newList.forEach(function (item) {
            googleMapsApi.addMarker(
                parseFloat(item.lat()),
                parseFloat(item.lon()),
                item.name(),
                item.address(),
                item.url(),
                item.rating()
            );
        });

        // Return filtered restaurants
        return newList;
    });

};

ko.applyBindings(new ViewModel());
