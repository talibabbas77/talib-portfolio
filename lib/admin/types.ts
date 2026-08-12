export type SubmissionStatus = "new" | "read" | "replied" | "archived";

export type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: SubmissionStatus;
  source: string;
  created_at: string;
  updated_at: string;
};

export type SubmissionStats = {
  total: number;
  new: number;
  read: number;
  replied: number;
  archived: number;
  thisWeek: number;
};
