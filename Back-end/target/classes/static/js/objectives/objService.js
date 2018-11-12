
var app = angular.module("myApp");

app.service("objService",function ($http,$location) {
     var that=this;
    that.msgErr = "";
    that.msgSuccess = "";
// recuperer la liste des objectifs de l'année dernièr
    this.getLastObjs = function(yr, idEmp, currentPage, size){
       //alert("year: " + yr + " idEmp: " + idEmp + " page: " + currentPage + " size: " + size);
        var promise1    =   $http({
            method : "GET",
            url : "http://localhost:8080/Objectifs?year="+yr+"&idEmp="+idEmp+"&page="+currentPage+"&size="+size
        });

        var promise2 = promise1.then(function mySuccess(response) {
            return response.data;
        }, function myError(error) {
            console.log(error)
        });
        return promise2;
    };

    // recuperer la liste des objectifs de l'année dernièr
    this.getRatings = function(){
        var promise1    =   $http({
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

    // recuperer la liste des objectifs de l'année dernièr
    this.updateObjectives = function(listObj){
        return $http.put("http://localhost:8080/Objectives/",listObj)
            .then(function mySuccess(response) {
                //console.log("kkkkkkkkk " + response.data);
                return response.data;
            }, function myError(error) {
                console.log(error.data);
            });
    };

    /*this.startNewSess = function(){
        return $http.put("http://localhost:8080/StartNewSess")
            .then(function mySuccess(response) {
                return response.data;
            }, function myError(error) {
                console.log(error.data);
            });
    };*/

    this.startNewSess = function(){
        var promise1    =   $http({
            method : "POST",
            url : "http://localhost:8080/StartNewSess"
        });

        var promise2 = promise1.then(function mySuccess(response) {
            console.log(response.data);
            var year = response.data.label;
            that.msgSuccess  = "The session " + year + " is well started";
            return response.data;

        }, function (error) {
            that.msgErr  = error.data.message;
            console.log(error.data.message)
        });
        return promise2;
    };

})