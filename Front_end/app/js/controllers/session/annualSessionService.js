(function() {

	var app = angular.module('app');
	app.service("AnnualSessDatasrv", function($http) {
 
        	
		//get sessions list
		this.sessionsList=function(){
	        var promise1=$http({
	            method: 'GET',
	            url: "http://localhost:8080/sessions"
	            });
	        var promise2=promise1.then(function(response){
	        	return response.data;
	        },function(err){
	            console.log(err);
	        });
	     return promise2;
		}
		//update session status
		this.updateSession=function(session,idSession){  	
       	 return $http.put("http://localhost:8080/session/"+idSession,session)
            .then(function(response){				               
            }), function (err) {			
                    console.log(err);
                };
         }
		//find session by id
		this.getSession=function(idSession){
	        var promise1=$http({
	            method: 'GET',
	            url: "http://localhost:8080/getSession/"+idSession
	            });
	        var promise2=promise1.then(function(response){
	        	return response.data;
	        },function(err){
	            console.log(err);
	        });
	     return promise2;
		}

		//start new session
			
			this.addNewSession = function(session) {
				return $http.post("http://localhost:8080/newSession",session)
						.then(function(response) {
							return response;
						}, function(err) {
							return err.data.message;
						});
			}





    })

})();