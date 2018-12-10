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
						$rootScope.user.mode=1;
                         $state.go("app.employersList", {}, {

                         });
					}else if($rootScope.user.profil=="E"){
						$rootScope.user.mode=2;
                         $state.go("app.myEvaluation", {}, {

                         });
					}
				}
				
			}, function(err) {
				console.log(err.data);
			});
			
		}
		
		
		
		
		
	})

})();