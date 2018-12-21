(function() {

	var app = angular.module('app');
	app.controller("MyEvaluation",
		function($scope,$rootScope,$http,AppEmployerDatasrv,EmployersDatasrv) { 
           $rootScope.user.menu=2;
            AppEmployerDatasrv.employerApEmp($rootScope.user.idEmp)
            .then(function(data){
                $scope.session=[];
                $scope.appEmps=data;
                
                if($rootScope.user.profil=="M" ||$rootScope.user.profil=="AM" || $rootScope.user.profil=="A"  ){
                    $rootScope.user.profil="E";
                }
                $scope.appEmps.forEach(function(item) {                     
                    if(item.annualSession.status=="E"){                         
                        item.annualSession.mode=0;                                                                                                                                                   
                   }else if(item.annualSession.status=="C"){   
                    item.annualSession.mode=1;                                                                                                                                                       
                     }

                 });
                

           });
          
     //get apEmp
     $scope.getApEmp=function(idApEmp){
        AppEmployerDatasrv.getAppEmployer(idApEmp)
        .then(function (data) {
          $rootScope.appEmp=data;          
          EmployersDatasrv.editEmployer($rootScope.user.idEmp)          
          .then(function (resp) {
              $rootScope.employerSelected=resp.data;
              document.location.href="http://localhost:8081/app/#/app/ui/steps";
          });
          
         });
     }






        })

    })();