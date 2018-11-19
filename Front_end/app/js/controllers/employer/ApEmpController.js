(function() {

	var app = angular.module('app');
	app.controller("ApEmpModal",
			function($scope,idEmp,$rootScope,$http,EmployersDatasrv,$modal, $log,$interval,items,$modalInstance) {         
                $scope.id=idEmp;
                $scope.sessions=[];
               
                EmployersDatasrv.allSession()
                .then(function (data) {
                    $scope.sessions=data;
                    for(var j = 0; j < $scope.sessions.length; j++){
                        if($scope.sessions[j].status=="EnCours"){
                            $scope.apstatus="En Cours";
                            $scope.newAnn=1;
                        
                        }else if($scope.sessions[j].status=="Cloturée"){
                            $scope.apstatus="Cloturée";
                            $scope.show=1;
                        }
                    }       
                    console.log($scope.sessions[0]);
                });

                $scope.newAppEmp=function(){
                    EmployersDatasrv.appEmployer($scope.id)
                  .then(function (data) {	
                      $rootScope.appEmp=data;
                      EmployersDatasrv.editEmployer($scope.id)
                      .then(function (resp) {
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