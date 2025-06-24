const { Configuration, OpenAIApi } = require("openai");

exports.handler = async function (event, context) {
  const body = JSON.parse(event.body);
  const prompt = body.prompt;

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });

    const aiMessage = response.data.choices[0].message.content;

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: aiMessage }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error generating response" }),
    };
  }
};

Add OpenAI serverless function for AI assistant


