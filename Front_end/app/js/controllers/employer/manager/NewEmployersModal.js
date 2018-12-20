(function() {

	var app = angular.module('app');
	app.controller("NewEmployersModal",
			function($scope,$rootScope,$http,EmployersDatasrv,$modal, $log,$interval,items,$modalInstance,$state) {
           
                $scope.count=0;
                $scope.items = items;
                $scope.selected = {
                item: $scope.items[0]
                };
         $scope.employers=$rootScope.employersSelected;
     
          //update Function
          $scope.addEmployers=function(){
            EmployersDatasrv.chooseEmployers($rootScope.employersSelected,$rootScope.user.idEmp);                                          
            $modalInstance.close($scope.selected.item); 
            EmployersDatasrv.getAllEmployersList()	
            .then(function(data){ 
              for(var j = 0; j < $rootScope.user.managerTeam.length; j++){
                for(var i = 0; i < data.length; i++){
                    if(data[i].idEmp==$rootScope.user.managerTeam[j].idEmp){                
                      data.splice(i,1)
                     }
                 }                    
               }
              EmployersDatasrv.editEmployer($rootScope.user.idEmp)
              //remove the user from the list
              .then(function(rep){
                $scope.employer=rep.data;
                for(var k = 0; k < data.length; k++){
                  if(data[k].idEmp==$scope.employer.idEmp){
                    data.splice(k,1)
                   } 
                 }
                $rootScope.employers=data;
                for(var j = 0; j < $rootScope.employers.length; j++){
                 var appday=$scope.employers[j].dateEntry;
                 var d = new Date(appday);
                    $rootScope.day=d.getDate();
                    $rootScope.month=d.getMonth()+1;
                    $rootScope.year=d.getFullYear();
                 }
               });
           });
             $state.go("app.chooseEmployer", {}, {
               reload : true
               }); 
               $rootScope.AddEmployers = true;	
               stop = $interval(function() {
                 $scope.count = $scope.count + 1;
                 if ($scope.count == 5)
                   $scope.stopmsg();
               }, 500);
          }

          $scope.stopmsg = function() {
            if (angular.isDefined(stop)) {
              $interval.cancel(stop);
              stop = undefined;
              $rootScope.AddEmployers = false;
              $scope.count=0;
            }
          };


            })

        })();