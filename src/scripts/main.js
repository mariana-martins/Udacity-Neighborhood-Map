
var callback = function (error, data) {
  if (error) {
      console.log("Credo!!!");
      return;
  }

  console.log(data);
};

zomatoApi.getRestaurants(callback);
