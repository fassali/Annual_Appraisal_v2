(function() {

    var app = angular.module("myApp");
    app.controller("objController", objController);

    //controller pour client
    function objController($scope, $window, objService, $state, $rootScope, $interval) {

        $scope.pageLastObj = {};
        $scope.currentPage = 0;
        $scope.size = 3;
        $scope.totalePages = 0;
        $scope.pages = [];
        $scope.ratings = [];
        $scope.count=0;
        //$scope.year
        //$scope.idEmp
        objService.getRatings().then(function(data) {
            $scope.ratings = data;
        });

            //faire appel au service objectif pour recuperer les objectifs

            objService.getLastObjs("2019", 1, $scope.currentPage,
                $scope.size).then(function(data) {
                $scope.pageLastObj = data.content;
                $scope.totalePages = data.totalPages;
                $scope.pages = new Array(data.totalPages);
            });


        $scope.ratingChanged = function(obj, rating) {
            alert(rating);
            obj.rating = rating;
        }

        $scope.commentChanged = function(obj, comment) {
            obj.comment = comment;
        }

        // Modifier les objectifs d'un employé
        $scope.updateLastObj = function() {
            objService.updateObjectives($scope.pageLastObj).then(function(data) {
                    $scope.ajoutMessage = "update avec succés!";
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