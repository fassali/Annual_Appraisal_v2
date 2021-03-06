(function() {

	var app = angular.module('app');
	app.service("EmployersDatasrv", function($http) {
		
		//get un employeur par son login
		this.employerLogin=function(username){
	        var promise1=$http({
	            method: 'GET',
	            url: "http://localhost:8080/employerLogin/"+username
	            });
	        var promise2=promise1.then(function(response){
	        	return response.data;
	        },function(err){
	            console.log(err);

	        });
	     return promise2;
	    }
			
		
		//afficher des employeurs selon "idManager"
		this.getEmployers=function(idManager){
	        var promise1=$http({
	            method: 'GET',
	            url: "http://localhost:8080/employers?idManager="+idManager
	            });
	        var promise2=promise1.then(function(response){
	        	return response.data;
	        },function(err){
	            console.log(err);

	        });
	     return promise2;
		}
			//afficher des employeurs selon "idManager"
			this.getAllEmployersList=function(){
				var promise1=$http({
					method: 'GET',
					url: "http://localhost:8080/allEmployers"
					});
				var promise2=promise1.then(function(response){
					return response.data;
				},function(err){
					console.log(err);
	
				});
			 return promise2;
			}
		
		//chercher un employeur
		this.findEmployers=function(idEmp,firstName){
	        var promise1=$http({
	            method: 'GET',
	            url: "http://localhost:8080/findEmployers?idManager="+idEmp+"&firstName="+firstName
	            });
	        var promise2=promise1.then(function(response){
	        	return response.data;
	        },function(err){
	            console.log(err);

	        });
	     return promise2;
	    }
		
		 //update un employeur
        this.saveEmployer=function(employer,idEmp){
       	
       	 return $http.put("http://localhost:8080/employer/"+idEmp,employer)
            .then(function(response){
				
                
            }), function (err) {
				
                    console.log(err);
                };
         }
		
		//Edit function
		this.editEmployer = function(idEmp) {
			return $http.get('http://localhost:8080/employer/' + idEmp);
		  };
			// ajouter un nv employeur
			this.addEmployer = function(userForm,idManager) {
				return $http.post("http://localhost:8080/employers/add/"+idManager, userForm)
						.then(function(response) {
							return response;
						}, function(err) {
							return err.data.message;
						});
			}
			//get AppEmp
			this.appEmployer=function(id){
		        var promise1=$http({
		            method: 'GET',
		            url: "http://localhost:8080/appEmployer/"+id
		            });
		        var promise2=promise1.then(function(response){
		        	return response.data;
		        },function(err){
		            console.log(err);

		        });
		     return promise2;
		    }
			//get employer manager			
			this.getEmployerManager=function(id){
			var promise1=$http({
					method: 'GET',
					     url: "http://localhost:8080/employerManager/"+id
					});
					var promise2=promise1.then(function(response){
					return response.data;
					},function(err){
						console.log(err);
			
					});
						 return promise2;
					}
								
			//all sessions			
				this.allSession=function(idEmp){
					var promise1=$http({
						method: 'GET',
						url: "http://localhost:8080/sessions/"+idEmp
						});
					var promise2=promise1.then(function(response){
						return response.data;
					},function(err){
						console.log(err);
	
					});
				 return promise2;
				}
				//session en cour			
				this.sessionEnCour=function(idEmp){
					var promise1=$http({
						method: 'GET',
						url: "http://localhost:8080/sessionEnCour/"+idEmp
						});
					var promise2=promise1.then(function(response){
						return response.data;
					},function(err){
						console.log(err);
	
					});
				 return promise2;
				}
			//session cloturé
			this.sessionCloture=function(idEmp,idAnn){
				var promise1=$http({
					method: 'GET',
					url: "http://localhost:8080//sessionCloture/"+idEmp+"/"+idAnn
					});
				var promise2=promise1.then(function(response){
					return response.data;
				},function(err){
					console.log(err);

				});
			 return promise2;
			}
		//add employers to a manager		
			 this.chooseEmployers=function(employers,idEmp){     	
				return $http.put("http://localhost:8080/employersSelect/"+idEmp,employers)
				.then(function(response){
					
				}), function (err) {
					
						console.log(err);
					};
			 }	
			 //add employer to a manager		
			 this.managerEmployer=function(employer,idManager){     	
				return $http.put("http://localhost:8080//affectEmployer/"+idManager,employer)
				.then(function(response){
					
				}), function (err) {
					
						console.log(err);
					};
			 }
	
			//get list of all teams
			this.TeamsList=function(){
				var promise1=$http({
					method: 'GET',
					url: "http://localhost:8080/teamDivList"
					});
				var promise2=promise1.then(function(response){
					return response.data;
				},function(err){
					console.log(err); 
				});
			 return promise2;
			}
			//get list of bu
				this.BuList=function(){
					var promise1=$http({
						method: 'GET',
						url: "http://localhost:8080/buList"
						});
					var promise2=promise1.then(function(response){
						return response.data;
					},function(err){
						console.log(err);
					});
				 return promise2;
				}
			
			//employers list by team
			this.EmployersListByTeams=function(team){
				var promise1=$http({
					method: 'GET',
					url: "http://localhost:8080/employersListByTeam/"+team
					});
				var promise2=promise1.then(function(response){
					return response.data;
				},function(err){
					console.log(err);
				});
			 return promise2;
			}
			//get team by id

			this.getTeam=function(team){
				var promise1=$http({
					method: 'GET',
					url: "http://localhost:8080/team/"+team
					});
				var promise2=promise1.then(function(response){
					return response.data;
				},function(err){
					console.log(err);
				});
			 return promise2;
			}
			//get Managers List
			this.getManagersList=function(team){
				var promise1=$http({
					method: 'GET',
					url: "http://localhost:8080/managers"
					});
				var promise2=promise1.then(function(response){
					return response.data;
				},function(err){
					console.log(err);
				});
			 return promise2;
			}

		//get manager team list
		this.getManagersTeamList=function(idManager){
			var promise1=$http({
				method: 'GET',
				url: "http://localhost:8080/managerTeams/"+idManager
				});
			var promise2=promise1.then(function(response){
				return response.data;
			},function(err){
				console.log(err);
			});
		 return promise2;
		}
			

	})

})();