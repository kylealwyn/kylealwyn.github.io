---
title: How to watch Factory values in Angular.js
description: How to watch Angular factories and fervices when they are updated
slug: how-to-watch-factory-values-angular
date: 2015-11-12
---

## When to use
Recently, I've been doing a lot of http polling in my factories and services
and I've needed to reflect the new data that comes back in the call in my different templates and controllers (Yes, I've been asking that we move to sockets).  I've found two ways of achieving this:



## Method #1: $broadcast

On Line #4, we will broadcast this data out from our factory and we can then listen for this event in our controller

``` javascript
// factory.js
$rootScope.$broadcast('data-received', data);

// controller.js
$scope.$on('data-received', function (event, data) {
  // data is the object being broadcasted
});
```

Now, the data we get back in our http call will be broadcasted throughout our system
every 7.5 seconds. Cool!

## Method #2: $watch

##### The common mistake $watching a factory object

``` javascript
$scope.$watch('Factory.value'}, function (newVal) {
  // Here is your updated factory
});
```

This piece of code won't work properly because the Factory does not reside within
the current controller's scope, therefore denying access to the factory variable.

##### The Fix
``` javascript
$scope.$watch(function () {
  return Factory.value
}, function (newVal) {
  // Here is your updated factory
});
```

## Full Implementation

``` javascript
var app = angular.module('app', []);

app.factory('Factory', function ($rootScope, $interval) {
  return {
    poll: poll,
    data: {}
  }

  function poll() {
    $interval(function () {
      var self = this; // Get the reference to public object
      pingServer().success(function (data) {
        self.data = data; // Setting this will trigger our watch function
        $rootScope.$broadcast('data-received', data); // Calling this will send our data throughout our app
      });
    }, 7500);
  }

});

app.controller('Controller', function ($scope, Factory) {

  Factory.poll(); // Start polling our server

  $scope.$watch(function() {
    return Factory.data;
  }, function (newVal) {
    // We have our new data from our factory
  });

  $scope.$on('data-received', function (event, data) {
    // We have our new data from our factory
  });
});

```

Either of these two ways will work, it's just a matter of semantics. Hope this helps!
