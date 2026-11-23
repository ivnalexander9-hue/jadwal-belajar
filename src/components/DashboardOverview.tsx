import { useState } from 'react';
import {
  ArrowRight,
  Bell,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Circle,
  Clock,
} from 'lucide-react';
import { DAYS_OF_WEEK } from '../data/initialData';
import {
  Assignment,
  DayOfWeek,
  MaterialTopic,
  ProgressEntry,
  ScheduleItem,
  StudentProfile,
  TaskStatus,
} from '../types/study';
import {
  formatIndonesianDate,
  getAverageComprehension,
  getDeadlineBadgeInfo,
  getLatestProgressForMaterial,
  getRecommendedSchoolDay,
} from '../utils/studyHelpers';
import { PeriodicProgressChart } from './PeriodicProgressChart';
import { SafeImage } from './SafeImage';

interface DashboardOverviewProps {
  profile: StudentProfile;
  schedule: ScheduleItem[];
  assignments: Assignment[];
  materials: MaterialTopic[];
  progressLogs: ProgressEntry[];
  onNavigateSchedule: () => void;
  onNavigateTasks: () => void;
  onOpenMaterial: (materialId: string) => void;
  onUpdateTaskStatus: (id: string, status: TaskStatus) => void;
}

export function DashboardOverview({
  profile,
  schedule,
  assignments,
  materials,
  progressLogs,
  onNavigateSchedule,
  onNavigateTasks,
  onOpenMaterial,
  onUpdateTaskStatus,
}: DashboardOverviewProps) {
  const [focusDay, setFocusDay] = useState<DayOfWeek>(getRecommendedSchoolDay());

  const daySchedule = schedule
    .filter((s) => s.day === focusDay)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  const activeTasks = assignments
    .filter((t) => t.status !== 'Selesai')
    .sort((a, b) =>
      `${a.dueDate}T${a.dueTime}`.localeCompare(`${b.dueDate}T${b.dueTime}`)
    );

  const urgentCount = activeTasks.filter((t) => {
    const info = getDeadlineBadgeInfo(t);
    return info.tone === 'urgent' || info.tone === 'soon';
  }).length;

  const avgComprehension = getAverageComprehension(
    progressLogs,
    materials.map((m) => m.id)
  );

  // Average score timeline across weeks for overview chart
  const recentOverallEntries = [...progressLogs]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-8);

  return (
    <div className="space-y-6">
      {/* Welcome & Student Context Header */}
      <section className="bg-white border border-slate-200 rounded-xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <SafeImage
              src="/src/assets/images/avatar_siswi_smp_1795407766517.jpg"
              alt={`Foto profil ${profile.name}`}
              fallbackTitle={profile.name}
              className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0"
            />
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span className="font-semibold text-blue-700">{profile.school}</span>
                <span aria-hidden="true">·</span>
                <span>{profile.grade}</span>
                <span aria-hidden="true">·</span>
                <span>{profile.academicYear}</span>
              </div>
              <h2 className="font-display text-2xl font-bold text-slate-900 tracking-tight mt-0.5 text-balance">
                Selamat Belajar, {profile.name.split(' ')[0]}
              </h2>
              <p className="text-sm text-slate-600 mt-0.5">
                Semua jadwal kelas, pengingat tugas, dan evaluasi materi Informatika terangkum di satu tempat.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={onNavigateTasks}
              className="px-4 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Kelola Tugas
            </button>
            <button
              type="button"
              onClick={() => onOpenMaterial(materials[0].id)}
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Buka Materi Informatika
            </button>
          </div>
        </div>

        {/* 4-column KPI Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-5 border-t border-slate-100">
          <div>
            <div className="text-xs text-slate-500">Sesi Pelajaran ({focusDay})</div>
            <div className="font-display text-2xl font-bold text-slate-900 tabular-nums mt-1">
              {daySchedule.length} <span className="text-sm font-normal text-slate-500">sesi</span>
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-500">Tugas Belum Selesai</div>
            <div className="font-display text-2xl font-bold text-slate-900 tabular-nums mt-1">
              {activeTasks.length} <span className="text-sm font-normal text-slate-500">tugas</span>
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-500">Tenggat Dekat (H-3)</div>
            <div className="font-display text-2xl font-bold text-amber-700 tabular-nums mt-1">
              {urgentCount} <span className="text-sm font-normal text-slate-500">prioritas</span>
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-500">Rata-Rata Pemahaman Materi</div>
            <div className="font-display text-2xl font-bold text-blue-700 tabular-nums mt-1">
              {avgComprehension}%
            </div>
          </div>
        </div>
      </section>

      {/* Main 2-Column Workspace: Today's Schedule + Urgent Homework */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Schedule for Focus Day */}
        <section className="lg:col-span-7 bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-blue-700" />
              <h3 className="font-display text-base font-semibold text-slate-900">
                Jadwal Pelajaran — {focusDay}
              </h3>
            </div>
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg overflow-x-auto">
              {DAYS_OF_WEEK.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setFocusDay(d)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    focusDay === d
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {daySchedule.map((slot) => {
              const subjectTasks = activeTasks.filter(
                (t) => t.subject.toLowerCase() === slot.subject.toLowerCase()
              );
              return (
                <div
                  key={slot.id}
                  className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/70 transition-colors"
                >
                  <div className="flex items-start gap-4 min-w-0">
                    <div className="font-mono text-xs text-slate-500 tabular-nums whitespace-nowrap pt-0.5 w-24 shrink-0">
                      {slot.startTime}–{slot.endTime}
                    </div>
                    <div className="min-w-0">
                      <div className="font-display text-sm font-semibold text-slate-900">
                        {slot.subject}
                      </div>
                      <div className="text-xs text-slate-600 mt-0.5">
                        {slot.topicFocus}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1">
                        {slot.room} · {slot.teacher}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 pl-28 sm:pl-0">
                    {subjectTasks.length > 0 && (
                      <button
                        type="button"
                        onClick={onNavigateTasks}
                        className="text-xs font-medium text-amber-700 hover:underline cursor-pointer whitespace-nowrap"
                      >
                        {subjectTasks.length} tugas
                      </button>
                    )}
                    {slot.linkedMaterialId && (
                      <button
                        type="button"
                        onClick={() => onOpenMaterial(slot.linkedMaterialId!)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md cursor-pointer whitespace-nowrap shrink-0"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        Rangkuman
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex justify-end">
            <button
              type="button"
              onClick={onNavigateSchedule}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-blue-900 cursor-pointer"
            >
              Lihat Jadwal Lengkap Senin–Jumat
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </section>

        {/* Right: Urgent Homework Reminders */}
        <section className="lg:col-span-5 bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-blue-700" />
              <h3 className="font-display text-base font-semibold text-slate-900">
                Pengingat Tugas Terdekat
              </h3>
            </div>
            <span className="font-mono text-xs text-slate-500 tabular-nums">
              {activeTasks.length} aktif
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {activeTasks.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-500">
                Hebat! Semua tugas sekolah sudah selesai.
              </div>
            ) : (
              activeTasks.slice(0, 4).map((task) => {
                const deadline = getDeadlineBadgeInfo(task);
                return (
                  <div key={task.id} className="p-4 flex items-start gap-3">
                    <button
                      type="button"
                      onClick={() => onUpdateTaskStatus(task.id, 'Selesai')}
                      aria-label={`Tandai selesai: ${task.title}`}
                      className="mt-0.5 text-slate-300 hover:text-emerald-600 transition-colors shrink-0 cursor-pointer"
                    >
                      {task.status === 'Dikerjakan' ? (
                        <Clock className="w-4 h-4 text-blue-600" />
                      ) : (
                        <Circle className="w-4 h-4" />
                      )}
                    </button>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500">
                        <span className="font-semibold text-slate-700">
                          {task.subject}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span
                          className={`font-mono tabular-nums font-medium ${
                            deadline.tone === 'urgent'
                              ? 'text-rose-700'
                              : deadline.tone === 'soon'
                              ? 'text-amber-700'
                              : 'text-slate-600'
                          }`}
                        >
                          {deadline.label}
                        </span>
                      </div>
                      <div className="text-sm font-semibold text-slate-900 mt-0.5 leading-snug">
                        {task.title}
                      </div>
                      {task.linkedMaterialId && (
                        <button
                          type="button"
                          onClick={() => onOpenMaterial(task.linkedMaterialId!)}
                          className="mt-1.5 text-xs font-medium text-blue-700 hover:underline cursor-pointer"
                        >
                          Pelajari rangkuman materi terkait
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex justify-end">
            <button
              type="button"
              onClick={onNavigateTasks}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-blue-900 cursor-pointer"
            >
              Buka Semua Tugas & Pengingat
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </section>
      </div>

      {/* Bottom: Comprehension Progress Overview across all 6 Informatics Materials */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-display text-lg font-bold text-slate-900">
              Pelacakan Progres Pemahaman Materi Informatika
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Klik materi mana saja untuk membaca rangkuman, mencoba simulasi, atau mencatat evaluasi pemahaman mingguan.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {materials.map((mat) => {
            const latest = getLatestProgressForMaterial(progressLogs, mat.id);
            const score = latest ? latest.score : 0;
            return (
              <button
                key={mat.id}
                type="button"
                onClick={() => onOpenMaterial(mat.id)}
                className="text-left bg-white border border-slate-200 hover:border-blue-300 rounded-xl p-4 transition-colors cursor-pointer flex flex-col justify-between gap-3"
              >
                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-semibold text-blue-700">
                      Bab {mat.order}
                    </span>
                    <span
                      className={`font-mono font-bold tabular-nums ${
                        score >= 80
                          ? 'text-emerald-700'
                          : score >= 60
                          ? 'text-blue-700'
                          : 'text-amber-700'
                      }`}
                    >
                      {score}%
                    </span>
                  </div>
                  <h4 className="font-display text-sm font-bold text-slate-900 mt-1.5 leading-snug">
                    {mat.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {latest ? latest.note : mat.summaryLead}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <div className="h-1.5 w-full bg-slate-100 rounded-sm overflow-hidden">
                    <div
                      className={`h-full ${
                        score >= 80
                          ? 'bg-emerald-600'
                          : score >= 60
                          ? 'bg-blue-600'
                          : 'bg-amber-500'
                      }`}
                      style={{ width: `${score}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span className="inline-flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-slate-400" />
                      {latest ? latest.confidence : 'Belum dicatat'}
                    </span>
                    <span>
                      {latest ? formatIndonesianDate(latest.date) : 'Catat sekarang'}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <PeriodicProgressChart
          entries={recentOverallEntries}
          title="Riwayat Check-In Evaluasi Pemahaman Terakhir (Seluruh Materi)"
        />
      </section>
    </div>
  );
}
