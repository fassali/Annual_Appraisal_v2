(function() {

	var app = angular.module('app');
	app.service("ApObjDatasrv", function($http) {
		
		
		// ajouter un nv obj
		this.addNewObj = function(objs,id) {
			return $http.post("http://localhost:8080/objectives/add/"+id,objs)
					.then(function(response) {
						return response;
					}, function(err) {
						return err.data.message;
					});
		}
		
		
		
		
		
		
		
		
	})

})();