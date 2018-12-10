(function() {

	var app = angular.module('app');
	app.controller("FirstPageController",
			function($scope,$rootScope, $http,EmployersDatasrv,AppEmployerDatasrv) {
		
		//get Employer manager
		EmployersDatasrv.getEmployerManager($rootScope.employerSelected.idEmp)
		.then(function(data){
			$scope.manager=data;
			
		});

        $scope.employer=$rootScope.employerSelected;
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
			
	$scope.bu="  "+$scope.employer.bu;
	$scope.team="  "+$scope.employer.team;
	$scope.session="  "+$rootScope.appEmp.annualSession.label
        
        
				
				
			
			
			
			
			
			
		 
		 
	})

})();
