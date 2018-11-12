(function () {


var app = angular.module("myApp");

app.service("skilsDataService",function ($http,$location) {
	var localhost = "http://localhost:8080/";
	
	// list skils
    this.gestAllSkils = function(){

        var promise1    =   $http({
            method : "GET",
            url : "http://localhost:8080/skils"
        });


        var promise2 = promise1.then(function mySuccess(response) {

            return response.data;

        }, function myError(response) {
        	return response;
        });

        return promise2;
        };
        // recuperer la liste des clients
        this.getsoftSkill = function(currentPage,size){

        var promise1    =   $http({
            method : "GET",
            url : "http://localhost:8080/skill?page="+currentPage+"&size="+size
        });

        var promise2 = promise1.then(function mySuccess(response) {

            return response.data;

        }, function myError(response) {
        	return response;
        });

        return promise2;
        };
        // recuperer un skils
        this.getSkils = function (id) {
            var promise1    =   $http({
                method : "GET",
                url: "http://localhost:8080/skils/"+id
            });

            
            var promise2 = promise1.then(function mySuccess(response) {

                return response.data;

            }, function myError(response) {
            	return response;
            });
          
            return promise2;
        };
        // update skils
        this.updateSkils = function(skils){


        	return  $http.put("http://localhost:8080/skils/"+skils.idSoftSkill,skils);
//            .then(function mySuccess(response) {
//            	
//            	return response.data;
//            }, function myError(response) {
//            	return response;
//            });
        };
        // update skils
        this.updSkils = function(skils){


        	return  $http.put("http://localhost:8080/skils/"+skils.idSoftSkill+"/update",skils);
//            .then(function mySuccess(response) {
//            	
//            	return response.data;
//            }, function myError(response) {
//               
//            	return response;
//            });
        };
        //
        // update level
        this.updLevel = function(skils,idLevel){


        	return  $http.put("http://localhost:8080/skils/level/"+idLevel,skils);
//            .then(function mySuccess(response) {
//            	
//            	return response.data;
//            }, function myError(response) {
//               
//            	return response;
//            });
        };
        // ajouter un level
        this.newLevel = function(skils){


        	return $http.post("http://localhost:8080/skilsLevel/save",skils);
//                .then(function mySuccess(response) {
//                	return response.data;
//                }, function myError(response) {
//                   //console.log(response.data);
//                	return response.data;
//                });
        };
        // ajouter un skils
        this.newSkils = function(skils){


        	return $http.post("http://localhost:8080/skils/save",skils);
//                .then(function mySuccess(response) {
//                	return response.data;
//                }, function myError(response) {
//                   
//                	return response;
//                });
        };
        // recuperer un meanig
        this.getMeaning = function (id,idm) {
            var promise1    =   $http({
                method : "GET",
                url: "http://localhost:8080/skils/"+id+"/meaning/"+idm
            });

            
            var promise2 = promise1.then(function mySuccess(response) {

                return response.data;

            }, function myError(response) {
            	return response;
            });
          
            return promise2;
        };
        // remove level
        this.removeLevel = function(skils){


        	return  $http.put("http://localhost:8080/skils/"+skils.idSoftSkill+"/remove",skils);
//            .then(function mySuccess(response) {
//            	
//            	return response.data;
//            }, function myError(response) {
//               
//            	return response;
//            });
        };
        // ajouter ap soft skils
        this.newApSoftSkill = function(apskil){


        	return $http.post("http://localhost:8080/apskils/save",apskil);
//                .then(function mySuccess(response) {
//                	return response.data;
//                }, function myError(response) {
//                   
//                	return response;
//                });
        };
        //
        
})
})();