const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

function addMessage(text, sender) {
    const msg = document.createElement("div");
    msg.classList.add("message");
    msg.classList.add(sender === "user" ? "user-msg" : "assistant-msg");
    msg.innerText = text;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendQuestion() {
    const question = userInput.value.trim();
    if (!question) return;
    addMessage(question, "user");
    userInput.value = "";

    try {
        const response = await fetch("/api/ask", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question })
        });
        const data = await response.json();
        addMessage(data.answer, "assistant");
    } catch (error) {
        addMessage("Error: Could not reach the server.", "assistant");
    }
}

sendBtn.addEventListener("click", sendQuestion);
userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendQuestion();
});