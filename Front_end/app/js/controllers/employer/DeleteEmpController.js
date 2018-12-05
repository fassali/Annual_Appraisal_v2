(function() {

	var app = angular.module('app');
	app.controller("DeleteModal",
			function($scope,idEmp,$rootScope,$http,EmployersDatasrv,$modal, $log,$interval,items,$modalInstance) {         
                //find employer deleted
		 				 $scope.removeFunction=function(){
                            $scope.items = items;
                            $scope.selected = {
                              item: $scope.items[0]
                            };
                            $scope.id=idEmp;
                            EmployersDatasrv.editEmployer($scope.id)
                               .then(function (data) {
                                        $scope.employerDeleted= data.data;
                                        $scope.employerDeleted.remove=0;
                                        EmployersDatasrv.saveEmployer( $scope.employerDeleted,$scope.id)
                                       
                                            $modalInstance.close($scope.selected.item);
                                    });
                        };

                    
                         







            })

        })();