(function() {

    var app = angular.module("app");
    app.controller("fdbController", fdbController);

    //controller pour les FeedBacks
    function fdbController($scope, $window, feedbackService, $state, $rootScope, $interval) {
        $rootScope.pageFdback = [];
        $scope.currentPage = 0;
        $scope.size = 3;
        $scope.totalePages = 0;
        $scope.pages = [];
        $scope.count=0;

        //faire appel au service feedBack pour recuperer la liste des feedBack

        feedbackService.getListFeedback($rootScope.appEmp.idApEmp, $scope.currentPage,
            $scope.size).then(function(data) {
            $rootScope.pageFdback = data.data.content;
            $scope.totalePages = data.totalPages;
            $scope.pages = new Array(data.totalPages);
        });

        // Modifier les objectifs d'un employé
        $rootScope.saveFeedb = function() {
console.log($rootScope.pageFdback)
            feedbackService.saveApFeedbacks($rootScope.pageFdback, $rootScope.appEmp.idApEmp).then(function(data) {

                console.log(data);
                $scope.ajoutMessage = "feedBacks list is updated";
                    stop = $interval(function() {
                        $scope.count = $scope.count + 1;
                        if ($scope.count == 5)
                            $scope.stopmsg();
                    }, 500);
                }, function(err) {
                    alert(err.message);
                }
            );
        }

        // Annuler les MAJ des objectifs
        $scope.annuler = function() {
            /*$scope.listObj = [];
            $scope.listObj = $scope.pageLastObj;*/
            objService.getLastObjs("2019", 1, $scope.currentPage,
                $scope.size).then(function(data) {
                $scope.pageLastObj = data.content;
                $scope.totalePages = data.totalPages;
                $scope.pages = new Array(data.totalPages);
            });
            $window.location.reload();
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