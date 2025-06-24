document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById('chat-widget-container');

  container.innerHTML = `
    <div id="ai-chat-icon" title="Need help?">
      <img src="assets/ai-icon.png" alt="AI Assistant" />
    </div>
    <div id="ai-chat-box">
      <div class="chat-header">
        <strong>Comms Assist AI</strong>
        <button onclick="toggleChat()">×</button>
      </div>
      <div class="chat-body" id="chat-body">
        <p>Hello! I’m here to help with TasGov communications guidance.<br><br>
        Try asking about:<br>
        • OASIS<br>
        • Evaluation<br>
        • Stakeholder engagement<br>
        • Branding</p>
      </div>
      <div class="chat-input">
        <input type="text" id="chat-input-field" placeholder="Type a question..." />
        <button id="chat-send-button">Send</button>
      </div>
    </div>
  `;

  // Toggle box
  document.getElementById('ai-chat-icon').addEventListener('click', toggleChat);

  // Handle send
  document.getElementById('chat-send-button').addEventListener('click', handleUserInput);
  document.getElementById('chat-input-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') handleUserInput();
  });

  function handleUserInput() {
    const input = document.getElementById('chat-input-field').value.trim();
    if (!input) return;

    const chatBody = document.getElementById('chat-body');
    chatBody.innerHTML += `<div class="user-msg">${input}</div>`;

    const lower = input.toLowerCase();
    let reply = "Sorry, I didn’t catch that. Try keywords like 'OASIS', 'branding', or 'stakeholders'.";

    if (lower.includes("oasis")) {
      reply = "OASIS is a campaign planning model: Objective, Audience, Strategy, Implementation, Scoring. You can read more on the Strategic Comms page.";
    } else if (lower.includes("stakeholder")) {
      reply = "Effective stakeholder engagement follows IAP2 principles and GCS best practice. Start with mapping influence and interest.";
    } else if (lower.includes("evaluation")) {
      reply = "Use the GCS Evaluation Framework — 6 stages linked to your campaign goals. See the Evaluation page for templates.";
    } else if (lower.includes("branding")) {
      reply = "For Tas Gov branding, check the Branding page and the Brand Tasmania toolkit. All assets should follow gov style guidelines.";
    }

    chatBody.innerHTML += `<div class="ai-msg">${reply}</div>`;
    document.getElementById('chat-input-field').value = '';
    chatBody.scrollTop = chatBody.scrollHeight;
  }
});

function toggleChat() {
  const chatBox = document.getElementById('ai-chat-box');
  chatBox.style.display = chatBox.style.display === 'flex' ? 'none' : 'flex';
}
