export type Database = {
  public: {
    Tables: {
      courses: {
        Row: {
          id: string;
          title: string;
          description: string;
          thumbnail: string | null;
          instructor_name: string | null;
          created_at: string | null;
          
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          thumbnail?: string | null;
          instructor_name?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          thumbnail?: string | null;
          instructor_name?: string | null;
          created_at?: string | null;
        };
      };
      lessons: {
        Row: {
          id: string;
          course_id: string;
          title: string;
          video_url: string | null;
          pdf_url: string | null;
          order_index: number;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          course_id: string;
          title: string;
          video_url?: string | null;
          pdf_url?: string | null;
          order_index?: number;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          course_id?: string;
          title?: string;
          video_url?: string | null;
          pdf_url?: string | null;
          order_index?: number;
          created_at?: string | null;
        };
      };
      results: {
        Row: {
          id: string;
          before_image: string | null;
          after_image: string | null;
          client_name: string;
          weight_lost: string | null;
          duration: string | null;
          created_at: string | null;
          transformation_type: string | null;
        };
        Insert: {
          id?: string;
          before_image?: string | null;
          after_image?: string | null;
          client_name: string;
          weight_lost?: string | null;
          duration?: string | null;
          created_at?: string | null;
          transformation_type?: string | null;
        };
        Update: {
          id?: string;
          before_image?: string | null;
          after_image?: string | null;
          client_name?: string;
          weight_lost?: string | null;
          duration?: string | null;
          created_at?: string | null;
          transformation_type?: string | null;
        };
      };
      testimonials: {
        Row: {
          id: string;
          customer_name: string;
          rating: number;
          review_text: string;
          customer_photo: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          customer_name: string;
          rating: number;
          review_text: string;
          customer_photo?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          customer_name?: string;
          rating?: number;
          review_text?: string;
          customer_photo?: string | null;
          created_at?: string | null;
        };
      };
      contact_enquiries: {
        Row: {
          id: string;
          name: string;
          phone: string | null;
          email: string | null;
          message: string;
          read_status: boolean;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          phone?: string | null;
          email?: string | null;
          message: string;
          read_status?: boolean;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          phone?: string | null;
          email?: string | null;
          message?: string;
          read_status?: boolean;
          created_at?: string | null;
        };
      };
      settings: {
        Row: {
          id: string;
          logo: string | null;
          hero_image: string | null;
          phone: string | null;
          email: string | null;
          address: string | null;
          facebook_url: string | null;
          instagram_url: string | null;
          twitter_url: string | null;
          whatsapp_number: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          logo?: string | null;
          hero_image?: string | null;
          phone?: string | null;
          email?: string | null;
          address?: string | null;
          facebook_url?: string | null;
          instagram_url?: string | null;
          twitter_url?: string | null;
          whatsapp_number?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          logo?: string | null;
          hero_image?: string | null;
          phone?: string | null;
          email?: string | null;
          address?: string | null;
          facebook_url?: string | null;
          instagram_url?: string | null;
          twitter_url?: string | null;
          whatsapp_number?: string | null;
          updated_at?: string | null;
        };
      };
    };
  };
};
