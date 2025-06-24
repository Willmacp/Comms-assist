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
function getAIResponse(userInput) {
  const msg = userInput.toLowerCase();

  if (msg.includes("oasis") || msg.includes("planning") || msg.includes("campaign")) {
    return `The OASIS model helps you plan effective communication campaigns in 5 steps: Objectives, Audience insight, Strategy, Implementation, and Scoring/evaluation.<br><a href="oasis.html">Go to OASIS Framework page</a> or <a href="https://gcs.civilservice.gov.uk/guidance/marketing/delivering-government-campaigns/guide-to-campaign-planning-oasis/" target="_blank">GCS OASIS Guide</a>`;
  }

  if (msg.includes("evaluation") || msg.includes("metrics") || msg.includes("reporting")) {
    return `Evaluation ensures your communications deliver real impact. Use the GCS Evaluation Framework to plan your measurement cycle.<br><a href="evaluation.html">Visit Evaluation Guidance</a> or <a href="https://gcs.civilservice.gov.uk/guidance/evaluation/" target="_blank">GCS Evaluation Guide</a>`;
  }

  if (msg.includes("stakeholder") || msg.includes("engagement")) {
    return `Stakeholder engagement is key to successful communication. We use IAP2 principles and the GCS stakeholder model.<br><a href="stakeholders.html">Explore Stakeholder Guidance</a> or <a href="https://gcs.civilservice.gov.uk/publications/ensuring-effective-stakeholder-engagement/" target="_blank">GCS Stakeholder Guide</a>`;
  }

  if (msg.includes("media") || msg.includes("press") || msg.includes("external affairs")) {
    return `Media relations and external affairs help shape public perception. Our toolkit includes press release tips, media lists, and issues management.<br><a href="media-and-external-affairs.html">View Media Relations Toolkit</a>`;
  }

  if (msg.includes("branding") || msg.includes("logo") || msg.includes("style guide")) {
    return `Consistent branding improves recognition and trust. Access templates and design kits here.<br><a href="branding.html">Visit Branding Page</a> or <a href="https://www.tas.gov.au/communications" target="_blank">Tas Gov Comms</a>`;
  }

  if (msg.includes("strategy") || msg.includes("strategic")) {
    return `Strategic communication ensures alignment with broader government goals.<br><a href="strategic.html">See Strategic Comms Guidance</a> or <a href="https://gcs.civilservice.gov.uk/guidance/strategy/" target="_blank">GCS Strategy Overview</a>`;
  }

  if (msg.includes("internal")) {
    return `Internal communication builds trust, aligns staff, and supports delivery. Learn more:<br><a href="internal.html">Go to Internal Comms Page</a>`;
  }

  if (msg.includes("insight") || msg.includes("research") || msg.includes("data")) {
    return `Insight helps shape campaigns around audience behaviour. Use TasGov data sources or GCS tools to inform planning.<br><a href="insight.html">View Insight Resources</a> or <a href="https://gcs.civilservice.gov.uk/guidance/insight/" target="_blank">GCS Insight Guidance</a>`;
  }

  if (msg.includes("mcom") || msg.includes("modern communications")) {
    return `The Modern Communications Operating Model (MCOM) supports effective, flexible government comms.<br><a href="mcom.html">Visit MCOM Page</a>`;
  }

  if (msg.includes("digital")) {
    return `Digital communication covers websites, social media, email campaigns and analytics. Our guidance is based on TasGov priorities.<br><a href="digital.html">Explore Digital Comms Guidance</a>`;
  }

  if (msg.includes("accessibility") || msg.includes("inclusive")) {
    return `Accessible content ensures everyone can use and understand government messages. We align with Web Content Accessibility Guidelines (WCAG).<br><a href="accessibility.html">Learn About Accessibility</a>`;
  }

  if (msg.includes("partnerships") || msg.includes("advocates") || msg.includes("influencers")) {
    return `Working with trusted partners helps amplify messages. We offer tips on identifying and using third-party messengers.<br><a href="partnerships.html">View Partnerships & Advocates Page</a>`;
  }

  // Fallback response
  return `I couldn’t find a match for that topic, but I’m still learning. Try asking about “OASIS”, “branding” or “stakeholder engagement”.<br>Or return to the <a href="index.html">Comms Assist homepage</a> for full guidance options.`;
}
