(function() {

	var app = angular.module('app');
	app.controller("EmployerListAdmin",
			function($scope,$rootScope,$http,EmployersDatasrv,$modal, $log,$interval) {
         
               $scope.employers=$rootScope.employersListByTeam;
               $scope.team=$scope.employers[0].team;
               $rootScope.user.profil="A";
               for(var j = 0; j < $scope.employers.length; j++){
				var appday=$scope.employers[j].dateEntry;
				var d = new Date(appday);
				   $scope.day=d.getDate();
				   $scope.month=d.getMonth()+1;
				   $scope.year=d.getFullYear();
			}
            
           
            })

        })();