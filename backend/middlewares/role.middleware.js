export const checkRole = (...allowedRoles) => {
  return (req, res, next) => {
    const role = req.user?.data?.role;

    if (!role) {
      return res.status(401).json({
        success: false,
        message: "Please Login First",
      });
    }

    const userRole = role.toLowerCase();
    const allowed = allowedRoles.map((r) => r.toLowerCase());

    if (!allowed.includes(userRole)) {
      return res.status(403).json({
        success: false,
        message: "Not Allowed!",
      });
    }

    next();
  };
};
