"use client"

import { useState, useEffect, useCallback } from "react"
import { createClient } from "@/utils/supabase/client"
import { Plus } from "lucide-react"

export default function AnnouncementsPage() {
    const supabase = createClient()
    const [announcements, setAnnouncements] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [newAnnouncement, setNewAnnouncement] = useState({ title: "", message: "", target_batch_id: "" })
    const [batches, setBatches] = useState<any[]>([])

    const fetchAnnouncements = useCallback(async () => {
        setLoading(true)
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        const { data, error } = await supabase
            .from('announcements')
            .select('*, batches(name)')
            .order('created_at', { ascending: false })

        if (error) console.error('Error fetching announcements:', error)
        else setAnnouncements(data || [])

        setLoading(false)
    }, [supabase])

    const fetchBatches = useCallback(async () => {
        const { data } = await supabase.from('batches').select('id, name')
        setBatches(data || [])
    }, [supabase])

    useEffect(() => {
        fetchAnnouncements()
        fetchBatches()
    }, [fetchAnnouncements, fetchBatches])

    async function handleCreate(e: React.FormEvent) {
        e.preventDefault()
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        // Fetch profile to get school_id
        const { data: profile } = await supabase.from('profiles').select('school_id').eq('id', user.id).single()

        if (!profile) {
            alert("Profile not found")
            return
        }

        const payload = {
            school_id: profile.school_id,
            title: newAnnouncement.title,
            message: newAnnouncement.message,
            target_batch_id: newAnnouncement.target_batch_id || null
        }

        const { error } = await supabase.from('announcements').insert([payload])

        if (error) {
            alert(error.message)
        } else {
            setShowForm(false)
            setNewAnnouncement({ title: "", message: "", target_batch_id: "" })
            fetchAnnouncements()
        }
    }

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white">Announcements</h1>
                    <p className="text-muted-foreground text-gray-400">Keep students and staff updated.</p>
                </div>
                <button onClick={() => setShowForm(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all w-fit">
                    <Plus size={20} /> New Announcement
                </button>
            </div>

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl w-full max-w-lg shadow-2xl">
                        <h2 className="text-xl font-semibold mb-4 text-white">New Announcement</h2>
                        <form onSubmit={handleCreate} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={newAnnouncement.title}
                                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Message</label>
                                <textarea
                                    required
                                    rows={4}
                                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={newAnnouncement.message}
                                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, message: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Target Batch (Optional)</label>
                                <select
                                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={newAnnouncement.target_batch_id}
                                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, target_batch_id: e.target.value })}
                                >
                                    <option value="">All Batches</option>
                                    {batches.map(b => (
                                        <option key={b.id} value={b.id}>{b.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex justify-end gap-3 mt-6">
                                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-gray-300 hover:text-white transition-colors">Cancel</button>
                                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">Post Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {announcements.length === 0 && !loading ? (
                    <div className="col-span-full py-12 text-center text-gray-500">
                        <h3 className="text-lg font-medium">No announcements yet</h3>
                        <p>No news is good news!</p>
                    </div>
                ) : announcements.map((item) => (
                    <div key={item.id} className="bg-gray-900/50 border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-all group flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors line-clamp-1" title={item.title}>{item.title}</h3>
                                <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded shrink-0">{new Date(item.created_at).toLocaleDateString()}</span>
                            </div>
                            <p className="text-gray-400 line-clamp-4 whitespace-pre-wrap">{item.message}</p>
                        </div>
                        {item.batches && (
                            <div className="mt-4 pt-4 border-t border-gray-800">
                                <span className="text-xs text-blue-400 bg-blue-400/10 px-2 py-1 rounded">
                                    Target: {item.batches.name}
                                </span>
                            </div>
                        )}
                        {!item.batches && (
                            <div className="mt-4 pt-4 border-t border-gray-800">
                                <span className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded">
                                    Target: All
                                </span>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
