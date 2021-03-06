// Restaurant Model Definition
var Restaurant = function (data) {
    this.name = data.name;
    this.url = data.url;
    this.address = data.location.address;
    this.lat = data.location.latitude;
    this.lon = data.location.longitude;
    this.rating = data.user_rating.aggregate_rating;
};

var ViewModel = function () {
    self = this;
    this.restaurantList = ko.observableArray([]);

    this.loadData = function () {
        // This function load data to Restaurant List.
        var zomatoApiCallback = function (error, data) {
            if (error) {
                alert('Error: Can\'t access Zomato API');
                return;
            }

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
    };

    this.setRestaurant = function (restaurant) {
        googleMapsApi.selectMarkerByName(restaurant.name);
    };

    this.currentFilter = ko.observable('');

    // Function to filter restaurants per name.
    this.filteredRestaurants = ko.computed(function () {
        var newList;
        // Get filtered restaurants
        if (!self.currentFilter()) {
            newList = self.restaurantList();
        } else {
            newList = ko.utils.arrayFilter(self.restaurantList(), function(restaurant) {
                return restaurant.name.toLowerCase().match(self.currentFilter().toLowerCase());
            });
        }

        var names = newList.map(function (restaurant) {
            return restaurant.name;
        });

        googleMapsApi.closeInfoWindow();
        googleMapsApi.setVisible(names);

        // Return filtered restaurants
        return newList;
    });

};

var viewModel = new ViewModel();
ko.applyBindings(viewModel);

function init() {
    googleMapsApi.initMap();
    viewModel.loadData();
}

function mapGoogleMapsApiError() {
    alert('Error: Can\'t access Google Maps API');
}
