module.exports = function (req, res, next) {
  if (req.method === "POST" && req.originalUrl === "/apiAuthLogin") {
    return res.jsonp({
      data: {accessToken: "foo", user: {role: {id: 1}}},
      success: true,
    });
  }
  next();
};
