(function() {

	var app = angular.module('myApp');
	app.controller("EmployersListController",
			function($scope,$rootScope,$http,EmployersDatasrv,$interval) {
		$scope.page = [];
		$scope.pageCourante = 0;
		$scope.size = 6;
		$scope.mode=0;
		$scope.employers=[];
		$scope.count=0;
		
		
		EmployersDatasrv.getEmployers($rootScope.user.idEmp,$scope.pageCourante,$scope.size)	
		.then(function(data){
			 $scope.employers=data.content;
			 console.log($scope.employers);
			 for(var j = 0; j < $scope.employers.length; j++){
			 var appday=$scope.employers[j].dateEntry;
			 var d = new Date(appday);
				$scope.day=d.getDate();
				$scope.month=d.getMonth()+1;
				$scope.year=d.getFullYear();
				console.log($scope.day+"/"+$scope.month);
		 }
	         $scope.pages = new Array(data.totalPages);
           
        });
		   //changer les pages
	       $scope.gotopage = function (p) {
	    	$scope.pageCourante = p;
	        $scope.init(); 	   
	       }      
	       //changer les pages for search function
	       $scope.gotopageS = function (p) {
	    	$scope.pageCourante = p;
	    	$scope.chercherEmployers(); 	   
	       } 
	       
			 //fonction utilisée changer les pages
			 $scope.init=function(){
				 EmployersDatasrv.getEmployers($rootScope.user.idEmp,$scope.pageCourante,$scope.size)	
				 .then(function(data){
			            $scope.employers=data.content;
			            $scope.pages = new Array(data.totalPages);
			        });
			 }
			 
			 //chercher un employeur par son nom
		 		$scope.chercherEmployers = function () {
		 			EmployersDatasrv.findEmployers($rootScope.user.idEmp,$scope.findEmployer,$scope.pageCourante,$scope.size)	
					.then(function(data){
						 $scope.mode=1;
						 $scope.employers=data.content;
				         $scope.pages = new Array(data.totalPages);
			       });
		 		};
		 		//retourner à la liste apres la recherche
			       $scope.back=function(){
			    	   restart();
			    	   $scope.mode=0;
			    	   $scope.findEmployer=null;
			    	   
			       }
			       
	               //function restart
		 			  var restart=function(){
		 				 $scope.employers=[];
		 				EmployersDatasrv.getEmployers($rootScope.user.idEmp,$scope.pageCourante,$scope.size)	
		 				.then(function(data){
		 					 $scope.employers=data.content;
		 					 console.log($scope.employers);
		 					 for(var j = 0; j < $scope.employers.length; j++){
		 					 var appday=$scope.employers[j].dateEntry;
		 					 var d = new Date(appday);
		 						$scope.day=d.getDate();
		 						$scope.month=d.getMonth()+1;
		 						$scope.year=d.getFullYear();
		 						console.log($scope.day+"/"+$scope.month);
		 				 }
		 			         $scope.pages = new Array(data.totalPages);
		 		        });
		 		 	    }; 
		 		 	    
		 				 //find employer deleted
		 				 $scope.removeFunction=function(id){
		 					 EmployersDatasrv.editEmployer(id)
		 						.then(function (data) {
		 				 				$scope.employerDeleted= data.data;
		 				 			}, function (err) {
		 				 				console.log(err);
		 				 			});
		 				 };
		 			       //supprimer un employeur
		 			     $scope.removeEmployer= function (id) {
		 			    	 console.log(id);
		 			    	 EmployersDatasrv.editEmployer(id)
		 						.then(function (data) {
		 				 				$scope.employer= data.data;
		 				 				$scope.employer.remove=0;
 		 				 				EmployersDatasrv.saveEmployer($scope.employer,id)
		 				 				.then(function(){
		 				 					$scope.deleteMessage = "The new employer is added successfully!";
		 				 					stop = $interval(function() {
		 				 						$scope.count = $scope.count + 1;
		 				 						if ($scope.count == 5)
		 				 							$scope.stopmsg();
		 				 					}, 500);
		 				 					
		 				 					restart();
		 			 	 	 	    	});
		 				 			}, function (err) {
		 				 				console.log(err);
		 				 			})
		 				 				
		 			    }
		 			     
		 			    $scope.stopmsg = function() {
		 					if (angular.isDefined(stop)) {
		 						$interval.cancel(stop);
		 						stop = undefined;
		 						$scope.deleteMessage = null;
		 						$scope.updateMessage=null;
		 						$scope.count=0;
		 					}
		 				};
		 			     
		 			     
		 			     
		 				$scope.edit = function(id) {
							EmployersDatasrv.editEmployer(id)
							.then(function (data) {
					 				$scope.employer= data.data;
					 			}, function (err) {
					 				console.log(err);
					 			})
					     };
		 			     
		 				//update employer
			 	 	      $scope.updateEmployer=function(id){
			 					console.log($scope.employer);
			 				    EmployersDatasrv.saveEmployer($scope.employer,id)
			 	 	 	    	.then(function(){
			 	 	 	    		$scope.updateMessage = "The employer is updated successfully!";
 				 					stop = $interval(function() {
 				 						$scope.count = $scope.count + 1;
 				 						if ($scope.count == 5)
 				 							$scope.stopmsg();
 				 					}, 500);
			 	 	 	    		restart();
			 	 	 	    	});
			 	 	 	       }
			  
	
		 
	})

})();
