(function() {

	var app = angular.module('app');
	app.controller("EmployersListController",
			function($scope,$rootScope,$http,EmployersDatasrv,$modal, $log,AppEmployerDatasrv,$interval) {
		$scope.page = [];
		$scope.pageCourante = 0;
		$scope.size = 6;
		$scope.mode=0;
		$rootScope.employers=[];
		$scope.count=0;
		$rootScope.appEmp={};
		$rootScope.user.menu=1;

		EmployersDatasrv.getManagersTeamList($rootScope.user.idEmp)
		.then(function (data) {
			$rootScope.employers=data;
			for(var j = 0; j < $rootScope.employers.length; j++){
			  var appday=$rootScope.employers[j].dateEntry;
			  var d = new Date(appday);
			  $rootScope.day=d.getDate();
			  $rootScope.month=d.getMonth()+1;
			  $rootScope.year=d.getFullYear();
		    }
			}, function (err) {
			 console.log(err);
			})


		
			
					  
			
	 
	})

})();
