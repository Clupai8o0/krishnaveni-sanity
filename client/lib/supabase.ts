import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const supabaseAdmin = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.SUPABASE_SERVICE_ROLE_KEY!,
	{ auth: { persistSession: false } }
);

export type Post = {
	id: string;
	title: string;
	slug: string;
	category: string;
	content: string;
	thumbnail_url: string | null;
	video_url: string | null;
	published: boolean;
	published_at: string | null;
	created_at: string;
	updated_at: string;
};
