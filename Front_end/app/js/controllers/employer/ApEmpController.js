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
                    for(var i=0;i<data.length;i++){   
                        $scope.session=data[i];                    
                        if($scope.session.status=="EnCours"){
                            EmployersDatasrv.sessionEnCour($scope.id)
                            .then(function (resp) {
                                if(resp==true){ 
                                console.log(resp)                            
                                $scope.session.title="Continue";
                                 $scope.session.status="In progress";                                
                                }else if(resp==false){  
                               console.log(resp)                            
                               $scope.session.title="Start";
                                $scope.session.status="--------";                            
                                }
                               
                               
                            });
                          
                        }else if($scope.session.status=="Cloturée"){
                            
                            $scope.session.title="Consult";
                            $scope.session.status="Closed";

                                                       
                                                                              
                        }
                        $scope.years.push($scope.session)
                       
                    }             
                   console.log( $scope.years);
                });

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
            })

        })();