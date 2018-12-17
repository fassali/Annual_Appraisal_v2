(function() {

	var app = angular.module('app');
	app.controller("TeamsList",
			function($scope,$rootScope,$http,EmployersDatasrv,$window,$interval,$state) {
				
				$scope.teamsList=[];
				$rootScope.user.menu=0;
              //get teams employers
			  EmployersDatasrv.getAllEmployersList()
			  .then(function (data) {
				$scope.allEmployers=data;
				$scope.teamsList.push($scope.allEmployers[0].team);
				for (var i = 1; i < $scope.allEmployers.length; i++) {
						if ($scope.teamsList.indexOf($scope.allEmployers[i].team) < 0) {
							$scope.teamsList.push($scope.allEmployers[i].team);
						}
				}
				
			});



                //get employers list by team
				$scope.employersList=function(team) {
					$rootScope.team=team;
					EmployersDatasrv.EmployersListByTeams(team)
					.then(function (data) {
						$rootScope.employersListByTeam=data;
						$state.go("app.employersListByTeam", {}, {

						});
						
						
					});
				   }


            })



        })();