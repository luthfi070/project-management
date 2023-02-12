**Endpoint**

This API has a few Endpoint divided from 3 main routes, every endpoint has a different functionality, here is all available endpoint that can be used in this API 

1. Users
   - Create New Users ( /users ) [ POST ]

        This endpoint is used to create / register new Users, you need to send some data inside a JSON object to use this endpoint

        {
            "name": "dirga",
            "email": "dirga@gmail.com",
            "password": "qwerty"
        }

    - Login ( /users/login ) [ POST ]

        This endpoint is used for login by registered users, which then will receive a token that need to be included in every endpoint except Register and Login, to make sure only registered and valid users can use this API

        {
            "email": "yusuf@gmail.com",
            "password": "qwerty"
        }

    - Get All Users ( / ) [ GET ]

        This endpoint is used to fetch all available users in this API Database, and send them in a JSON Response to be consumed and used by users, you need token that you received from Login Endpoint to use this Endpoint

    - Get User By Id ( /:user_id ) [ GET ]
  
        This endpoint is used to fetch User Data only by specific id that has been inserted into the params, users can only see his own data, which means every user can only see one data, you need token that you received from Login Endpoint to use this Endpoint

    - Update User By Id ( /:user_id ) [ PUT ]

        This endpoint is used to update User Data by specific id that has been inserted into the params, user can only update his own data, you need token that you received from Login Endpoint to use this Endpoint

        {
            "name": "yusuff",
            "email": "yusuf@gmail.com",
            "password": "qwerty"
        }

    - Delete User By Id ( /:user_id ) [ PUT ]

        This endpoint is used to delete User Data by specific id that has been inserted into the params, user can only delete his own data, you need token that you received from Login Endpoint to use this Endpoint

2. Projects
    - Create new Projects ( /projects ) [ POST ]

        This endpoint is used to create a new Projects, the created Projects will then be linked to the Users Account, every users can create more than one Projects. you need token that you received from Login Endpoint to use this Endpoint

        {
            "name": "Project Rumah Yusuf",
            "description": "Project inisiasi yusuf 2020",
            "date": "2023-05-15"
        }

    - Get All Project ( / ) [ GET ]

        This endpoint is used to fetch all project by user id, to make sure only authorized user can see his own Project. you need token that you received from Login Endpoint to use this Endpoint

    - Get Project By Id ( /:project_id ) [ GET ]

        This endpoint is used to fetch project by project id and user id, to make sure only authorized user can see his own project, this endpoint will output one JSON Object containing project data, you need token that you received from Login Endpoint to use this Endpoint

    - Update Project By Id ( /:project_id ) [ PUT ]

        This endpoint is used to update project by project id and user id to make sure only authorized user can modify his own project, this endpoint will make a change to corresponded Project in the Database, you need token that you received from Login Endpoint to use this Endpoint

        {
            "name": "Project Tol",
            "description": "Project inisiasi Tol 2022",
            "date": "2023-05-15"
        }

    - Delete Project By Id ( /:project_id ) [ DELETE ]

        this endpoint is used to delete project by project id and user id to make sure only authorized user can modify his own project, this endpoint will make a change to corresponded Project in the Database, you need token that you received from Login Endpoint to use this Endpoint

3. Tasks
    - Create Task ( / ) [ POST ]

        This endpoint is used to create a Task as a sub part from Project that has been created before, one project can have many Task inside it, you need token that you received from Login Endpoint to use this Endpoint

        {
            "name": "Task Mingguan 2",
            "description": "Membuat pondasi 2 yusuf",
            "date": "2023-05-15",
            "project_id": "63e89c1ba97d9395158e59a9"
        }

    - Get All Task ( / ) [ GET ]

        This endpoint is used to get all available task specific to one user only, this endpoint will give a JSON Object as a response containing all Task available, you need token that you received from Login Endpoint to use this Endpoint

    - Get Task By Id ( /:task_id ) [ GET ]

        This endpoint is used to get one task by id and by user id to make sure only authorized user can see the data, this endpoint will give a JSON Object containing one task data, you need token that you received from Login Endpoint to use this Endpoint

    - Update Task By Id ( /:task_id ) [ PUT ]

        This endpoint is used to update task by id and by user id to make sure only authorized user can modify the data, you need token that you received from Login Endpoint to use this Endpoint

    - Delete Task By Id ( /:task_id ) [ DELETE ]

        This endpoint is used to delete task by id and by user id to make sure only authorized user can modify the data, you need token that you received from Login Endpoint to use this Endpoint