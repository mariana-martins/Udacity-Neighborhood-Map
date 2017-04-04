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

    this.currentRestaurant = ko.observable( this.restaurantList()[0] );

    this.currentFilter = ko.observable("");

    // Function to filter restaurants per name.
    this.filteredRestaurants = ko.computed(function () {
        googleMapsApi.cleanAllMarkers();
        var newList;
        if (!self.currentFilter()) {
            newList = self.restaurantList();
        } else {
            newList = ko.utils.arrayFilter(self.restaurantList(), function(restaurant) {
                return restaurant.name().toLowerCase().match(self.currentFilter().toLowerCase());
            });
        }

        // This function add data in markers and infoWindow.
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
        return newList;
    });

};

ko.applyBindings(new ViewModel());
