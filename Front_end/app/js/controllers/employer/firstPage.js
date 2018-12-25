(function() {

	var app = angular.module('app');
	app.controller("FirstPageController",
			function($scope,$rootScope, $http,EmployersDatasrv,AppEmployerDatasrv) {	
				$scope.session=$rootScope.appEmp.annualSession;
				$scope.utilisateur=$rootScope.user;
				
	 
				if(($scope.session.status=="E")&&($scope.utilisateur.profil=="M" || $scope.utilisateur.profil=="AM" )){
					$rootScope.appEmp.mode=0; 
					if($rootScope.employerSelected.apEmployes.length!=0){
						for(var j= 0; j < $rootScope.employerSelected.apEmployes.length; j++){
							if($rootScope.employerSelected.apEmployes[j].annualSession.status=="E" 
							&& ($rootScope.employerSelected.apEmployes[j].status=="E" || $rootScope.employerSelected.apEmployes[j].status=="VE")){
								
								$rootScope.appEmp.show=0;
							}else if($rootScope.employerSelected.apEmployes[j].status=="VM" || $rootScope.employerSelected.apEmployes[j].status=="C"){
								
								$rootScope.appEmp.show=3;
							}
						}

					}
				}else if(($scope.session.status=="E")&&($scope.utilisateur.profil=="E")){
					$rootScope.appEmp.mode=2;
					if($scope.utilisateur.apEmployes.length!=0){
						for(var i= 0; i < $scope.utilisateur.apEmployes.length; i++){
							if($scope.utilisateur.apEmployes[i].annualSession.status=="E" 
							&& $scope.utilisateur.apEmployes[i].status=="E"){
								$rootScope.appEmp.show=1;
								
							}else if($scope.utilisateur.apEmployes[i].annualSession.status=="E" 
							&& $scope.utilisateur.apEmployes[i].status=="VE"){
								$rootScope.appEmp.show=2;
							}
						}
					}
					
					 
				}       
				else {
				$rootScope.appEmp.mode=1;
				}
			 
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
