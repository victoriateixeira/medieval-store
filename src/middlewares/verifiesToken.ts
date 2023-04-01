// const { verifyToken } = require('../auth/authFunctions');
// const { userService } = require('../services');

const validateToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const { data: { id } } = verifyToken(authorization);
    const user = await userService.getById(id);
    if (!user) {
      return res.status(401).json({ message: 'Expired or invalid token' });
    }
    console.log(user.dataValues, 'VALIDATETOKEN');
    req.user = user.dataValues;

    return next();
  } catch (error) {
    res.status(401).json({
      message: 'Expired or invalid token',
    });
  }
};

module.exports = validateToken;