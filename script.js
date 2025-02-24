async function sendMessage() {
    const userInput = document.getElementById("user-input").value;
    if (!userInput.trim()) return;

    const chatContainer = document.getElementById("chat-container");
    chatContainer.innerHTML += `<p><strong>Tú:</strong> ${userInput}</p>`;

    document.getElementById("user-input").value = "";

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: userInput }]
            })
        });

        const data = await response.json();
        const aiMessage = data.choices?.[0]?.message?.content || "Hubo un problema al obtener la respuesta.";

        chatContainer.innerHTML += `<p><strong>Jamlife AI:</strong> ${aiMessage}</p>`;
    } catch (error) {
        chatContainer.innerHTML += `<p><strong>Jamlife AI:</strong> Lo siento, hubo un problema al procesar tu mensaje.</p>`;
        console.error("Error:", error);
    }
}
