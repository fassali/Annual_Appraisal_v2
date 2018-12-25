(function() {

	var app = angular.module('app');
	app.controller("updateSession",
			function($scope,idSession,items,$rootScope,$http,AnnualSessDatasrv,$modal, $log,$interval,items,$modalInstance,$state) {		        
               $scope.id=idSession;
                $scope.count=0;
                $scope.items = items;
                $scope.selected = {
                item: $scope.items[0]
                };
         //close a session
            $scope.updateSessionOpnened=function(){
                AnnualSessDatasrv.getSession($scope.id)
                .then(function (data) {
                    $scope.session=data;
                    $scope.session.status="C";
                    AnnualSessDatasrv.updateSession($scope.session,$scope.id);
                    $state.go("app.session", {}, {
                        reload : true
                        }); 
                    $rootScope.closeSession = true;	
                    stop = $interval(function() {
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
                      $rootScope.closeSession = false;                  
                      $scope.count=0;
                    }
                  };



            })

        })();