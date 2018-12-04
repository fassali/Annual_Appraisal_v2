(function() {

	var app = angular.module('app');
	app.controller("ApEmpModal",
			function($scope,idEmp,$rootScope,$http,EmployersDatasrv,$modal, $log,$interval,items,$modalInstance) {         
                $scope.id=idEmp;
                $scope.sessions=[];
                $scope.years=[];
                var session={};       
                $scope.items = items;
                $scope.selected = {
                item: $scope.items[0]
                };
                
                EmployersDatasrv.allSession($scope.id)
                .then(function (data) {  
                    $scope.mode=null; 
                    $scope.years = data         
                      $scope.years.forEach(function(item) {                     
                        if(item.status=="EnCours"){
                            EmployersDatasrv.sessionEnCour($scope.id)
                            .then(function (resp) {
                                                   
                                if(resp){ 
                                    item.mode=0;                                                                                             
                                    item.title="Continue";
                                    item.status="In progress";                                
                                }else{ 
                                    item.mode=1;                                                            
                                    item.title="Start";
                                    item.status="--------";                            
                                }                                                              
                            });
                          
                        }else if(item.status=="Cloturée"){   
                            item.mode=2;                      
                            item.title="Consult";
                            item.status="Closed"                                                                                                                                   
                        }
                    });
                });
               //apEmp "en cpur"
                $scope.newAppEmp=function(){
                    EmployersDatasrv.appEmployer($scope.id)
                  .then(function (data) {	
                      $rootScope.appEmp=data;
                      EmployersDatasrv.editEmployer($scope.id)
                      .then(function (resp) {
                        $modalInstance.close($scope.selected.item);
                          $rootScope.employerSelected=resp.data;
                          console.log($rootScope.employerSelected)
                         document.location.href="http://localhost:8081/app/#/app/ui/steps";
                         
                      });
                       }, function (err) {
                       console.log(err);
                   })
              } 
            //apEmp for all sessions "cloturées"
            $scope.oldAppEmp=function(idAnn){
                EmployersDatasrv.sessionCloture($scope.id,idAnn)
                .then(function (data) {
                    $rootScope.appEmp=data;
                    EmployersDatasrv.editEmployer($scope.id)
                    .then(function (resp) {
                        $modalInstance.close($scope.selected.item);
                        $rootScope.employerSelected=resp.data;
                        console.log($rootScope.employerSelected)
                       document.location.href="http://localhost:8081/app/#/app/ui/steps";
                    });
                });
            }


            })

        })();