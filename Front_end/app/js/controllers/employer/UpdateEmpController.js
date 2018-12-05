(function() {

	var app = angular.module('app');
	app.controller("UpdateModal",
			function($scope,idEmp,items,$rootScope,$http,EmployersDatasrv,$modal, $log,$interval,items,$modalInstance) {		        
                $scope.id=idEmp;
                $scope.items = items;
                $scope.selected = {
                item: $scope.items[0]
                };
                //get employer selected
                EmployersDatasrv.editEmployer($scope.id)
                .then(function (data) {
                         $scope.employer= data.data;
                         
                     }, function (err) {
                         console.log(err);
                     })
          //update Function
          $scope.updateEmployer=function(){
            $scope.employer.manager=$rootScope.user;
            EmployersDatasrv.saveEmployer($scope.employer,$scope.id,$rootScope.user);
                        
                $modalInstance.close($scope.selected.item);
                
              
             }

      
         







            })

        })();