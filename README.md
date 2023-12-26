# PROJET RESTFUL - A2
  Contributeurs:

 - Carla

 - Alexandre

 - Aurélien

Ce projet est composé de plusieurs routes:

> TOUTES CES ROUTES NECESSITE DE FOURNIR LE TOKEN JWT SAUF POUR LA ROUTE:
> **/login**


## - Route de **index.js**

PUT:
 /login: pour se connecter et reçevoir son jeton jwt

    {
        "email": "test@test.com",
        "password": ""
    }



## Routes de task.js

GET:
/tasks : récupérer les taches
PUT:
 /tasks/:model/:id : modifier le statut avec l'id

    {
                "category": "done"
    }


## Routes de user.js

 - GET:

	- /users : lister les utilisateurs 

 - POST:
	 - /users: créer un nouveau utlisateur
 - GET:
	 - /users/:id : get un id utilisateur précis
 - PUT:
	 - /users/:id : met un utilisateur à l'id précis, si il y en a un, il
   est détruit
 - DELETE
	 - /users/:id : supprimer un utilisateur avec son id
 - PATCH
	 - changer le mot de passe ou le user en fonction de l'id



# Nous tenons à remercier notre professeur qui nous a fourni la connaissance nécessaire à réaliser ce projet
