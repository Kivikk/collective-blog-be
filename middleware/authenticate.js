import jwt from "jsonwebtoken";

export const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    console.log("AuthToken:", token);
    if (!token) return next(new Error("Forbidden", 403));

    const payload = await jwt.verify(token, process.env.SECRET_KEY ?? "secret");
    req.userId = payload.id;

    console.log(req.userId)
    next();
  } catch (error) {
    next(error);
  }
};
