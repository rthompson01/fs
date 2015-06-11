"use strict";

// es5 polyfills, powered by es5-shim
require("es5-shim")
   // es6 polyfills, powered by babel
require("babel/register")
var backbone = require('backbone')
var Promise = require('es6-promise').Promise


var Geo = new Promise((res, rej) => {
   navigator.geolocation.getCurrentPosition((gpsData) => req({
       lat: gpsData.coords.latitude,
       lng: gpsData.coords.longitude
   })((error) => reg(error.message)))
})

var FourSquareModel = backbone.Model.extend({
   initiialize: function() {
       this.on('request', () => {
           console.log('requesting data')
       })
       this.on('sync', () => {
           console.log('request finished')
       })
       this.on('error', (...args) => {
           console.error(args)
       })
   },
})

var BrewSquareCollection = backbone.Collection.extend({
   model: FourSquareModel,
   id: "NLZAOKRUP1KFSRFHA1SQO3DH2214LAF0QV4UTEGMBHQG020Y",
   secret: "UUCRXDQ2R1YITE04WPG0CAS40UBYREIAZTX0D0JZ0A2TEUX5",
   query: 'breweries',
   url: function() {
       return `https://api.foursquare.com/v2/venues/search
     ?client_id=${this.id}
     &client_secret=${this.secret}
     &v=20130815
     &ll=40.7,-74
     &query=${this.query}`
   },
   parse: (data) => data.response.venues

})

var brewdogs = new BrewSquareCollection();
