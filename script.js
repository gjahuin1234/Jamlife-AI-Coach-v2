async function sendMessage() {
    const userInput = document.getElementById("user-input").value;
    if (!userInput.trim()) return;

    const chatContainer = document.getElementById("chat-container");
    chatContainer.innerHTML += `<p><strong>Tú:</strong> ${userInput}</p>`;

    document.getElementById("user-input").value = "";

    try {
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userInput })
        });

        const data = await response.json();
        const aiMessage = data.response || "Hubo un problema al obtener la respuesta.";

        chatContainer.innerHTML += `<p><strong>Jamlife AI:</strong> ${aiMessage}</p>`;
    } catch (error) {
        chatContainer.innerHTML += `<p><strong>Jamlife AI:</strong> Lo siento, hubo un problema al procesar tu mensaje.</p>`;
        console.error("Error:", error);
    }
}
