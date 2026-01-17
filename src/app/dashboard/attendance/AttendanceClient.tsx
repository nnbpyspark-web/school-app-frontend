"use client";

import React, { useState, useEffect } from 'react';
import { ToggleSwitch } from '@/components/ui/ToggleSwitch';
import { getStudents, getAttendance, markAttendance } from '../actions';
import { Loader2 } from 'lucide-react';

export default function AttendanceClient({ batches }: { batches: any[] }) {
    const [selectedBatch, setSelectedBatch] = useState(batches.length > 0 ? batches[0].id : '');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [students, setStudents] = useState<any[]>([]);
    const [attendanceMap, setAttendanceMap] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!selectedBatch) return;

        async function fetchData() {
            setLoading(true);
            try {
                // 1. Fetch Students in this batch
                const studentData = await getStudents(selectedBatch);

                // 2. Fetch Attendance for this date/batch
                const attendanceData = await getAttendance(selectedBatch, date);

                // 3. Map attendance
                const map: Record<string, string> = {};
                if (attendanceData) {
                    attendanceData.forEach((record: any) => {
                        map[record.student_id] = record.status;
                    });
                }

                setStudents(studentData || []);
                setAttendanceMap(map);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [selectedBatch, date]);

    async function handleToggle(studentId: string, isPresent: boolean) {
        // Optimistic update
        const status = isPresent ? 'present' : 'absent';
        setAttendanceMap(prev => ({ ...prev, [studentId]: status }));

        await markAttendance(studentId, selectedBatch, date, status);
    }

    if (batches.length === 0) {
        return <div style={{ padding: '20px' }}>Please create a batch first.</div>;
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Attendance</h2>
            </div>

            {/* Controls */}
            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', background: 'white', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', flexWrap: 'wrap' }}>
                <div className="form-group">
                    <label className="form-label">Select Batch</label>
                    <select
                        className="form-input"
                        style={{ width: '250px' }}
                        value={selectedBatch}
                        onChange={(e) => setSelectedBatch(e.target.value)}
                    >
                        {batches.map(b => (
                            <option key={b.id} value={b.id}>{b.name}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label">Date</label>
                    <input
                        type="date"
                        className="form-input"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
            </div>

            {/* List */}
            <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                {loading ? (
                    <div style={{ padding: '40px', display: 'flex', justifyContent: 'center' }}>
                        <Loader2 className="animate-spin" />
                    </div>
                ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead style={{ background: 'var(--bg-body)', borderBottom: '1px solid var(--border)' }}>
                            <tr>
                                <th style={{ textAlign: 'left', padding: '12px 24px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Roll No.</th>
                                <th style={{ textAlign: 'left', padding: '12px 24px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Student Name</th>
                                <th style={{ textAlign: 'right', padding: '12px 24px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Status (Present)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student) => {
                                const isPresent = attendanceMap[student.id] === 'present';
                                return (
                                    <tr key={student.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                        <td style={{ padding: '16px 24px', color: 'var(--text-muted)' }}>{student.roll_number || '-'}</td>
                                        <td style={{ padding: '16px 24px', fontWeight: 500 }}>{student.full_name}</td>
                                        <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                                            <ToggleSwitch
                                                id={`toggle-${student.id}`}
                                                checked={isPresent}
                                                onChange={(checked) => handleToggle(student.id, checked)}
                                            />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
                {!loading && students.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                        No students enrolled in this batch.
                    </div>
                )}
            </div>
        </div>
    );
}
