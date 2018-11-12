(function() {

	var app = angular.module('myApp');
	app.service("ApObjDatasrv", function($http) {
		
		
		// ajouter un nv obj
		this.addNewObj = function(objs) {
			return $http.post("http://localhost:8080/objectives/add",objs)
					.then(function(response) {
						return response;
					}, function(err) {
						return err.data.message;
					});
		}
		
		
		
		
		
		
		
		
	})

})();