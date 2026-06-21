export type AIAssistant = {
  id: string;
  name: string;
  shortLabel: string;
  url: string;
  active: boolean;
  color?: string;
};

export const aiAssistants: AIAssistant[] = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    shortLabel: "GPT",
    url: "https://chatgpt.com/",
    active: true,
  },
  {
    id: "claude",
    name: "Claude",
    shortLabel: "Claude",
    url: "https://claude.ai/",
    active: true,
  },
  {
    id: "gemini",
    name: "Gemini",
    shortLabel: "Gemini",
    url: "https://gemini.google.com/",
    active: true,
  },
  {
    id: "perplexity",
    name: "Perplexity",
    shortLabel: "PPLX",
    url: "https://www.perplexity.ai/",
    active: true,
  },
  {
    id: "copilot",
    name: "Microsoft Copilot",
    shortLabel: "Copilot",
    url: "https://copilot.microsoft.com/",
    active: true,
  },
  {
    id: "grok",
    name: "Grok",
    shortLabel: "Grok",
    url: "https://grok.com/",
    active: true,
  }
];
