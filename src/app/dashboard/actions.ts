'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

function getClient() {
    return createClient();
}

// Ensure user belongs to the school they are trying to act upon
async function getSchoolId() {
    const supabase = getClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

    const { data: profile } = await supabase
        .from('profiles')
        .select('school_id')
        .eq('id', user.id)
        .single();

    if (!profile?.school_id) throw new Error("No school linked");
    return profile.school_id;
}

// --- Batches ---

export async function getBatches() {
    const supabase = getClient();
    const { data, error } = await supabase
        .from('batches')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return data;
}

export async function createBatch(data: FormData) {
    const supabase = getClient();
    const schoolId = await getSchoolId();
    const name = data.get('name') as string;
    const startDate = data.get('startDate') as string || null;
    const endDate = data.get('endDate') as string || null;

    const { error } = await supabase
        .from('batches')
        .insert({
            school_id: schoolId,
            name,
            start_date: startDate,
            end_date: endDate
        });

    if (error) return { error: error.message };
    revalidatePath('/dashboard/batches');
}

export async function deleteBatch(id: string) {
    const supabase = getClient();
    const { error } = await supabase
        .from('batches')
        .delete()
        .eq('id', id);

    if (error) return { error: error.message };
    revalidatePath('/dashboard/batches');
}

// --- Students ---

export async function getStudents(batchId?: string) {
    const supabase = getClient();
    let query = supabase
        .from('students')
        .select(`
            *,
            student_batches (
                batch_id,
                batches (name)
            )
        `)
        .order('full_name');

    if (batchId && batchId !== 'all') {
        // This is a bit complex with joins, simplified logic:
        // Filter students where ID is in (select student_id from student_batches where batch_id = X)
        const { data: studentIds } = await supabase
            .from('student_batches')
            .select('student_id')
            .eq('batch_id', batchId);

        const ids = studentIds?.map(s => s.student_id) || [];
        query = query.in('id', ids);
    }

    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
}

export async function createStudent(data: FormData) {
    const supabase = getClient();
    const schoolId = await getSchoolId();
    const fullName = data.get('fullName') as string;
    const rollNumber = data.get('rollNumber') as string;
    const email = data.get('email') as string || null;
    const batchId = data.get('batchId') as string;

    // 1. Create Student
    const { data: student, error: createError } = await supabase
        .from('students')
        .insert({
            school_id: schoolId,
            full_name: fullName,
            roll_number: rollNumber,
            email: email
        })
        .select()
        .single();

    if (createError) return { error: createError.message };

    // 2. Enroll in Batch if selected
    if (batchId) {
        const { error: enrollError } = await supabase
            .from('student_batches')
            .insert({
                school_id: schoolId,
                student_id: student.id,
                batch_id: batchId
            });

        if (enrollError) return { error: "Student created but enrollment failed: " + enrollError.message };
    }

    revalidatePath('/dashboard/students');
}

export async function deleteStudent(id: string) {
    const supabase = getClient();
    const { error } = await supabase
        .from('students')
        .delete()
        .eq('id', id);

    if (error) return { error: error.message };
    revalidatePath('/dashboard/students');
}

// --- Attendance ---

export async function getAttendance(batchId: string, date: string) {
    const supabase = getClient();
    const { data, error } = await supabase
        .from('attendance')
        .select('*')
        .eq('batch_id', batchId)
        .eq('date', date);

    if (error) throw new Error(error.message);
    return data;
}

export async function markAttendance(studentId: string, batchId: string, date: string, status: 'present' | 'absent' | 'excused') {
    const supabase = getClient();
    const schoolId = await getSchoolId();

    const { error } = await supabase
        .from('attendance')
        .upsert({
            student_id: studentId,
            batch_id: batchId,
            school_id: schoolId,
            date: date,
            status: status
        }, {
            onConflict: 'student_id,batch_id,date'
        });

    if (error) return { error: error.message };
    revalidatePath('/dashboard/attendance');
}
