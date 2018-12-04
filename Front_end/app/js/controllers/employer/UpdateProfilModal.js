(function() {

	var app = angular.module('app');
	app.controller("UpdateProfilModal",
			function($scope,items,$rootScope,$http,EmployersDatasrv,$modal, $log,$interval,$modalInstance) {
                $scope.items = items;
                $scope.selected = {
                  item: $scope.items[0]
                };

               
              

             //update employer
	 	      $scope.updateEmployer=function(){
                EmployersDatasrv.saveEmployer($rootScope.employerProfil,$rootScope.employerProfil.idEmp); 
                EmployersDatasrv.editEmployer($rootScope.employerProfil.idEmp)
                  .then(function (data) {
                    $rootScope.employerProfil= data;                   
                    $modalInstance.close($scope.selected.item); 
                       }, function (err) {
                           console.log(err);
                       })
                  
                }

            })

        })();