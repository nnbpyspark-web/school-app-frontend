"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { createBatch, deleteBatch } from '../actions';
import { Trash2, Plus, Calendar } from 'lucide-react';

export default function BatchesPage({ batches }: { batches: any[] }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    async function handleCreate(formData: FormData) {
        setIsLoading(true);
        await createBatch(formData);
        setIsLoading(false);
        setIsModalOpen(false);
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Batches</h2>
                <Button onClick={() => setIsModalOpen(true)}>
                    <Plus size={16} style={{ marginRight: '8px' }} />
                    Add Batch
                </Button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                {batches.map((batch) => (
                    <div key={batch.id} style={{
                        background: 'var(--bg-card)',
                        padding: '24px',
                        borderRadius: 'var(--radius-lg)',
                        border: '1px solid var(--border)',
                        boxShadow: 'var(--shadow-sm)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}>
                        <div>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '8px' }}>{batch.name}</h3>
                            <div style={{ display: 'flex', gap: '12px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <Calendar size={14} />
                                    <span>{batch.start_date || 'No Date'} - {batch.end_date || 'No Date'}</span>
                                </div>
                            </div>
                        </div>
                        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                            <Button variant="ghost" onClick={() => deleteBatch(batch.id)} style={{ color: 'var(--status-error)' }}>
                                <Trash2 size={18} />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            {batches.length === 0 && (
                <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                    No batches found. Create one to get started.
                </div>
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Create New Batch"
            >
                <form action={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div className="form-group">
                        <label className="form-label">Batch Name</label>
                        <input className="form-input" name="name" required placeholder="e.g. Class 10 - A" />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div className="form-group">
                            <label className="form-label">Start Date</label>
                            <input className="form-input" name="startDate" type="date" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">End Date</label>
                            <input className="form-input" name="endDate" type="date" />
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
                        <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                        <Button type="submit" isLoading={isLoading}>Create Batch</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
