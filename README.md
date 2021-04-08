# Smart IoT City

This repository contains a some services whose aims are propose protocols to adapt some technologies of daily use to a situation of pandemic.

Those services are connected to different IoT devices: 
 - Elevator
 - Traffic Lights

And they will use ACME nodes, implementation of the oneM2M protocol.

## Available Services

In the project directory, you can see:

### Elevator Service

This services provides a REST API with the following structure:

### `POST /elevator`
```javascript
{
  floors: Array<Number>;
  endpoint: String;
}
```
This petition creates an instance of the elevator on the server. You must indicate the IP of the elevator and the floors which it has got. It will, internally generate an OTP for the elevator.

It will return the id:
```javascript
{
  id: Number;
}
```

### `GET /elevator/:id`
Returns the floors of the elevator.
```javascript
{
  floors: Array<Number>;
}
```

### `POST /elevator/:id/access`
```javascript
{
  otp: String;
}
```
The petition to ask access to the elevator. The otp must be the same that the one on the server.
If it is the same will give you back a token and the OTP will change, and if the OTP is not the same, it will give you back a 403 error.
```javascript
{
  token: String;
}
```
### `POST /elevator/move`
```javascript
{
  floor: Number;
}
```
Must contain the Authentication header with a valid token. It will tell the elevator to go to the floor specified if the token is valid.


-------------------------------------------------------------------------
### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
