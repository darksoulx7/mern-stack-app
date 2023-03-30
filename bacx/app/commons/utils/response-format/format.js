/*
 * Response Format will format the response with status code, message and data
 */

const _ = require('lodash');

/**
 * @param {param} param
 * @param {message} message
 * @param {location} location
 */
const generateErrorObject = (param, message, location) => ({
  param,
  message,
  location,
});

/**
 * @param {errors} errors
 */
const getError = (errors) => {
  // TODO Add schema validator
  /*
   Array object should be
   {
    "msg": "a_message",
    "param": "parameter",
    "location": "params" // optional
  }
   */
  const bosyJson = { errors: _.isArray(errors) ? errors : [errors] };
  return bosyJson;
};

/* eslint-disable no-unused-vars */
/**
 * @param {statusCode} statusCode
 */
const checkStatusCode = (statusCode) => {
  if (!statusCode) {
    throw new Error('Status code is required');
  }
  if (!_.isNumber(statusCode)) {
    throw new Error('Status code not a number');
  }
};
/* eslint-enable no-unused-vars */

/**
 * @param {req} req
 * @param {res} res
 */
const success = (req, res) => {
  res.body = res.body || {};
  res.status(200);
  res.json(res.body);
};

/**
 * @param {req} req
 * @param {res} res
 */
const created = (req, res) => {
  res.body = res.body || {};
  res.status(201);
  res.json(res.body);
};

/**
 * @param {req} req
 * @param {res} res
 * @param {errors} errors
 */
const badRequest = (req, res, errors) => {
  res.status(400);
  res.json(getError(errors));
};

/**
 * @param {req} req
 * @param {res} res
 * @param {errors} errors
 */
const unAuthorized = (req, res, errors) => {
  res.status(401);
  res.json(getError(errors));
};

/**
 * @param {req} req
 * @param {res} res
 * @param {errors} errors
 */
const notFound = (req, res, errors) => {
  res.status(404);
  res.json(getError(errors));
};

/**
 * @param {req} req
 * @param {res} res
 * @param {errors} errors
 */
const conflict = (req, res, errors) => {
  res.status(409);
  res.json(getError(errors));
};

/**
 * @param {req} req
 * @param {res} res
 * @param {errors} errors
 */
const internalError = (req, res, errors) => {
  res.status(500);
  if (errors && errors.param) {
    res.body = errors;
  } else if (errors.stack) {
    const { message, stack } = errors;
    res.body = {
      message,
      stack,
    };
  } else {
    res.body = { message: 'Internal Server Error' };
  }
  res.json(res.body);
};

const _401_response_html = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="shortcut icon" href="assets/favicon.ico">
<link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700%7CRoboto:300,400,500,600,700" rel="stylesheet" />
<title>401-Datalake</title>
<style type="text/css">
* {
-webkit-box-sizing: border-box;
    box-sizing: border-box;
}

body {	
font-family: Poppins, Helvetica, "sans-serif";
padding: 0;
margin: 0;
}

#notfound {
position: relative;
height: 100vh;
}

#notfound .notfound-bg {
position: absolute;
width: 100%;
height: 100%;
background-size: cover;
}

#notfound .notfound-bg:after {
content: '';
position: absolute;
width: 100%;
height: 100%;
background-color: rgba(238, 67, 67, 0.7);
}

#notfound .notfound {
position: absolute;
left: 50%;
top: 50%;
-webkit-transform: translate(-50%, -50%);
-ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}

.notfound {
max-width: 910px;
width: 100%;
line-height: 1.4;
text-align: center;
}

.notfound .notfound-404 {
position: relative;
height: 200px;
}

.notfound .notfound-404 h1 {
position: absolute;
left: 50%;
top: 50%;
-webkit-transform: translate(-50%, -50%);
-ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
font-size: 220px;
font-weight: 900;
margin: 0px;
color: #fff;
text-transform: uppercase;
letter-spacing: 10px;
}

.notfound h2 {
font-size: 20px;
font-weight: normal;
color: #fff;
margin-top: 20px;
margin-bottom: 15px;
}
@media only screen and (max-width: 767px) {
.notfound .notfound-404 h1 {
font-size: 182px;
}
}

@media only screen and (max-width: 480px) {
.notfound .notfound-404 {
height: 146px;
}
.notfound .notfound-404 h1 {
font-size: 146px;
}
.notfound h2 {
font-size: 15px;
}
.notfound .home-btn, .notfound .contact-btn {
font-size: 14px;
}
}

</style>
</head>

<body>

<div id="notfound">
<div class="notfound-bg"></div>
<div class="notfound">
<div class="notfound-404">
  <h1>
    401
  </h1>
</div>
<h2>we are sorry, but you are not authorized to access the DataLake System</h2>
<h2>This portal is open for all Rheem employees and outside rheem people are restricted for security reasons and need to be allowed by backend proxy. Please contact the DataLake Management team to allow access to these credentials backend.</h2>

</div>
</div>
</body><!-- This templates was made by Colorlib (https://colorlib.com) -->

</html>`;

module.exports = {
  success,
  conflict,
  created,
  internalError,
  badRequest,
  unAuthorized,
  notFound,
  generateErrorObject,
  _401_response_html,
};

