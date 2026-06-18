export type RedirectStatus = 301 | 302;
export type RedirectPriority = "critical" | "high" | "medium" | "low";
export type RedirectMigrationStatus = "ready" | "pendingTarget" | "needsReview" | "doNotRedirect";

export interface Redirect {
  from: string;
  to: string;
  status: RedirectStatus;
  priority: RedirectPriority;
  migrationStatus: RedirectMigrationStatus;
  reason: string;
  notes?: string;
}

export const redirects: Redirect[] = [
  // Main pages
  { from: "/about-us/", to: "/about/", status: 301, priority: "critical", migrationStatus: "ready", reason: "Main about page migrated to cleaner Astro route" },
  { from: "/contact-us/", to: "/contact/", status: 301, priority: "critical", migrationStatus: "ready", reason: "Main contact page migrated" },
  { from: "/services/", to: "/services/", status: 301, priority: "critical", migrationStatus: "doNotRedirect", reason: "URL unchanged" },
  { from: "/kajabi-services/", to: "/kajabi-services/", status: 301, priority: "critical", migrationStatus: "doNotRedirect", reason: "URL unchanged" },
  { from: "/case-studies-1/", to: "/case-studies/", status: 301, priority: "critical", migrationStatus: "ready", reason: "Main case studies page migrated" },
  { from: "/career/", to: "/careers/", status: 301, priority: "critical", migrationStatus: "ready", reason: "Careers page migrated" },

  // Service pages
  { from: "/custom-elearning-content-development/", to: "/services/custom-elearning-development/", status: 301, priority: "high", migrationStatus: "ready", reason: "Service page migrated" },
  { from: "/lms-integration-migration-services/", to: "/services/lms-implementation-migration/", status: 301, priority: "high", migrationStatus: "ready", reason: "Service page migrated" },
  { from: "/ai-powered-elearning/", to: "/services/ai-powered-elearning/", status: 301, priority: "high", migrationStatus: "ready", reason: "Service page migrated" },

  // Service pages without individual new pages yet
  { from: "/instructional-ui-ux-design/", to: "", status: 301, priority: "medium", migrationStatus: "pendingTarget", reason: "Target page not created yet" },
  { from: "/rapid-elearning/", to: "", status: 301, priority: "medium", migrationStatus: "pendingTarget", reason: "Target page not created yet" },
  { from: "/dashboards-analytics/", to: "", status: 301, priority: "medium", migrationStatus: "pendingTarget", reason: "Target page not created yet" },
  { from: "/gamified-learning/", to: "", status: 301, priority: "medium", migrationStatus: "pendingTarget", reason: "Target page not created yet" },
  { from: "/k-12-education-services/", to: "", status: 301, priority: "medium", migrationStatus: "pendingTarget", reason: "Target page not created yet" },
  { from: "/ld-consulting-advisory/", to: "", status: 301, priority: "medium", migrationStatus: "pendingTarget", reason: "Target page not created yet" },
  { from: "/elearning-localization-services/", to: "", status: 301, priority: "medium", migrationStatus: "pendingTarget", reason: "Target page not created yet" },
  { from: "/microlearning-microsimulations/", to: "", status: 301, priority: "medium", migrationStatus: "pendingTarget", reason: "Target page not created yet" },
  { from: "/mobile-learning-solutions/", to: "", status: 301, priority: "medium", migrationStatus: "pendingTarget", reason: "Target page not created yet" },
  { from: "/off-the-shelf-elearning/", to: "", status: 301, priority: "medium", migrationStatus: "pendingTarget", reason: "Target page not created yet" },
  { from: "/scenario-based-learning/", to: "", status: 301, priority: "medium", migrationStatus: "pendingTarget", reason: "Target page not created yet" },
  { from: "/legacy-content-conversion-flash-to-html5/", to: "", status: 301, priority: "medium", migrationStatus: "pendingTarget", reason: "Target page not created yet" },
  { from: "/ar-vr-solutions/", to: "", status: 301, priority: "medium", migrationStatus: "pendingTarget", reason: "Target page not created yet" },
  { from: "/audio-video-production-for-elearning/", to: "", status: 301, priority: "medium", migrationStatus: "pendingTarget", reason: "Target page not created yet" },
];
