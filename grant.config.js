module.exports = {
  defaults: {
    origin: process.env.API_ORIGIN,
    state: true,
    transport: 'querystring'
  },
  linkedin: {
    key: process.env.CLIENT_ID,
    secret: process.env.CLIENT_SECRET,
    dynamic: ['callback'],
    transport: 'querystring',
    scope: [
      'r_basicprofile',
      'r_emailaddress',
      'r_1st_connections_size',
      'rw_ads',
      'r_ads',
      'r_ads_reporting',
      'r_organization_social',
      'rw_organization_admin',
      'w_member_social'
    ],
    // response: ["tokens", "raw", "jwt", "profile", "code"],
    overrides: {
      express: {
        callback: '/user/grant',
        transport: 'session'
      },
      myserver: {
        callback: '/user/grantserver',
        transport: 'session'
      }
    }
  }
};
