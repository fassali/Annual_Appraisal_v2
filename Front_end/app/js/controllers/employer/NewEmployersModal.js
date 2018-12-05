(function() {

	var app = angular.module('app');
	app.controller("NewEmployersModal",
			function($scope,$rootScope,$http,EmployersDatasrv,$modal, $log,$interval,items,$modalInstance) {
           
               
                $scope.items = items;
                $scope.selected = {
                item: $scope.items[0]
                };
         $scope.employers=$rootScope.employersSelected;
     



          //update Function
          $scope.addEmployers=function(){
          EmployersDatasrv.chooseEmployers($rootScope.employersSelected,$rootScope.user.idEmp);                                 
          $modalInstance.close($scope.selected.item); 
             }




            })

        })();