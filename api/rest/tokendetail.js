const jwt = require("jsonwebtoken");
const createError = require("../rest/error.js");

const verifytoken =(req,res,next)=>{
 const token= req.cookies.access_token;
 console.log("Received token:", token);
 if(!token)
 return next(createError(401, "You are not authenticated!"));
  
 jwt.verify(token,"soumyaranjansahu",(error,user)=>{              //user i need it to send to other functions
  if(error)
  return next(createError(403, "token is not valid !"));
    req.user=user
  
   // next();
 });   

}

const verifyuser = (req,res,next)=>{
    verifytoken(req,res,next,()=>{
        if(req.user.id===req.params.id||req.user.isAdmin){
            next();
        }
        else{
            return next(createError(403, "You are not  authorised")); 
        }
    })

}

const verifyadmin =(req,res,next)=>{
verifytoken(req,res,next,()=>{
    if(req.user.isAdmin){
        next()
    }else{
    return next(createError(403, "You are not authorised to perform!"));
    }
})

}

module.exports={verifyadmin,verifytoken,verifyuser}




/*In the `verifyUser` function, the `verifyToken` function is used as a middleware to verify the JWT token and extract user credentials from the token. The `verifyToken` function itself has three parameters: `req`, `res`, and `next`.

Here's how the callback works:

1. When the `/checkuser/:id` route is accessed, the `verifyUser` middleware is called. It has access to the `req`, `res`, and `next` objects.

2. Inside the `verifyUser` middleware, the `verifyToken` function is invoked with four arguments: `req`, `res`, `next`, and an anonymous callback function.

3. The `verifyToken` function takes care of verifying the JWT token in the `req.cookies.access_token`. If the token is valid, it decodes the user data from the token and stores it in `req.user`. If the token is not valid, it returns an error, and the flow jumps to the error-handling middleware (if any).

4. After the `verifyToken` function completes its processing (either by verifying the token successfully or encountering an error), it calls the anonymous callback function that was passed to it as the fourth argument.

5. The anonymous callback function inside `verifyUser` checks whether the user is authorized or not. It does this by comparing `req.user.id` (which holds the user ID from the decoded token) with `req.params.id` (which holds the user ID from the URL). If they match or if the user is an admin (`req.user.isAdmin`), it calls `next()` to proceed to the next middleware or route handler.

6. If the user is not authorized, the anonymous callback function returns an error using `createError` with a status code of 403 (Forbidden), indicating that the user is not authorized to perform the action. The error will be passed to the error-handling middleware (if present) or the default error handler, and an error response will be sent to the client.

In summary, the callback function provided to `verifyToken` is responsible for checking if the user is authorized based on the decoded user data in `req.user`. The `verifyToken` function handles the token verification, and the callback function inside `verifyUser` handles the authorization logic based on the decoded user data.
Certainly! Let's break down how the `verifyUser` function works, including the inner workings of the `verifyToken` function that it calls.

1. `verifyUser` function is a middleware that will be executed when a route like `/checkuser/:id` is accessed. It takes three parameters: `req`, `res`, and `next`.

2. Inside the `verifyUser` middleware, it calls the `verifyToken` function with four arguments: `req`, `res`, `next`, and an anonymous callback function.

3. `verifyToken` function is another middleware that is responsible for verifying the JWT token. It takes the `req` object to access the cookies and extract the `access_token` from `req.cookies`. If there is no `access_token` in the cookies, it means the user is not authenticated, so it returns an error using the `createError` function with status code 401 (Unauthorized).

4. If the `access_token` is present, it proceeds to verify the token using `jwt.verify`. If there's an error during verification (e.g., token has expired or invalid signature), it returns an error using the `createError` function with status code 403 (Forbidden) to indicate that the token is not valid.

5. If the token is valid, the `jwt.verify` callback provides the decoded user data (payload) in the `user` parameter. The `verifyToken` function then sets `req.user = user`, effectively storing the decoded user data in the `req` object. This makes the user data available for other middleware or route handlers that come after this middleware.

6. After verifying the token and setting `req.user`, the `verifyToken` function calls the `next()` function to proceed to the next middleware or route handler. If there are no errors, the flow continues to the anonymous callback function provided as the fourth argument to `verifyToken`.

7. The anonymous callback function inside `verifyUser` is executed. It checks whether the user is authorized to access the resource by comparing `req.user.id` (user ID from the decoded token) with `req.params.id` (user ID from the URL) and also checks if the user is an admin (`req.user.isAdmin`). If the user is authorized (either the IDs match or the user is an admin), it calls `next()` to proceed to the next middleware or route handler.

8. If the user is not authorized, the anonymous callback function returns an error using `createError` with a status code of 403 (Forbidden), indicating that the user is not authorized to perform the action. The error will be passed to the error-handling middleware (if present) or the default error handler, and an error response will be sent to the client.

In summary, the `verifyUser` middleware first calls the `verifyToken` middleware to ensure that the user is authenticated and has a valid JWT token. If the token is valid, it proceeds to check if the user is authorized based on the decoded user data in `req.user`. The `verifyToken` middleware handles token verification, while the anonymous callback function inside `verifyUser` handles the authorization logic based on the decoded user data.*/