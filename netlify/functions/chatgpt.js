import fetch from 'node-fetch';

export default async function handler(req) {
  try {
    const body = await req.json();
    const userMsg = body.message;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant for Tasmanian Government communicators. Keep responses short, friendly, and relevant to public sector campaigns.' },
          { role: 'user', content: userMsg }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json(); // ✅ this is the correct way to get the JSON

    return new Response(JSON.stringify({ reply: data.choices[0].message.content }), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err) {
    console.error('OpenAI API Error:', err);

    return new Response(JSON.stringify({ reply: "Sorry, something went wrong while getting the AI response." }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500
    });
  }
}
