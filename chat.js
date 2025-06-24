// Render the chat widget HTML
document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById('chat-widget-container');

  container.innerHTML = `
    <div id="ai-chat-icon" title="Need help?">
      <div class="icon-text">AI Assist</div>
    </div>
    <div id="ai-chat-box">
      <div class="chat-header">
        <strong>Comms Assist AI</strong>
        <button onclick="toggleChat()">×</button>
      </div>
      <div class="chat-body" id="chat-body">
        <div class="ai-msg">Hi! I’m here to help with Tasmanian Government communications.<br><br>
        You can ask about topics like OASIS, strategic comms, evaluation, media, stakeholders, branding and more.
        </div>
      </div>
      <div class="chat-input">
        <input type="text" id="chat-input-field" placeholder="Ask me something..." />
        <button onclick="handleSend()">Send</button>
      </div>
    </div>
  `;

  document.getElementById('ai-chat-icon').addEventListener('click', toggleChat);
  document.getElementById('chat-input-field').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') handleSend();
  });
});

function toggleChat() {
  const chatBox = document.getElementById('ai-chat-box');
  chatBox.style.display = chatBox.style.display === 'flex' ? 'none' : 'flex';
}

async function handleSend() {
  const input = document.getElementById('chat-input-field');
  const message = input.value.trim();
  if (!message) return;

  appendMessage('user', message);
  input.value = '';
  const response = await getAIResponse(message);
  appendMessage('ai', response);
}

function appendMessage(sender, text) {
  const body = document.getElementById('chat-body');
  const msg = document.createElement('div');
  msg.className = sender === 'user' ? 'user-msg' : 'ai-msg';
  msg.innerHTML = text;
  body.appendChild(msg);
  body.scrollTop = body.scrollHeight;
}

async function getAIResponse(userMessage) {
  const lowerMsg = userMessage.toLowerCase();

  const keywords = [
    {
      keywords: ["media", "press", "journalist"],
      reply: `Media guidance is available on the <a href="media-and-external-affairs.html">External Affairs</a> page.`
    },
    {
      keywords: ["branding", "visual identity", "logos"],
      reply: `For branding standards, visit the <a href="branding.html">Branding</a> section or check the <a href="https://www.tas.gov.au/communications" target="_blank">Tas Gov Comms site</a>.`
    },
    {
      keywords: ["evaluation", "reporting", "results"],
      reply: `Try the <a href="evaluation.html">Evaluation</a> page — it includes the GCS Evaluation Cycle and useful templates.`
    },
    {
      keywords: ["insight", "data", "research"],
      reply: `Explore sources and strategy advice on the <a href="insight.html">Insight</a> page.`
    },
    {
      keywords: ["mcom", "model", "modern communications operating model"],
      reply: `Read about the Modern Communications Operating Model (MCOM) <a href="mcom.html">here</a>.`
    },
    {
      keywords: ["oasis", "planning", "framework"],
      reply: `The <a href="https://gcs.civilservice.gov.uk/guidance/marketing/delivering-government-campaigns/guide-to-campaign-planning-oasis/" target="_blank">OASIS Framework</a> is the UK standard for campaign planning.`
    },
    {
      keywords: ["strategy", "strategic comms", "objectives"],
      reply: `Head to the <a href="strategic.html">Strategic Communications</a> section for guidance and examples.`
    },
    {
      keywords: ["stakeholder", "community", "iap2"],
      reply: `Try the <a href="stakeholder.html">Stakeholder Engagement</a> page — it covers IAP2 principles and GCS models.`
    },
    {
      keywords: ["internal", "staff", "intranet"],
      reply: `We’ve got internal communication guidance on the <a href="internal.html">Internal Comms</a> page.`
    },
    {
      keywords: ["directory", "contacts", "comms leads"],
      reply: `Our <a href="directory.html">Directory</a> lists government comms contacts and department links.`
    }
  ];

  for (const item of keywords) {
    if (item.keywords.some(keyword => lowerMsg.includes(keyword))) {
      return item.reply;
    }
  }

  // No match, fall back to OpenAI
  try {
    const response = await fetch('/.netlify/functions/chatgpt', {
      method: 'POST',
      body: JSON.stringify({ message: userMessage }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) throw new Error("API response error");

    const data = await response.json();
    return data.reply || "I'm not sure how to help with that, but I’m learning!";
  } catch (err) {
    console.error(err);
    return "No response received. Please try again later.";
  }
}
