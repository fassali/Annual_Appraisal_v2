(function() {

	var app = angular.module("myApp");
	app.controller("hardSkillController", hardSkillController);

	// controller pour client
	function hardSkillController($scope, hardSkillService) {
		$scope.appraisalId = 1;

		hardSkillService.getByAppraisal($scope.appraisalId).then(
				function(response) {
					$scope.competencies = response.data;
				}, function(err) {
					console.log(err.response);
				});

		hardSkillService.getRatings().then(function(response) {
			$scope.ratings = response.data;
		});

		$scope.save = function(model) {
			hardSkillService.save(model).then(function(response) {
				$scope.succes = "Competency added successfully!";
			}, function(err) {
				console.log(err.response);
			});
		};

		$scope.update = function(id, model) {
			hardSkillService.update(id, model).then(function(response) {
				$scope.succes = "Competency updated successfully!";
			}, function(err) {
				console.log(err.response);
			});
		};

		$scope.remove = function(id) {
			hardSkillService.remove(id).then(function(response) {
				$scope.succes = "Competency deleted successfully!";
			}, function(err) {
				console.log(err.response);
			});
		};

		$scope.setModal = function(obj) {
			$scope.hardSkillSelected = obj;
		}

	}
})();