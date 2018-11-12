var app = angular.module("myApp");

app.service("feedBackService",function ($http) {
    var that=this;
    that.msgErr = "";
    that.msgSuccess = "";
// recuperer la liste des objectifs de l'année dernièr
    this.getListFeedback = function(idApEmp, currentPage, size){
        //alert("year: " + yr + " idEmp: " + idEmp + " page: " + currentPage + " size: " + size);
        var promise1    =   $http({
            method : "GET",
            url : "http://localhost:8080/feedBackEmp?idApEmp="+idApEmp+"&page="+currentPage+"&size="+size
        });

        var promise2 = promise1.then(function mySuccess(response) {
            alert(22);
            console.log("AAAAAAAAAAAAAAA" + response.data);
            return response.data;
        }, function myError(error) {
            console.log(error)
        });
        return promise2;
    };


})