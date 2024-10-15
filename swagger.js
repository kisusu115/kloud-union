// swagger.js
const options = {
    swaggerDefinition: {
        openapi: '3.0.3', // OpenAPI 스펙 버전
        info: {
            title: 'API Docs.',
            version: '1.0.0',
            description: 'API 문서입니다.',
        },
        servers: [
            {
                url: '/', // API 서버 URL
            },
        ],
    },
    apis: ['./routes/*.js'], // 특정 파일 지정
};

module.exports = options; // options를 CommonJS 스타일로 내보냄
