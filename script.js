const sections = document.querySelectorAll('.section');
function showSection(id) {
  sections.forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// Planering
const planList = document.getElementById('planList');
function loadPlans() {
  const plans = JSON.parse(localStorage.getItem('plans')) || [];
  planList.innerHTML = '';
  plans.forEach(p => {
    const li = document.createElement('li');
    li.textContent = p;
    planList.appendChild(li);
  });
}
function addPlan() {
  const input = document.getElementById('planInput');
  const plans = JSON.parse(localStorage.getItem('plans')) || [];
  if(input.value){
    plans.push(input.value);
    localStorage.setItem('plans', JSON.stringify(plans));
    input.value = '';
    loadPlans();
  }
}
loadPlans();

// AI Chat
const chatContainer = document.getElementById('chatContainer');

async function sendMessage() {
  const input = document.getElementById('chatInput');
  if(!input.value) return;
  addChatMessage(input.value, false);
  const response = await getAIResponse(input.value);
  addChatMessage(response, true);
  input.value = '';
}

function addChatMessage(msg, fromAI=false) {
  const p = document.createElement('p');
  p.textContent = (fromAI ? 'AI: ' : 'Du: ') + msg;
  chatContainer.appendChild(p);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

async function getAIResponse(prompt) {
  const res = await fetch('/.netlify/functions/openai', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({prompt})
  });
  const data = await res.json();
  return data.response;
}

function payPremium() {
  alert('Premium kommer snart!');
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}
