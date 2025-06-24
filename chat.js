document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById('chat-widget-container');

  container.innerHTML = `
    <div id="ai-chat-icon" title="Need help?">
      <div class="ai-icon-text">AI Assist</div>
    </div>
    <div id="ai-chat-box">
      <div class="chat-header">
        <strong>Comms Assist AI</strong>
        <button onclick="toggleChat()">×</button>
      </div>
      <div class="chat-body" id="chat-body">
        <p>Hello! I’m here to help with TasGov communications guidance.<br><br>
        Ask about Strategic Comms, OASIS, Evaluation, Stakeholders, Internal Comms, and more.</p>
      </div>
      <div class="chat-input">
        <input type="text" id="user-input" placeholder="Type your question..." />
        <button onclick="handleUserMessage()">Send</button>
      </div>
    </div>
  `;

  document.getElementById('ai-chat-icon').addEventListener('click', toggleChat);
});

function toggleChat() {
  const chatBox = document.getElementById('ai-chat-box');
  chatBox.style.display = chatBox.style.display === 'flex' ? 'none' : 'flex';
}

async function handleUserMessage() {
  const input = document.getElementById('user-input');
  const userText = input.value.trim();
  if (!userText) return;

  appendMessage('user', userText);
  input.value = '';

  try {
    const response = await fetch('/.netlify/functions/chatgpt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: userText })
    });

    const data = await response.json();
    appendMessage('ai', data.reply || 'Sorry, I couldn’t find an answer for that.');
  } catch (error) {
    console.error(error);
    appendMessage('ai', 'Something went wrong while contacting the AI.');
  }
}

function appendMessage(sender, text) {
  const chatBody = document.getElementById('chat-body');
  const msg = document.createElement('div');
  msg.className = sender === 'user' ? 'user-msg' : 'ai-msg';
  msg.innerHTML = text;
  chatBody.appendChild(msg);
  chatBody.scrollTop = chatBody.scrollHeight;
}
