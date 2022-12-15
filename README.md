# talentql_spa

# TalentQL PROJECT (Cut Session):

Cut Session is an application that solves the problem of scheduling sessions in photo and music studios, so that customers can simply go online and book sessions after seeing which ones are open on the dates they are interested in.

## General Features

1. Sessions are time slots of either 45 minutes, 60 minutes or 90 minutes and can exist from 9am to 8pm on weekdays or 10am to 10pm on Saturdays
2. Authenticated users can search for photo studios by name or city
3. Users can specify a date or date-range and see what sessions are availabe.
4. Users can book a session (a time slot in a specific day), making it unavailable for others to book within same date-time
5. Given that mercanats will likely have their own websites and they want their visitors to be able to easily see available sessions, the platform makes this possible by creating and exposing a HTML widget which merchants can just embed into their websites.

## Implementation Requirements (Frontend)

1. No React, Vue, Angular or any other such tools. Prioritize HTML, CSS and Javascript/Typescript. You may use CSS tools like Tailwind and JS libraries for managing state, navigation, and local data storage.
2. The `/register/*` endpoints lets you sign-up users and merchants, after whoch they can sign-in with `/sign-in`
3. The `/clients` endpoint lets you fetch a list of users or merchants
4. Use `/studios/:merchantId` to create a weekday or weekend session for a studio
5. Use `/bookings` to book a studio session for a user
6. Ensure all input data from the UI is validated against the data constraints for each endpoint (e.g max-length)
7. Ensure that the UI adheres to responsive web design guidelines and is fully functional on mobile screens
8. Ensure all input fields in the UI have a data attribute in the format of data-FIELDNAME where FIELDNAME is the name of the field in the API's query pramater, path parameter or request body E.g the /sign-in endpint expects a username, password and accessType to be provided when called, so the input field in your UI for capturing the username from the user should have a data attribute of data-username while data-accesstype (all lowercase) should be used in the input for accessType
9. Write your code in well formatted ES6 syntax. Better if you can stick to TypeScript
10. Be creative but don't obsess over fancy UIs. Clean and simple is fine. Fully functional and usable is the goal here. Run your deployed app through https://pagespeed.web.dev/ and aply the reccomendations to the best of your ability

## How it works

### Pre-requisites and Local Development

Developers using this project should already have and have good knowledge of:

- node
- Javascript

Clone the application by following the instructions below

```
git clone https://github.com/todak2000/talentql_spa.git
cd talentql_spa
node server.js
```

#### Backend

Mock API was provided as documented here
https://pipeline.stoplight.io/docs/pipelinev2-projects/branches/main/sprgmajz1e0wb-cut-session

## Author

[Daniel Olagunju](https://github.com/todak2000)
