const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ",'');
  if (!token) {
    return res.status(401).json({
      success:false,
      message:"token not found"
    });
  };
  try {
    const decoded = jwt.verify(token,"balajipatil@patilbalaji");
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(422).json({
      success: false,
      message:"Token not valid"
    })
  }
}

module.exports = auth;