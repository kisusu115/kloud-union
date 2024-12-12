const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const serverless = require('serverless-http');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const subwayRoutes = require('./routes/subwayRoutes');
const pageRoutes = require('./routes/pageRoutes');
const distanceRoutes = require('./routes/distanceRoutes');
const weatherRoutes = require('./routes/weatherRoutes');
const todoRoutes = require('./routes/todoRoutes');
const alarmRoutes = require('./routes/alarmRoutes');
const authRoutes = require('./routes/authRoutes');
const cognitoRoutes = require('./routes/cognitoRoutes');

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = require('./swagger');

// 환경 변수 설정 로드
dotenv.config();

// Swagger 설정
const swaggerDocs = swaggerJsDoc(swaggerOptions);

const app = express();

// CORS 설정 
app.use(cors({
  origin: ['https://morning.auth.ap-northeast-2.amazoncognito.com', 'http://localhost:8080','http://localhost:5173', 'http://localhost:3000'
    , 'https://kloud-union-fe.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));


// 세션 미들웨어 설정
app.use(session({
  secret: process.env.SESSION_SECRET, // 비밀키 설정
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true, sameSite: 'None' },
}));

// Passport 초기화
require('./passport/index')(app);

// 정적 파일 경로 설정
// app.use(express.static(path.join(__dirname, 'public')));

// MongoDB 연결 설정
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// JSON 형식의 요청 body 파싱
app.use(express.json());

// EJS 설정 추가
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // views 폴더 경로 설정

// 기본 라우트
app.get('/', (req, res) => {
  res.status(302).redirect('/api/page/login');
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// 라우터 설정
app.use('/api/user', userRoutes);           // 사용자 관련 API 라우트
app.use('/api/subway', subwayRoutes);       // 대중교통 관련 API 라우트
app.use('/api/distance', distanceRoutes);   // 거리 관련 API 라우트
app.use('/api/weather', weatherRoutes);     // 날씨 관련 API 라우트
app.use('/api/todo', todoRoutes);           // TODO 관련 API 라우트
app.use('/api/alarm', alarmRoutes);         // 알람 관련 API 라우트
app.use('/api/cognito', cognitoRoutes);     // 사용자 관련 API 라우트
app.use('/api/page', pageRoutes);           // 페이지 반환 API 라우트
app.use('/auth', authRoutes);               // 소셜로그인 관련 라우트

// Lambda 핸들러
module.exports.handler = serverless(app);