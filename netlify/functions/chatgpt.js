const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const { OPENAI_API_KEY } = process.env;

  const body = JSON.parse(event.body || '{}');
  const userPrompt = body.prompt;

  if (!userPrompt) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'No prompt provided' }),
    };
  }

  try {
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: userPrompt }],
        max_tokens: 300
      })
    });

    const data = await openaiRes.json();

    const aiReply = data.choices?.[0]?.message?.content || 'No response received.';

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: aiReply })
    };
  } catch (error) {
    console.error('AI request failed:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Something went wrong with OpenAI' })
    };
  }
};
