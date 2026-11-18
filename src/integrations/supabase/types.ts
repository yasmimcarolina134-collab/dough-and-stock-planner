export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      banks: {
        Row: {
          account: string
          agency: string
          company_id: string
          id: string
          name: string
          opening_balance: number
        }
        Insert: {
          account?: string
          agency?: string
          company_id?: string
          id?: string
          name: string
          opening_balance?: number
        }
        Update: {
          account?: string
          agency?: string
          company_id?: string
          id?: string
          name?: string
          opening_balance?: number
        }
        Relationships: [
          {
            foreignKeyName: "banks_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      bom: {
        Row: {
          company_id: string
          component_id: string
          id: string
          product_id: string
          quantity: number
        }
        Insert: {
          company_id?: string
          component_id: string
          id?: string
          product_id: string
          quantity: number
        }
        Update: {
          company_id?: string
          component_id?: string
          id?: string
          product_id?: string
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "bom_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bom_component_id_fkey"
            columns: ["component_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bom_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      cash_sessions: {
        Row: {
          closed_at: string | null
          closing_amount: number | null
          company_id: string
          id: string
          opened_at: string
          opening_amount: number
          responsible: string
        }
        Insert: {
          closed_at?: string | null
          closing_amount?: number | null
          company_id?: string
          id?: string
          opened_at?: string
          opening_amount: number
          responsible: string
        }
        Update: {
          closed_at?: string | null
          closing_amount?: number | null
          company_id?: string
          id?: string
          opened_at?: string
          opening_amount?: number
          responsible?: string
        }
        Relationships: [
          {
            foreignKeyName: "cash_sessions_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          id: string
          name: string
          type: string
        }
        Insert: {
          id: string
          name: string
          type: string
        }
        Update: {
          id?: string
          name?: string
          type?: string
        }
        Relationships: []
      }
      companies: {
        Row: {
          address: string
          cnpj: string | null
          demo: boolean
          id: string
          name: string
        }
        Insert: {
          address?: string
          cnpj?: string | null
          demo?: boolean
          id?: string
          name: string
        }
        Update: {
          address?: string
          cnpj?: string | null
          demo?: boolean
          id?: string
          name?: string
        }
        Relationships: []
      }
      cost_centers: {
        Row: {
          company_id: string
          id: string
          name: string
        }
        Insert: {
          company_id?: string
          id?: string
          name: string
        }
        Update: {
          company_id?: string
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "cost_centers_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          address: string
          code: number
          company_id: string
          credit_limit: number
          document: string | null
          email: string
          id: string
          name: string
          phone: string
        }
        Insert: {
          address?: string
          code?: never
          company_id?: string
          credit_limit?: number
          document?: string | null
          email?: string
          id?: string
          name: string
          phone?: string
        }
        Update: {
          address?: string
          code?: never
          company_id?: string
          credit_limit?: number
          document?: string | null
          email?: string
          id?: string
          name?: string
          phone?: string
        }
        Relationships: [
          {
            foreignKeyName: "customers_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      demands: {
        Row: {
          company_id: string
          due_date: string
          id: string
          product_id: string
          quantity: number
        }
        Insert: {
          company_id?: string
          due_date?: string
          id?: string
          product_id: string
          quantity?: number
        }
        Update: {
          company_id?: string
          due_date?: string
          id?: string
          product_id?: string
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "demands_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "demands_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: true
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      employees: {
        Row: {
          active: boolean
          benefits: string
          company_id: string
          cpf: string | null
          department: string
          documents: string
          hired_at: string
          id: string
          job: string
          name: string
          phone: string
          work_hours: string
        }
        Insert: {
          active?: boolean
          benefits?: string
          company_id?: string
          cpf?: string | null
          department?: string
          documents?: string
          hired_at?: string
          id?: string
          job?: string
          name: string
          phone?: string
          work_hours?: string
        }
        Update: {
          active?: boolean
          benefits?: string
          company_id?: string
          cpf?: string | null
          department?: string
          documents?: string
          hired_at?: string
          id?: string
          job?: string
          name?: string
          phone?: string
          work_hours?: string
        }
        Relationships: [
          {
            foreignKeyName: "employees_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      finance: {
        Row: {
          amount: number
          bank_id: string | null
          category: string
          center_id: string | null
          company_id: string
          customer_id: string | null
          description: string
          due_date: string
          id: string
          issued_at: string
          paid_at: string | null
          payment_method: string
          recurring: boolean
          source_id: string | null
          status: string
          supplier_id: string | null
          type: string
        }
        Insert: {
          amount: number
          bank_id?: string | null
          category?: string
          center_id?: string | null
          company_id?: string
          customer_id?: string | null
          description: string
          due_date: string
          id?: string
          issued_at?: string
          paid_at?: string | null
          payment_method?: string
          recurring?: boolean
          source_id?: string | null
          status?: string
          supplier_id?: string | null
          type: string
        }
        Update: {
          amount?: number
          bank_id?: string | null
          category?: string
          center_id?: string | null
          company_id?: string
          customer_id?: string | null
          description?: string
          due_date?: string
          id?: string
          issued_at?: string
          paid_at?: string | null
          payment_method?: string
          recurring?: boolean
          source_id?: string | null
          status?: string
          supplier_id?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "finance_bank_id_fkey"
            columns: ["bank_id"]
            isOneToOne: false
            referencedRelation: "banks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "finance_center_id_fkey"
            columns: ["center_id"]
            isOneToOne: false
            referencedRelation: "cost_centers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "finance_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "finance_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "finance_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      fiscal_documents: {
        Row: {
          access_key: string | null
          amount: number
          company_id: string
          id: string
          issued_at: string
          number: string
          status: string
          type: string
          xml_reference: string
        }
        Insert: {
          access_key?: string | null
          amount?: number
          company_id?: string
          id?: string
          issued_at?: string
          number: string
          status?: string
          type?: string
          xml_reference?: string
        }
        Update: {
          access_key?: string | null
          amount?: number
          company_id?: string
          id?: string
          issued_at?: string
          number?: string
          status?: string
          type?: string
          xml_reference?: string
        }
        Relationships: [
          {
            foreignKeyName: "fiscal_documents_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      history: {
        Row: {
          action: string
          after_data: Json | null
          before_data: Json | null
          company_id: string
          created_at: string
          entity: string
          id: string
          record_id: string
          user_id: string | null
        }
        Insert: {
          action: string
          after_data?: Json | null
          before_data?: Json | null
          company_id?: string
          created_at?: string
          entity: string
          id?: string
          record_id: string
          user_id?: string | null
        }
        Update: {
          action?: string
          after_data?: Json | null
          before_data?: Json | null
          company_id?: string
          created_at?: string
          entity?: string
          id?: string
          record_id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "history_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      hr_records: {
        Row: {
          company_id: string
          employee_id: string
          end_at: string | null
          id: string
          notes: string
          start_at: string
          type: string
        }
        Insert: {
          company_id?: string
          employee_id: string
          end_at?: string | null
          id?: string
          notes?: string
          start_at?: string
          type: string
        }
        Update: {
          company_id?: string
          employee_id?: string
          end_at?: string | null
          id?: string
          notes?: string
          start_at?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "hr_records_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hr_records_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      lots: {
        Row: {
          code: string
          company_id: string
          expires_at: string | null
          id: string
          product_id: string
          quantity: number
          warehouse_id: string
        }
        Insert: {
          code: string
          company_id?: string
          expires_at?: string | null
          id?: string
          product_id: string
          quantity?: number
          warehouse_id: string
        }
        Update: {
          code?: string
          company_id?: string
          expires_at?: string | null
          id?: string
          product_id?: string
          quantity?: number
          warehouse_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lots_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lots_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lots_warehouse_id_fkey"
            columns: ["warehouse_id"]
            isOneToOne: false
            referencedRelation: "warehouses"
            referencedColumns: ["id"]
          },
        ]
      }
      movements: {
        Row: {
          company_id: string
          created_at: string
          id: string
          product_id: string
          quantity: number
          responsible: string
          type: string
          user_id: string
        }
        Insert: {
          company_id?: string
          created_at?: string
          id?: string
          product_id: string
          quantity: number
          responsible: string
          type: string
          user_id?: string
        }
        Update: {
          company_id?: string
          created_at?: string
          id?: string
          product_id?: string
          quantity?: number
          responsible?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "movements_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "movements_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          company_id: string
          due_date: string
          id: string
          price: number
          product_id: string
          quantity: number
          started: boolean
          status: string
          supplier_id: string | null
          type: string
        }
        Insert: {
          company_id?: string
          due_date?: string
          id?: string
          price?: number
          product_id: string
          quantity: number
          started?: boolean
          status?: string
          supplier_id?: string | null
          type: string
        }
        Update: {
          company_id?: string
          due_date?: string
          id?: string
          price?: number
          product_id?: string
          quantity?: number
          started?: boolean
          status?: string
          supplier_id?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      production_reservations: {
        Row: {
          company_id: string
          id: string
          order_id: string
          product_id: string
          quantity: number
        }
        Insert: {
          company_id?: string
          id?: string
          order_id: string
          product_id: string
          quantity: number
        }
        Update: {
          company_id?: string
          id?: string
          order_id?: string
          product_id?: string
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "production_reservations_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "production_reservations_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "production_reservations_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          active: boolean
          batch: number
          category_id: string
          cfop: string
          code: number
          company_id: string
          cost: number
          description: string
          id: string
          lead_time: number
          maximum: number
          minimum: number
          name: string
          ncm: string
          reserved: number
          sale_price: number
          stock: number
          supplier_id: string | null
          tax_code: string
          type: string
          unit: string
        }
        Insert: {
          active?: boolean
          batch?: number
          category_id: string
          cfop?: string
          code?: never
          company_id?: string
          cost?: number
          description?: string
          id?: string
          lead_time?: number
          maximum?: number
          minimum?: number
          name: string
          ncm?: string
          reserved?: number
          sale_price?: number
          stock?: number
          supplier_id?: string | null
          tax_code?: string
          type: string
          unit: string
        }
        Update: {
          active?: boolean
          batch?: number
          category_id?: string
          cfop?: string
          code?: never
          company_id?: string
          cost?: number
          description?: string
          id?: string
          lead_time?: number
          maximum?: number
          minimum?: number
          name?: string
          ncm?: string
          reserved?: number
          sale_price?: number
          stock?: number
          supplier_id?: string | null
          tax_code?: string
          type?: string
          unit?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      purchase_requests: {
        Row: {
          company_id: string
          due_date: string
          id: string
          invoice: string
          kind: string
          price: number
          product_id: string
          quantity: number
          received_quantity: number
          status: string
          supplier_id: string | null
        }
        Insert: {
          company_id?: string
          due_date?: string
          id?: string
          invoice?: string
          kind?: string
          price?: number
          product_id: string
          quantity: number
          received_quantity?: number
          status?: string
          supplier_id?: string | null
        }
        Update: {
          company_id?: string
          due_date?: string
          id?: string
          invoice?: string
          kind?: string
          price?: number
          product_id?: string
          quantity?: number
          received_quantity?: number
          status?: string
          supplier_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "purchase_requests_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_requests_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_requests_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      sale_items: {
        Row: {
          company_id: string
          cost: number
          id: string
          price: number
          product_id: string
          quantity: number
          sale_id: string
        }
        Insert: {
          company_id?: string
          cost?: number
          id?: string
          price: number
          product_id: string
          quantity: number
          sale_id: string
        }
        Update: {
          company_id?: string
          cost?: number
          id?: string
          price?: number
          product_id?: string
          quantity?: number
          sale_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sale_items_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sale_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sale_items_sale_id_fkey"
            columns: ["sale_id"]
            isOneToOne: false
            referencedRelation: "sales"
            referencedColumns: ["id"]
          },
        ]
      }
      sales: {
        Row: {
          code: number
          company_id: string
          created_at: string
          credit: boolean
          customer_id: string | null
          discount: number
          due_date: string
          id: string
          kind: string
          payment_method: string
          status: string
          total: number
          user_id: string
        }
        Insert: {
          code?: never
          company_id?: string
          created_at?: string
          credit?: boolean
          customer_id?: string | null
          discount?: number
          due_date?: string
          id?: string
          kind?: string
          payment_method?: string
          status?: string
          total?: number
          user_id?: string
        }
        Update: {
          code?: never
          company_id?: string
          created_at?: string
          credit?: boolean
          customer_id?: string | null
          discount?: number
          due_date?: string
          id?: string
          kind?: string
          payment_method?: string
          status?: string
          total?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sales_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      suppliers: {
        Row: {
          address: string
          cnpj: string | null
          code: number
          company_id: string
          email: string
          id: string
          lead_time: number
          name: string
          payment: string
          phone: string
          trade_name: string
        }
        Insert: {
          address?: string
          cnpj?: string | null
          code?: never
          company_id?: string
          email?: string
          id?: string
          lead_time?: number
          name: string
          payment?: string
          phone?: string
          trade_name?: string
        }
        Update: {
          address?: string
          cnpj?: string | null
          code?: never
          company_id?: string
          email?: string
          id?: string
          lead_time?: number
          name?: string
          payment?: string
          phone?: string
          trade_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "suppliers_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          company_id: string
          id: string
          role: string
          user_id: string
        }
        Insert: {
          company_id: string
          id?: string
          role: string
          user_id: string
        }
        Update: {
          company_id?: string
          id?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      warehouses: {
        Row: {
          company_id: string
          id: string
          location: string
          name: string
        }
        Insert: {
          company_id?: string
          id?: string
          location?: string
          name: string
        }
        Update: {
          company_id?: string
          id?: string
          location?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "warehouses_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      assign_role: {
        Args: { target_role: string; target_user: string }
        Returns: undefined
      }
      cancel_sale: {
        Args: { responsible: string; sale_id: string }
        Returns: undefined
      }
      current_company: { Args: never; Returns: string }
      ensure_company: { Args: { company_name?: string }; Returns: string }
      erp_allowed: {
        Args: { module: string; operation?: string; tenant?: string }
        Returns: boolean
      }
      finish_order: {
        Args: { order_id: string; responsible: string }
        Returns: undefined
      }
      production_action: {
        Args: { action: string; order_id: string; responsible: string }
        Returns: undefined
      }
      purchase_action: {
        Args: {
          action: string
          invoice_number?: string
          received?: number
          request_id: string
          responsible?: string
        }
        Returns: undefined
      }
      record_sale: { Args: { payload: Json }; Returns: string }
      settle_finance: {
        Args: { bank?: string; method?: string; record_id: string }
        Returns: undefined
      }
      transfer_lot: {
        Args: { destination: string; lot_id: string; qty: number }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
