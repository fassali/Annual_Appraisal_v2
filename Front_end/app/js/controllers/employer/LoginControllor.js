(function() {

	var app = angular.module('app');
	app.controller("LoginController",
			function($scope,$rootScope,$http,EmployersDatasrv,$window,$interval,$state) {
		$rootScope.user=null;
		$rootScope.loginEmployer=function(){
			EmployersDatasrv.employerLogin($scope.username)
			.then(function(data) {
				
				if(data.idEmp== undefined){
					$scope.errorMessage="Authentication failed.Please try Again..."
				}else {
					$rootScope.user=data;
					 if($rootScope.user.manager=="Yes"){
						//document.location.href="http://localhost:8081/#!/app/employers";
                         $state.go("app.employersList", {}, {

                         });
					}else if($rootScope.user.manager=="No"){
						//document.location.href="http://localhost:8081/#!/app/myProfil";
                         $state.go("app.profile", {}, {

                         });
					}
				}
				
			}, function(err) {
				console.log(err.data);
			});
			
		}
		
		
		
		
		
	})

})();