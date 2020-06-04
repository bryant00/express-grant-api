var express = require('express');
var router = express.Router();
const axios = require('axios');

const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

/* GET user listing. */
router.get('/', async function (req, res, next) {
  let { callback } = req.query;
  let a = JSON.stringify(req, getCircularReplacer(), '\t');
  let profile = await getProfile();
  profile = JSON.stringify(profile, getCircularReplacer(), '\t');

  res.render('user', { callback: callback, reqjson: a, profile: profile });
});

router.post('/', function (req, res, next) {
  // res.send('respond with a resource');
  let { callback } = req.body;
  console.log(callback);

  res.render('user', { callback: callback });
});

router.get('/grant', async function (req, res, next) {
  let { callback } = req.query;
  let a = JSON.stringify(req, getCircularReplacer(), '\t');
  var { access_token } = req.session.grant.response;
  let profile = await getProfile(access_token);
  profile = JSON.stringify(profile, getCircularReplacer(), '\t');
  res.render('user', { callback: callback, reqjson: a, access_token: access_token, profile: profile });
  // res.render('user', { callback: callback, reqjson: a, profile: profile });
});

const getMe = async (token) => {
  try {
    return await axios.get('https://api.linkedin.com/v2/me', {
      headers: {
        authorization: `Bearer ${token}`
      }
    });
  } catch (error) {
    console.error(error);
    return error;
  }
};

const getProfile = async (token) => {
  let me;
  try {
    me = await getMe(token);
    me = me.data;
  } catch (error) {
    me = error;
  }
  return me;
};

module.exports = router;
