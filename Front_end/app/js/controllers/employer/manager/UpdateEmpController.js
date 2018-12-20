(function() {

	var app = angular.module('app');
	app.controller("UpdateEmpManagerProfil",
			function($scope,idEmp,items,$rootScope,$http,EmployersDatasrv,$modal, $log,$interval,items,$modalInstance,$state) {		        
                $scope.id=idEmp;
                $scope.count=0;
                $scope.items = items;
                $scope.selected = {
                item: $scope.items[0]
                };
                 //get team list
                EmployersDatasrv.TeamsList()
                .then(function (data) {
                    $scope.teams= data;
                })
                //get bu list
                EmployersDatasrv.BuList()
                .then(function (data) {
                    $scope.buList= data;
                })
            //get employer selected
             EmployersDatasrv.editEmployer($scope.id)
             .then(function (data) {
               $scope.employer= data.data;
               $scope.employerName=$scope.employer.firstName+" "+$scope.employer.lastName;
               //get Managers List
               EmployersDatasrv.getManagersList()
               .then(function (data) {
                   $scope.managerList= data;
                   //get employer manager
                   for(var i=0;i<$scope.managerList.length;i++){                       
                       for(var j=0;j<$scope.managerList[i].managerTeam.length;j++){
                          if($scope.managerList[i].managerTeam[j].idEmp==$scope.employer.idEmp){
                              $rootScope.manager=$scope.managerList[i]
                              $scope.managerName=$scope.manager.firstName+" "+$scope.manager.lastName;  
                          }
                       }
                   }
               })
           
            }, function (err) {
                    console.log(err);
              })

       //update Function

          $scope.updateEmployer=function(){
            $scope.employer.manager=$rootScope.user;
            EmployersDatasrv.saveEmployer($scope.employer,$scope.id,$rootScope.user);                      
           //reload page
           $state.go("app.gestionEmployer", {}, {
            reload : true
            }); 
            $rootScope.UpdateEmpManagerProfil = true;	
            stop = $interval(function() {
              $scope.count = $scope.count + 1;
              if ($scope.count == 5)
                $scope.stopmsg();
            }, 500);
           $modalInstance.close($scope.selected.item);                          

         }

            //change employer information
             $scope.updateEmployerManager=function(){
                 $scope.employerSelected=[];              
                //affect an employer to manager
                $scope.employer.manager=$scope.manager;
                $scope.employerSelected.push($scope.employer);
                //affect employer to the manager
                EmployersDatasrv.chooseEmployers($scope.employerSelected,$scope.manager.idEmp); 
                //update emp info
                EmployersDatasrv.saveEmployer($scope.employer,$scope.id); 
                //reload page
                $state.go("app.gestionEmployer", {}, {
                    reload : true
                }); 
                
                $rootScope.UpdateEmpManager = true;	
                stop = $interval(function() {
                  $scope.count = $scope.count + 1;
                  if ($scope.count == 5)
                    $scope.stopmsg();
                }, 500);
                   $modalInstance.close($scope.selected.item);                 
                 }

             //update employer (by team) function
             $scope.updateEmployerByTeam=function(){
                $scope.employerSelected=[];              
               //affect an employer to manager
               $scope.employer.manager=$scope.manager;
               $scope.employerSelected.push($scope.employer);
               //affect employer to the manager
               EmployersDatasrv.chooseEmployers($scope.employerSelected,$scope.manager.idEmp); 
               //update emp info
               EmployersDatasrv.saveEmployer($scope.employer,$scope.id); 
               //reload page
               $state.go("app.employersListByTeam", {}, {
                   reload : true
               }); 
               
               $rootScope.UpdateEmpManagerProfil = true;	
               stop = $interval(function() {
                 $scope.count = $scope.count + 1;
                 if ($scope.count == 5)
                   $scope.stopmsg();
               }, 500);
                  $modalInstance.close($scope.selected.item);                 
                }
                //stope msg
                 $scope.stopmsg = function() {
                    if (angular.isDefined(stop)) {
                      $interval.cancel(stop);
                      stop = undefined;
                      $rootScope.UpdateEmpManager = false;
                      $rootScope.UpdateEmpManagerProfil = false;
                      $scope.count=0;
                    }
                  };




            })

        })();