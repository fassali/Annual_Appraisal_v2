(function() {


    var app = angular.module('app');
    app.controller("hardSkillController",hardSkillController);
    function hardSkillController($scope, $rootScope, hardSkillService) {
                $scope.appraisalId = $rootScope.appEmp.idApEmp;
                $scope.mode = "";
                console.log($scope.appraisalId);
                hardSkillService.getRatings().then(function(response) {
                    $scope.ratings = response.data;
                });


                hardSkillService.getByAppraisal($scope.appraisalId).then(
                    function(response) {
                        $scope.competencies = response.data;
                        console.log($scope.competencies);
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
                    console.log($scope.mode)
                }

                $scope.createCompetencie = function() {

                    $scope.mode = "create";
                    console.log($scope.mode);
                }


            }


})();