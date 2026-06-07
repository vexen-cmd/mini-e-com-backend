const jwt = require("jsonwebtoken");

require("dotenv").config();

function verify(role) {
  return async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "not a valid user" });
    }

    try {
      const decodedId = jwt.verify(token, process.env.JWT_SECRET);

      if (decodedId.role !== role) {
        return res
          .status(401)
          .json({ message: `you dont have the right to the ${user} page` });
      }

      req.user = decodedId;

      next();

    } catch (error) {
      console.log(error);
      res.status(401).json({ message: "not the correct user" });
    }
  };
}

module.exports = verify;
