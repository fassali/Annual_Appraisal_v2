app.service('hardSkillService', function($http) {
	var that = this;
	that.baseUrl = "/competencies";

	that.getAll = function() {
		return $http.get(that.baseUrl + "/");
	};
	
	that.getByAppraisal = function(id) {
		return $http.get(that.baseUrl + "/appraisal/" + id);
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
	
	that.getRatings = function() {
		return $http.get("/Ratings");
	};
});

