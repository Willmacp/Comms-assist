import fetch from 'node-fetch';

export default async function handler(req) {
  try {
    const body = await req.json();
    const userMessage = body.message;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "user", content: userMessage }],
        temperature: 0.7
      })
    });

    const data = await response.json();

    return new Response(JSON.stringify({ reply: data.choices[0].message.content }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    console.error("OpenAI API Error:", err);

    return new Response(JSON.stringify({ reply: "Sorry, something went wrong while getting the AI response." }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
