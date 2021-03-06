(function() {

	var app = angular.module('app');
	app.controller("SelectEmployer",
		function($scope,$rootScope,$http,EmployersDatasrv) { 
         
            $scope.Checked=false;
            $rootScope.employersSelected=[];
            $rootScope.user.profil=="M"
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
         $scope.choose=function(item){
                var idx = -1 
                for (var i = 0; i <  $rootScope.employersSelected.length; i++)
                     {
                        if ($rootScope.employersSelected[i].idEmp == item.idEmp)
                        idx = i;
                     }       
                     if(idx > -1)
                     $rootScope.employersSelected.splice(idx,1)
                     else
                     $rootScope.employersSelected.push(item)
        
        }

        $scope.exist = function(item) {
            for (var i = 0; i <  $scope.employers.length; i++) {
               if ($scope.employers[i].idEmp == item.idEmp)
                  return false;
            }
            return true;        
         }
       
         $scope.confirm=function(){
             for(var i=0;i<$rootScope.employersSelected.length;i++){
                 console.log($rootScope.employersSelected[i]);
             }
         }




            })

        })();