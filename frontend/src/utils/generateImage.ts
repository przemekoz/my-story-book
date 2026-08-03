import OpenAI from "openai";

export const generateImage = async (prompt: string) => {
    const client = new OpenAI({
        apiKey: import.meta.env.VITE_OPENAI_KEY,
        dangerouslyAllowBrowser: true,
    });

    const result = await client.images.generate({
        // model: "gpt-image-1",
        prompt: prompt,
        size: "1024x1024",
    });
    return result?.data ? (result.data[0].url as string) : "";
};
