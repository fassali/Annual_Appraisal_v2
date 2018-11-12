(function() {

	var app = angular.module('myApp');
	app.service("AppEmployerDatasrv", function($http) {
var data={};

			//get la session en cour
			this.findSession=function(){
		        var promise1=$http({
		            method: 'GET',
		            url: "http://localhost:8080/session"
		            });
		        var promise2=promise1.then(function(response){
		        	return response.data;
		        },function(err){
		            console.log(err);

		        });
		     return promise2;
		    }
			
		  // ajouter un nv obj
			this.addApEmp = function(appEmp) {
				return $http.post("http://localhost:8080/apEmploye/add", appEmp)
						.then(function(response) {
							return response;
						}, function(err) {
							return err.data.message;
						});
			}	
			
			 //update un employeur
	        this.updateAppEmployer=function(appEmployer,idApEmp){
	       	 console.log(appEmployer);
	       	 return $http.put("http://localhost:8080/apEmployer/"+idApEmp,appEmployer)
	            .then(function(response){
	            	return response;
	            }, function(err) {
					return err.data.message;
				});
	            
	         }
			
			
			
			
			
			
	})

})();