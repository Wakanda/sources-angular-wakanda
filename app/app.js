var app = angular.module('test-app', ['wakanda', 'ui.router']);

app.run(function ($wakanda) {
  //To avoid making a user login form on the example, we are logging in here
  $wakanda.$login('bar', 'bar');
})

app.config(function ($stateProvider, $urlRouterProvider) {

  //Setting the default route
  $urlRouterProvider.otherwise('/home');

  $stateProvider
    .state('home', {
      url: '/home',
      controller: 'homeController',
      templateUrl: 'home.html',
      resolve: {
        ds: function ($wakandaManager) {
          //WakandaManager will call $wakanda.init() for us and return its result
          return $wakandaManager.getDataStore();
        }
      }
    })
    .state('profile', {
      url: '/profile',
      controller: 'profileController',
      templateUrl: 'profile.html',
      resolve: {
        user: function ($wakandaManager) {
          //Here, the route won't resolve is the user is not logged
          return $wakandaManager.currentUser();
        },
        ds: function ($wakandaManager) {
          //WakandaManager will call $wakanda.init() for us and return its result
          return $wakandaManager.getDataStore();
        }
      }
    })
    .state('upload', {
      url: '/upload',
      controller: 'uploadController',
      templateUrl: 'upload.html',
      resolve: {
         ds: function ($wakandaManager) {
          //WakandaManager will call $wakanda.init() for us and return its result
          return $wakandaManager.getDataStore();
        }
      }
    })
    .state('update', {
      url: '/update',
      controller: 'updateController',
      templateUrl: 'update.html',
      resolve: {
         ds: function ($wakandaManager) {
          //WakandaManager will call $wakanda.init() for us and return its result
          return $wakandaManager.getDataStore();
        }
      }
    });
});

app.controller('homeController', function ($scope, ds) {

  //ds is ready to use
  ds.Company.$query({
    pageSize: 5,
    orderBy: 'name',
    select: 'staff'
  }).$promise.then(function (e) {
    $scope.companies = e.result;
  });
});

app.controller('profileController', function ($scope, user, ds) {

  //Arriving on the controller, we are sure that user is logged
  $scope.userInfo = user;
  console.log(user);

  ds.Company.$find(2356).$promise.then(function (e) {
    var em = e.result;
    console.log(em);

    console.log(em.$toJSON());
  })

  ds.Company.$query({pageSize: 1}).$promise.then(function (e) {
    var em = e.result[0];
    console.log(em);

    console.log(em.$toJSON());
  })
});

app.controller('uploadController', function($scope, ds) {
  ds.Employee.$query().$promise.then(function(e) {
    employee = $scope.employee = e.result[0];
  });

  $scope.upload = function() {
    var file = document.getElementById('fileInput').files[0];
    $scope.employee.photo.$upload(file).$promise.then(function (e) {
      //Photo is uploaded and accessible on the entity
      var photoUri = $scope.employee.photo.uri;
      console.log('> photouri ', photoUri);
    });
  };
});

app.controller('updateController', function($scope, ds) {
  _ds = ds;
  ds.Employee.$query().$promise.then(function (e) {
    employee = $scope.employee = e.result[0];
  });

  $scope.save = function() {
    $scope.employee.$save();
  };
});
