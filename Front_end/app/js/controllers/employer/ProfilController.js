(function() {

	var app = angular.module('app');
	app.controller("ProfilController",
			function($scope,$rootScope,$http,EmployersDatasrv,$window,$interval) {
		
	   $rootScope.employerProfil=$rootScope.user;
		var date= $rootScope.employerProfil.dateEntry;
		 var d = new Date(date);
			$scope.day=d.getDate();
			$scope.month=d.getMonth()+1;
			$scope.year=d.getFullYear();
	        $scope.dateStart=$scope.day+"/"+$scope.month+"/"+$scope.year;	
		  
			
		EmployersDatasrv.editEmployer( $rootScope.employerProfil.idEmp)
		.then(function (data) {
			$rootScope.employerProfil= data.data;
			$scope.first= $rootScope.employerProfil.firstName;
			$scope.last= $rootScope.employerProfil.lastName;
 			}, function (err) {
 				console.log(err);
 			})
		

		
		
	})

})();