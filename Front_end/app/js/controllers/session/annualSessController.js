(function() {

    var app = angular.module("app");
    app.controller("annualSessController", annualSessController);

    //controller pour client
    function annualSessController($scope,$rootScope, $window, objService, $state, $rootScope, $interval) {
         $rootScope.user.menu=7;
        $scope.count=0;

        //faire appel au service objectif pour recuperer les objectifs
        $scope.startNewSess = function() {
            objService.startNewSess().then(function (data) {
                console.log(objService.msgErr);
                $scope.msgSuccess = objService.msgSuccess;
                $scope.msgError = objService.msgErr;
                stop = $interval(function () {
                    $scope.count = $scope.count + 1;
                    if ($scope.count == 5)
                        $scope.stopmsg();
                }, 500);

            });
        }

        $scope.stopmsg = function() {
            if (angular.isDefined(stop)) {
                $interval.cancel(stop);
                stop = undefined;
                $scope.ajoutMessage = null;
            }
        };
   }
})();