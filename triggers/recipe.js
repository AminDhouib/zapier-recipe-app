const listRecipes = (z, bundle) => {
  z.console.log(`Requesting receipe with style ${bundle.inputData.style}`);
  const promise = z.request(
    "http://57b20fb546b57d1100a3c405.mockapi.io/api/recipes",
    {
      params: {
        style: bundle.inputData.style,
      },
    }
  );
  return promise.then((response) => response.json);
};

const subscribeHook = (z, bundle) => {
  const data = {
    url: bundle.targetUrl,
    another_param: "my data",
    something_else: true,
    // etc
  };

  const options = {
    url: "your endpoint url",
    method: "POST",
    body: JSON.stringify(data),
  };

  // make the request and parse the response - this does not include any error handling.
  return z.request(options).then((response) => z.JSON.parse(response.content));
};

const unsubscribeHook = (z, bundle) => {
  // bundle.subscribeData contains the parsed response from the subscribeHook function.
  const hookId = bundle.subscribeData.id;

  const options = {
    url: `your endpoint url/${hookId}`,
    method: "DELETE",
  };

  return z.request(options).then((response) => z.JSON.parse(response.content));
};

module.exports = {
  key: "recipe",
  noun: "Recipe",
  display: {
    label: "New Recipe",
    description: "Triggers when a new recipe is added.",
  },

  operation: {
    inputFields: [{ key: "style", type: "string", required: false }],
    perform: listRecipes,
    performUnsubscribe: unsubscribeHook,
    performSubscribe: subscribeHook,
    sample: {
      id: 1,
      createdAt: 1472069465,
      name: "Best Spagetti Ever",
      authorId: 1,
      directions: "1. Boil Noodles\n2.Serve with sauce",
      style: "italian",
    },
  },
};
