app.controller('StepsPageCtrl', ['$scope','$rootScope','AppEmployerDatasrv',  function($scope,$rootScope,AppEmployerDatasrv) {
    $rootScope.isChange = false;
    $scope.isNotDisabled = true;
    $scope.profilValide = $rootScope.user.profil;
    $scope.modeValide = $rootScope.appEmp.status;
        $scope.validerStep = function() {
            if ($scope.profilValide == "M")
                   $rootScope.appEmp.status = "VM";
            else
            if ($scope.profilValide == "E")
                $rootScope.appEmp.status = "VE";

            console.log($rootScope.appEmp)

            AppEmployerDatasrv.updateApEmpl($rootScope.appEmp,$rootScope.appEmp.idApEmp).then(function(data){
                console.log(data)
            })
        }
    $scope.initValid = function() {

            if($scope.profilValide == "M")

                if($scope.modeValide == "en cour")
                {
                    if(($scope.profilValide == "M")||($scope.profilValide == "A"))
                        $scope.isNotDisabled = true;
                    else if($scope.profilValide == "E")
                        $scope.isNotDisabled = false;
                }
                else if(($scope.modeValide == "VE")&& ($scope.profilValide == "M"))

                        $scope.isNotDisabled = false;

               else
                    $scope.isNotDisabled = false;



    }
}]);