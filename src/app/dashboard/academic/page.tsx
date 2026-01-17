"use client"
import { useState, useEffect } from "react"
import { createClient } from "@/utils/supabase/client"
import { Upload, FileText, Loader2, Download, Trash2 } from "lucide-react"

export default function AcademicPage() {
    const supabase = createClient()
    const [assignments, setAssignments] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [file, setFile] = useState<File | null>(null)
    const [uploading, setUploading] = useState(false)
    const [batches, setBatches] = useState<any[]>([])
    const [selectedBatch, setSelectedBatch] = useState("")

    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData() {
        setLoading(true)
        const { data: assignmentsData } = await supabase.from('assignments').select('*, batches(name)').order('created_at', { ascending: false })
        setAssignments(assignmentsData || [])

        const { data: batchesData } = await supabase.from('batches').select('id, name')
        setBatches(batchesData || [])
        setLoading(false)
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!file || !selectedBatch) {
            alert("Please select a file and a batch")
            return
        }

        setUploading(true)
        try {
            // 1. Get Token
            const { data: { session } } = await supabase.auth.getSession()
            if (!session) throw new Error("No session")

            // 2. Upload to FastAPI
            // Note: Ensure the Backend is running on port 8000
            const formData = new FormData()
            formData.append("file", file)

            const res = await fetch("http://localhost:8000/api/v1/upload", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${session.access_token}`
                },
                body: formData
            })

            if (!res.ok) {
                const err = await res.json()
                throw new Error(err.detail || "Upload failed")
            }

            const { url } = await res.json()

            // 3. Save to Supabase
            // Get user profile for school_id
            const { data: profile } = await supabase.from('profiles').select('school_id').eq('id', session.user.id).single()
            if (!profile) throw new Error("Profile not found")

            const { error } = await supabase.from('assignments').insert([{
                school_id: profile.school_id,
                batch_id: selectedBatch,
                title: title,
                description: desc,
                file_url: url
            }])

            if (error) throw error

            setShowForm(false)
            setTitle("")
            setDesc("")
            setFile(null)
            fetchData()

        } catch (error: any) {
            alert(error.message)
            console.error(error)
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white">Assignments</h1>
                    <p className="text-muted-foreground text-gray-400">Manage academic tasks and resources.</p>
                </div>
                <button onClick={() => setShowForm(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all w-fit">
                    <Upload size={20} /> Create Assignment
                </button>
            </div>

            {/* Form */}
            {showForm && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl w-full max-w-lg shadow-2xl">
                        <h2 className="text-xl font-semibold mb-4 text-white">Create Assignment</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
                                <input required type="text" className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" value={title} onChange={e => setTitle(e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
                                <textarea rows={2} className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" value={desc} onChange={e => setDesc(e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Batch</label>
                                <select required className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" value={selectedBatch} onChange={e => setSelectedBatch(e.target.value)}>
                                    <option value="">Select Batch</option>
                                    {batches.map(b => (
                                        <option key={b.id} value={b.id}>{b.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">File Attachment (Media/Docs)</label>
                                <div className="border-2 border-dashed border-gray-700 rounded-lg p-4 text-center hover:border-blue-500 transition-colors cursor-pointer relative">
                                    <input required type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={e => setFile(e.target.files?.[0] || null)} />
                                    <div className="text-gray-400">
                                        {file ? (
                                            <span className="text-blue-400 font-medium">{file.name}</span>
                                        ) : (
                                            <span className="flex flex-col items-center gap-1">
                                                <Upload size={24} />
                                                <span>Click to upload file</span>
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 mt-6">
                                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-gray-300 hover:text-white transition-colors">Cancel</button>
                                <button type="submit" disabled={uploading} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                                    {uploading ? <Loader2 className="animate-spin" size={18} /> : null}
                                    {uploading ? "Uploading..." : "Create Assignment"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* List */}
            <div className="space-y-4">
                {assignments.length === 0 && !loading ? (
                    <div className="text-center py-12 text-gray-500">
                        <p>No assignments created yet.</p>
                    </div>
                ) : null}

                {assignments.map(item => (
                    <div key={item.id} className="bg-gray-900/40 border border-gray-800 rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between hover:bg-gray-900/60 transition-colors gap-4">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400 shrink-0">
                                <FileText size={20} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-white text-lg">{item.title}</h3>
                                <p className="text-sm text-gray-400 mb-2">{item.description}</p>
                                <div className="flex flex-wrap gap-2 items-center">
                                    <span className="text-xs font-medium bg-gray-800 text-gray-300 px-2 py-0.5 rounded border border-gray-700">@{item.batches?.name || 'All'}</span>
                                    <span className="text-xs text-gray-500">{new Date(item.created_at).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                        {item.file_url && (
                            <a
                                href={item.file_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 bg-blue-400/10 hover:bg-blue-400/20 px-3 py-1.5 rounded-lg transition-colors border border-blue-500/20"
                            >
                                <Download size={16} />
                                Download Resource
                            </a>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
