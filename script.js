async function sendMessage() {
    const userMessage = document.getElementById("user-input").value;

    if (!userMessage.trim()) return;

    const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: userMessage })
    });

    const data = await response.json();
    console.log(data);
}
