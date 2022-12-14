import jwt from "jsonwebtoken";
import { errorHandling } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(errorHandling(401, "You are not authenticated!"));

  jwt.verify(token, process.env.JWT_SECRETKEY, (err, user) => {
    if (err) return next(errorHandling(403, "Token is not valid!"));
    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.userId || req.user.isAdmin) next();

    return next(errorHandling(403, "You are not authorized!"));
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) next();

    console.log(req.user.isAdmin);
    return next(errorHandling(403, "You are not authorized!"));
  });
};
