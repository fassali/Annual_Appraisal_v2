(function() {

	var app = angular.module('app');
	app.controller("SelectEmployer",
		function($scope,$rootScope,$http,EmployersDatasrv) { 
         
            $scope.Checked=false;
            $rootScope.employersSelected=[];
		EmployersDatasrv.getAllEmployersList()	
		.then(function(data){
            
            EmployersDatasrv.editEmployer($rootScope.user.idEmp)
            //	remove the user from the list
		    .then(function(rep){
            $scope.employer=rep.data;
            for(var i = 0; i < data.length; i++){
                if(data[i].idEmp==$scope.employer.idEmp){
                    data.splice(i,1)
                }
            }
            $scope.employers=data;
            for(var j = 0; j < $scope.employers.length; j++){
               var appday=$scope.employers[j].dateEntry;
               var d = new Date(appday);
                  $scope.day=d.getDate();
                  $scope.month=d.getMonth()+1;
                  $scope.year=d.getFullYear();
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