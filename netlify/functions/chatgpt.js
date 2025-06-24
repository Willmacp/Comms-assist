import fetch from 'node-fetch';

export default async (req, res) => {
  const { message } = req.body;

  const prompt = `
You are a helpful assistant for Tasmanian Government communications professionals. You specialise in campaign planning, stakeholder engagement, and the UK Government Communication Service (GCS) frameworks, including OASIS and MCOM.

User question: ${message}
`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 300,
      }),
    });

    const data = await response.json();

    if (data.choices && data.choices.length > 0) {
      return res.status(200).json({ reply: data.choices[0].message.content });
    } else {
      return res.status(500).json({ reply: "No response from OpenAI." });
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ reply: "Server error while fetching AI response." });
  }
};
