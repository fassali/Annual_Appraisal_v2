(function() {

	var app = angular.module('app');
	app.service("ApObjDatasrv", function($http) {
		
		
		// ajouter un nv obj
		this.addNewObj = function(idEmp,idApEmp,objs) {
			return $http.post("http://localhost:8080/appEm/"+idApEmp+"/objectives/",objs);

		}
		
		//get tt les objs d'un oemp pour une session
		this.appObjs=function(idApEmp,pageCourante,size){
	        var promise1=$http({
	            method: 'GET',
	            url: "http://localhost:8080/apObjs/"+idApEmp+"?page="+ pageCourante+ "&size=" + size
	            });
	        var promise2=promise1.then(function(response){
	        	return response.data;
	        },function(err){
	            console.log(err);

	        });
	     return promise2;
	    }
		//get obj by id
		
		this.findObj = function(idApObjEmp) {
			return $http.get('http://localhost:8080/obj/' + idApObjEmp);
		  };
		
		
		//service for delete an obj
		this.deleteObj=function(idApObjEmp){
			 return $http.delete("http://localhost:8080/obj/"+idApObjEmp);
			
		}
		
		 //update an obj
        this.updateObj=function(objective,idEmp,idApEmp,idApObjEmp){
       	 return $http.put("http://localhost:8080/objective/"+idEmp+"/"+idApEmp+"/"+idApObjEmp,objective)
            .then(function(response){
            });
         }
		
		
		
	})

})();