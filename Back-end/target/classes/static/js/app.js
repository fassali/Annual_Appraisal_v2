
var app = angular.module("myApp",['ui.router','ngMaterial']);



// la configuration des des route (les chemin des vues)
app.config(function ($stateProvider, $urlRouterProvider) {
	 // chemin par defaut pour vue accueil
	 $urlRouterProvider.otherwise('/login');
		$stateProvider.state('lastObj',
			{
			url : '/obj',
            templateUrl : 'views/objectives/lastObjectives.html',
            controller: 'objController'
		})
            .state('session',
                {
                    url : '/session',
                    templateUrl : 'views/startSession.html',
                    controller: 'annualSessController'
                })
            .state('feedb',
                {
                    url : '/feedb',
                    templateUrl : 'views/feedBack/feedBackEmp.html',
                    controller: 'fdbController'
                })
                
     $stateProvider.state('competencies',
			{
			url : '/competencies',
            templateUrl : 'views/hardSkills.html',
            controller: 'hardSkillController'
		})
            .state('newCompetency',
                {
                    url : '/competencies/save',
                    templateUrl : 'views/hardSkills.html',
                    controller: 'hardSkillController.js'
                })

            .state('skils', {
           url: '/skils',
           templateUrl: 'views/softskil/skils.html',
           controller  :   "skilsCtrl"
       })
       .state('newskils', {
           url: '/skils/save',
           templateUrl: 'views/softskil/newskils.html',
           controller  :   "newSkilsCtrl"
       })
          .state('updateskils', {
           url: '/skils/:id',
           templateUrl: 'views/softskil/updateskils.html',
           controller  :   "newSkilsCtrl"
       })      
       .state('newApskils', {
           url: '/apskil/save',
           templateUrl: 'views/softskil/newAppSoftSkil.html',
           controller  :   "newApSoftSkilsCtrl"
       })
        .state('synthesis', {
           url: '/sysnthesis',
           templateUrl: 'views/Syntesis/syntesis.html',
           controller  :  "syntesisCtrl"
       })
       .state('potentialEvolution', {
           url: '/potentialEvolution',
           templateUrl: 'views/Syntesis/potentialEvolution.html',
           controller  :  "syntesisCtrl"
       });
		
	    $stateProvider.state('login',{
	        url:'/login',
	        templateUrl:'views/employer/login.html',
	        controller:'LoginController'
	    });
	    $stateProvider.state('employersList',{
	        url:'/employers',
	        templateUrl:'views/employer/employersList.html',
	        controller:'EmployersListController'
	        
	    });
	    $stateProvider.state('newEmployer',{
	        url:'/newEmployer',
	        templateUrl:'views/employer/NewEmployer.html',
	        controller:'EmployerController'
	    });
	 
	    $stateProvider.state('profile',{
	        url:'/myProfil',
	        templateUrl:'views/employer/profilEmployer.html',
	        controller:'ProfilController'
	    });
	    
	    $stateProvider.state('feedbacks',{
	        url:'/feedback',
	        templateUrl:'views/feedbacks.html',
	        controller:'feedbackCtrl'
	    });
	    
	    $stateProvider.state('apObjEmp',{
	        url:'/apObjEmp',
	        templateUrl:'views/ApObjEmp/ApObjEmp.html',
	        controller:'ApObjController'
	    });
	    
	    $stateProvider.state('fannualAppraisal',{
	        url:'/annualAppraisal',
	        templateUrl:'views/employer/firstPage.html',
	        controller:'FirstPageController'
	    });


});

