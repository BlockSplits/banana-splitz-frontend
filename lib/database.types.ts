export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      activity: {
        Row: {
          id: number
          group_id: number
          name: string
          total: number
          payer: string
          creator: string | null
        }
        Insert: {
          id?: number
          group_id: number
          name: string
          total: number
          payer: string
          creator?: string | null
        }
        Update: {
          id?: number
          group_id?: number
          name?: string
          total?: number
          payer?: string
          creator?: string | null
        }
      }
      groups: {
        Row: {
          id: number
          name: string
          description: string
          created_by: string | null
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: number
          name?: string
          description: string
          created_by?: string | null
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: number
          name?: string
          description?: string
          created_by?: string | null
          created_at?: string
          updated_at?: string | null
        }
      }
      groups_members: {
        Row: {
          id: number
          user_id: string
          group_id: number
        }
        Insert: {
          id?: number
          user_id: string
          group_id: number
        }
        Update: {
          id?: number
          user_id?: string
          group_id?: number
        }
      }
      users: {
        Row: {
          name: string
          nonce: number
          id: string
          address: string
        }
        Insert: {
          name?: string
          nonce?: number
          id?: string
          address: string
        }
        Update: {
          name?: string
          nonce?: number
          id?: string
          address?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
