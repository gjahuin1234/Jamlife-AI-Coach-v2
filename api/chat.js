export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método no permitido" });
    }

    const { message } = req.body;
    
    if (!message) {
        return res.status(400).json({ error: "Mensaje vacío" });
    }

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: message }]
            })
        });

        const data = await response.json();
        res.status(200).json({ response: data.choices?.[0]?.message?.content || "No hubo respuesta" });
    } catch (error) {
        res.status(500).json({ error: "Error procesando la respuesta" });
    }
}
