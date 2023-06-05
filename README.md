# GraphiQL app

## Deploy:
> link: https://sch-aa-vk.github.io/graphiql-app/#/

## Description:
This application is developed on React, TypeScript, Redux using additional libraries and resources such as Redux Toolkit, Firebase, i18next, Codemirror and PrimeReact, as a final project on the course RsSchool React and is a playground/IDE for querying the Countries GraphQL API. It is localized into two languages and fully adaptive (up to 320 pixels), with responsive layout. In order to use the application, you need to log in and go to the main page. It consists of several parts, such as a documentation block with a description of the API schema, a block for creating a request with the ability to open several working tabs, a block for variables and headers, and finally a block for displaying the result in the JSON format.

> If you have any problems with authorization, please use the login: sch.aa.vk@gmail.com , password: @aminas18

## Screenshot:
<img width="1440" alt="Снимок экрана 2023-05-27 в 15 43 59" src="https://github.com/sch-aa-vk/graphiql-app/assets/89934145/23895416-0427-41f8-aad9-fe9328966e2b">
<img width="1440" alt="Снимок экрана 2023-05-27 в 15 44 30" src="https://github.com/sch-aa-vk/graphiql-app/assets/89934145/f7dce0b6-875b-49fa-8ec6-277aa44fbf85">

## Cross-check criteria:
1. Welcome route (**10 points**)
    - [x] The welcome page should contain general information about the developers, project, and course. (**2 point**)
    - [x] In the upper right corner there are 2 buttons: Sign In and Sign Up. (**2 point**)
    - [x] If login token is valid and unexpired, change the Sign In and Sign Up buttons to the "Go to Main Page" button. (**2 point**)
    - [x] When the token expires - the user should be redirected to the "Welcome page" automatically. (**3 point**)
    - [x] Pressing the Sign In / Sign up button redirects a user to the route with the Sign In / Sign up form. (**1 point**)
2. Sign In / Sign Up  - (**20 points**)
    - [x] Buttons for Sign In / Sign Up / Sign Out are everywhere where they should be (**5 points**)
    - [x] Client-side validation should be implemented. (**10 points**)
    - [x] Upon successful login, the user should be redirected to the Main page (**3 point**)
    - [x] If the user is already logged in and tries to reach these routes, they should be redirected to the Main page. (**2 point**)
3. GraphiQL route - (**50 points**)
    - [x] Working editor allowing to edit the query. (**15 points**)
    - [x] Working documentation explorer, should be visible only when sdl request will succeed. (**15 points**)
    - [x] Variables section. Should be closed/opened (**5 points**)
    - [x] Headers section. Should be closed/opened (**5 points**)
    - [x] Response section. (**10 points**)
4. General requirements - (**10 points**)
    - [x] Localization (**5 point**)
    - [x] Sticky header (**5 points**)
