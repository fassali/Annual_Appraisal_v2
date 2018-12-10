(function() {

	var app = angular.module('app');
	app.controller("ApObjController", function($scope, $rootScope, $http,
			ApObjDatasrv, EmployersDatasrv,AppEmployerDatasrv, $window, $compile, $interval) {
		$scope.count = 0;
		$scope.objs=[];
		$scope.page = [];
		$scope.pageCourante = 0;
		$scope.size = 4;
		$scope.add=0;
		
		
		
	    //en tete
		$scope.name=$rootScope.employerSelected.firstName+" "+$rootScope.employerSelected.lastName;
		var d=new Date($rootScope.employerSelected.dateEntry);
		   $scope.day=d.getDate();
		   $scope.month=d.getMonth()+1;
		   $scope.year=d.getFullYear();
		   $scope.date=$scope.day+"/"+$scope.month+"/"+$scope.year;
		  $scope.nameManager=$rootScope.user.firstName+" "+$rootScope.user.lastName;
		
		   
	
		   ApObjDatasrv.appObjs($rootScope.appEmp.idApEmp,$scope.pageCourante,$scope.size)	
			.then(function(data){
				 $scope.objs=data.content;
				 for(var j = 0; j < $scope.objs.length; j++){
					 var dObj = new Date($scope.objs[j].deadLine);
						$scope.dayObj=dObj.getDate();
						$scope.monthObj=dObj.getMonth()+1;
						$scope.yearObj=dObj.getFullYear();
				 }
		         $scope.pages = new Array(data.totalPages);
	           
	        });
		
	
		
		
		$scope.addNewObj=function(){
			ApObjDatasrv.addNewObj($rootScope.employerSelected.idEmp,$rootScope.appEmp.idApEmp,$scope.obj);
			$scope.obj=null;
			
		}


		
		$scope.addObj=function(){
			$scope.add=1;
		}
		

		
		
		

	})

})();