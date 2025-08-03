import JWT from "jsonwebtoken";

export const verifiedUser = (req, res, next) => {
  let token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Not Logged in" });
  }
  try {
    const decoded = JWT.verify(token, process.env.JWT_TOKEN);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log(error);
    res.statue(500).json({ message: "Invald token" });
  }
};
