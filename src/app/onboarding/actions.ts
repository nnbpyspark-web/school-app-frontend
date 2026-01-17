'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function createSchool(formData: FormData) {
    const supabase = createClient()

    // 1. Get User
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
        return { error: "Unauthorized" };
    }

    const schoolName = formData.get('schoolName') as string;

    if (!schoolName || schoolName.trim().length < 3) {
        return { error: "School name must be at least 3 characters." };
    }

    // 2. Insert School
    const { data: school, error: insertError } = await supabase
        .from('schools')
        .insert({
            name: schoolName,
            // Simple slug generation (not guaranteed unique in this simple version, but okay for MVP)
            slug: schoolName.toLowerCase().replace(/\s+/g, '-') + '-' + Math.floor(Math.random() * 1000)
        })
        .select()
        .single();

    if (insertError) {
        console.error("Error creating school:", insertError);
        return { error: "Failed to create school. Please try again." };
    }

    // 3. Link User to School
    const { error: updateError } = await supabase
        .from('profiles')
        .update({ school_id: school.id })
        .eq('id', user.id);

    if (updateError) {
        console.error("Error updating profile:", updateError);
        return { error: "Failed to link school to your account." };
    }

    // 4. Redirect
    revalidatePath('/', 'layout'); // clear cache
    redirect('/dashboard');
}
