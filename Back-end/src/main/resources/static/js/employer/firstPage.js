(function() {

	var app = angular.module('myApp');
	app.controller("FirstPageController",
			function($scope,$rootScope, $http,EmployersDatasrv,AppEmployerDatasrv) {

		
		
        console.log($rootScope.appEmp);
        $scope.employer=$rootScope.appEmp.data.employe;
		 
		var appDate = new Date();
		$scope.dayAnn=appDate.getDate();
		$scope.monthAnn=appDate.getMonth()+1;
		$scope.yearAnn=appDate.getFullYear();
		$scope.annDate=$scope.dayAnn+"/"+$scope.monthAnn+"/"+$scope.yearAnn;
	
        var appday=$scope.employer.dateEntry;
		 var d = new Date(appday);
			$scope.day=d.getDate();
			$scope.month=d.getMonth()+1;
			$scope.year=d.getFullYear();
			$scope.date=$scope.day+"/"+$scope.month+"/"+$scope.year;
			
		//find the manager	
			
			EmployersDatasrv.editEmployer($scope.employer.idManager)
			.then(function(data){
				$scope.manager=data.data;
				
			});
				
				
			
			
			
			
			
			
		 
		 
	})

})();
