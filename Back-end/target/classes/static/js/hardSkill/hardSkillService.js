var app = angular.module("myApp");

app.service("hardSkillService", function($http, $location) {

	// appraisal competencies
	this.getCompetencies = function(idApEmp) {
		console.log(idApEmp);
		var promise1 = $http({
			method : "GET",
			url : "http://localhost:8080/competencies?idApEmp=" + idApEmp
		});

		var promise2 = promise1.then(function mySuccess(response) {
			return response.data;
		}, function myError(error) {
			console.log(error)
		});
		return promise2;
	};

	// ratings
	this.getRatings = function() {
		var promise1 = $http({
			method : "GET",
			url : "http://localhost:8080/Ratings"
		});

		var promise2 = promise1.then(function mySuccess(response) {
			return response.data;
			console.log(response.data);

		}, function myError(error) {
			console.log(error)
		});
		return promise2;
	};
	
	// add competencies
	this.addCompetencie = function(competency) {
		console.log(competency);
		return $http.post("http://localhost:8080/competencies/save",competency)
        .then(function mySuccess(response) {
        	return response.data;
        }, function myError(response) {
        	console.log(error.data);
        });
	};

	// update competencies
	this.updateCompetencies = function(competencies) {
		console.log(competencies);
		return $http.put("http://localhost:8080/competencies/", competencies)
				.then(function mySuccess(response) {
					return response.data;
				}, function myError(error) {
					console.log(error.data);
				});

	};

})