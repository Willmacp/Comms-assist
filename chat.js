document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById('chat-widget-container');

  container.innerHTML = `
    <div id="ai-chat-icon" title="AI Assist">AI Assist</div>
    <div id="ai-chat-box">
      <div class="chat-header">
        <strong>Comms Assist AI</strong>
        <button onclick="toggleChat()">×</button>
      </div>
      <div class="chat-body" id="chat-body">
        <div class="ai-msg">
          Hello! I’m here to help with TasGov communications guidance.<br><br>
          You can ask about:<br>
          • Strategic Comms<br>
          • OASIS Framework<br>
          • Media or Stakeholders<br>
          • Evaluation or Insight<br><br>
          Try something like: “How do I plan a campaign?”
        </div>
      </div>
      <div class="chat-input">
        <input type="text" id="chat-input-field" placeholder="Type your question..." />
        <button onclick="handleUserQuery()">Send</button>
      </div>
    </div>
  `;

  document.getElementById('ai-chat-icon').addEventListener('click', toggleChat);
  document.getElementById('chat-input-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') handleUserQuery();
  });
});

function toggleChat() {
  const chatBox = document.getElementById('ai-chat-box');
  chatBox.style.display = chatBox.style.display === 'flex' ? 'none' : 'flex';
}

function handleUserQuery() {
  const inputField = document.getElementById('chat-input-field');
  const query = inputField.value.trim();
  if (!query) return;

  const body = document.getElementById('chat-body');

  const userMsg = document.createElement('div');
  userMsg.className = 'user-msg';
  userMsg.textContent = query;
  body.appendChild(userMsg);

  const aiMsg = document.createElement('div');
  aiMsg.className = 'ai-msg';
  aiMsg.innerHTML = getAIResponse(query);
  body.appendChild(aiMsg);

  body.scrollTop = body.scrollHeight;
  inputField.value = '';
}

function getAIResponse(query) {
  const q = query.toLowerCase();

  if (q.includes('campaign') || q.includes('plan') || q.includes('oasis')) {
    return `Campaign planning uses the <strong>OASIS</strong> framework.<br><a href="strategic.html">Go to Strategic Comms</a>`;
  }

  if (q.includes('evaluation') || q.includes('measure') || q.includes('outcomes')) {
    return `Check out our Evaluation framework, including KPIs and reporting tools.<br><a href="evaluation.html">Visit Evaluation section</a>`;
  }

  if (q.includes('insight') || q.includes('data') || q.includes('research')) {
    return `Insight is critical for audience-first communications.<br><a href="insight.html">Explore Insight guidance</a>`;
  }

  if (q.includes('media') || q.includes('press') || q.includes('external')) {
    return `The Media and External Affairs section includes checklists and contacts.<br><a href="media-and-external-affairs.html">Open Media guidance</a>`;
  }

  if (q.includes('branding') || q.includes('style guide') || q.includes('visual')) {
    return `You can find logos, colour palettes and templates in our Branding section.<br><a href="branding.html">Go to Branding</a>`;
  }

  if (q.includes('mcom')) {
    return `The Modern Communications Operating Model (MCOM) is the foundation.<br><a href="mcom.html">Learn about MCOM</a>`;
  }

  if (q.includes('directory') || q.includes('contacts')) {
    return `Need to find someone? Our Department Directory might help.<br><a href="directory.html">View Directory</a>`;
  }

  return `Sorry, I’m not sure how to help with that just yet.<br><a href="strategic.html">Would you like to start with Strategic Comms?</a>`;
}
