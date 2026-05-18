import { ApiError } from "../utils/ApiError.js";
const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json(new ApiError(403, "Access denied. Admins only."));
  }
  next();
};
export {isAdmin}