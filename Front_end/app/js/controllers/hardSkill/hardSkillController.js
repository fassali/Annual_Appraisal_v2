(function() {

    var app = angular.module("myApp");
    app.controller("hardSkillController", hardSkillController);

    // controller pour client
    function hardSkillController($scope, hardSkillService) {
        $scope.appraisalId = 1;
        $scope.mode = "";

        hardSkillService.getRatings().then(function(response) {
            $scope.ratings = response.data;
        });

        hardSkillService.getByAppraisal($scope.appraisalId).then(
            function(response) {
                $scope.competencies = response.data;
            }, function(err) {
                console.log(err.response);
            });

        $scope.save = function(model) {
            hardSkillService.save($scope.appraisalId, model).then(function(response) {
                $scope.succes = "Competency added successfully!";
                $scope.mode = "";
                $scope.hardSkillSelected = {};
                hardSkillService.getByAppraisal($scope.appraisalId).then(
                    function(response) {
                        $scope.competencies = response.data;
                    }, function(err) {
                        console.log(err.response);
                    });
            }, function(err) {
                console.log(err.response);
            });
        };

        $scope.update = function(id, model) {
            hardSkillService.update(id, model).then(function(response) {
                $scope.succes = "Competency updated successfully!";
                $scope.mode = "";
                $scope.hardSkill = {};
                hardSkillService.getByAppraisal($scope.appraisalId).then(
                    function(response) {
                        $scope.competencies = response.data;
                    }, function(err) {
                        console.log(err.response);
                    });
            }, function(err) {
                console.log(err.response);
            });
        };

        $scope.remove = function(id) {
            hardSkillService.remove(id).then(function(response) {
                $scope.succes = "Competency deleted successfully!";
                hardSkillService.getByAppraisal($scope.appraisalId).then(
                    function(response) {
                        $scope.competencies = response.data;
                    }, function(err) {
                        console.log(err.response);
                    });
            }, function(err) {
                console.log(err.response);
            });
        };

        $scope.editCompetencie = function(obj) {
            $scope.hardSkillSelected = obj;
            $scope.mode = "update";
        }

        $scope.createCompetencie = function() {
            $scope.mode = "create";
        }


    }
})();