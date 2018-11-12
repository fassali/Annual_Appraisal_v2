(function() {

	var app = angular.module('myApp');
	app.controller("EmployerController",
			function($scope,$rootScope,$http,EmployersDatasrv,$window,$interval) {
		   $scope.roles={};
           $scope.employers=[];
           $scope.count=0;
           $scope.manager=null;
		
		
		  //methode pour ajouter un nv employeur
		$scope.addEmployer = function() {
			//employer name
			var f=$scope.firstName.substr(0,1).toUpperCase()+$scope.firstName.substr(1,$scope.firstName.length).toLowerCase()
			var s=$scope.lastName.substr(0,1).toUpperCase()+$scope.lastName.substr(1,$scope.lastName.length).toLowerCase()
            $scope.employer.firstName=f;
			$scope.employer.lastName=s;
			
			
			//construire le nom d'utilisateur
			var firstChars = $scope.employer.firstName.split('');
			var fisrtChar=firstChars[0];
			var second=$scope.employer.lastName;
			var minLastName=$scope.employer.lastName.toLowerCase();
			$scope.username=fisrtChar+minLastName;
			//ajouter username a l'employeur
			$scope.employer.username=$scope.username;
			//ajouter les roles à un employeur
			if($scope.roles.manager==true){
				$scope.employer.manager="Yes";
			}else{
				$scope.employer.manager="No";
			}
			if($scope.roles.admin==true){
				$scope.employer.admin="Yes";
			}else{
				$scope.employer.admin="No";
			}
			
			//ajouter le manager
			$scope.employer.idManager=$rootScope.user.idEmp;
			//ajouter "remove" variable : 1 par defaut;
			$scope.employer.remove=1;
			console.log($scope.employer);
			//enregister le nv employeur 
			EmployersDatasrv.addEmployer($scope.employer).then(function(data) {
				$scope.ajoutMessage = "The new employer is added successfully!";
				stop = $interval(function() {
					$scope.count = $scope.count + 1;
					if ($scope.count == 5)
						$scope.stopmsg();
				}, 500);
				$scope.reset();
			}, function(err) {
				console.log(err.data);
			});
		};
		
	 	$scope.stopmsg = function() {
			if (angular.isDefined(stop)) {
				$interval.cancel(stop);
				stop = undefined;
				$scope.ajoutMessage = null;
				$scope.count=0;
			}
		};
	       //methode reset
	       $scope.reset = function() {
	    	   $scope.employer= null;
	    	   $scope.firstName=null;
	    	   $scope.lastName=null;
	    	   $scope.roles.manager=false;
	    	   $scope.roles.admin=false;
			};
		
	})

})();