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
      <div class="chat-body">
        <p>Hello! I’m here to help with TasGov communications guidance.<br><br>
        You can ask about topics like:<br>
        • Strategic Comms<br>
        • OASIS Framework<br>
        • Media and Stakeholders<br>
        • Evaluation or Insight<br><br>
        This AI is still learning — for best results, keep your questions short and specific.</p>
      </div>
    </div>
  `;

  // Toggle logic
  document.getElementById('ai-chat-icon').addEventListener('click', toggleChat);
});

function toggleChat() {
  const chatBox = document.getElementById('ai-chat-box');
  chatBox.style.display = chatBox.style.display === 'flex' ? 'none' : 'flex';
}
