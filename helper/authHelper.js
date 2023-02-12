const userSchema = require("../model/userModel");
const jsonwebtoken = require("jsonwebtoken");

async function checkEmail(req, res, next) {
  let emailExist = await userSchema.findOne({
    email: req.body.email,
  });

  if (emailExist) {
    res.status(409).json({
      status: "error!",
      message: `User ${req.body.email} is already used!`,
      statusCode: 409,
    });
  } else {
    next();
  }
}

async function verifyToken(req, res, next) {
  try {
    let token = req.headers["authorization"];

    if (!token) {
      throw new Error(`Failed to get token, is your token exist?`);
    }

    const bearer = token.split(" ");

    const bearerToken = bearer[1];

    if (bearerToken) {
      req.token = bearerToken;
      //   console.log(req.token);

      jsonwebtoken.verify(req.token, process.env.SECRET_KEY, (err, deco) => {
        if (err) {
          throw new Error("You need to login first to use this application!");
        }

        req.body.iduser = deco.checkEmail._id;

        // console.log(req.body.iduser);

        next();
      });
    } else {
      res.sendStatus(403);
    }
  } catch (err) {
    next(err);
  }
}

module.exports = { checkEmail, verifyToken };
