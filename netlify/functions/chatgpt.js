import fetch from 'node-fetch';

const handler = async (event) => {
  try {
    const { message } = JSON.parse(event.body);

    const apiKey = process.env.OPENAI_API_KEY;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant for government communicators in Tasmania, Australia. Use clear, practical language. Reference known frameworks like OASIS, MCOM, GCS, IAP2, etc. Answer with helpful suggestions and page links if possible.',
          },
          {
            role: 'user',
            content: message,
          },
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn’t generate a response.";

    return {
      statusCode: 200,
      body: JSON.stringify({ reply }),
    };
  } catch (error) {
    console.error("OpenAI API Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Something went wrong.' }),
    };
  }
};

export { handler as default };
