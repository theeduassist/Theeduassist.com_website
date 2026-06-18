import { site, buildCanonicalUrl } from './seo';

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": site.name,
    "url": site.url,
    "logo": `${site.url}/favicon.svg`,
    "contactPoint": {
      "@type": "ContactPoint",
      "email": site.email,
      "contactType": "customer service"
    }
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": site.name,
    "url": site.url,
    "description": site.description
  };
}

export function professionalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": site.name,
    "url": site.url,
    "description": site.description,
    "email": site.email
  };
}

export function serviceSchema(name: string, description: string, urlPath: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": name,
    "description": description,
    "provider": {
      "@type": "Organization",
      "name": site.name
    },
    "url": buildCanonicalUrl(urlPath)
  };
}

export function faqPageSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

export function breadcrumbSchema(items: { name: string; urlPath: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": buildCanonicalUrl(item.urlPath)
    }))
  };
}

export function webPageSchema(name: string, description: string, urlPath: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": name,
    "description": description,
    "url": buildCanonicalUrl(urlPath)
  };
}

export function blogPostingSchema() {
  // Placeholder for later only
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting"
  };
}
