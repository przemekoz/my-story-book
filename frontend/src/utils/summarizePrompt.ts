import OpenAI from "openai";

export const summarizePrompt = async (prompt: string) => {
    const client = new OpenAI({
        apiKey: import.meta.env.VITE_OPENAI_KEY,
        dangerouslyAllowBrowser: true,
    });

    const response = await client.responses.create({
        model: "gpt-4.1-mini",
        input: prompt,
    });

    console.log(" ---- ");
    console.log("PROMPT FROM OPEN AI Condense:", response.output_text);
    console.log(" ---- ");

    return response.output_text;
};
