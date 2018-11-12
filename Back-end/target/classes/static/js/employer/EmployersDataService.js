(function() {

	var app = angular.module('myApp');
	app.service("EmployersDatasrv", function($http) {
		
		//get un employeur par son login
		this.employerLogin=function(username){
	        var promise1=$http({
	            method: 'GET',
	            url: "http://localhost:8080/employerLogin/"+username
	            });
	        var promise2=promise1.then(function(response){
	        	return response.data;
	        },function(err){
	            console.log(err);

	        });
	     return promise2;
	    }
			
		
		//afficher des employeurs selon "idManager"
		this.getEmployers=function(idManager,pageCourante,size){
	        var promise1=$http({
	            method: 'GET',
	            url: "http://localhost:8080/employers?idManager="+idManager+ "&page=" + pageCourante + "&size=" + size
	            });
	        var promise2=promise1.then(function(response){
	        	return response.data;
	        },function(err){
	            console.log(err);

	        });
	     return promise2;
	    }
		
		//chercher un employeur
		this.findEmployers=function(idEmp,firstName,pageCourante,size){
	        var promise1=$http({
	            method: 'GET',
	            url: "http://localhost:8080/findEmployers?idManager="+idEmp+"&firstName="+firstName+"&page="+pageCourante+"&size="+size
	            });
	        var promise2=promise1.then(function(response){
	        	return response.data;
	        },function(err){
	            console.log(err);

	        });
	     return promise2;
	    }
		
		 //update un employeur
        this.saveEmployer=function(employer,idEmp){
       	 console.log(employer);
       	 return $http.put("http://localhost:8080/employer/"+idEmp,employer)
            .then(function(response){
            });
         }
		
		//Edit function
		this.editEmployer = function(idEmp) {
			return $http.get('http://localhost:8080/employer/' + idEmp);
		  };
			
			// ajouter un nv employeur
			this.addEmployer = function(userForm) {
				return $http.post("http://localhost:8080/employers/add", userForm)
						.then(function(response) {
							return response;
						}, function(err) {
							return err.data.message;
						});
			}

	})

})();