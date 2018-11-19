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
                                        .then(function(){
                                            $modalInstance.close($scope.selected.item);
                                            $rootScope.deleteMessage = "The new employer is added successfully!";
                                            stop = $interval(function() {
                                                $scope.count = $scope.count + 1;
                                                if ($scope.count == 5)
                                                    $scope.stopmsg();
                                            }, 500);
                                            console.log($scope.deleteMessage);
                                          });

                                    }, function (err) {
                                        console.log(err);
                                    });
                        };

                        $scope.stopmsg = function() {
                            if (angular.isDefined(stop)) {
                                $interval.cancel(stop);
                                stop = undefined;
                                $scope.deleteMessage = null;
                                $scope.updateMessage=null;
                                $scope.count=0;
                            }
                        };
                         







            })

        })();