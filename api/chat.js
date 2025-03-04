export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método no permitido" });
    }

    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: "Mensaje vacío" });
    }

    try {
        console.log("Enviando solicitud a OpenAI con mensaje:", message); // Log para ver qué mensaje se envía

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
        
        console.log("Respuesta de OpenAI:", data); // Log para ver la respuesta de OpenAI

        if (!data.choices || data.choices.length === 0) {
            return res.status(500).json({ error: "OpenAI no devolvió respuesta válida" });
        }

        res.status(200).json({ response: data.choices[0].message.content });
    } catch (error) {
        console.error("Error en la API de OpenAI:", error);
        res.status(500).json({ error: "Error procesando la respuesta" });
    }
}
