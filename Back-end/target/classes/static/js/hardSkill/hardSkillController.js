(function() {

    var app = angular.module("myApp");
    app.controller("hardSkillController", hardSkillController);

    //controller pour client
    function hardSkillController($scope, $window, hardSkillService, $state, $rootScope, $interval) {

        $scope.pageCompetencies = {};
        $scope.hardSkill = {};
        $scope.ratings = [];
        $scope.idApEmp=1;
        hardSkillService.getRatings().then(function(data) {
            $scope.ratings = data;
        });

        hardSkillService.getCompetencies($scope.idApEmp).then(function(data) {
                $scope.pageCompetencies = data;
                console.log($scope.pageCompetencies);
            });


        $scope.ratingChanged = function(obj, rating) {
            obj.rating = rating;
        }

        $scope.commentChanged = function(obj, comment) {
            obj.comment = comment;
        }
        
        $scope.addCompetency = function() {
        	hardSkillService.addCompetencie($scope.hardSkill).then(function(data) {
                    $scope.ajoutMessage = "successefuly added!";
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

        // update competencies
        $scope.updateCompetencies = function() {
        	hardSkillService.updateCompetencies($scope.pageCompetencies).then(function(data) {
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

        // initialize
        $scope.annuler = function() {
        	hardSkillService.getCompetencies(1).then(function(data) {
                    $scope.pageCompetencies = data.content;
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