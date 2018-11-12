(function() {

	var app = angular.module('myApp');
	app
			.controller(
					"ApObjController",
					function($scope, $rootScope, $http, ApObjDatasrv, $window,
							$compile, $interval) {
						$scope.count=0;
						$scope.objs = [ {
							labelObj : null,
							indicator : null,
							mean : null,
							deadLine : null
						} ];


						// methode pour ajouter un nv obj
						$scope.addObjects = function() {
							console.log($scope.objs);
							 ApObjDatasrv.addNewObj($scope.objs).then(
									function(data) {
										$scope.ajoutMessage = "The new objs are added successfully!";
										stop = $interval(function() {
											$scope.count = $scope.count + 1;
											if ($scope.count == 5)
												$scope.stopmsg();
										}, 500);
										location.reload(); 
										
										
										console.log(data);
									}, function(err) {
										console.log(err.data);
									});
							 
							 
							 
							 
						};
						
					 	$scope.stopmsg = function() {
							if (angular.isDefined(stop)) {
								$interval.cancel(stop);
								stop = undefined;
								$scope.ajoutMessage = null;
								$scope.count=0;
							}
						};
						
						
						
						
						
						var i = 1;

						$scope.addRow = function(elmt, value) {
							$scope.objs.push({
								labelObj : null,
								indicator : null,
								mean : null,
								deadLine : null
							});
							var tableRef = document.getElementById('table')
									.getElementsByTagName('tbody')[0];
							var tr = document.createElement("tr");
							tr.innerHTML = "<td><input type=\"text\" class=\"form-control\"\n"
									+ "                    ng-model=\"objs["
									+ i
									+ "].labelObj\"></td>\n"
									+ "                <td><input type=\"text\" class=\"form-control\"\n"
									+ "                    ng-model=\"objs["
									+ i
									+ "].indicator\"></td>\n"
									+ "                <td><input type=\"text\" class=\"form-control\" ng-model=\"objs["
									+ i
									+ "].mean\"></td>\n"
									+ "                <td><input type=\"date\" class=\"form-control\"\n"
									+ "                    ng-model=\"objs["
									+ i
									+ "].deadLine\"></td>\n"
									+ "                <td></td>";
							tableRef.appendChild(tr);
							$compile(tableRef)($scope);
							i++;

						}

					})

})();