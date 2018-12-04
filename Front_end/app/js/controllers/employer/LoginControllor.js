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
					console.log($rootScope.user)
					 if($rootScope.user.profil=="M"){
						//document.location.href="http://localhost:8081/#!/app/employers";
                         $state.go("app.employersList", {}, {

                         });
					}else if($rootScope.user.profil=="E"){
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