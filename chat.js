document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById('chat-widget-container');

  container.innerHTML = `
    <div id="ai-chat-icon" title="Need help?">AI Assist</div>
    <div id="ai-chat-box">
      <div class="chat-header">
        <strong>Comms Assist AI</strong>
        <button onclick="toggleChat()">×</button>
      </div>
      <div class="chat-body" id="chat-body">
        <p>Hello! I’m here to help with government communications.<br><br>
        You can ask about any topic — from campaigns and insight to branding and strategic planning. I’ll do my best to guide you or link you to helpful resources.</p>
      </div>
      <div class="chat-input">
        <input type="text" id="user-input" placeholder="Type your question..." />
        <button onclick="handleUserInput()">Ask</button>
      </div>
    </div>
  `;

  document.getElementById('ai-chat-icon').addEventListener('click', toggleChat);
});

function toggleChat() {
  const chatBox = document.getElementById('ai-chat-box');
  chatBox.style.display = chatBox.style.display === 'flex' ? 'none' : 'flex';
}

function handleUserInput() {
  const input = document.getElementById('user-input').value.trim();
  if (!input) return;

  appendMessage(input, 'user');
  document.getElementById('user-input').value = '';
  getAIResponse(input);
}

function appendMessage(message, type) {
  const chatBody = document.getElementById('chat-body');
  const msg = document.createElement('div');
  msg.classList.add(type === 'user' ? 'user-msg' : 'ai-msg');
  msg.innerHTML = message;
  chatBody.appendChild(msg);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function getAIResponse(userInput) {
  const input = userInput.toLowerCase();

  const responses = {
    // 🧠 Strategic Comms
    strategy: ["strategy", "strategic", "planning", "framework", "comms plan", "direction", "strategic communication", "high level", "objectives", "comms strategy", "structure", "goals", "priorities", "strategic delivery", "campaign planning", "foundations", "core focus", "approach", "positioning", "intent"],
    insight: ["insight", "research", "audience", "survey", "data", "understand", "intel", "evidence", "findings", "community insight", "public view", "focus group", "sentiment", "social listening", "research methods", "population", "audience profiles", "attitudes", "behavioural insight", "RDAT"],
    campaigns: ["campaign", "OASIS", "planning", "publicity", "promotion", "delivery", "messaging", "channel mix", "comms rollout", "launch", "audience targeting", "planning template", "advertising", "execution", "roll out", "public engagement", "timing", "paid media", "paid campaign", "media spend"],
    evaluation: ["evaluation", "success", "metrics", "impact", "measure", "KPIs", "performance", "tracking", "results", "ROI", "GCS Evaluation", "survey results", "post-campaign", "lessons learned", "feedback", "what worked", "review", "outcomes", "GCS cycle", "measuring impact"],
    behaviour: ["behaviour", "change", "COM-B", "EAST", "nudging", "influence", "shift", "action", "habit", "encourage", "persuade", "behavioural insight", "framework", "intervention", "COMB model", "motivation", "capability", "opportunity", "desired behaviour", "behavioural outcomes"],

    // 🎨 Branding / Digital
    branding: ["branding", "visual identity", "brand", "logo", "font", "design", "colours", "brand tasmania", "templates", "kits", "style guide", "consistent look", "identity", "design system", "layout", "design approval", "digital style", "visual hierarchy", "image use", "pre-approved assets"],
    digital: ["digital", "website", "online", "social media", "channels", "platforms", "email", "web", "interface", "UI", "engagement online", "posts", "content", "facebook", "twitter", "instagram", "linkedin", "meta", "analytics", "online strategy"],
    accessibility: ["accessibility", "inclusive", "WCAG", "readability", "easy read", "inclusive design", "disability", "diverse needs", "plain english", "screen reader", "colour contrast", "legibility", "accessibility standards", "accessible formats", "captioning", "alt text", "Tas Gov accessibility", "universal access", "inclusive communication", "inclusive content"],

    // 📣 Media & Stakeholders
    media: ["media", "press", "journalist", "spokesperson", "response", "interview", "release", "statement", "TV", "radio", "print", "news", "coverage", "media strategy", "crisis comms", "reputation", "public image", "scrutiny", "reporting", "press kit"],
    stakeholder: ["stakeholder", "engagement", "consultation", "audience", "advocates", "third party", "supporters", "opinion leader", "community", "collaboration", "interest group", "external", "internal", "working group", "public", "liaison", "champion", "IAP2", "public involvement", "stakeholder map"],
    partnerships: ["partner", "partnership", "collaborator", "alliances", "third party", "external support", "joint comms", "influencer", "local leader", "messenger", "shared campaign", "co-brand", "community leader", "reputation partner", "endorsement", "amplify", "co-sponsor", "multipliers", "peer network", "sector support", "joint statement"],

    // 🧩 Internal / Community / Governance
    internal: ["internal", "staff", "employee", "intranet", "email", "staff update", "team news", "internal channels", "internal messaging", "workforce", "HR comms", "internal audience", "internal newsletter", "comms to staff", "employee engagement", "CEO message", "culture", "values", "corporate comms", "internal cascade"],
    community: ["community", "networking", "training", "events", "development", "skills", "peer support", "connections", "collaboration", "learning", "knowledge", "webinar", "masterclass", "support", "group", "mentorship", "feedback", "comm share", "internal forum", "showcase"],
    governance: ["governance", "approval", "sign off", "process", "rules", "policy", "oversight", "GCS standards", "internal approvals", "campaign signoff", "legal", "review", "checks", "internal governance", "safeguards", "framework", "escalation", "protocol", "compliance", "procedures"],

    // 📂 Other Sections
    mcom: ["mcom", "modern model", "modern comms", "structure", "operating model", "teams", "workstream", "collaboration", "central function", "discipline", "capability", "structure model", "GCS MCOM", "GCS operating model", "functions", "shared services", "coordination", "comms maturity", "whole of gov", "modernise"],
    directory: ["directory", "contact", "who to call", "department", "email", "comms lead", "gov team", "point of contact", "agency", "directory list", "comms email", "who handles", "media contact", "stakeholder contact", "gov contact", "internal", "external", "helpline", "network"],
    starter: ["starter kit", "templates", "new agency", "small team", "download", "pack", "help me start", "resources", "ready to go", "bootstrap", "materials", "campaign starter", "word doc", "excel", "tools", "easy setup", "pre-filled", "simple toolkit", "setup help", "onboarding"]
  };

  const urls = {
    strategy: "strategic.html",
    insight: "insight.html",
    campaigns: "campaigns.html",
    evaluation: "evaluation.html",
    behaviour: "behaviour.html",
    branding: "branding.html",
    digital: "digital.html",
    accessibility: "accessibility.html",
    media: "media-and-external-affairs.html",
    stakeholder: "stakeholder-engagement.html",
    partnerships: "partnerships.html",
    internal: "internal.html",
    community: "community.html",
    governance: "governance.html",
    mcom: "mcom.html",
    directory: "directory.html",
    starter: "starter-kit.html"
  };

  for (let topic in responses) {
    if (responses[topic].some(keyword => userInput.toLowerCase().includes(keyword))) {
      appendMessage(`That’s covered in our <a href="${urls[topic]}" target="_blank">${topic.charAt(0).toUpperCase() + topic.slice(1)} section</a>.`, 'ai');
      return;
    }
  }

  appendMessage(`Sorry, I couldn’t find a match for that. Would you like to <a href="strategic.html">start with our Strategic Comms guidance</a>?`, 'ai');
}
