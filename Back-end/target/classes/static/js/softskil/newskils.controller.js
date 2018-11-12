(function () {


var app = angular.module("myApp");
app.controller("newSkilsCtrl",newSkilsCtrl);


function newSkilsCtrl($scope,skilsDataService,$http,$location,$window,$stateParams,$state) {
	$scope.skils = {};
	$scope.newskils = {};
	$scope.meaning ={};
	$scope.listmeaning =[];
	$scope.allskils = {};
	$scope.levels = [];
	
	$scope.save = function() {
		$scope.newskils.isRemoved = false;
		$scope.newskils.levels = [];		
		skilsDataService.newSkils($scope.newskils).then(function(data) {
			$state.go("updateskils", {id: data.idSoftSkill}, {
			});
				});
	}
//
	$scope.suppSkil = function(item) {		
		console.log(item)
		
		$scope.skils.levels.forEach(function(element,index ) {
			 if(element.idLevel == item.idLevel)
				 
			 {	 
				 item.removed = true;
				 $scope.skils.levels[index]= item;
				console.log($scope.skils.levels[index])
			 }
		})
		skilsDataService.removeLevel($scope.skils).then(function(data) {
			skilsDataService.getSkils($scope.skils.idSoftSkill).then(function(data){
				$scope.skils.levels = [];
				$scope.skils.levels = data.levels;
			});
				});
	}
	//
	$scope.ajouter = function() {
		//$scope.skils.levels = [];
		$scope.skils.levels.push($scope.meaning)
		//$scope.skils.meaningSkils = $scope.listmeaning
		console.log($scope.skils);
		skilsDataService.newSkils($scope.skils).then(function(data) {
			skilsDataService.getSkils($scope.skils.idSoftSkill).then(function(data){
				$scope.skils.levels = [];
				$scope.skils.levels = data.levels;
				$scope.meaning ={};
			});
				});
	}
	$scope.modifier = function() {

		skilsDataService.updSkils($scope.skils).then(function(data) {
			$scope.skils = data;
				});
	}
	$scope.modifierLevel = function(item) {

		$scope.meaning = item;
	}
	$scope.ajouterLevel = function() {
		
	//	console.log($scope.skils)
		//$scope.skils.levels = [];
		var idx = false;
		$scope.skils.levels.forEach(function(element,index ) {
			 if($scope.meaning.idLevel == element.idLevel)
			 {	 $scope.skils.levels[index]= $scope.meaning;
//				console.log($scope.skils.levels[index])
				idx = true;
			 }
			 
		
		if($scope.meaning.idLevel != null){
			console.log("here")
			skilsDataService.updLevel($scope.skils,$scope.meaning.idLevel).then(function(data) {
				$scope.skils = data;
					});
		}
		else{
			if(!idx)
				$scope.skils.levels.push($scope.meaning);
			
					skilsDataService.newLevel($scope.skils).then(function(data) {
			skilsDataService.getSkils($scope.skils.idSoftSkill).then(function(data){
				$scope.skils.levels = [];
				$scope.skils.levels = data.levels;
				$scope.meaning ={};
			});
				});
			
		}
		
			
			});
		
		

		//
	}
		
		skilsDataService.gestAllSkils().then(function(data) {
			$scope.allskils = data;
//			$scope.skils = $scope.allskils[0]
		});
		
		skilsDataService.getSkils($stateParams.id).then(
				function(data) {
					$scope.skils = data;
				})
}

})();