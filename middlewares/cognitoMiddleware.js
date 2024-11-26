const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

// Cognito의 JWKS URL을 사용하여 공개 키를 동적으로 가져올 클라이언트 생성
const client = jwksClient({
  jwksUri: 'https://cognito-idp.ap-northeast-2.amazonaws.com/ap-northeast-2_F75bATFk3/.well-known/jwks.json'
});

// kid에 해당하는 공개 키를 가져오는 함수
const getSigningKey = (kid, callback) => {
    client.getSigningKey(kid, (err, key) => {
        if (err) {
            return callback(err, null);
        }
        const publicKey = key.publicKey || key.rsaPublicKey;
        callback(null, publicKey);
    });
};

// JWT 토큰 검증 미들웨어
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Authorization header missing or invalid' });
    }

    const token = authHeader.split(' ')[1]; // 'Bearer ' 이후의 토큰만 추출

    // JWT 토큰을 디코딩하여 kid를 추출
    try {
        const decoded = jwt.decode(token, { complete: true }); // 오류 발생시 예외 처리
        if (!decoded || !decoded.header || !decoded.header.kid) {
            return res.status(400).json({ error: 'Failed to decode token or no kid found' });
        }

        const kid = decoded.header.kid; // JWT 헤더에서 kid 추출

        // getSigningKey 함수로 공개 키를 가져와서 JWT 검증
        getSigningKey(kid, (err, publicKey) => {
            if (err) {
                return res.status(500).json({ error: 'Unable to get public key' });
            }

            // 공개 키를 사용해 JWT 토큰을 검증
            jwt.verify(token, publicKey, (err, decoded) => {
                if (err) {
                    return res.status(403).json({ error: 'Invalid or expired token' });
                }

                // JWT에서 사용자 정보 추출
                req.user = {
                    sub: decoded.sub,
                    username: decoded.username
                };
                console.log('Decoded user information:', decoded);

                next(); // 토큰이 유효하면 다음 미들웨어로 진행
            });
        });
    } catch (error) {
        return res.status(400).json({ error: 'Error decoding token' });
    }
};

module.exports = { verifyToken };
