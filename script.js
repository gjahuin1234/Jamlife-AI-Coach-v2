async function sendMessage() {
    const inputField = document.getElementById("user-input");
    const userMessage = inputField.value;
    if (!userMessage) return;

    const chatContainer = document.getElementById("chat-container");
    chatContainer.innerHTML += `<p><strong>Tú:</strong> ${userMessage}</p>`;

    inputField.value = "";

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-4",
            messages: [{ role: "system", content: "Eres Jamlife AI Coach, un guía amigable basado en ciencia sobre bienestar." },
                       { role: "user", content: userMessage }]
        })
    });

    const data = await response.json();
    chatContainer.innerHTML += `<p><strong>Jamlife AI:</strong> ${data.choices[0].message.content}</p>`;
}
