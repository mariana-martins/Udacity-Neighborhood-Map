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

    // TODO: CAPTURAR O EVENTO DE CLICK NA LISTA
    // TODO: FILTRAR ELEMENTOS DA LISTA

    this.restaurantList = ko.observableArray([]);

    // Load data to Restaurant List
    var zomatoApiCallback = function (error, data) {
        if (error) {
            alert("Error: Can't access Zomato API");
            return;
        }
        data.restaurants.forEach(function (restaurantItem) {
            self.restaurantList.push( new Restaurant(restaurantItem.restaurant));
        });
    };

    // Call Zomato Api to get Restaurant List
    zomatoApi.getRestaurants(zomatoApiCallback);

};

ko.applyBindings(new ViewModel());