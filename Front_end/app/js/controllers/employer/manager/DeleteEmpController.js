(function() {

	var app = angular.module('app');
	app.controller("DeleteModalManagerTeam",
			function($scope,idEmp,$rootScope,$http,EmployersDatasrv,$modal,$state,$log,$interval,items,$modalInstance) {         
        $scope.items = items;
        $scope.count=0;
        $scope.selected = {
          item: $scope.items[0]
        };
        $scope.id=idEmp;
            //delete function for manager employers list
		 				 $scope.removeFunction=function(){ 
                //find employer by id                        
                  EmployersDatasrv.editEmployer($scope.id)
                    .then(function (data) {
                        $scope.employerDeleted= data.data;
                        $scope.employerDeleted.remove=0;
                        EmployersDatasrv.saveEmployer( $scope.employerDeleted,$scope.id)  
                        $state.go("app.gestionEmployer", {}, {
                            reload : true
                          });  
                        $rootScope.DeleteEmpManagerProfil = true;	
                          stop = $interval(function() {
                          $scope.count = $scope.count + 1;
                            if ($scope.count == 5)
                                $scope.stopmsg();
                            }, 500);                                   
                            $modalInstance.close($scope.selected.item);
                       });
                   };

      //delete function for employers by team List
		 				 $scope.remove_EmployersByTeam=function(){ 
                //find employer by id                        
                  EmployersDatasrv.editEmployer($scope.id)
                    .then(function (data) {
                        $scope.employerDeleted= data.data;
                        $scope.employerDeleted.remove=0;
                        EmployersDatasrv.saveEmployer( $scope.employerDeleted,$scope.id)  
                         $state.go("app.employersListByTeam", {}, {
                            reload : true
                           });  
                        $rootScope.DeleteEmpManagerProfil = true;	
                          stop = $interval(function() {
                          $scope.count = $scope.count + 1;
                            if ($scope.count == 5)
                                $scope.stopmsg();
                            }, 500);                                   
                            $modalInstance.close($scope.selected.item);
                       });
                   };


                //stop msg function
                $scope.stopmsg = function() {
                   if (angular.isDefined(stop)) {
                       $interval.cancel(stop);
                       stop = undefined;
                        $rootScope.DeleteEmpManagerProfil = false;
                         $scope.count=0;
                     }
                  };
                         







            })

        })();