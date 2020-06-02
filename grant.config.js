module.exports = {
  defaults: {
    origin: process.env.API_ORIGIN,
    state: true,
    transport: "querystring",
  },
  linkedin: {
    key: process.env.CLIENT_ID,
    secret: process.env.CLIENT_SECRET,
    dynamic: ["callback"],
    transport: "querystring",
    scope: [
      "r_basicprofile",
      "r_emailaddress",
      "r_1st_connections_size",
      "rw_ads",
      "r_ads",
      "r_ads_reporting",
      "r_organization_social",
      "rw_organization_admin",
      "w_member_social",
      "r_liteprofile",
    ],
    // response: ["tokens", "raw", "jwt", "profile", "code"],
    overrides: {
      ext: {
        profile_url: "https://api.linkedin.com/v2/me",
        // scope: ["https://www.linkedin.com/oauth/v2/authorization/me"],
        scope: ["r_basicprofile", "r_emailaddress"],
        custom_params: { access_token: "tokens" },
        response: ["tokens", "raw", "profile"],
        callback: "/hello",
        transport: "session",
      },
    },
  },
};
