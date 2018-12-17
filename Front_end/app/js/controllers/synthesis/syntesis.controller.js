(function() {

	var app = angular.module("app");
	app.controller("syntesisCtrl", syntesisCtrl);

	function syntesisCtrl($scope,  $http, $location,$rootScope,AppEmployerDatasrv) {
		$scope.strengths = null;
		$scope.toBeImproved = null;
        $rootScope.updateApempl = function(){
			console.log($rootScope.appEmp)
            AppEmployerDatasrv.updateApEmpl($rootScope.appEmp,$rootScope.appEmp.idApEmp).then(function(data){

            })
		}

        $scope.changed = function(){
            $rootScope.isChange = true;
        }
	}

})();