# Forensic Guardians: a repository for holding identifying marks

The goal of this system is to create and interact with a database holding pictures and information regarding identifying marks on bodies for the purpose of identifying bodies.

## The system consists of three main sub-projects tat will be elaborated on later

- the react frontend
- the node backend
- the database that stores the information

## Tools used

- react
- node
- express
- mssql
- materialui
- react router

## SETUP GUIDE

The following are step by step instructions on how to run and deploy the application in its current state on a server host such as Amazon Web Services (AWS) or similar services. 

Step 1: Run “npm install” on both the client and api folder. 

Step 2: Wait for both command prompts to finish the download and finalize the installation. 

Step 3: Run “npm start” on both the client and api folder. 

Step 4: Your default web browser should automatically open onto “localhost:3000” where you can access your web application

## NEXT STEPS

The next steps outlined below are features we would have liked to finish but couldn’t or are additional features which were planned as extras if time permitted. 


1. Body Mapping: When users click on a body part, they go to a zoomed/closer look at that body part and then they should be able to place “markers” on the zoomed in image of that body area. The markers should then have corresponding information like a tattoo. This is a feature which we have not done any work on in terms of backend and frontend and have only gone through a rough research phase. 

2. Admin Panel:

    - (Option 1): Develop admin panel in ReactJS. Existing admin panel is an ASP.NET forms system that is coded in C#. This would allow both the client and admin panel to run on the same React server.
    
    - (Option 2): Update the current admin panel in ASP.NET according to Figma designs developed by our team.

    - Additional Features:
        - Admin Panel search and filtering. Current search only allows search by name and organization, update this to include search by description, such as tattoo on left leg.
        - Admin’s can send notifications to users (for example, tell them to retake a photo that was improperly taken.)

3. Responsiveness: While our current application attempts to scale with every type of monitor or phone resolution there is still work that needs to be done to clean up and improve this scaling. There are still certain resolutions that do not scale properly resulting in the website looking strange. Future developers will need to revise our code so that the application is responsive for mobile use and different screen sizes.

4. Notification systems: Users are notified when an action is required on their account. This is a feature that we did not have time to implement as we were originally thinking of using Firebase’s emailer but ended up using AWS as our database host. This notification feature will likely be handled through an email notification. 

5. Two Factor Authentication: When a user logs in they are prompted to enter a code that is sent to them via email or text message. This is a feature which will help greatly increase account security as well as overall application security and will give the application a more “professional” feel.

6. Security: For a full live launch of the application to actual clients, there will need to be Increased security measures that are implemented on a node server as well as the react application. What these security features entail will have to be a separate discussion done with future developers.

7. Clean up/update current database design: This a more simple / basic feature. There are currently many unnecessary fields which can be cleaned up for maximum efficiency.

8. Link Current Admin Panel with Client Dashboard. Currently there are two different FGI websites; the old Admin Panel built on C# as well as the new client dashboard built on JavaScript. We have linked the two websites together via hyperlink but further work can be done to refine the link and streamline the process between navigating the two websites. 
