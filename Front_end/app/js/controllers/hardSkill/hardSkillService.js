var app = angular.module("app");

app.service("hardSkillService", function($http, $location) {


    this.getAll = function() {
        return $http.get("http://localhost:8080/competencies/");
    };

    this.getByAppraisal = function(id) {
        return $http.get("http://localhost:8080/competencies/appraisal/" + id);
    };

    this.get = function(id) {
        return $http.get("http://localhost:8080/competencies/" + id);
    };

    this.update = function(id, model) {
        return $http.put("http://localhost:8080/competencies/" + id, model);
    };

    this.remove = function(id) {
        return $http.delete("http://localhost:8080/competencies/" + id);
    };

    this.save = function(app_id, model) {
        return $http.post("http://localhost:8080/competencies/save/" + app_id, model);
    };

    this.getRatings = function() {
        return $http.get("http://localhost:8080/Ratings");
    };

    this.getAppraisal = function(id) {
        return $http.get("http://localhost:8080/competencies/appraisal/" + id);
    };

})