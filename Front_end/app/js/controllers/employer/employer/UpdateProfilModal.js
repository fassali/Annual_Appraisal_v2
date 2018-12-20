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
              $rootScope.first=$rootScope.employerProfil.firstName;
              $rootScope.last= $rootScope.employerProfil.lastName;
              $modalInstance.close($scope.selected.item); 
                  
                    
              }
           


 })
                
                
                
 })();
                

               

              



       


