(function() {

	var app = angular.module("app");
	app.controller("feedbackCtrl", feedbackCtrl);

	function feedbackCtrl($scope, feedbackService,$rootScope) {

		$scope.save = function(model) {
			feedbackService.save(model).then(function(response) {
				$scope.succes = "Feedback added successfully!";
				feedbackService.getAll().then(function(resp) {
                    $rootScope.feedbacks = resp.data;
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
                    $rootScope.feedbacks = resp.data;
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
                    $rootScope.feedbacks = resp.data;
				}, function(err) {
					console.log(err.resp);
				});
			}, function(err) {
				console.log(err.response);
			});
		};

		$scope.getAll = function() {
			feedbackService.getAll().then(function(response) {
				console.log(response)
                $rootScope.feedbacks = response.data;
			}, function(err) {
				console.log(err.response);
			});
		};

		$scope.setModal = function(obj) {
			$scope.selectedFeedback = obj;
		}
		console.log($scope.feedbacks);
	}

    app.controller('Modalfeednew', ['$scope', '$uibModalInstance', '$state','$stateParams','$rootScope','feedbackService','feed', function($scope, $modalInstance, $state,$stateParams,$rootScope,feedbackService,feed) {

        $scope.feedback = {}
        $scope.feedbackselcted = feed
        $scope.save = function(model) {
            feedbackService.save(model).then(function(response) {
                $rootScope.succes = "Feedback added successfully!";
                feedbackService.getAll().then(function(resp) {
                	console.log(response)
                    $rootScope.feedbacks = resp.data;
                    $modalInstance.close("ok");
                }, function(err) {
                    console.log(err.resp);
                });
            }, function(err) {
                console.log(err.response);
                $modalInstance.close("ok");
            });
        };
        $scope.update = function(id, model) {
            feedbackService.update(id, model).then(function(response) {
                $rootScope.succes = "Feedback updated successfully!";
                feedbackService.getAll().then(function(resp) {
                    $rootScope.feedbacks = resp.data;
                    $modalInstance.close("ok");
                }, function(err) {
                    console.log(err.resp);
                    $modalInstance.close("ok");
                });
            }, function(err) {
                console.log(err.response);
                $modalInstance.close("ok");
            });
        };
        $scope.ok = function () {

            $modalInstance.close("ok");
        };

        $scope.cancel = function () {
            $scope.feedback = {}
            $scope.feedbackselcted = {}
            $modalInstance.dismiss('cancel');
        };
    }])

})();