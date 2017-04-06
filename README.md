Neighborhood Map
================

This website loads a list of restaurants from Christchurch, NZ, on
a map. It uses Zomato API to get the restaurant list and Google Maps
API to vizualize the map and its markers.

It also support filtering on the restaurants by its names.

## How to configure

It requires to have gulp and bower globally installed.

* Download or clone the project.

* Open your terminal;

* Then go to the project folder through the terminal.

* Run `npm install`.

* Run `bower install`.

* Create a file called _.env_.

* Edit _.env_ to add the API keys.
    * ZOMATO_USER_KEY = \<Zomato User Key\>
    * GOOGLEMAPS_KEY = \<Google Maps Key\>
    * PS: You need to get these keys on their websites.


## How to run

* Open your terminal;

* Then go to the project folder through the terminal.

* And run `gulp`.

* Done, Neighborhood Map will load! :smile:


## How to create its optimized version

* Open your terminal;

* Then go to the project folder through the terminal.

* And run `gulp dist`.

* The folder dist contains this project minified ready to use.