async function sendMessage() {
    const userMessage = document.getElementById("user-input").value;
    if (!userMessage) return;

    // Mostrar mensaje del usuario en el chat
    const chatContainer = document.getElementById("chat-container");
    chatContainer.innerHTML += `<p><strong>Tú:</strong> ${userMessage}</p>`;

    // Enviar el mensaje a la API
    try {
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: userMessage })
        });

        const data = await response.json();

        // Mostrar respuesta de la IA
        chatContainer.innerHTML += `<p><strong>Jamlife AI:</strong> ${data.response}</p>`;
    } catch (error) {
        chatContainer.innerHTML += `<p><strong>Jamlife AI:</strong> Error al procesar tu mensaje.</p>`;
    }

    // Limpiar input
    document.getElementById("user-input").value = "";
}
