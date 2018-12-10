(function() {

	var app = angular.module('app');
	app.controller("EmployersListController",
			function($scope,$rootScope,$http,EmployersDatasrv,$modal, $log,AppEmployerDatasrv,$interval) {
		$scope.page = [];
		$scope.pageCourante = 0;
		$scope.size = 6;
		$scope.mode=0;
		$scope.employers=[];
		$scope.count=0;
		$rootScope.appEmp={};

		$scope.employers=$rootScope.user.managerTeam;
		$rootScope.user.profil="M";
			 for(var j = 0; j < $scope.employers.length; j++){
				var appday=$scope.employers[j].dateEntry;
				var d = new Date(appday);
				   $scope.day=d.getDate();
				   $scope.month=d.getMonth()+1;
				   $scope.year=d.getFullYear();
			}
					  
			app.se
			 	 	      
			  
	
		 
	})

})();
