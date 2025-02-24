async function sendMessage() {
    const userInput = document.getElementById("user-input").value;
    if (!userInput) return;

    const response = await fetch("https://jamlife-ai-coach-v2.vercel.app/api/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userInput }),
    });

    const data = await response.json();
    console.log(data);
}
