(function() {

	var app = angular.module('app');
	app.controller("UpdateApObjModal",
			function($scope,idApObj,$rootScope,$http,ApObjDatasrv,$modal, $log,$interval,items,$modalInstance) {  
                $scope.items = items;
                $scope.selected = {
                    item: $scope.items[0]
                };
                $scope.id=idApObj;
                //get objective by id
                ApObjDatasrv.findObj($scope.id) 
				.then(function(data){
				      $scope.objective=data.data;
				      
		        });
        //update objective
	      $scope.updateObj=function(){
            ApObjDatasrv.updateObj($scope.objective,$rootScope.employerSelected.idEmp,
                $rootScope.appEmp.idApEmp,$scope.id)
               .then(function(){
                $modalInstance.close($scope.selected.item);
               });
              }
            
            })

        })();