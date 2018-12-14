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
                        ApObjDatasrv.appObjs($rootScope.appEmp.idApEmp,$rootScope.currentPage,$rootScope.size)
                            .then(function(dataF){
                                $rootScope.objs=dataF.content;
                                for(var j = 0; j < $rootScope.objs.length; j++){
                                    var dObj = new Date($rootScope.objs[j].deadLine);
                                    $rootScope.dayObj=dObj.getDate();
                                    $rootScope.monthObj=dObj.getMonth()+1;
                                    $rootScope.yearObj=dObj.getFullYear();
                                }
                                $rootScope.pages = new Array(dataF.totalPages);

                            });
                       
                    });
                }


                $scope.cancel = function () {

                    $modalInstance.dismiss('cancel');
                };

            })

        })();