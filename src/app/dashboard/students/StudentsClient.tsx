"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { createStudent, deleteStudent } from '../actions';
import { Trash2, Plus, Search } from 'lucide-react';

export default function StudentsClient({ initialStudents, batches }: { initialStudents: any[], batches: any[] }) {
    const [students, setStudents] = useState(initialStudents);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [filterBatch, setFilterBatch] = useState('all');
    const [search, setSearch] = useState('');

    const filteredStudents = students.filter(student => {
        const matchesSearch = student.full_name.toLowerCase().includes(search.toLowerCase()) ||
            student.roll_number?.toLowerCase().includes(search.toLowerCase());

        let matchesBatch = true;
        if (filterBatch !== 'all') {
            // Check if student_batches array contains the batchId
            // student.student_batches is an array of objects { batch_id, batches: {...} }
            matchesBatch = student.student_batches?.some((sb: any) => sb.batch_id === filterBatch);
        }

        return matchesSearch && matchesBatch;
    });

    async function handleCreate(formData: FormData) {
        setIsLoading(true);
        await createStudent(formData);
        // In a real app we might refetch or optimistically update. 
        // For simplicity, we rely on server revalidation which refreshes the page props next navigation, 
        // but here we might need a hard refresh or router.refresh() if using Client Component state heavily.
        // Actually, since we passed initialStudents, we should use router.refresh().
        window.location.reload(); // Simple brute force for MVP
        setIsLoading(false);
        setIsModalOpen(false);
    }

    async function handleDelete(id: string) {
        if (!confirm("Are you sure?")) return;
        await deleteStudent(id);
        window.location.reload();
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Students</h2>
                <Button onClick={() => setIsModalOpen(true)}>
                    <Plus size={16} style={{ marginRight: '8px' }} />
                    Add Student
                </Button>
            </div>

            {/* Filters */}
            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', background: 'white', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                <div style={{ position: 'relative', flex: 1 }}>
                    <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                        className="form-input"
                        style={{ paddingLeft: '40px', width: '100%' }}
                        placeholder="Search by name or roll number..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <select
                    className="form-input"
                    style={{ width: '200px' }}
                    value={filterBatch}
                    onChange={(e) => setFilterBatch(e.target.value)}
                >
                    <option value="all">All Batches</option>
                    {batches.map(b => (
                        <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                </select>
            </div>

            {/* Table */}
            <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ background: 'var(--bg-body)', borderBottom: '1px solid var(--border)' }}>
                        <tr>
                            <th style={{ textAlign: 'left', padding: '12px 24px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Name</th>
                            <th style={{ textAlign: 'left', padding: '12px 24px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Roll No.</th>
                            <th style={{ textAlign: 'left', padding: '12px 24px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Batches</th>
                            <th style={{ textAlign: 'right', padding: '12px 24px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStudents.map((student) => (
                            <tr key={student.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                <td style={{ padding: '16px 24px' }}>
                                    <div style={{ fontWeight: 500 }}>{student.full_name}</div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{student.email}</div>
                                </td>
                                <td style={{ padding: '16px 24px' }}>{student.roll_number || '-'}</td>
                                <td style={{ padding: '16px 24px' }}>
                                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                                        {student.student_batches?.map((sb: any) => (
                                            <span key={sb.batch_id} style={{ fontSize: '0.75rem', background: '#e0f2fe', color: '#0369a1', padding: '2px 8px', borderRadius: '12px' }}>
                                                {sb.batches?.name}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                                <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                                    <Button variant="ghost" onClick={() => handleDelete(student.id)} style={{ padding: '8px', color: 'var(--text-muted)' }}>
                                        <Trash2 size={16} />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredStudents.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                        No students found.
                    </div>
                )}
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Add New Student"
            >
                <form action={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div className="form-group">
                        <label className="form-label">Full Name</label>
                        <input className="form-input" name="fullName" required placeholder="John Doe" />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Roll Number</label>
                        <input className="form-input" name="rollNumber" placeholder="e.g. 101" />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Email (Optional)</label>
                        <input className="form-input" name="email" type="email" placeholder="john@example.com" />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Assign to Batch</label>
                        <select className="form-input" name="batchId">
                            <option value="">Select a batch...</option>
                            {batches.map(b => (
                                <option key={b.id} value={b.id}>{b.name}</option>
                            ))}
                        </select>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
                        <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                        <Button type="submit" isLoading={isLoading}>Add Student</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
