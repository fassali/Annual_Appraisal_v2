(function() {

	var app = angular.module('app');
	app.controller("newSession",
			function($scope,items,$rootScope,$http,AnnualSessDatasrv,$modal, $log,$interval,items,$modalInstance,$state) {		        
                $scope.count=0;
                $scope.items = items;
                $scope.selected = {
                item: $scope.items[0]
                };
                $scope.session={};
                //start new session
            $scope.startNewSession = function() {
            var appDate = new Date();
            $scope.session.label=appDate.getFullYear();
            $scope.session.status="E",
            AnnualSessDatasrv.addNewSession($scope.session)
            .then(function (data) {
                $state.go("app.session", {}, {
                    reload : true
                    });
                $rootScope.addNewSession = true;               
                stop = $interval(function () {
                    $scope.count = $scope.count + 1;
                    if ($scope.count == 5)
                        $scope.stopmsg();
                }, 500);

            });
            $modalInstance.close($scope.selected.item);
        }
         //stope msg
         $scope.stopmsg = function() {
            if (angular.isDefined(stop)) {
              $interval.cancel(stop);
              stop = undefined;
              $rootScope.addNewSession = false;                 
              $scope.count=0;
            }
          };
            
            
            
            })

        })();