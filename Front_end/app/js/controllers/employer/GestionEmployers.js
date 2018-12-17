(function() {

	var app = angular.module('app');
	app.controller("EmployersListController",
			function($scope,$rootScope,$http,EmployersDatasrv,$modal, $log,AppEmployerDatasrv,$interval) {
		
		$scope.mode=0;
		$scope.employers=[];
		$scope.count=0;
		$rootScope.appEmp={};
        $rootScope.user.menu=4;

		$scope.employers=$rootScope.user.managerTeam;
            
			 for(var j = 0; j < $scope.employers.length; j++){
				var appday=$scope.employers[j].dateEntry;
				var d = new Date(appday);
				   $scope.day=d.getDate();
				   $scope.month=d.getMonth()+1;
				   $scope.year=d.getFullYear();
			}
	        
           
        
				//find all session
				$scope.allSession=function(){
					EmployersDatasrv.allSession()
					.then(function (data) {
						console.log(data);
					});

				}				
			 	 	  
			 	 	      
			  
	
		 
	})

})();
