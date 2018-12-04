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
		
		
		$scope.session=$rootScope.appEmp.annualSession;
		if($scope.session.status=="Cloturée"){
			$scope.session.mode=1;
		}else if($scope.session.status=="EnCours"){
			$scope.session.mode=0;
		}
	    //en tete
		$scope.name=$rootScope.employerSelected.firstName+" "+$rootScope.employerSelected.lastName;
		var d=new Date($rootScope.employerSelected.dateEntry);
		   $scope.day=d.getDate();
		   $scope.month=d.getMonth()+1;
		   $scope.year=d.getFullYear();
		   $scope.date=$scope.day+"/"+$scope.month+"/"+$scope.year;
		   
		   EmployersDatasrv.editEmployer($rootScope.employerSelected.idManager)
		   .then(function(data){
			   $scope.manager=data.data;
			   $scope.nameManager=$scope.manager.firstName+" "+$scope.manager.lastName;
             });
		
		   
	
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
		
		   
		//changer les pages
	       $scope.gotopage = function (p) {
	    	$scope.pageCourante = p;
	        $scope.init(); 	   
	       }  
		
	  	 $scope.init=function(){
	  		ApObjDatasrv.appObjs($rootScope.appEmp.idApEmp,$scope.pageCourante,$scope.size)	
			.then(function(data){
				 $scope.objs=data.content;
		         $scope.pages = new Array(data.totalPages);
	           
	        });
		 }
		
		
		$scope.addNewObj=function(){
			ApObjDatasrv.addNewObj($rootScope.employerSelected.idEmp,$rootScope.appEmp.idApEmp,$scope.obj)
			.then(function(data) {
				$scope.ajoutMessage = "The new objective  is added successfully!";
				stop = $interval(function() {
					$scope.count = $scope.count + 1;
					if ($scope.count == 5)
						$scope.stopmsg();
				}, 500);
				$scope.init();
			}, function(err) {
				console.log(err.data);
			});
			
			$scope.obj=null;
			
		}
		   $scope.stopmsg = function() {
				if (angular.isDefined(stop)) {
					$interval.cancel(stop);
					stop = undefined;
					$scope.ajoutMessage = null;
					$scope.deleteMessage=null;
					$scope.updateMessage=null;
					$scope.count=0;
				}
			};
		
		$scope.reset=function(){
			ApObjDatasrv.appObjs($rootScope.appEmp.idApEmp)	
			.then(function(data){
			       
			    	   $scope.objs=data;
			       
	        });
		}
		
		$scope.supprimer=function(idApEmpObj){
			ApObjDatasrv.deleteObj(idApEmpObj)
			.then(function(data){
				$scope.deleteMessage= "The objective has been deleted successfully!";
				stop = $interval(function() {
					$scope.count = $scope.count + 1;
					if ($scope.count == 5)
						$scope.stopmsg();
				}, 500);
				$scope.init();
	        });
		}
		
		//get obj by id
		$scope.findObj=function(idApObjEmp){
			ApObjDatasrv.findObj(idApObjEmp) 
			.then(function(data){
			      $scope.objDeleted=data.data;
			      
	        });
		}
		
		$scope.addObj=function(){
			$scope.add=1;
		}
		
		//update employer
	      $scope.updateObj=function(idApObjEmp){
	    	  ApObjDatasrv.updateObj($scope.obj,$rootScope.employerSelected.idEmp,$rootScope.appEmp.idApEmp,idApObjEmp)
	 	    	.then(function(){
	 	    		$scope.updateMessage = "The obj has been updated successfully!";
					stop = $interval(function() {
						$scope.count = $scope.count + 1;
						if ($scope.count == 5)
							$scope.stopmsg();
					}, 500);
					$scope.init();
	 	    	});
	 	       }
	      $scope.edit = function(idApObjEmp) {
	    	  ApObjDatasrv.findObj(idApObjEmp) 
				.then(function(data){
				      $scope.obj=data.data;
				      
		        });
		     };

})();