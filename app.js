const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const subwayRoutes = require('./routes/subwayRoutes');
const weatherRoutes = require('./routes/weatherRoutes');
const todoRoutes = require('./routes/todoRoutes');
const alarmRoutes = require('./routes/alarmRoutes');
const authRoutes = require('./routes/authRoutes');

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = require('./swagger'); // swagger.js 파일 가져오기

// Swagger
const swaggerDocs = swaggerJsDoc(swaggerOptions);

// 환경 변수 설정 로드
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// 세션 미들웨어 설정
app.use(session({
  secret: process.env.SESSION_SECRET, // 비밀키 설정
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, // HTTPS가 아닌 경우 false로 설정
}));

// Passport 초기화
require('./passport/index')(app);

// 정적 파일 경로 설정
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB 연결 설정
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// JSON 형식의 요청 body 파싱
app.use(express.json());


// 테스트용 임시 API
app.get('/', (req, res) => {
  res.status(302).redirect('/page/login');
});
app.get('/page/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'loginPage.html'));
});
app.get('/page/welcome', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'welcomePage.html'));
});
app.get('/logout', (req, res) => {
  req.logout((err) => {
      if (err) {
          return next(err);
      }
      req.session.destroy((err) => {
          if (err) {
              return next(err);
          }
          res.clearCookie('connect.sid'); // 쿠키 삭제
          res.redirect('/'); // 로그인 페이지로 리다이렉트
      });
  });
});

// 라우터 설정
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api/user', userRoutes);           // 사용자 관련 API 라우트
app.use('/api/subway', subwayRoutes); // 대중교통 관련 API 라우트
app.use('/api/weather', weatherRoutes);     // 날씨 관련 API 라우트
app.use('/api/todo', todoRoutes);           // TODO 관련 API 라우트
app.use('/api/alarm', alarmRoutes);         // 알람 관련 API 라우트
app.use('/auth', authRoutes);               // 소설로그인 관련 라우트

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
