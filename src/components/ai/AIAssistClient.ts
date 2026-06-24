import { buildAiAssistantUrl } from '../../utils/aiUrls';
import { aiAssistants } from '../../data/aiAssistants';

// AIAssistClient.ts
export const brandContext = "TheEduAssist is an e-learning design and course-building agency. It helps creators, coaches, consultants, educators, training companies, online academies, and businesses build complete online learning systems. Services include course creation, curriculum design, Kajabi websites and course setup, LMS implementation and migration, instructional design, learner experience, AI-powered e-learning support, content conversion, funnels, automation, templates, launch support, and ongoing support.";

export const instructions: Record<string, string> = {
    summarize_page: "Please summarize this page in simple, practical language. Explain what this page is about, who it is for, what problem it solves, what TheEduAssist offers, and what next step I should take.",
    explain_service: "Explain this service in simple words. Tell me what it includes, who needs it, how it helps creators, coaches, educators, academies, training companies, or businesses, what results it supports, and what questions I should ask before booking a call.",
    help_me_choose: "Help me decide if this service is right for me. My goal may be to build, improve, migrate, or sell an online course or learning platform. Explain whether this service fits my needs, what type of business would benefit from it, what I should prepare, and what next step I should take.",
    create_action_plan: "Turn this page into a practical action plan for building or improving an online course or learning system. Include course strategy, content structure, learner experience, Kajabi or LMS setup needs, automation ideas, funnel ideas, and next steps.",
    compare_options: "Compare the service or solution on this page with other possible course platform, LMS, Kajabi, or e-learning setup options. Explain the pros, limitations, best-fit use cases, and what I should ask before choosing.",
    ask_questions: "Create a list of smart questions I should ask TheEduAssist before booking a call about this page, service, or solution. Group the questions by strategy, content, platform, learner experience, launch, pricing, and timeline."
};

function getPageData() {
    const pageTitle = document.title || 'Unknown Page';
    const pageUrl = window.location.href;
    const pageDescription = document.querySelector('meta[name="description"]')?.getAttribute("content") || "";
    const h1 = document.querySelector('h1')?.innerText || "";

    const mainElement = document.querySelector('main') || document.querySelector('article') || document.body;
    let pageContext = "";
    if (mainElement) {
        pageContext = (mainElement as HTMLElement).innerText || "";
        pageContext = pageContext.replace(/\s+/g, ' ').trim().substring(0, 1800);
    }

    if (!pageContext) {
        pageContext = "No visible text context found.";
    }

    return { pageTitle, pageUrl, pageDescription, h1, pageContext };
}

export function generateUrlPrompt(): string {
    const { pageTitle, pageUrl, pageDescription, h1 } = getPageData();

    return `I am viewing this TheEduAssist page:

Title: ${pageTitle}
URL: ${pageUrl}
Description: ${pageDescription}
Main heading: ${h1}

Please summarize this page and explain:

1. What this page is about
2. Who it is for
3. What TheEduAssist offers here
4. What next step I should take
5. What questions I should ask before buying

Important: Do not invent claims, prices, testimonials, partnerships, or results that are not visible on the page.`;
}

export function generatePrompt(actionId?: string): string {
    return generateFullPrompt(actionId);
}

export function generateFullPrompt(actionId?: string): string {
    const { pageTitle, pageUrl, pageDescription, h1, pageContext } = getPageData();

    return `I am viewing a page on TheEduAssist website.

Brand context:
TheEduAssist is a multi-platform e-learning design and course-building agency. It helps creators, coaches, consultants, educators, training companies, online academies, publishers, corporate teams, and organizations build structured online courses, Kajabi systems, LMS experiences, content conversion workflows, AI-assisted learning assets, funnels, automations, launch systems, and ongoing course support.

Current page:
Title: ${pageTitle}
URL: ${pageUrl}
Description: ${pageDescription}
Main heading: ${h1}

Visible page context:
${pageContext}

Task:
Please summarize this page in simple, practical language. Explain:

1. What this page is about
2. Who it is for
3. What problem it solves
4. What TheEduAssist offers here
5. What next step I should take
6. What questions I should ask TheEduAssist before buying

Important:
Do not invent services, prices, results, testimonials, partnerships, awards, or claims that are not visible on the page.`;
}

export async function copyAndOpenAI(actionId: string, platformUrl: string, platformName: string) {
    const fullPrompt = generateFullPrompt(actionId);
    const urlPrompt = generateUrlPrompt();

    // Look up assistant ID by name or URL (or fallback)
    const assistant = aiAssistants.find(a => a.name === platformName || platformUrl.includes(a.id)) || aiAssistants[0];
    const targetUrl = buildAiAssistantUrl(assistant.id, urlPrompt);

    // Open immediately to avoid popup blockers
    const newWindow = window.open(targetUrl, "_blank", "noopener,noreferrer");

    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(fullPrompt);
            showToast("Success", "Prompt opened or copied. If the AI box is empty, paste the copied prompt.");
            if (!newWindow) {
                // Clipboard succeeded but popup was blocked
                showFallbackModal(fullPrompt, targetUrl);
            }
        } else {
            // Clipboard not available
            showFallbackModal(fullPrompt, targetUrl);
        }
    } catch (err) {
        console.error("Failed to copy text: ", err);
        // Clipboard failed
        showFallbackModal(fullPrompt, targetUrl);
    }

    // Fire analytics if function exists globally
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({
            event: 'ai_assist_click',
            platform: platformName,
            action: actionId,
            page_url: window.location.href
        });
    }
}

function showToast(title: string, message: string) {
    const toastEvent = new CustomEvent('show-ai-toast', { detail: { title, message } });
    window.dispatchEvent(toastEvent);
}

function showFallbackModal(prompt: string, platformUrl: string) {
    const modalEvent = new CustomEvent('show-ai-modal', { detail: { prompt, platformUrl } });
    window.dispatchEvent(modalEvent);
}
