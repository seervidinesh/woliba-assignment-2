# Woliba Backend Engineering Assignment

RSS management system build with Hapi Js, Typescript and MySQL database with test cases written in Chai and Mocha.


# steps to run application
## Backend

1. This application is using MySQL as database service. so please make sure to have postgres running in your system.
2. Make sure you have root as mysql user and password is set to your .my.conf file. if mysql user is not root then change /backend/setup-db.sh file with your database user.
3. Navigate to backend folder and rename .env.sample file to .env
4. to setup db run `setup-db.sh` file by running `sudo setup-db.sh` command. this will create and run migration.
5. Start application by running `npm run start:dev` command. 
6. now head to localhost 4000 port. You will see the backend is ruuning.
7. I have attempted postman collection with all the API calls. You can execute the postman collection and see the results.
8. This application have test cases written.
9. to run test cases simply run `npm run test` command.

## Frontend 
1. Navigate to frontend folder.
2. run `npm start` command to run the frontend application.
3. naviagte to localhost:3000 port to check frontend application.