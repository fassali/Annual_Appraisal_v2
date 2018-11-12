(function() {

	var app = angular.module('myApp');
	app.controller("ProfilController",
			function($scope,$rootScope,$http,EmployersDatasrv,$window,$interval) {
		
		$scope.employer=$rootScope.user;
		var date=$scope.employer.dateEntry;
		 var d = new Date(date);
			$scope.day=d.getDate();
			$scope.month=d.getMonth()+1;
			$scope.year=d.getFullYear();
	        $scope.dateStart=$scope.day+"/"+$scope.month+"/"+$scope.year;	
		    $scope.first=$scope.employer.firstName;
		    $scope.last=$scope.employer.lastName;
		EmployersDatasrv.editEmployer($scope.employer.idEmp)
		.then(function (data) {
 				$scope.employer= data.data;
 			}, function (err) {
 				console.log(err);
 			})
		
			//update employer
	 	      $scope.updateEmployer=function(id){
				    EmployersDatasrv.saveEmployer($scope.employer,id)
	 	 	    	.then(function(){
	 	 	  		EmployersDatasrv.editEmployer($scope.employer.idEmp)
	 	 			.then(function (data) {
	 	 	 				$scope.employer= data.data;
	 	 	 			 $scope.first=$scope.employer.firstName;
	 	 			    $scope.last=$scope.employer.lastName;
	 	 	 				
	 	 	 			}, function (err) {
	 	 	 				console.log(err);
	 	 	 			})
	 	 	    	});
	 	 	      }
		
		
	})

})();