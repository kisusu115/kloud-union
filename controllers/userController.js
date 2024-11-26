const { getAllUsers, findUserByUsername, updateUserByUsername } = require('../services/userService');

// Cognito 로그인 창으로 리다이렉트
const redirectToCognito = async (req, res) => {
  try {
    res.status(302).redirect('/api/cognito/login');
  } catch (error) {
    res.status(400).json({ message: 'Error redirecting to Kakao', error });
  }
};

// 모든 사용자 조회
const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// 특정 사용자 정보 조회
const getUserProfile = async (req, res) => {
    const username = req.user ? req.user.username : null; // req.user가 정의되어 있는지 확인

    if (!username) {
        return res.status(400).json({ error: 'username is required' });
    }

    try {
        const user = await findUserByUsername(username);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: '여기가 문제가' });
    }
};

// 사용자 정보 수정
const updateUserProfile = async (req, res) => {
  const username = req.user ? req.user.username : null; // req.user가 정의되어 있는지 확인

  if (!username) {
      return res.status(400).json({ error: 'username is required' });
  }
  
  const { age, gender, height } = req.body;

  try {
    const user = await updateUserByUsername(username, { age, gender, height });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const updateUserStation = async (req, res) => {
  const username = req.user ? req.user.username : null; // req.user가 정의되어 있는지 확인

  if (!username) {
      return res.status(400).json({ error: 'username is required' });
  }
  
  const { stationName, line, upDown } = req.body;

  try {
    const user = await updateUserByUsername(username, { stationName, line, upDown });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}

const updateUserTimeToLeave = async (req, res) => {
  const username = req.user ? req.user.username : null; // req.user가 정의되어 있는지 확인

  if (!username) {
      return res.status(400).json({ error: 'username is required' });
  }
  
  const { timeToLeave } = req.body;

  try {
    const user = await updateUserByUsername(username, { timeToLeave });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}

const updateUserCoordinate = async (req, res) => {
  const username = req.user ? req.user.username : null; // req.user가 정의되어 있는지 확인

  if (!username) {
      return res.status(400).json({ error: 'username is required' });
  }
  
  const { latitude, longitude } = req.body;

  try {
    const user = await updateUserByUsername(username, { latitude, longitude });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = {
  getUsers, 
  getUserProfile,
  updateUserProfile,
  updateUserStation,
  updateUserTimeToLeave,
  updateUserCoordinate,
  redirectToCognito,
};
