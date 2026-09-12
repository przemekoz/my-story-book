import { expect, test, describe } from 'vitest'


import { preparePrompt } from "../preparePrompt";

const masterTextPrompt = "{here is the master text prompt}"
describe('preparePrompt', () => {
    test("should parse prompt base on basePrompt, masterTextPrompt, user questions and answers", () => {

        const basePrompt = "regarding my MASTER_PROMPT this is the base prompt.";
        const questions = ["q1?", "q2?", "q3?"];
        const answers = ["a1", "a2", "a3"];
        const expectedPrompt = `${basePrompt}\r\n\r\nMy MASTER_PROMPT: '${masterTextPrompt}'. Please consider also:\r\n\r\nquestion: q1? answer: a1;\r\n\r\nquestion: q2? answer: a2;\r\n\r\nquestion: q3? answer: a3;\r\n\r\n`;

        expect(preparePrompt(basePrompt, masterTextPrompt, questions, answers)).toEqual(expectedPrompt);
    });
    test("should parse prompt base on basePrompt, masterTextPrompt, user questions and answers - if no answer now question", () => {

        const basePrompt = "regarding my MASTER_PROMPT this is the base prompt.";
        const questions = ["q1?", "q2?", "q3?"];
        const answers = ["a1", "", "a3"];
        const expectedPrompt = `${basePrompt}\r\n\r\nMy MASTER_PROMPT: '${masterTextPrompt}'. Please consider also:\r\n\r\nquestion: q1? answer: a1;\r\n\r\nquestion: q3? answer: a3;\r\n\r\n`;

        expect(preparePrompt(basePrompt, masterTextPrompt, questions, answers)).toEqual(expectedPrompt);
    });
});