export const preparePrompt = (basePrompt: string, masterTextPrompt: string, userQuestions: string[], userAnswers: string[]): string => {




    // @TODO - add to base prompt MASTER_PROMPT
    // @TODO - add to visual prompt VISUAL_PROMPT



    const prompt = [basePrompt];

    prompt.push(`\r\n\r\nMy MASTER_PROMPT: '${masterTextPrompt}'. Please consider also:\r\n\r\n`);

    let index = 0;
    for (const question of userQuestions) {
        const answer = userAnswers[index];
        if (answer) {
            prompt.push(`question: ${question} answer: ${answer};\r\n\r\n`);
        }
        index++;
    }

    return `Condense the following image description into a single prompt
        under 990 characters. Preserve visual details and artistic style.
        Return ONLY the prompt text.

        ${prompt.join("")}`;
}