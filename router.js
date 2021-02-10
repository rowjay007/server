const Authentication = require("./controllers/authentications");
module.exports = function (app) {
  app.post("/signup", Authentication.signup);
};
