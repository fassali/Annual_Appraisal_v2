(function() {

	var app = angular.module('app');
	app.service("AppEmployerDatasrv", function($http) {
	  //get annual appraisal by employer id
		this.employerApEmp=function(id){
	        var promise1=$http({
	            method: 'GET',
	            url: "http://localhost:8080/annualAppraisal/"+id
	            });
	        var promise2=promise1.then(function(response){
	        	return response.data;
	        },function(err){
	            console.log(err);

	        });
	     return promise2;
	    }
		
	//get apEmp by id
				this.getAppEmployer=function(id){
					var promise1=$http({
						method: 'GET',
						url: "http://localhost:8080/apEmp//"+id
						});
					var promise2=promise1.then(function(response){
						return response.data;
					},function(err){
						console.log(err);
	
					});
				 return promise2;
				}
		



			
			
	})

})();