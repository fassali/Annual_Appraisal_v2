(function() {

	var app = angular.module('app');
	app.controller("EmployerListAdmin",
			function($scope,$rootScope,$http,EmployersDatasrv,$modal, $log,$interval,$state) {
				$rootScope.user.profil="A";
			   $scope.employers=$rootScope.employersListByTeam;
			   if($scope.employers!=0){
				   $scope.mode=0;
				for(var j = 0; j < $scope.employers.length; j++){
				 var appday=$scope.employers[j].dateEntry;
				 var d = new Date(appday);
					$scope.day=d.getDate();
					$scope.month=d.getMonth()+1;
					$scope.year=d.getFullYear();
			 }
			}
            
			//back function
			$scope.back=function(){
				$state.go("app.teamsList", {}, {

				});
			}
			   


           
            })

        })();