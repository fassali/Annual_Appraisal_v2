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
            for(var j = 0; j <$rootScope.employersSelected.length; j++){
              $rootScope.employersSelected[j].idManager=$rootScope.user.idEmp;
              EmployersDatasrv.saveEmployer($rootScope.employersSelected[j],$rootScope.employersSelected[j].idEmp);
                                      
                $modalInstance.close($scope.selected.item); 
                
              
            }
           
             
             }




            })

        })();