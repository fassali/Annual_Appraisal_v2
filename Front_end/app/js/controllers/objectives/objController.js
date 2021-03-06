(function() {

    var app = angular.module("app");
    app.controller("objController", objController);

    //controller pour client
    function objController($scope, $window, objService, $state, $rootScope, $interval, $filter) {

        $scope.pageLastObj = {}; 
        $scope.currentPage = 0;
        $scope.size = 3;
        $scope.totalePages = 0;
        $scope.pages = [];
        $scope.ratings = [];
        $scope.count=0;
        //$rootScope.appEmp;
        //$rootScope.employerSelected;
        //$scope.year
        //$scope.idE$rootScopemp
   //gestion d'affichage selon status de la session
  
        objService.getRatings().then(function(data) {
            $scope.ratings = data;
        });

            //faire appel au service objectif pour recuperer les objectifs

            objService.getLastObjs($rootScope.appEmp.annualSession.label,$rootScope.employerSelected.idEmp , $scope.currentPage,
                $scope.size).then(function(data) {
                    console.log(data)
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

        $rootScope.updateLastObj = function() {
            console.log($scope.pageLastObj)
            objService.updateObjectives($scope.pageLastObj,$rootScope.appEmp.idApEmp).then(function(data) {
                    stop = $interval(function() {
                        $scope.count = $scope.count + 1;
                        if ($scope.count == 5)
                            $scope.stopmsg();
                    }, 500);
            }, function(err) {
                   // alert(err.message);
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
        $scope.changed = function(){
           
            $rootScope.isChange = true;
        }

    }
})();