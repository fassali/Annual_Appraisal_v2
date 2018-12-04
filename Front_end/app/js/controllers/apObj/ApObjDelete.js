(function() {

	var app = angular.module('app');
	app.controller("DeleteApObjModal",
			function($scope,idApObj,$rootScope,$http,ApObjDatasrv,$modal, $log,$interval,items,$modalInstance) {  
                $scope.items = items;
                $scope.selected = {
                    item: $scope.items[0]
                };
                $scope.id=idApObj;
                $scope.deleteObj=function(){
                    ApObjDatasrv.deleteObj($scope.id)
                    .then(function(data){
                        $modalInstance.close($scope.selected.item);
                       
                    });
                }
            
            })

        })();