module.exports = {
  defaults: {
    origin: "http://localhost:3000",
    state: true,
    transport: "session",
  },
  linkedin: {
    key: process.env.CLIENT_ID,
    secret: process.env.CLIENT_SECRET,
    callback: "/hello",
    // callback: process.env.REDIRECT_URL,
    // scope: process.env.SCOPE,
    scope: [
      "r_basicprofile",
      "r_emailaddress",
      "r_1st_connections_size",
      "rw_ads",
      "r_ads",
      "r_ads_reporting",
      "r_organization_social",
      "rw_organization_admin",
    ],
  },
};
