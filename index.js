const recipe = require("./triggers/recipe");

const addApiKeyToHeader = (request, z, bundle) => {
  request.headers["MY-AUTH-HEADER"] = bundle.authData.apiKey;
  return request;
};

const App = {
  // This is just shorthand to reference the installed dependencies you have.
  // Zapier will need to know these before we can upload.
  version: require("./package.json").version,
  platformVersion: require("zapier-platform-core").version,

  // If you want your trigger to show up, you better include it here!
  triggers: {
    [recipe.key]: recipe, // new line of code
  },

  authentication: {
    type: "custom",
    fields: [{ key: "apiKey", type: "string" }],
    test: (z, bundle) => {
      const promise = z.request(
        "http://57b20fb546b57d1100a3c405.mockapi.io/api/me"
      );
      return promise.then((response) => {
        if (response.status !== 200) {
          throw new Error("Invalid API Key");
        }
      });
    },
  },

  beforeRequest: [addApiKeyToHeader],

  // If you want your searches to show up, you better include it here!
  searches: {},

  // If you want your creates to show up, you better include it here!
  creates: {},

  resources: {},
};

module.exports = App;
