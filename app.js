
let language = "sv"
let mode = "support"

const API_KEY = "PASTE_OPENAI_API_KEY_HERE"

const prompts = {
support:{
sv:"Du är Leveo, en stöd-AI som hjälper människor minska stress och sortera tankar.",
en:"You are Leveo, a supportive AI helping people manage stress and everyday life."
},
study:{
sv:"Du hjälper med studier, schema, studieteknik och motivation.",
en:"You help with studying, planning study schedules and techniques."
},
planning:{
sv:"Du hjälper planera vardag, vecka och uppgifter realistiskt.",
en:"You help plan daily and weekly life realistically."
},
food:{
sv:"Du hjälper med recept, veckomeny och inköpslistor.",
en:"You help create meal plans, recipes and shopping lists."
},
training:{
sv:"Du fungerar som en personlig tränare och skapar träningsscheman.",
en:"You act as a personal trainer creating workout plans."
},
economy:{
sv:"Du hjälper skapa budget, sparplaner och ekonomiska råd.",
en:"You help create budgets and saving plans."
}
}

function setMode(newMode){
mode = newMode
}

function toggleLanguage(){
language = language === "sv" ? "en" : "sv"
}

function startVoice(){

const recognition = new(window.SpeechRecognition || window.webkitSpeechRecognition)()

recognition.lang = language === "sv" ? "sv-SE" : "en-US"

recognition.start()

recognition.onresult = function(event){
document.getElementById("userInput").value = event.results[0][0].transcript
sendMessage()
}

}

async function sendMessage(){

const input = document.getElementById("userInput")
const chat = document.getElementById("chat")

let userText = input.value

if(!userText) return

chat.innerHTML += `<div class="user">${userText}</div>`

input.value=""

const response = await fetch("https://api.openai.com/v1/chat/completions",{

method:"POST",

headers:{
"Content-Type":"application/json",
"Authorization":"Bearer "+API_KEY
},

body:JSON.stringify({

model:"gpt-4o-mini",

messages:[

{
role:"system",
content:prompts[mode][language]
},

{
role:"user",
content:userText
}

]

})

})

const data = await response.json()

const aiText = data.choices?.[0]?.message?.content || "AI error"

chat.innerHTML += `<div class="ai">${aiText}</div>`

chat.scrollTop = chat.scrollHeight

}
