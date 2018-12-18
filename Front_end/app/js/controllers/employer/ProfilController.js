(function() {

	var app = angular.module('app');
	app.controller("ProfilController",
			function($scope,$rootScope,$http,EmployersDatasrv,$window,$interval) {
		
	   $rootScope.employerProfil=$rootScope.user;
	   //la date de recrutement
		var date= $rootScope.employerProfil.dateEntry;
		 var d = new Date(date);
			$scope.day=d.getDate();
			$scope.month=d.getMonth()+1;
			$scope.year=d.getFullYear();
	        $scope.dateStart=$scope.day+"/"+$scope.month+"/"+$scope.year;	
		  
		//get user's informations	
		EmployersDatasrv.editEmployer($rootScope.employerProfil.idEmp)
		.then(function (data) {
			$rootScope.employerProfil= data.data;
			$rootScope.first= $rootScope.employerProfil.firstName;
			$rootScope.last= $rootScope.employerProfil.lastName;
 			}, function (err) {
 				console.log(err);
 			})
		
		 //get Managers List
		 EmployersDatasrv.getManagersList()
		 .then(function (data) {
			 $scope.managerList= data;
			 //get employer manager
			 for(var i=0;i<$scope.managerList.length;i++){
				 for(var j=0;j<$scope.managerList[i].managerTeam.length;j++){
					 if($scope.managerList[i].managerTeam[j].idEmp==$rootScope.employerProfil.idEmp){
						$rootScope.manager=$scope.managerList[i]
						$rootScope.managerName=$rootScope.manager.firstName+" "+$rootScope.manager.lastName;
						 
					 }
				 }
			 }
		 })

		
		
	})

})();