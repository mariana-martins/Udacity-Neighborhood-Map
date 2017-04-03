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

    // Load data to Restaurant List
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
                parseFloat(restaurantItem.restaurant.location.longitude)
            );
        });

    };

    // Call Zomato Api to get Restaurant List
    zomatoApi.getRestaurants(zomatoApiCallback);

    this.currentRestaurant = ko.observable( this.restaurantList()[0] );

    this.setRestaurant = function(clickedRestaurant) {
        self.currentRestaurant(clickedRestaurant);
        console.log("Hi");
    };

};

ko.applyBindings(new ViewModel());

// TODO: EXIBIR OS MARCADORES COM BASE NA LISTA
// TODO: EXIBIR O INFOWINDOW
// TODO: COLOCAR ANIMACAO DOS MARCADORES
// TODO: MUDAR A COR DO MAPA

// TODO: FILTRAR LISTA COM BASE NO INPUT
// TODO: ATUALIZAR MAPA COM BASE NA LISTA