exports.setPermission = (req, res, next) => {
  const { userType, userID } = req.session;
  if (userType === "admin") {
    next();
  } else if (userType == "user") {
    if (req.params.id == userID) {
      next();
    } else {
      res.status(401).send({
        message: "You are not authorized to access this resource.",
      });
    }
  } else {
    res.status(403).send({
      message: "You are not authorized to access this resource",
    });
  }
};