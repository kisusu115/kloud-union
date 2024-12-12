const axios = require('axios');
const express = require('express');
const querystring = require('querystring');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Cognito 로그인 페이지로 리다이렉트하는 함수
const cognitoAuthenticate = (req, res) => {
    const domain = 'https://morning.auth.ap-northeast-2.amazoncognito.com';
    const clientId = '6555bpitq33p0r7l1r301ct806'; // 실제 App Client ID
    const redirectUri = 'https://o5cx6i4kdj.execute-api.ap-northeast-2.amazonaws.com/api/cognito/callback'; // 실제 리다이렉트 URI
    const userPoolId = 'ap-northeast-2_F75bATFk3'; // 실제 User Pool ID

    const loginUrl = `${domain}/login?` + querystring.stringify({
        response_type: 'code',
        client_id: clientId,
        redirect_uri: redirectUri,
    });

    // 사용자를 Cognito 로그인 페이지로 리다이렉트
    res.redirect(loginUrl);
};

// Cognito의 authorization code를 통해 Access Token을 요청하는 함수
const cognitoAuthenticateCallback = async (req, res) => {
    const domain = 'https://morning.auth.ap-northeast-2.amazoncognito.com';
    const clientId = '6555bpitq33p0r7l1r301ct806'; // 실제 App Client ID
    const redirectUri = 'https://o5cx6i4kdj.execute-api.ap-northeast-2.amazonaws.com/api/cognito/callback'; // 실제 리다이렉트 URI
    const userPoolId = 'ap-northeast-2_F75bATFk3'; // 실제 User Pool ID

    const { code } = req.query; // 리다이렉트된 URL에서 `code` 파라미터를 받음

    if (!code) {
        return res.status(400).json({ error: 'Authorization code missing' });
    }

    const tokenUrl = `${domain}/oauth2/token`;

    // 토큰을 요청하는 데이터 (Authorization Code Flow)
    const data = querystring.stringify({
        grant_type: 'authorization_code',
        code: code, // URL에서 받은 authorization code
        redirect_uri: redirectUri,
        client_id: clientId,
    });

    try {
        // Cognito에서 액세스 토큰 요청
        const response = await axios.post(tokenUrl, data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        // 액세스 토큰 및 ID 토큰 받기
        const { access_token, id_token, refresh_token } = response.data;

        const decoded = jwt.decode(access_token);
        const username = decoded['username'];

        const exUser = await User.findOne({
            username: username,
        });

        // 가입되지 않은 username 이면 DB에 추가
        if (!exUser) {
            const newUser = new User({
                username: username,
                weight: 1,
            });
            try {
                await newUser.save();
            } catch (err) {
                console.error('Error creating new user:', err);
                res.status(500).json({ error: 'Failed to create new user' });
            }
        }

        res.redirect('https://kloud-union-fe.vercel.app/token-redirect?'+"access_token="+access_token);

    } catch (error) {
        console.error('Error getting tokens:', error);
        res.status(500).json({ error: 'Failed to get tokens' });
    }
};

module.exports = {
    cognitoAuthenticate, 
    cognitoAuthenticateCallback,
};