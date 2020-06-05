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

router.get('/', async function (req, res, next) {
  let { client } = req.query;
  let a = JSON.stringify(req, getCircularReplacer(), '\t');
  let profile = await getProfile();
  profile = JSON.stringify(profile, getCircularReplacer(), '\t');

  res.render('user', { client: client, reqjson: a, profile: profile });
});

router.post('/', function (req, res, next) {
  let { client } = req.body;

  res.render('user', { client: client });
});

router.get('/grantserver', async function (req, res, next) {
  let { client } = req.session.grant.dynamic;
  var { access_token } = req.session.grant.response;
  let reqjson = JSON.stringify(req, getCircularReplacer(), '\t');
  let profile = await getProfile(access_token);
  profile = JSON.stringify(profile, getCircularReplacer(), '\t');

  res.render('user', { client: client, reqjson: reqjson, access_token: access_token, profile: profile });
});

router.get('/grant', async function (req, res, next) {
  let { client } = req.session.grant.dynamic;
  var { access_token } = req.session.grant.response;
  let profile = await getProfile(access_token);
  let params = querystring.stringify(profile);
  let rdrct = `${client}?${params}`;
  res.redirect(rdrct);
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

const getEmail = async (token) => {
  try {
    return await axios.get('https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))', {
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
  let profile;
  try {
    let me = await getMe(token);
    let { data } = me;
    let { id, localizedFirstName, localizedHeadline, localizedLastName, vanityName } = data;
    let email = await getEmail(token);
    let { elements } = email.data;
    let { emailAddress } = elements[0]['handle~'];
    profile = { id, localizedFirstName, localizedHeadline, localizedLastName, vanityName, emailAddress };
    console.log(profile);
  } catch (error) {
    profile = error;
  }
  return profile;
};

router.get('/backhome', async function (req, res, next) {
  res.render('backhome', {});
});

module.exports = router;
