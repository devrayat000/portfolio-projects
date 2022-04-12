const withTM = require("next-transpile-modules")(["ui", "mantine"]);

module.exports = withTM({
  reactStrictMode: true,
});
