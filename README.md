# URL Monitoring System

This system allows you to monitor URLs, create reports about their availability and get notified whenever the system goes down.

You can view the requirements the project was built for: [REQUIREMENTS](/REQUIREMENTS.md)
## Main Features

### Role-Based Authorization System
Any user wants to use the system must register an account first.
Authorization is based on JWT Bearer tokens, upon login the user gets his token which is available for certain time (controlled by environment variable).


### Inspection service
#### Create Inspection
Register an inspection with these parameters:

- `name`: The name of the check.
- `url`: The URL to be monitored.
- `protocol`: The resource protocol name `HTTP`, `HTTPS`, or `TCP`.
- `path`: A specific path to be monitored *(optional)*.
- `port`: The server port number *(optional)*.
- `timeout` *(defaults to 5 seconds)*: The timeout of the polling request *(optional)*.
- `interval` *(defaults to 10 minutes)*: The time interval for polling requests *(optional)*.
- `threshold` *(defaults to 1 failure)*: The threshold of failed requests that will create an alert *(optional)*.
- `authentication`: An HTTP authentication header, with the Basic scheme, to be sent with the polling request *(optional)*.
  - `authentication.username`
  - `authentication.password`
- `httpHeaders`: A list of key/value pairs custom HTTP headers to be sent with the polling request (optional).
- `assert`: The response assertion to be used on the polling response (optional).
  - `assert.statusCode`: An HTTP status code to be asserted.
- `ignoreSSL`: A flag to ignore broken/expired SSL certificates in case of using the HTTPS 





#### Remove Inspection
This would delete the inspection from the database and would stop the cron job.


### Reporting system
The user makes a request with the inspection id and gets a full report on the data.
- `status`: The current status of the URL.
- `availability`: A percentage of the URL availability.
- `outages`: The total number of URL downtimes.
- `downtime`: The total time, in seconds, of the URL downtime.
- `uptime`: The total time, in seconds, of the URL uptime.
- `responseTime`: The average response time for the URL.
- `history`: Timestamped logs of the polling requests.

### Alerting System
This system is easily extendable as there is an interface called INotificationClient any new client that should send alert (for downtime) should implement this interface, and then this should be injected in the AlertingService (just be added to the constructor) and whenever the alert is invoked every notificationClient would send an alert in its own way (By email or any other way).


## Environment setup

I've used MongoDB as the database and docker for running it.
Please create a .env file with the fields found in .env.sample

Then you can run the docker compose file using command:
```docker-compose up```

And run the project normally using the following commands

### NPM commands
This project was built using TypeScript enforces us to build the project before running (for production version)
To build the project.
```
npm run build
```

To start the built project.
```
npm run start:prod
```

To Run the project in development mode.
```
npm run start:dev
```


### Database
It is recommended to import the database dump found.
In folder environment_setup there are CSV files with the database dump.
This dump has some roles and claims so that the application becomes easier to be tested.

users credentials:
  "email": "mohamed.m.foula@gmail.com",
  "password": "test",


## APIs
All APIs are found in the insomnia package called url-monitoring-system.json that could be found in folder environment_setup

### Authorization (Admin and User)

#### Login
POST /auth/login
Example body:
```
{
  "email": "mohamed.m.foula@gmail.com",
  "password": "test"
}
```
Example output:
```
{
	"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGRjYzFlYWNkYTlmNTQxNzQ3YTJhODMiLCJ1c2VybmFtZSI6InRlc3QxIiwiaWF0IjoxNjkyNDM3NzY1LCJleHAiOjE2OTI1MjQxNjV9.aVnSiW9BUzfUvcdPqcKiGHxntrQgeJq7mw_Fy8Ri__o"
}
```


## As a user you can use these API with authorization bearer JWT token

### Authorization

#### Signup user account

POST /auth/signup
```
{
  "email": "mohamed.m.foula@gmail.com",
  "password": "test",
  "phone": "012",
  "firstName": "Test1",
  "lastName": "test1",
  "gender": "male",
  "address": "miami",
  "birthDate": "01-01-2023"
}
```

### Inspection
#### Create Inspection

POST /inspections
Example body to succeed:
```
{
	"name": "Googles74",
	"url": "google.com",
	"protocol": "HTTPS",
	"testCustomField": "test",
	"interval": 0,
	"intervalss": 3100
}
```

Example body to fail:
```
{
	"name": "Googles62",
	"url": "google.com",
	"protocol": "HTTPS",
	"testCustomField": "test",
	"assert": {
		"statusCode": 10
	},
	"interval": 1,
	"intervalss": 3100,
	"threshold": 2
}
```

#### Delete Inspection

Delete /inspections/:id


### Report
#### Create Report

GET /reports/inspections/:id

example output:
```
{
	"history": [
		{
			"createdAt": "2023-08-17T23:37:30.542Z",
			"responseTime": 524,
			"statusCode": 200,
			"statusText": "OK",
			"_id": "64deaf3dd4b4536f913a4649"
		},
		{
			"createdAt": "2023-08-17T23:37:45.453Z",
			"responseTime": 447,
			"statusCode": 200,
			"statusText": "OK",
			"_id": "64deb336d4b4536f913a464b"
		},
		{
			"createdAt": "2023-08-17T23:54:31.248Z",
			"responseTime": 643,
			"statusCode": 200,
			"statusText": "OK",
			"_id": "64deb337d4b4536f913a464e"
		},
		{
			"createdAt": "2023-08-17T23:54:45.446Z",
			"responseTime": 435,
			"statusCode": 200,
			"statusText": "OK",
			"_id": "64deb345d4b4536f913a4652"
		},
		{
			"createdAt": "2023-08-17T23:55:00.489Z",
			"responseTime": 472,
			"statusCode": 200,
			"statusText": "OK",
			"_id": "64deb354d4b4536f913a4657"
		},
		{
			"createdAt": "2023-08-17T23:55:15.463Z",
			"responseTime": 454,
			"statusCode": 200,
			"statusText": "OK",
			"_id": "64deb363d4b4536f913a465d"
		},
		{
			"createdAt": "2023-08-17T23:55:30.508Z",
			"responseTime": 502,
			"statusCode": 200,
			"statusText": "OK",
			"_id": "64deb372d4b4536f913a4664"
		},
		{
			"createdAt": "2023-08-17T23:55:45.529Z",
			"responseTime": 520,
			"statusCode": 200,
			"statusText": "OK",
			"_id": "64deb381d4b4536f913a466c"
		}
	],
	"outages": 8,
	"uptime": 0,
	"downtime": 70,
	"availability": 0,
	"responseTime": 499.625,
	"status": "Not Available",
	"statusCode": 200
}
```



## As an admin you can use these API with authorization bearer JWT token

### Authorization

#### Create admin account

POST /auth/signupAdmin
```
{
  "email": "admin2@gmail.com",
  "password": "admin2",
  "phone": "116",
  "firstName": "Test2",
  "lastName": "test2",
  "gender": "male",
  "address": "miami",
  "birthDate": "01-01-2023"
}
```

### Claims

Create claim
Example body:
```
{
  "claimName": "user-inspection",
  "moduleName": "Inspection",
  "read": true,
  "create": true,
  "update": true,
  "delete": true
}
```
Example output:
```
{
	"moduleName": "Inspection",
	"read": true,
	"create": true,
	"update": true,
	"delete": true,
	"_id": "64dcc1b7cda9f541747a2a7d",
	"createdAt": "2023-08-16T12:31:51.710Z",
	"updatedAt": "2023-08-16T12:31:51.710Z",
	"__v": 0
}
```


### Roles

POST /roles
```
{
	"name": "user",
	"claims" : ["64dcc1b7cda9f541747a2a7d"]
}
```

## Future Work

- Add webhooks integration
- Add unit tests


