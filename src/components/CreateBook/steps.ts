import { MASTER_TEXT_PROMPT, MASTER_VISUAL_PROMPT } from "../../conf";

export interface Step {
    title: string;
    description: string;
    basePrompt: string;
    visualPrompt: string;
    questions: string[];
    placeholders: string[];
}

export const steps: Step[] = [
    {
        title: "Childhood",
        description: "Every big dream starts somewhere. Tell us a bit about where they came from",
        visualPrompt: `Use the MASTER_VISUAL_PROMPT and create an illustration for Pages 1–2 showing the main character as a young child in a calm early-childhood memory `,
        basePrompt: `Use the MASTER_TEXT_PROMPT and transform the user’s answers for Pages 1–2 into a children’s book text about early childhood, focusing on how this `,
        questions: ["What was the hometown called, and how would you describe it?", "What was childhood like, and what was the favorite activity?", "Who were the family members and what where they like?", "What was the world around them like then?", "What was a special moment or early childhood memories?"],
        placeholders: ["My home town was called...", "My favorite activity was...", "In my family were...", "There was a lot of...", "The best moment was when I..."],
    },
    {
        title: "Growing Up & Talents",
        description: "Describe me your happy teenager life...",
        visualPrompt: `Use the MASTER_VISUAL_PROMPT and create an illustration for Pages 3–4 showing the main character as a growing child or early youth in a calm moment of learning or everyday life that suggests curiosity, enjoyment, and the gentle emergence of an early interest or talent, using ONLY the physical details explicitly mentioned in the user’s answers for Pages 3–4 (such as people, clothing, objects, school-related elements, or surroundings); do NOT add any additional elements, and if few physical details are provided, keep the background simple, neutral, and open so the focus remains on the character and their quiet engagement with learning or practice`,
        basePrompt: `Use the MASTER_TEXT_PROMPT and transform the user’s answers for Pages 3–4 into a children’s book text about growing up and early development, focusing on how this phase of life felt emotionally, what they enjoyed during their school years, moments of curiosity and learning, the gentle emergence of an early talent or interest, and how practicing or discovering this interest felt, without describing physical places or objects.`,
        questions: ["How did they grow up (general experience)?", "What kind of school did they attend?", "What did they enjoy most at school or during that time?", "Did a talent or skill appear early on?", "How did they discover or practice this talent?"],
        placeholders: ["@todo:placeholder", "@todo:placeholder", "@todo:placeholder", "@todo:placeholder", "@todo:placeholder"],
    },
    {
        title: "Challenge & Dream",
        description: "@todo:description",
        visualPrompt: "",
        basePrompt: "",
        questions: ["Question ? F"],
        placeholders: ["@todo:placeholder"],
    },
    {
        title: "Learning & Helpers",
        description: "@todo:description",
        visualPrompt: "",
        basePrompt: "",
        questions: ["Question ? F"],
        placeholders: ["@todo:placeholder"],
    },
    {
        title: "Own Family & Friends",
        description: "@todo:description",
        visualPrompt: "",
        basePrompt: "",
        questions: ["Question ? F"],
        placeholders: ["@todo:placeholder"],
    },
    // {
    //     title: "",
    //     description: "@todo:description",
    //     visualPrompt: "",
    //     basePrompt: "",
    //     questions: ["Question ? F"],
    //     placeholders: ["@todo:placeholder"],
    // },
];