// Inject AI chat widget into the DOM after page load
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
        <p>Hello! I’m here to help with TasGov communications guidance.<br><br>
        Try asking about:<br>
        • Strategic Comms<br>
        • OASIS or MCOM<br>
        • Internal Comms<br>
        • Branding, Evaluation, Digital<br><br>
        Short and specific questions work best. Not all responses use live AI.</p>
      </div>
      <div class="chat-input">
        <input type="text" id="chat-input" placeholder="Ask a question..." />
        <button id="chat-submit">Ask</button>
      </div>
    </div>
  `;

  document.getElementById('ai-chat-icon').addEventListener('click', toggleChat);
  document.getElementById('chat-submit').addEventListener('click', handleChat);
  document.getElementById("chat-input").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      document.getElementById("chat-submit").click();
    }
  });
});

function toggleChat() {
  const chatBox = document.getElementById('ai-chat-box');
  chatBox.style.display = chatBox.style.display === 'flex' ? 'none' : 'flex';
}

async function handleChat() {
  const input = document.getElementById('chat-input').value.trim();
  if (!input) return;

  const chatBody = document.getElementById('chat-body');
  appendMessage(input, 'user-msg');

  const lower = input.toLowerCase();

  const topics = {
    "strategic": ["strategic", "framework", "planning", "strategy", "approach", "direction", "alignment", "vision", "objectives", "goals", "roadmap", "policy", "priorities", "mission", "focus", "governance", "oversight", "leadership", "communications plan", "comms strategy"],
    "oasis": ["oasis", "objectives", "audience", "strategy", "implementation", "scoring", "campaign", "framework", "measure", "evaluate", "rollout", "delivery", "campaign stages", "gcs planning", "gcs framework", "gov campaign", "outputs", "outcomes", "impact", "plan"],
    "mcom": ["mcom", "modern communications", "structure", "model", "capability", "function", "discipline", "central function", "specialist", "model design", "modern approach", "org structure", "embedding", "governance", "culture", "standards", "practice", "team design", "roles", "mcom framework"],
    "internal": ["internal", "employee", "staff", "team", "culture", "intranet", "HR", "change", "engagement", "morale", "newsletter", "voice", "feedback", "survey", "pulse", "onboarding", "recognition", "communication tools", "org updates", "internal briefings"],
    "branding": ["branding", "brand", "logo", "style", "identity", "design", "visual", "colours", "font", "photography", "templates", "corporate", "voice", "tone", "imagery", "brand tasmania", "gov brand", "badging", "brand rules", "brand toolkit"],
    "evaluation": ["evaluation", "impact", "metrics", "success", "outcomes", "inputs", "outputs", "measurement", "roi", "review", "report", "data", "insights", "evidence", "benchmarks", "post-campaign", "monitoring", "effectiveness", "performance", "learning"],
    "insight": ["insight", "audience", "research", "evidence", "feedback", "testing", "persona", "behaviour", "survey", "analysis", "needs", "trends", "stats", "focus groups", "motivations", "mapping", "analytics", "barriers", "listening", "consultation"],
    "digital": ["digital", "online", "social", "website", "content", "web", "media", "platform", "seo", "channel", "analytics", "ux", "email", "video", "mobile", "user", "interface", "gov site", "web content", "reach"],
    "media": ["media", "press", "journalist", "statement", "release", "announcement", "event", "interview", "coverage", "spokesperson", "briefing", "pitch", "comm plan", "press office", "questions", "news", "publicity", "media strategy", "public affairs", "press release"],
    "accessibility": ["accessibility", "inclusive", "equity", "readability", "screenreader", "disability", "alt text", "contrast", "translation", "plain english", "legibility", "universal", "access", "inclusive language", "inclusive design", "neurodiverse", "wcag", "barrier free", "audience-first", "diverse"],
    "openai": ["openai", "chatgpt", "ai", "assistant", "how does this work", "what is this", "who built this", "gcs assist", "tasgov", "uk", "gov", "intelligence", "gpt", "powered", "chat", "bot", "question", "answer", "learning", "automated"]
  };

  for (const [topic, keywords] of Object.entries(topics)) {
    if (keywords.some(k => lower.includes(k))) {
      const response = getPrewrittenResponse(topic);
      appendMessage(response, 'ai-msg');
      return;
    }
  }

  try {
    const res = await fetch('/.netlify/functions/chatgpt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input })
    });
    const data = await res.json();
    const reply = data.reply || "Sorry, I didn’t get that. Try rewording your question.";
    appendMessage(reply, 'ai-msg');
  } catch (err) {
    appendMessage("No response received. Please try again later.", 'ai-msg');
  }
}

function appendMessage(text, className) {
  const msg = document.createElement('div');
  msg.className = className;
  msg.innerHTML = text;
  document.getElementById('chat-body').appendChild(msg);
  msg.scrollIntoView({ behavior: 'smooth' });
}

function getPrewrittenResponse(topic) {
  switch(topic) {
    case "strategic":
      return "Strategic communications ties together everything we do. Visit <a href='strategic.html'>Strategic Comms</a> for the full framework.";
    case "oasis":
      return "The OASIS framework helps structure any government campaign. See <a href='https://gcs.civilservice.gov.uk/guidance/marketing/delivering-government-campaigns/guide-to-campaign-planning-oasis/' target='_blank'>OASIS on the GCS site</a> or our summary <a href='campaigns.html'>here</a>.";
    case "mcom":
      return "The Modern Communications Operating Model (MCOM) helps organise comms functions. Check our <a href='mcom.html'>MCOM page</a> for the structure and links.";
    case "internal":
      return "Internal communications helps support, engage and retain teams. Visit <a href='internal.html'>Internal Comms</a> for tools and tips.";
    case "branding":
      return "For branding guidance, visit our <a href='branding.html'>Branding</a> section or the <a href='https://www.tas.gov.au/communications' target='_blank'>Tas Gov Comms</a> site.";
    case "evaluation":
      return "Measuring success matters. See our <a href='evaluation.html'>Evaluation</a> section or the <a href='https://gcs.civilservice.gov.uk/guidance/evaluation/' target='_blank'>GCS Evaluation guidance</a>.";
    case "insight":
      return "Start with audience insight. Visit our <a href='insight.html'>Insight</a> page or GCS’s <a href='https://gcs.civilservice.gov.uk/guidance/insight/' target='_blank'>guidance here</a>.";
    case "digital":
      return "Digital channels should align with your comms goals. Explore <a href='digital.html'>Digital Comms</a> for platform advice.";
    case "media":
      return "For media engagement guidance, head to our <a href='media-and-external-affairs.html'>External Affairs</a> page.";
    case "accessibility":
      return "Inclusive communications are core to trust. Our <a href='accessibility.html'>Accessibility</a> page covers Tas Gov standards.";
    case "openai":
      return "This AI is powered by OpenAI GPT and GCS/TasGov content. It can give helpful prompts or links, but doesn’t yet chat fully.";
    default:
      return "That’s part of our guidance. Try the homepage or explore Strategic Comms first.";
  }
}
