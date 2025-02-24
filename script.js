const chatContainer = document.getElementById("chat-container");
const userInput = document.getElementById("user-input");

async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    // Agregar mensaje del usuario al chat
    appendMessage("Tú", message);
    userInput.value = "";

    try {
        // Llamar a OpenAI API
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer TU_API_KEY_AQUI`
            },
            body: JSON.stringify({
                model: "gpt-4", // Asegúrate de que tienes acceso a GPT-4 o cambia a gpt-3.5-turbo
                messages: [{ role: "system", content: "Eres Jamlife AI, una coach experta en bienestar con un tono cálido y amigable para mujeres en Australia." }, 
                           { role: "user", content: message }]
            })
        });

        const data = await response.json();
        const aiMessage = data.choices[0].message.content;
        
        // Agregar respuesta de Jamlife AI al chat
        appendMessage("Jamlife AI", aiMessage);
    } catch (error) {
        console.error("Error al llamar a OpenAI:", error);
        appendMessage("Jamlife AI", "Lo siento, hubo un problema al procesar tu mensaje.");
    }
}

// Función para agregar mensajes al chat
function appendMessage(sender, text) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");
    messageElement.innerHTML = `<strong>${sender}:</strong> ${text}`;
    chatContainer.appendChild(messageElement);
}
