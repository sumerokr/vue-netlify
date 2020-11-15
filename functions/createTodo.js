exports.handler = async function(event, context) {
  const { identity, user } = context.clientContext;

  console.log("user", user);
  console.log("identity", identity);

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello World" }),
  };
};
