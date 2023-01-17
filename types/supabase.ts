export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      answers: {
        Row: {
          created_at: string | null;
          id: string;
          option_id: string;
          poll_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          option_id: string;
          poll_id: string;
          user_id: string;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          option_id?: string;
          poll_id?: string;
          user_id?: string;
        };
      };
      options: {
        Row: {
          created_at: string | null;
          id: string;
          poll_id: string;
          text: string;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          poll_id: string;
          text: string;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          poll_id?: string;
          text?: string;
        };
      };
      polls: {
        Row: {
          created_at: string | null;
          id: string;
          question: string;
          user_id: string;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          question: string;
          user_id: string;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          question?: string;
          user_id?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
export type AnswerProp = {
  created_at: string | null;
  id: string;
  option_id: string;
  poll_id: string;
  user_id: string;
};

export type OptionProp = {
  created_at: string | null;
  id: string;
  poll_id: string;
  text: string;
};
export type PollProp = {
  created_at: string | null;
  id: string;
  question: string;
  user_id: string;
};
