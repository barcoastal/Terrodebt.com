export const LEAD_STATUSES = ["new", "lead", "opportunity", "closed_won", "lost"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const STATUS_LABELS: Record<LeadStatus, string> = {
  new: "New",
  lead: "Lead",
  opportunity: "Opportunity",
  closed_won: "Closed Won",
  lost: "Lost",
};

export const STATUS_TO_CONVERSION_ACTION: Record<LeadStatus, string | null> = {
  new: null,
  lead: "7624952297",
  opportunity: "7631584923",
  closed_won: "7631563090",
  lost: null,
};
