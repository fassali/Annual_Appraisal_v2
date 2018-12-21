(function() {



	var app = angular.module('app');

	app.controller("TeamsList",

			function($scope,$rootScope,$http,EmployersDatasrv,$window,$interval,$state) {
				$scope.teamsList=[];
				$rootScope.user.menu=0;
				$scope.count=0;
				$rootScope.user.profil=="A"
				
				
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
				if($rootScope.emplyersListEmpty==true){
					stop = $interval(function() {
						$scope.count = $scope.count + 1;
						  if ($scope.count == 4)
							  $scope.stopmsg();
						  }, 400); 
				}
			});

             //stop msg function
             $scope.stopmsg = function() {
	              if (angular.isDefined(stop)) {
		              $interval.cancel(stop);
		              stop = undefined;
		              $rootScope.emplyersListEmpty = false;
		              $scope.count=0;
	                 }
                 };
            //get employers list by team
				$scope.employersList=function(team) {
					$rootScope.team=team;
						$state.go("app.employersListByTeam", {}, {
                     });

                 }





            })







        })();