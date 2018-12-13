(function() {

	var app = angular.module('app');
	app.controller("UpdateModal",
			function($scope,idEmp,items,$rootScope,$http,EmployersDatasrv,$modal, $log,$interval,items,$modalInstance) {		        
                $scope.id=idEmp;
                $scope.items = items;
                $scope.selected = {
                item: $scope.items[0]
                };
                

                EmployersDatasrv.TeamsList()
                .then(function (data) {
                    $scope.teams= data;
                })
                //get bu list
                EmployersDatasrv.BuList()
                .then(function (data) {
                    $scope.buList= data;
                })
                //get Managers List
                EmployersDatasrv.getManagersList()
                .then(function (data) {
                    $scope.managerList= data;
                    //get employer manager
                    for(var i=0;i<$scope.managerList.length;i++){
                        for(var j=0;j<$scope.managerList[i].managerTeam.length;j++){
                            if($scope.managerList[i].managerTeam[j].idEmp==$scope.employer.idEmp){
                                $scope.manager=$scope.managerList[i]
                                
                            }
                        }
                    }
                })
                //get employer selected
                EmployersDatasrv.editEmployer($scope.id)
                .then(function (data) {
                         $scope.employer= data.data;
                         
                     }, function (err) {
                         console.log(err);
                     })
          //update Function
          $scope.updateEmployer=function(){
            $scope.employer.manager=$rootScope.user;
            EmployersDatasrv.saveEmployer($scope.employer,$scope.id,$rootScope.user);                      
                $modalInstance.close($scope.selected.item);                          
             }

             $scope.updateEmployerManager=function(){
                 $scope.employerSelected=[];
                //affect an employer to manager
                $scope.employer.manager=$scope.manager;
                $scope.employerSelected.push($scope.employer);
                //affect employer to the manager
                EmployersDatasrv.chooseEmployers($scope.employerSelected,$scope.manager.idEmp); 
                //update emp info
                EmployersDatasrv.saveEmployer($scope.employer,$scope.id);   
                               
                    $modalInstance.close($scope.selected.item);                          
                 }

      
         







            })

        })();