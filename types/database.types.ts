/**
 * Types de la base de données Supabase.
 *
 * À régénérer après chaque migration :
 *   npx supabase gen types typescript --project-id <project-id> > types/database.types.ts
 */
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          display_name: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          display_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          display_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

type PublicSchema = Database["public"];

/** Ligne d'une table : `Tables<"profiles">` */
export type Tables<T extends keyof PublicSchema["Tables"]> = PublicSchema["Tables"][T]["Row"];

/** Payload d'insertion : `TablesInsert<"profiles">` */
export type TablesInsert<T extends keyof PublicSchema["Tables"]> =
  PublicSchema["Tables"][T]["Insert"];

/** Payload de mise à jour : `TablesUpdate<"profiles">` */
export type TablesUpdate<T extends keyof PublicSchema["Tables"]> =
  PublicSchema["Tables"][T]["Update"];
