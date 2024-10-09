const passport = require('passport');

const kakaoAuthenticate = (req, res, next) => {
    passport.authenticate('kakao')(req, res, next);
};

const kakaoAuthenticateCallback = async (req, res, next) => {
    passport.authenticate('kakao', {
        failureRedirect: '/', // kakaoStrategy에서 실패한다면 실행
    })(req, res, (err) => {
        if (err) {
            return next(err); // 에러가 발생하면 next로 전달
        }

        // 인증 성공 시 콜백 실행
        res.redirect('/page/welcome');
    });
};
  
module.exports = {
    kakaoAuthenticate,
    kakaoAuthenticateCallback,
};
  