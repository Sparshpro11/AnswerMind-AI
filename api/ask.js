import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { question } = req.body;
        if (!question) return res.status(400).json({ answer: "Please ask a question." });

        try {
            const completion = await openai.chat.completions.create({
                model: "gpt-5.3-chat-latest", // ✅ updated model
                messages: [
                    { role: "system", content: "You are a helpful Q&A assistant." },
                    { role: "user", content: question }
                ],
                temperature: 0.2,
            });

            const answer = completion.choices[0].message.content;
            res.status(200).json({ answer });
        } catch (error) {
            res.status(500).json({ answer: `Error: ${error.message}` });
        }
    } else {
        res.status(405).json({ answer: "Method not allowed" });
    }
}