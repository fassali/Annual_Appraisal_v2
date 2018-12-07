(function() {

	var app = angular.module('app');
	app.controller("MyEvaluation",
		function($scope,$rootScope,$http,AppEmployerDatasrv,EmployersDatasrv) { 
           
            AppEmployerDatasrv.employerApEmp($rootScope.user.idEmp)
            .then(function(data){
                $scope.session=[];
                $scope.appEmps=data;
               
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