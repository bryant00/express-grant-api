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
    ],
    overrides: {
      ext: {
        dynamic: ["callback"],
        transport: "querystring",
      },
    },
  },
};
