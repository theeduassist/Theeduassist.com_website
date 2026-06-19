import { client } from './client'

// Safe fetch wrapper: returns `defaultVal` on error and logs a warning.
async function safeFetch(query: string, params = {}, defaultVal = null) {
  try {
    return await client.fetch(query, params)
  } catch (err) {
    // Keep builds from failing when Sanity env is not configured in CI.
    // The site can still build with empty/fallback content.
    // eslint-disable-next-line no-console
    console.warn('Sanity fetch error:', err?.message || err)
    return defaultVal
  }
}

// Site settings
export async function getSiteSettings() {
  return await safeFetch(`*[_type == "siteSettings"][0]`, {}, null)
}

// All pages
export async function getAllPages() {
  return await safeFetch(`*[_type == "page"] | order(title asc)`, {}, [])
}

// Page by slug
export async function getPageBySlug(slug: string) {
  return await safeFetch(`*[_type == "page" && slug.current == $slug][0]`, { slug }, null)
}

// All services
export async function getAllServices() {
  return await safeFetch(`*[_type == "service"] | order(orderRank asc)`, {}, [])
}

// Service by slug
export async function getServiceBySlug(slug: string) {
  return await safeFetch(`*[_type == "service" && slug.current == $slug][0]`, { slug }, null)
}

// All Kajabi services
export async function getAllKajabiServices() {
  return await safeFetch(`*[_type == "kajabiService"] | order(orderRank asc)`, {}, [])
}

// All case studies
export async function getAllCaseStudies() {
  return await safeFetch(`*[_type == "caseStudy"] | order(orderRank asc)`, {}, [])
}

// All FAQs by category
export async function getFaqsByCategory(category: string) {
  return await safeFetch(`*[_type == "faq" && category == $category && showOnSite == true] | order(orderRank asc)`, { category }, [])
}

// All platforms to show as badges
export async function getPlatformsForBadges() {
  return await safeFetch(`*[_type == "platform" && showAsBadge == true] | order(orderRank asc)`, {}, [])
}

// All training solutions to show on site
export async function getTrainingSolutions() {
  return await safeFetch(`*[_type == "trainingSolution" && showOnSite == true] | order(orderRank asc)`, {}, [])
}

// Blog posts by migration status
export async function getBlogPostsByMigrationStatus(status: string) {
  return await safeFetch(`*[_type == "blogPost" && migrationStatus == $status] | order(publishedAt desc)`, { status }, [])
}

// Authors
export async function getAllAuthors() {
  return await safeFetch(`*[_type == "author"] | order(name asc)`, {}, [])
}

export async function getAuthorBySlug(slug: string) {
  return await safeFetch(`*[_type == "author" && slug.current == $slug][0]`, { slug }, null)
}

// Posts
export async function getAllPosts() {
  // Return all posts including those without `publishedAt` (saved drafts),
  // ordering by `publishedAt` then `_createdAt` so newest appear first.
  return await safeFetch(`*[_type == "post"] | order(publishedAt desc, _createdAt desc)`, {}, [])
}

export async function getPostBySlug(slug: string) {
  return await safeFetch(`*[_type == "post" && slug.current == $slug][0]`, { slug }, null)
}

// Testimonials
export async function getAllTestimonials() {
  return await safeFetch(`*[_type == "testimonial" && showOnSite == true] | order(orderRank asc)`, {}, [])
}

// Case study by slug
export async function getCaseStudyBySlug(slug: string) {
  return await safeFetch(`*[_type == "caseStudy" && slug.current == $slug][0]`, { slug }, null)
}

// Navigation
export async function getNavigation() {
  return await safeFetch(`*[_type == "navigation"][0]`, {}, null)
}

// CTA blocks
export async function getCtaBlocks() {
  return await safeFetch(`*[_type == "ctaBlock"] | order(_createdAt desc)`, {}, [])
}

// Process flows
export async function getProcessByTitle(title: string) {
  return await safeFetch(`*[_type == "process" && title == $title][0]`, { title }, null)
}

// Audience segments
export async function getAudienceSegments() {
  return await safeFetch(`*[_type == "audienceSegment" && showOnSite == true] | order(orderRank asc)`, {}, [])
}
