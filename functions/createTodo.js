const fetch = require("node-fetch");

exports.handler = async function(event, context) {
  const { user } = context.clientContext;

  const isLoggedIn = !!user;

  if (!isLoggedIn) {
    return {
      statusCode: 401,
      body: "Unauthorized",
    };
  }

  const { title, completed } = JSON.parse(event.body);

  const response = await fetch("https://graphql.fauna.com/graphql", {
    method: "POST",
    body: JSON.stringify({
      query: `mutation CreateATodo {
        createTodo(data: {
        title: "${title}"
        completed: ${completed}
        }) {
          title
          completed
        }
      }`,
    }),
    headers: {
      authorization: process.env.FAUNA_TOKEN,
    },
  });

  const json = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(json),
  };
};
