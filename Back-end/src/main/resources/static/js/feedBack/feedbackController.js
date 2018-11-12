(function() {

	var app = angular.module("myApp");
	app.controller("feedbackCtrl", feedbackCtrl);

	function feedbackCtrl($scope, feedbackService) {

		$scope.save = function(model) {
			feedbackService.save(model).then(function(response) {
				$scope.succes = "Feedback added successfully!";
				feedbackService.getAll().then(function(resp) {
					$scope.feedbacks = resp.data;
				}, function(err) {
					console.log(err.resp);
				});
			}, function(err) {
				console.log(err.response);
			});
		};

		$scope.update = function(id, model) {
			feedbackService.update(id, model).then(function(response) {
				$scope.succes = "Feedback updated successfully!";
				feedbackService.getAll().then(function(resp) {
					$scope.feedbacks = resp.data;
				}, function(err) {
					console.log(err.resp);
				});
			}, function(err) {
				console.log(err.response);
			});
		};

		$scope.remove = function(id) {
			feedbackService.remove(id).then(function(response) {
				$scope.succes = "Feedback deleted successfully!";
				feedbackService.getAll().then(function(resp) {
					$scope.feedbacks = resp.data;
				}, function(err) {
					console.log(err.resp);
				});
			}, function(err) {
				console.log(err.response);
			});
		};

		$scope.getAll = function() {
			feedbackService.getAll().then(function(response) {
				$scope.feedbacks = response.data;
			}, function(err) {
				console.log(err.response);
			});
		};

		$scope.setModal = function(obj) {
			$scope.selectedFeedback = obj;
		}
		console.log($scope.feedbacks);
	}
})();