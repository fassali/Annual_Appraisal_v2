(function() {

    var app = angular.module("app");
    app.controller("annualSessController", annualSessController);

    //controller pour client
    function annualSessController($scope,$rootScope,AnnualSessDatasrv, $window, objService, $state, $rootScope, $interval) {
         $rootScope.user.menu=7;
         $scope.count=0;
         $scope.sessionEncour={};
         var appDate = new Date();
         $scope.yearEncours=appDate.getFullYear();
         $scope.addSession=true;

         //get list of all sessions
         AnnualSessDatasrv.sessionsList()
         .then(function (data) {
             $scope.sessions=data;
             for(var i=0;i<$scope.sessions.length;i++){
                 if($scope.sessions[i].label==$scope.yearEncours){
                    $scope.addSession=false;
                 }
             }
             if($scope.addSession==true){
                 $scope.sessionEncour.label=$scope.yearEncours;
                 $scope.sessionEncour.status="-------",
                 $scope.sessions.push($scope.sessionEncour);
                
             }
             $scope.sessions.forEach(function(item) {                     
                if(item.status=="E"){                         
                    item.enCours=true;                                                                                                                                                   
               }else if(item.status=="C"){   
                item.cloture=true;                                                                                                                                                       
                 }else if(item.status!="E" && item.status!="C"){
                     item.start=true;
                 }
    
             });
             
        })



        $scope.stopmsg = function() {
            if (angular.isDefined(stop)) {
                $interval.cancel(stop);
                stop = undefined;
                $scope.ajoutMessage = null;
            }
        };
   }
})();