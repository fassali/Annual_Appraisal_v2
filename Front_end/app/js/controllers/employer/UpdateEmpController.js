(function() {

	var app = angular.module('app');
	app.controller("UpdateModal",
			function($scope,idEmp,items,$rootScope,$http,EmployersDatasrv,$modal, $log,$interval,items,$modalInstance) {
                $scope.page = [];
		        $scope.pageCourante = 0;
		        $scope.size = 6;
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
            EmployersDatasrv.saveEmployer($scope.employer,$scope.id)
              .then(function(){               
                $rootScope.updateMessage = "The employer is updated successfully!";
                 stop = $interval(function() {
                     $scope.count = $scope.count + 1;
                     if ($scope.count == 5)
                         $scope.stopmsg();
                 }, 500);
              });
             }

      //function restart
         







            })

        })();