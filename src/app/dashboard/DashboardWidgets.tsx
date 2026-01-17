"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { motion } from "framer-motion"
import { Bell, Users, BookOpen, TrendingUp } from "lucide-react"

export function DashboardWidgets({
    studentCount,
    batchCount,
    announcements,
    attendanceData
}: {
    studentCount: number,
    batchCount: number,
    announcements: any[],
    attendanceData: any[]
}) {

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    }

    return (
        <div className="space-y-6">
            {/* Stats Row */}
            <div className="grid gap-4 md:grid-cols-3">
                <motion.div variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: 0.1 }}>
                    <Card className="bg-gray-900 border-gray-800">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-400">Total Students</CardTitle>
                            <Users className="h-4 w-4 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white">{studentCount}</div>
                            <p className="text-xs text-gray-500">+2 from last month</p>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
                    <Card className="bg-gray-900 border-gray-800">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-400">Active Batches</CardTitle>
                            <BookOpen className="h-4 w-4 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white">{batchCount}</div>
                            <p className="text-xs text-gray-500">Currently running</p>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: 0.3 }}>
                    <Card className="bg-gray-900 border-gray-800">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-400">Avg. Attendance</CardTitle>
                            <TrendingUp className="h-4 w-4 text-yellow-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white">
                                {attendanceData.length > 0 ?
                                    Math.round(attendanceData.reduce((a, b) => a + b.present, 0) / attendanceData.length)
                                    : 0}%
                            </div>
                            <p className="text-xs text-gray-500">Last 7 Days</p>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            {/* Charts & Activity */}
            <div className="grid gap-4 md:grid-cols-7">
                <motion.div className="col-span-4" variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: 0.4 }}>
                    <Card className="bg-gray-900 border-gray-800 h-full">
                        <CardHeader>
                            <CardTitle className="text-white">Attendance Overview</CardTitle>
                        </CardHeader>
                        <CardContent className="pl-2">
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={attendanceData}>
                                    <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: "#1f2937", border: "none" }}
                                        itemStyle={{ color: "#fff" }}
                                    />
                                    <Bar dataKey="present" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div className="col-span-3" variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: 0.5 }}>
                    <Card className="bg-gray-900 border-gray-800 h-full">
                        <CardHeader>
                            <CardTitle className="text-white">Recent Updates</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {announcements.length === 0 && <p className="text-sm text-gray-500">No recent updates.</p>}
                                {announcements.map((item: any, i) => (
                                    <div key={item.id} className="flex items-start gap-4 p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors">
                                        <div className="p-2 bg-blue-500/10 rounded-full text-blue-400 mt-1">
                                            <Bell size={12} />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium text-white leading-none">{item.title}</p>
                                            <p className="text-xs text-gray-400 line-clamp-2">{item.message}</p>
                                            <p className="text-[10px] text-gray-500">{new Date(item.created_at).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    )
}
