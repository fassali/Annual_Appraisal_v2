(function() {

	var app = angular.module('app');
	app.controller("TeamsList",
			function($scope,$rootScope,$http,EmployersDatasrv,$window,$interval,$state) {
				
				EmployersDatasrv.TeamsList()
				.then(function (data) {
					$rootScope.teamsList=data;
				});
                //get employers list by team
				$scope.employersList=function(idTeam) {
					EmployersDatasrv.EmployersListByTeams(idTeam)
					.then(function (data) {
						$rootScope.employersListByTeam=data;
						$state.go("app.employersListByTeam", {}, {

						});
					});
				   }


            })



        })();