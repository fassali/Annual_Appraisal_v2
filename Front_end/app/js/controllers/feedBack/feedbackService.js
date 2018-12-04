var app = angular.module("app");
app.service('feedbackService', function($http) {
	var that = this;
	that.baseUrl = "http://localhost:8080/feedback";

	that.getAll = function() {
		return $http.get(that.baseUrl + "/");
	};

	that.get = function(id) {
		return $http.get(that.baseUrl + "/" + id);
	};

	that.update = function(id, model) {
		return $http.put(that.baseUrl + "/" + id, model);
	};

	that.remove = function(id) {
		return $http.delete(that.baseUrl + "/" + id);
	};

	that.save = function(model) {
		return $http.post(that.baseUrl + "/save", model);
	};
    this.getListFeedback = function(idApEmp, currentPage, size){
        //alert("year: " + yr + " idEmp: " + idEmp + " page: " + currentPage + " size: " + size);
        var promise1    =   $http({
            method : "GET",
            url : "http://localhost:8080/feedBackEmp?idApEmp="+idApEmp+"&page="+currentPage+"&size="+size
        });


        return promise1;
    };
    // recuperer la liste des objectifs de l'année dernièr
    this.saveApFeedbacks = function(listFdb, idApEmp){
        return $http.put("http://localhost:8080/saveApFeedbacks/"+idApEmp,listFdb)
            .then(function mySuccess(response) {
                //console.log("kkkkkkkkkkkkkk " + response.data);
                return response.data;
            }, function myError(error) {
                console.log(error.data);
            });
    };
});