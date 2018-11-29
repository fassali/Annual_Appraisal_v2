'use strict';

/**
 * Config for the router
 */
angular.module('app')
    .config(
        ['$stateProvider', '$urlRouterProvider', 'JQ_CONFIG',
            function($stateProvider, $urlRouterProvider, JQ_CONFIG) {

                $urlRouterProvider
                    .otherwise('/login');
                $stateProvider

                    .state('app', {
                        abstract: true,
                        url: '/app',
                        templateUrl: 'partials/app.html'
                    })
                    .state('login', {
                        url: '/login',
                        templateUrl: 'partials/login.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load(['countTo',
                                        'js/controllers/countto.js',
                                        'js/controllers/vectormap.js',
                                        'js/directives/ui-todowidget.js',
                                        'js/controllers/messages-widget.js',
                                        'js/controllers/employer/loginControllor.js',
                                        '../bower_components/font-awesome/css/font-awesome.css'
                                    ]);
                                }
                            ]
                        },
                        controller:'LoginController'
                    })
                    .state('app.dashboard', {
                        url: '/dashboard',
                        templateUrl: 'partials/app_dashboard.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('chart.js').then(
                                            function() {
                                                return $ocLazyLoad.load('js/controllers/dashboard.js');
                                            }
                                        )
                                        .then(
                                          function(){
                                               return $ocLazyLoad.load('../bower_components/font-awesome/css/font-awesome.css');
                                            }
                                          )/*.then(
                                          function(){
                                                return $ocLazyLoad.load('js/directives/ui-todowidget.js');
                                         }
                                      )*/
                                    ;
                                }
                            ]
                        }
                    })
                   /* .state('app.login', {
                        url: '/login',
                        templateUrl: 'partials/login.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load(['countTo',
                                        'js/controllers/countto.js',
                                        'js/controllers/vectormap.js',
                                        'js/directives/ui-todowidget.js',
                                        'js/controllers/messages-widget.js',
                                        '../bower_components/font-awesome/css/font-awesome.css'
                                    ]);
                                }
                            ]
                        }
                    })*/
                    .state('access.register', {
                        url: '/register',
                        templateUrl: 'partials/ui-register.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/controllers/register.js','../bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        }
                    })
                    .state('access.forgotpwd', {
                        url: '/forgotpwd',
                        templateUrl: 'partials/ui-forgotpwd.html',
                    })
                    .state('access.404', {
                        url: '/404',
                        templateUrl: 'partials/ui-404.html',
                    })
                    .state('access.500', {
                        url: '/500',
                        templateUrl: 'partials/ui-500.html'
                    })
                    .state('access.lockscreen', {
                        url: '/lockscreen',
                        templateUrl: 'partials/ui-lockscreen.html'
                    })
                    .state('app.skils', {
                        url: '/skils',
                        templateUrl: 'partials/softskil/skils.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('chart.js').then(
                                        function() {
                                            return $ocLazyLoad.load('js/controllers/softskil/skils.controller.js');
                                        }
                                    )
                                        .then(
                                            function(){
                                                return $ocLazyLoad.load('../bower_components/font-awesome/css/font-awesome.css');
                                            }
                                        )/*.then(
                                          function(){
                                                return $ocLazyLoad.load('js/directives/ui-todowidget.js');
                                         }
                                      )*/
                                        ;
                                }
                            ]
                        },
                        controller  :   "skilsCtrl"
                    })
                    .state('app.newskils', {
                        url: '/skils/save',
                        templateUrl: 'partials/softskil/newskils.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('chart.js').then(
                                        function() {
                                            return $ocLazyLoad.load('js/controllers/softskil/newskils.controller.js');
                                        }
                                    )
                                        .then(
                                            function(){
                                                return $ocLazyLoad.load('../bower_components/font-awesome/css/font-awesome.css');
                                            }
                                        )/*.then(
                                          function(){
                                                return $ocLazyLoad.load('js/directives/ui-todowidget.js');
                                         }
                                      )*/
                                        ;
                                }
                            ]
                        },
                        controller  :   "newSkilsCtrl"
                    })
                    .state('app.updateskils', {
                        url: '/skils/:id',
                        templateUrl: 'partials/softskil/updateskils.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('chart.js').then(
                                        function() {
                                            return $ocLazyLoad.load('js/controllers/softskil/newskils.controller.js');
                                        }
                                    )
                                        .then(
                                            function(){
                                                return $ocLazyLoad.load('../bower_components/font-awesome/css/font-awesome.css');
                                            }
                                        )/*.then(
                                          function(){
                                                return $ocLazyLoad.load('js/directives/ui-todowidget.js');
                                         }
                                      )*/
                                        ;
                                }
                            ]
                        },
                        controller  :   "newSkilsCtrl"
                    })
                    .state('app.newApskils', {
                        url: '/apskil/save',
                        templateUrl: 'partials/softskil/newAppSoftSkil.html',
                        controller  :   "newApSoftSkilsCtrl"
                    })
                    .state('app.employersList',{
                        url:'/employers',
                        templateUrl:'partials/employer/employersList.html',
                        controller:'EmployersListController'

                    })
                    .state('app.gestionEmployer',{
                        url:'/GestionEmployers',
                        templateUrl:'partials/employer/gestionEmployer.html',
                        controller:'EmployersListController'

                    })
                    .state('app.feedbacks',{
                        url:'/feedback',
                        templateUrl:'partials/feedBack/feedbacks.html',
                        controller:'feedbackCtrl'
                    })
                    .state('app.session',
                        {
                            url : '/session',
                            templateUrl : 'partials/session/startSession.html',
                            controller: 'annualSessController'
                        })
                    .state('app.newEmployer',{
                        url:'/newEmployer',
                        templateUrl:'partials/employer/NewEmployer.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('chart.js').then(
                                        function() {
                                            return $ocLazyLoad.load('js/controllers/employer/NewEmployerController.js');
                                        }
                                    )
                                        .then(
                                            function(){
                                                return $ocLazyLoad.load('../bower_components/font-awesome/css/font-awesome.css');
                                            }
                                        )/*.then(
                                          function(){
                                                return $ocLazyLoad.load('js/directives/ui-todowidget.js');
                                         }
                                      )*/
                                        ;
                                }
                            ]
                        },
                        controller:'EmployerController'
                    })
                    .state('app.profile',{
                        url:'/myProfil',
                        templateUrl:'partials/employer/profilEmployer.html',
                        controller:'ProfilController'
                    })
                .state('app.ui', {
                        url: '/ui',
                        template: '<div ui-view class=""></div>'
                    })

                    .state('app.ui.steps', {
                        url: '/steps',

/*                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/filters/blogs-startfrom.js', 'js/controllers/steps.js','../bower_components/font-awesome/css/font-awesome.css']);
                                }
                            ]
                        },*/
                        views : {
                            '' : {
                                templateUrl: 'partials/ui-steps.html'

                            },
                            'first@app.ui.steps' : {
                                templateUrl:'partials/employer/firstPage.html',
                                controller:'FirstPageController'
                            },
                            'objctives@app.ui.steps' : {
                                templateUrl:'partials/objectives/lastObjectives.html',
                                controller:'objController'
                            },
                            'hard@app.ui.steps' : {
                                templateUrl:'partials/hardSkill/hardSkills.html',
                                controller:'hardSkillController'
                            },
                            'soft@app.ui.steps' : {
                                templateUrl: 'partials/softskil/newAppSoftSkil.html',
                                controller  :   "newApSoftSkilsCtrl",
                                resolve: {
                                    deps: ['$ocLazyLoad',
                                        function($ocLazyLoad) {
                                            return $ocLazyLoad.load('chart.js').then(
                                                function() {
                                                    return $ocLazyLoad.load('js/controllers/softskil/apSoftSkil.controller.js');
                                                }
                                            )
                                                .then(
                                                    function(){
                                                        return $ocLazyLoad.load('../bower_components/font-awesome/css/font-awesome.css');
                                                    }
                                                )/*.then(
                                          function(){
                                                return $ocLazyLoad.load('js/directives/ui-todowidget.js');
                                         }
                                      )*/
                                                ;
                                        }
                                    ]
                                },
                            },
                            'synthesis@app.ui.steps' : {
                                templateUrl: 'partials/Syntesis/syntesis.html',
                                controller  :   "syntesisCtrl"
                            },
                            'feedback@app.ui.steps' : {
                                templateUrl : 'partials/feedBack/feedBackEmp.html',
                                controller: 'fdbController'
                            },
                            'newObj@app.ui.steps' : {
                                templateUrl : 'partials/ApObjEmp/ApObjEmp.html',
                                controller: 'ApObjController'
                            },
                            'wish@app.ui.steps' : {
                                templateUrl : 'partials/Syntesis/potentialEvolution.html',
                                controller: 'syntesisCtrl'
                            }

                        }
                    })
            }
        ]
    );
