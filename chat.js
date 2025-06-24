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
        You can ask about topics like:<br>
        • Strategic Comms<br>
        • OASIS Framework<br>
        • Media and Stakeholders<br>
        • Evaluation or Insight<br><br>
        This AI is still learning — for best results, keep your questions short and specific.</p>
      </div>
      <div class="chat-input">
        <input type="text" id="chat-input-field" placeholder="Type your question..." />
        <button onclick="sendMessage()">Send</button>
      </div>
    </div>
  `;

  document.getElementById('ai-chat-icon').addEventListener('click', toggleChat);
});

function toggleChat() {
  const chatBox = document.getElementById('ai-chat-box');
  chatBox.style.display = chatBox.style.display === 'flex' ? 'none' : 'flex';
}

function sendMessage() {
  const input = document.getElementById('chat-input-field');
  const message = input.value.trim();
  const chatBody = document.getElementById('chat-body');

  if (message !== '') {
    // Display user message
    const userMsg = document.createElement('div');
    userMsg.className = 'user-msg';
    userMsg.textContent = message;
    chatBody.appendChild(userMsg);

    // Simulated AI response
    const aiMsg = document.createElement('div');
    aiMsg.className = 'ai-msg';
    aiMsg.textContent = getAIResponse(message);
    chatBody.appendChild(aiMsg);

    chatBody.scrollTop = chatBody.scrollHeight;
    input.value = '';
  }
}

function getAIResponse(message) {
  const lower = message.toLowerCase();

  if (lower.includes("oasis")) return "The OASIS framework helps you plan campaigns: Objective, Audience, Strategy, Implementation, Scoring.";
  if (lower.includes("strategic")) return "Strategic communications align with policy outcomes and audience insight.";
  if (lower.includes("media")) return "Check out the Media and External Affairs section for interview tips and templates.";
  if (lower.includes("evaluation")) return "Evaluation is built into OASIS. Start with inputs, outputs, outcomes and impacts.";

  return "Thanks — I’ll add that to my learning list. Try asking about OASIS, Strategic Comms, or Evaluation.";
}
