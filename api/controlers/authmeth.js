const User = require('../modals/User.js');
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const createError = require('../rest/error.js');

async function register(req, res,next) {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.password, salt);   //password will not visible to admin also
    const newuser = new User({
        ...req.body, password: hash,                           //as we added hashed password separately so spread operator used 

    })
    try {
        const saved = await newuser.save();
        res.status(201).json(saved);
    } catch (error) {
        next(error)
    }

}
async function login(req, res,next) {

    try {
        const usern = await User.findOne({ username: req.body.username });
        if (!usern)
            return next(createError(404, "User not found!"));

        const userpass = await bcrypt.compare(              //retrive password fron db and compare with client password
            req.body.password,
            usern.password
        );
        if (!userpass)
            return next(createError(400, "password incorrect please try again!!"));


        const token = jwt.sign({
            id: usern._id, isAdmin: usern.isAdmin
        }, "soumyaranjansahu"  //my secret key is soumyaranjansahu so strong:)
        )
        const { password, isAdmin, ...newdata } = usern._doc;
        res.cookie("access_token", token, {
            httpOnly: true,
        })
            .status(200)
            .json({ details: { ...newdata }, isAdmin });
    } catch (error) {
        next(error)
    }


}
module.exports = { register, login }

/*The jwt.sign() function in the code you provided is used to generate a JSON Web Token (JWT) for the authenticated user. It takes two main parameters:

Payload: The first parameter of jwt.sign() is the payload, which is the data that you want to include in the JWT. In this case, it includes the id and isAdmin properties from the usern object, which represent the user's ID and admin status, respectively. These properties will be stored in the JWT.

Secret Key: The second parameter is the secret key used to sign the token. In this case, the secret key is "soumyaranjansahu". This secret key should be kept secret and known only to the server to ensure the integrity and authenticity of the JWT. 
In the code provided, after successfully generating the JWT token using jwt.sign(), the server is sending the token to the client as an HTTP-only cookie in the response. Here's what each part of the code does:

    res.cookie("access_token", token, { httpOnly: true }): This line sets a cookie named "access_token" with the generated JWT token (token) as its value. The httpOnly: true option ensures that the cookie is accessible only via HTTP(S) requests and cannot be accessed by client-side JavaScript. This helps protect the token from cross-site scripting (XSS) attacks. Storing the token as an HTTP-only cookie is a common practice for web security.
*/