# CSCI4830Project

STEPS:
1. Ensure that both node and npm are installed on your machine
2. git pull for the latest copy of the codebase
3. Navigate to the 'project' directory and install all npm dependencies with npm install -d
3a. -d is short for -dev and will install the specific dev dependencies for yall
4. While still in the 'project' dir, run the command 'nodemon app'. This will run the application on localhost:3000/


NEXT STEPS (generalized):
As we continue to connect the frontend and the backend, we need to make sure that the pages with the main functionality are able to get and give data from the db. One of the most popular technologies for this is called ajax, which stands for asynchronous javascript and xml. I think that we should use this for db operations like getting the employees with a certain company, getting the appointments for a certain client, etc. We can query specific data from the db and present it with the proper context from the page. For example, on the create appointment page from the client side, we need to first query the employees from a given company, and then query that employees free days. Both of these querys are specific but have context becuase they are used in the create appointment page. 


NOTES:
-need to use ajax for specific db queries
-need to alter main 'GET' and 'POST' functions to ensure user is logged in
