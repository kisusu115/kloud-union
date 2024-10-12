const getMethodName = async (req, res) => {
  try {
    res.status(200);
  } catch (error) {
    res.status(500);
  }
};

const postMethodName = async (req, res) => {
  try {
    res.status(200);
  } catch (error) {
    res.status(500);
  }
};

module.exports = {
    getMethodName,
    postMethodName,
};
