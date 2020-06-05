var express = require('express');
var router = express.Router();
const axios = require('axios');
const querystring = require('querystring');

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
  let { client } = req.query;
  let a = JSON.stringify(req, getCircularReplacer(), '\t');
  let profile = await getProfile();
  profile = JSON.stringify(profile, getCircularReplacer(), '\t');

  res.render('user', { client: client, reqjson: a, profile: profile });
});

router.post('/', function (req, res, next) {
  // res.send('respond with a resource');
  let { client } = req.body;
  console.log(client);

  res.render('user', { client: client });
});

router.get('/grantserver', async function (req, res, next) {
  let { client } = req.session.grant.dynamic;
  var { access_token } = req.session.grant.response;
  let a = JSON.stringify(req, getCircularReplacer(), '\t');

  let profile = await getProfile(access_token);
  let pprofile = JSON.stringify(profile, getCircularReplacer(), '\t');
  let params = querystring.stringify(profile);
  let rdrct = `${client}?${params}`;
  console.log(rdrct);

  res.render('user', { client: client, reqjson: a, access_token: access_token, profile: pprofile });
  // res.render('user', { callback: callback, reqjson: a, profile: profile });
});

router.get('/grant', async function (req, res, next) {
  let { client } = req.session.grant.dynamic;
  var { access_token } = req.session.grant.response;
  let a = JSON.stringify(req, getCircularReplacer(), '\t');

  let profile = await getProfile(access_token);
  let pprofile = JSON.stringify(profile, getCircularReplacer(), '\t');
  let params = querystring.stringify(profile);
  let rdrct = `${client}?${params}`;
  console.log(rdrct);
  res.redirect(rdrct);
  // res.render('user', { client: client, reqjson: a, access_token: access_token, profile: pprofile });
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

router.get('/backhome', async function (req, res, next) {
  res.render('backhome', {});
});

module.exports = router;
