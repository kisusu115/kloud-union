const authMiddleware = (req, res, next) => {
    // 인증 관련 로직이 들어갈 부분.. JWT?
    console.log('Auth Middleware');
    next();
  };
  
  module.exports = authMiddleware;
  