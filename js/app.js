(function (angular, $, _) {
    // Set up the main application module
    var app = angular.module('CampaingtapApp', ['ngRoute']);

    // Base URL for resources (e.g. partials)
    var resourceUrl = CRM.resourceUrls['com.robinmitra.personals.Campaingtap'];

    // Set up routes
    app.config(['$routeProvider', '$httpProvider',
        function ($routeProvider, $httpProvider) {
            $routeProvider.when('/Campaingtap', {
                templateUrl: resourceUrl + '/partials/listing.html',
                controller: 'PersonalsListingCtrl'
            });

            $routeProvider.when('/Campaingtap/new', {
                templateUrl: resourceUrl + '/partials/edit.html',
                controller: 'PersonalsEditCtrl'
            });

            $routeProvider.when('/Campaingtap/:id/edit', {
                templateUrl: resourceUrl + '/partials/edit.html',
                controller: 'PersonalsEditCtrl'
            });

            // This is needed (Utils/Rest.php::ajax()) for CiviCRM to treat the request as genuine
            $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
        }
    ]);

    /**
     * Controller to create a listing of personals
     *
     * @ngdoc controller
     * @name PersonalsListingCtrl
     */
    app.controller('PersonalsListingCtrl', ['$scope', '$http', '$log', 'CiviApiFactory',
        /**
         * @param $scope
         * @param $http
         * @param $log
         * @param {CiviApiFactory} CiviApi
         */
        function ($scope, $http, $log, CiviApi) {
            CiviApi.get('CampaingtapPersonal')
                .success(function (response) {
                    // Save the array of personals retrieved on the $scope in order to make it accessible in the view
                    $scope.personals = response.values;
                })
                .error(function (response) {
                    // Log the response in case of error - using the $log service is preferable to using console.log()
                    $log.debug(response);
                    CRM.alert('Oops! Something went wrong!', '', 'error');
                });

           /**
             * Delete a personal
             *
             * @name deletePersonal
             * @param index
             */
            $scope.deletePersonal = function (index) {
                var data = $scope.personals[index];

                CiviApi.remove('CampaingtapPersonal', data)
                    .success(function (response) {
                        $scope.personals.splice(index, 1); // remove the personal from the listing view
                        CRM.alert('Personal deleted', '', 'success');
                    })
                    .error(function (response) {
                        CRM.alert('Failed to delete personal', '', 'error');
                    });
            };
        }
    ]);

    /**
     * Controller for editing a personal
     *
     * @ngdoc controller
     * @name PersonalsEditCtrl
     */
    app.controller('PersonalsEditCtrl', ['$scope', '$http', '$log', '$location', '$routeParams', 'CiviApiFactory',
        /**
         * @param $scope
         * @param $http
         * @param $log
         * @param $location
         * @param $routeParams
         * @param {CiviApiFactory} CiviApi
         */
        function ($scope, $http, $log, $location, $routeParams, CiviApi) {
            // If personal ID exists in the URL, try to retrieve it in order to populate the edit view
            if ($routeParams.id) {
                CiviApi.get('CampaingtapPersonal', {id: $routeParams.id})
                    .success(function (response) {
                        $scope.personal = response.values[0];
                    })
                    .error(function (response) {
                        CRM.alert('No personal exists with the provided ID!', '', 'error');
                        $location.path('/Campaingtap'); // redirect to the listing
                    });
            }

            /**
             * Add a new personal or update an existing one
             *
             * @name addPersonal
             */
            $scope.addPersonal = function () {
                var data = $scope.personal;

                CiviApi.create('CampaingtapPersonal', data)
                    .success(function (response) {
                        CRM.alert('Personal saved', '', 'success');
                        $location.path('/Campaingtap'); // redirect to the listing
                    });
            };
        }
    ]);

    /**
     * A factory to provide helper methods for interacting with the CiviCRM API
     *
     * @ngdoc service
     * @name CiviApiFactory
     */
    app.factory('CiviApiFactory', ['$http',
        /**
         * @param $http
         */
        function ($http) {
            /**
             * Retrieve record(s)
             *
             * @ngdoc method
             * @name CiviApiFactory#get
             */
            var get = function (entity, data) {
                return post(entity, data, 'get');
            };

            /**
             * Create a record
             *
             * @ngdoc method
             * @name CiviApiFactory#create
             */
            var create = function (entity, data) {
                return post(entity, data, 'create');
            };

            /**
             * Remove (delete) a record
             *
             * @ngdoc method
             * @name CiviApiFactory#remove
             */
            var remove = function (entity, data) {
                return post(entity, data, 'delete');
            };

            /**
             * Send the POST HTTP request to the CiviCRM API
             *
             * @ngdoc function
             * @name CiviApiFactory#post
             * @private
             */
            var post = function (entity, data, action) {
                // If data is not provided, initialise it to an empty object
                data = data || {};

                data.entity = entity;
                data.action = action;
                data.json = 1;
                data.sequential = 1;

                var serialisedData = $.param(data);

                var headers = {'Content-type': 'application/x-www-form-urlencoded'};

                // Send an AJAX request to retrieve all personals
                return $http.post('/civicrm/ajax/rest', serialisedData, {headers: headers});
            };

            return {
                get: get,
                create: create,
                remove: remove
            };
        }
    ]);
})(angular, CRM.$, CRM._);