async function sendMessage() {
    const userInput = document.getElementById("user-input").value;
    if (!userInput.trim()) return;

    const chatContainer = document.getElementById("chat-container");
    
    // Muestra el mensaje del usuario en el chat
    chatContainer.innerHTML += `<p><strong>Tú:</strong> ${userInput}</p>`;
    document.getElementById("user-input").value = "";

    try {
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: userInput })
        });

        const data = await response.json();
        
        // Muestra la respuesta de la IA en el chat
        chatContainer.innerHTML += `<p><strong>Jamlife AI:</strong> ${data.response || "No hubo respuesta"}</p>`;
    } catch (error) {
        chatContainer.innerHTML += `<p><strong>Jamlife AI:</strong> Error al procesar la respuesta.</p>`;
    }
}
