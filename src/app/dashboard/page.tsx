
import { createClient } from "@/utils/supabase/server"
import { DashboardWidgets } from "./DashboardWidgets"
import { SuperAdminWidgets } from "./SuperAdminWidgets"
import { redirect } from "next/navigation"

export const metadata = {
    title: "Dashboard | EduSaaS",
}

export default async function DashboardPage() {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect("/auth/login")
    }

    // 1. Check User Role
    const { data: profile } = await supabase
        .from('profiles')
        .select('role, school_id')
        .eq('id', user.id)
        .single()

    const role = profile?.role || 'school_admin'

    // ==========================================
    // SUPER ADMIN VIEW
    // ==========================================
    if (role === 'super_admin') {
        const [
            { count: schoolCount },
            { count: totalUsers },
            { count: activeSubscriptions },
            { data: recentSchools }
        ] = await Promise.all([
            supabase.from("schools").select("*", { count: 'exact', head: true }),
            supabase.from("profiles").select("*", { count: 'exact', head: true }),
            supabase.from("subscriptions").select("*", { count: 'exact', head: true }).eq('status', 'active'),
            supabase.from("schools").select("*").order("created_at", { ascending: false }).limit(5)
        ])

        return (
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold tracking-tight text-white">Platform Overview</h2>
                    <span className="bg-purple-500/10 text-purple-400 px-3 py-1 rounded-full text-sm font-medium border border-purple-500/20">
                        Super Admin
                    </span>
                </div>
                <SuperAdminWidgets
                    schoolCount={schoolCount || 0}
                    totalUsers={totalUsers || 0}
                    activeSubscriptions={activeSubscriptions || 0}
                    recentSchools={recentSchools || []}
                />
            </div>
        )
    }

    // ==========================================
    // SCHOOL ADMIN VIEW (Existing)
    // ==========================================
    const [
        { count: studentCount },
        { count: batchCount },
        { data: announcements },
        { data: rawAttendance }
    ] = await Promise.all([
        supabase.from("students").select("*", { count: 'exact', head: true }).eq('status', 'active'),
        supabase.from("batches").select("*", { count: 'exact', head: true }),
        supabase.from("announcements").select("*").order("created_at", { ascending: false }).limit(5),
        supabase.from("attendance").select("date, status").gte('date', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
    ])

    // Process Attendance Data
    const grouped: any = {}
    rawAttendance?.forEach((r: any) => {
        if (!grouped[r.date]) grouped[r.date] = { total: 0, present: 0 }
        grouped[r.date].total += 1
        if (r.status === 'present') grouped[r.date].present += 1
    })

    const attendanceData = Object.keys(grouped).sort().map(date => {
        const item = grouped[date]
        const percentage = item.total > 0 ? Math.round((item.present / item.total) * 100) : 0
        return {
            date: new Date(date).toLocaleDateString("en-US", { weekday: 'short' }),
            present: percentage
        }
    })

    if (attendanceData.length === 0) {
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        days.forEach(d => attendanceData.push({ date: d, present: 0 }))
    }

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold tracking-tight text-white mb-6">Dashboard Overview</h2>
            <DashboardWidgets
                studentCount={studentCount || 0}
                batchCount={batchCount || 0}
                announcements={announcements || []}
                attendanceData={attendanceData}
            />
        </div>
    )
}
