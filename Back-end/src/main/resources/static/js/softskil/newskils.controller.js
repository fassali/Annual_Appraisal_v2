(function () {


var app = angular.module("myApp");
app.controller("newSkilsCtrl",newSkilsCtrl);


function newSkilsCtrl($scope,skilsDataService,$http,$location,$window,$stateParams,$state,$interval) {
	$scope.skils = {};
	$scope.newskils = {};
	$scope.meaning ={};
	$scope.listmeaning =[];
	$scope.allskils = {};
	$scope.levels = [];
	$scope.suppLevel = null;
	$scope.modeNew = true;
	$scope.count = 0;
	
	$scope.save = function() {
		$scope.newskils.isRemoved = false;
		$scope.newskils.levels = [];		
		skilsDataService.newSkils($scope.newskils).then(function(data) {
			$state.go("updateskils", {id: data.idSoftSkill}, {
			});
			
		},function myError(response) {
	               $scope.msgError = response.data.message;
	               stop = autoClose();
         });
			
			
			
	}
//
	$scope.suppSkil = function() {		
		
		console.log($scope.suppLevel)
		$scope.skils.levels.forEach(function(element,index ) {
			 if(element.idLevel == $scope.suppLevel.idLevel)
				 
			 {	 
				 $scope.suppLevel.removed = true;
				 $scope.skils.levels[index]= $scope.suppLevel;
				console.log($scope.skils.levels[index])
			 }
		})
		skilsDataService.removeLevel($scope.skils).then(function(data) {
			skilsDataService.getSkils($scope.skils.idSoftSkill).then(function(data){
				$scope.skils.levels = [];
				$scope.skils.levels = data.levels;
				$scope.levels = $scope.skils.levels ;
				$scope.meaning ={};
				$scope.suppLevel = null;
				$scope.msgSucces = $scope.skils.label+" Suprimmer avec success ";
				stop = autoClose();
				$scope.levels.sort(function (a, b) {
					  return b.degree - a.degree;
					});
			});
				}, function myError(response) {
	            });
	}
	//
	$scope.ajouter = function() {
		//$scope.skils.levels = [];
		$scope.skils.levels.push($scope.meaning)
		//$scope.skils.meaningSkils = $scope.listmeaning
		skilsDataService.newSkils($scope.skils).then(function mySuccess(data) {
			skilsDataService.getSkils($scope.skils.idSoftSkill).then(function mySuccess(data){
				$scope.skils.levels = [];
				$scope.skils.levels = data.levels;
				$scope.meaning ={};
				$scope.msgSucces = $scope.skils.label+" ajouter  avec success ";
				stop = autoClose();
				$scope.levels.sort(function (a, b) {
					  return b.degree - a.degree;
					});
			});
				}, function myError(response) {
					skilsDataService.getSkils($scope.skils.idSoftSkill).then(function(data){
						$scope.skils.levels = [];
						$scope.skils.levels = data.levels;
						$scope.levels = $scope.skils.levels ;
						$scope.msgError = response.data.message;
						$scope.meaning ={};
						stop = autoClose();
						$scope.levels.sort(function (a, b) {
							  return b.degree - a.degree;
							});
					});
	            }
		);
	}
	$scope.modifier = function() {

		skilsDataService.updSkils($scope.skils).then(function mySuccess(data) {
			skilsDataService.getSkils($scope.skils.idSoftSkill).then(function(data){
				$scope.skils.levels = [];
				$scope.skils.levels = data.levels;
				$scope.levels = $scope.skils.levels ;
				$scope.meaning ={};
				$scope.msgSucces = $scope.skils.label+" modifier avec success ";
				stop = autoClose();
				$scope.levels.sort(function (a, b) {
					  return b.degree - a.degree;
					});
			});
				}, function myError(response) {
					skilsDataService.getSkils($scope.skils.idSoftSkill).then(function(data){
						$scope.skils.levels = [];
						$scope.skils.levels = data.levels;
						$scope.levels = $scope.skils.levels ;
						$scope.msgError = response.data.message;
						$scope.meaning ={};
						stop = autoClose();
						$scope.levels.sort(function (a, b) {
							  return b.degree - a.degree;
							});
					});
	            });
	}
	$scope.resetLevel = function(item) {
		$scope.modeNew = true;
		$scope.meaning = {};
	}
	$scope.modifierLevel = function(item) {
		$scope.modeNew = false;
		$scope.meaning = item;
	}
	$scope.suppLevel = function(item) {
		$scope.suppLevel = item;
	}
	// update Level
	$scope.updateLevel = function(item) {

		$scope.skils.levels = [];
		$scope.skils.levels.push($scope.meaning);
		console.log($scope.skils)
			 skilsDataService.updLevel($scope.skils,$scope.meaning.idLevel).then(function mySuccess(data) {
				 skilsDataService.getSkils($scope.skils.idSoftSkill).then(function(data){
						$scope.skils.levels = [];
						$scope.skils.levels = data.levels;
						$scope.levels = $scope.skils.levels ;
						$scope.msgSucces = "Level est modifier avec success ";
						$scope.meaning ={};
						stop = autoClose();
						$scope.levels.sort(function (a, b) {
							  return b.degree - a.degree;
							});
					});
					}, function myError(response) {
						skilsDataService.getSkils($scope.skils.idSoftSkill).then(function(data){
							$scope.skils.levels = [];
							$scope.skils.levels = data.levels;
							$scope.levels = $scope.skils.levels ;
							$scope.msgError = response.data.message;
							$scope.meaning ={};
							stop = autoClose();
							$scope.levels.sort(function (a, b) {
								  return b.degree - a.degree;
								});
						});
		            });
	}
	
	//new Level 
	$scope.ajouterLevel = function() {
		$scope.modeNew = true;
		$scope.skils.levels = [];
		$scope.skils.levels.push($scope.meaning);
		console.log($scope.skils)
			skilsDataService.newLevel($scope.skils).then(function(data) {
			skilsDataService.getSkils($scope.skils.idSoftSkill).then(function(data){
				$scope.skils.levels = [];
				$scope.skils.levels = data.levels;
				$scope.levels = $scope.skils.levels ;
				$scope.msgSucces = "Level est ajouter avec success ";
				stop = autoClose();
				$scope.meaning ={};
				$scope.levels.sort(function (a, b) {
					  return b.degree - a.degree;
					});
			});
				}, function(response) {
					skilsDataService.getSkils($scope.skils.idSoftSkill).then(function(data){
						$scope.skils.levels = [];
						$scope.skils.levels = data.levels;
						$scope.levels = $scope.skils.levels ;
						$scope.msgError = response.data.message;
						$scope.meaning ={};
						stop = autoClose();
						$scope.levels.sort(function (a, b) {
							  return b.degree - a.degree;
							});
					});

	            });
		
	};
	function autoClose() {
		 return $interval(function() {
			$scope.count = $scope.count + 1;

			if ($scope.count == 5)
				$scope.stopmsg();
		}, 500);              // The function returns the product of p1 and p2
	}
	$scope.stopmsg = function() {
		if (angular.isDefined(stop)) {
			$interval.cancel(stop);
			stop = undefined;
			$scope.msgError = null;
			$scope.msgSucces = null
		}
	};
		skilsDataService.gestAllSkils().then(function(data) {
			$scope.allskils = data;
//			$scope.skils = $scope.allskils[0]
		});
		
		skilsDataService.getSkils($stateParams.id).then(
				function mySuccess(data) {
					$scope.skils = data;
					$scope.levels = $scope.skils.levels;
					$scope.levels.sort(function (a, b) {
						  return b.degree - a.degree;
						});
				})
}

})();