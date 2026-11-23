import { useEffect, useMemo, useState } from 'react';
import {
  BookOpen,
  CalendarDays,
  CheckSquare,
  LayoutDashboard,
  RotateCcw,
} from 'lucide-react';
import { AssignmentTracker } from './components/AssignmentTracker';
import { DashboardOverview } from './components/DashboardOverview';
import { MaterialHub } from './components/MaterialHub';
import { ScheduleView } from './components/ScheduleView';
import {
  INITIAL_ASSIGNMENTS,
  INITIAL_PROGRESS_LOGS,
  INITIAL_SCHEDULE,
  INITIAL_STUDENT_PROFILE,
  STUDY_MATERIALS,
} from './data/initialData';
import {
  Assignment,
  ProgressEntry,
  ScheduleItem,
  TaskStatus,
  WorkspaceTab,
} from './types/study';
import { getAverageComprehension } from './utils/studyHelpers';

const STORAGE_KEYS = {
  schedule: 'gm_agenda_schedule_v1',
  assignments: 'gm_agenda_assignments_v1',
  progress: 'gm_agenda_progress_v1',
};

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [activeTab, setActiveTab] = useState<WorkspaceTab>('ringkasan');
  const [selectedMaterialId, setSelectedMaterialId] = useState<string>(
    STUDY_MATERIALS[1].id // Default highlight: Computer Sistem (IPO)
  );
  const [taskSubjectFilter, setTaskSubjectFilter] = useState<string>('');

  const [schedule, setSchedule] = useState<ScheduleItem[]>(() =>
    loadFromStorage(STORAGE_KEYS.schedule, INITIAL_SCHEDULE)
  );
  const [assignments, setAssignments] = useState<Assignment[]>(() =>
    loadFromStorage(STORAGE_KEYS.assignments, INITIAL_ASSIGNMENTS)
  );
  const [progressLogs, setProgressLogs] = useState<ProgressEntry[]>(() =>
    loadFromStorage(STORAGE_KEYS.progress, INITIAL_PROGRESS_LOGS)
  );

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.schedule, JSON.stringify(schedule));
    } catch {
      // Ignore storage quota errors
    }
  }, [schedule]);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        STORAGE_KEYS.assignments,
        JSON.stringify(assignments)
      );
    } catch {
      // Ignore storage quota errors
    }
  }, [assignments]);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        STORAGE_KEYS.progress,
        JSON.stringify(progressLogs)
      );
    } catch {
      // Ignore storage quota errors
    }
  }, [progressLogs]);

  const subjectOptions = useMemo(() => {
    const set = new Set<string>(schedule.map((s) => s.subject));
    set.add('Informatika');
    set.add('Matematika');
    set.add('Bahasa Indonesia');
    set.add('IPA Terpadu');
    set.add('Bahasa Inggris');
    set.add('IPS');
    set.add('Pendidikan Pancasila');
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [schedule]);

  const activeTaskCount = assignments.filter((a) => a.status !== 'Selesai').length;
  const avgMastery = getAverageComprehension(
    progressLogs,
    STUDY_MATERIALS.map((m) => m.id)
  );

  const handleOpenMaterial = (materialId: string) => {
    setSelectedMaterialId(materialId);
    setActiveTab('materi');
  };

  const handleOpenTasksForSubject = (subject: string) => {
    setTaskSubjectFilter(subject);
    setActiveTab('tugas');
  };

  const handleAddSchedule = (item: Omit<ScheduleItem, 'id'>) => {
    setSchedule((prev) => [
      ...prev,
      { ...item, id: `sch-${Date.now()}` },
    ]);
  };

  const handleDeleteSchedule = (id: string) => {
    setSchedule((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddAssignment = (task: Omit<Assignment, 'id'>) => {
    setAssignments((prev) => [
      { ...task, id: `tsk-${Date.now()}` },
      ...prev,
    ]);
  };

  const handleUpdateTaskStatus = (id: string, status: TaskStatus) => {
    setAssignments((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status } : t))
    );
  };

  const handleToggleReminder = (id: string) => {
    setAssignments((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, reminderEnabled: !t.reminderEnabled } : t
      )
    );
  };

  const handleDeleteAssignment = (id: string) => {
    setAssignments((prev) => prev.filter((t) => t.id !== id));
  };

  const handleAddProgress = (entry: Omit<ProgressEntry, 'id'>) => {
    setProgressLogs((prev) => [
      ...prev,
      { ...entry, id: `prg-${Date.now()}` },
    ]);
  };

  const handleDeleteProgress = (id: string) => {
    setProgressLogs((prev) => prev.filter((p) => p.id !== id));
  };

  const handleResetDemoData = () => {
    setSchedule(INITIAL_SCHEDULE);
    setAssignments(INITIAL_ASSIGNMENTS);
    setProgressLogs(INITIAL_PROGRESS_LOGS);
  };

  const navItems: {
    id: WorkspaceTab;
    label: string;
    icon: typeof LayoutDashboard;
    meta?: string;
  }[] = [
    { id: 'ringkasan', label: 'Ringkasan Hari Ini', icon: LayoutDashboard },
    {
      id: 'jadwal',
      label: 'Jadwal Pelajaran',
      icon: CalendarDays,
      meta: `${schedule.length} sesi`,
    },
    {
      id: 'tugas',
      label: 'Pengingat Tugas',
      icon: CheckSquare,
      meta: `${activeTaskCount} aktif`,
    },
    {
      id: 'materi',
      label: 'Materi & Progres',
      icon: BookOpen,
      meta: `${avgMastery}%`,
    },
  ];

  const tabTitles: Record<WorkspaceTab, string> = {
    ringkasan: 'Ringkasan Belajar Harian',
    jadwal: 'Jadwal Pelajaran',
    tugas: 'Pengingat Tugas Sekolah',
    materi: 'Rangkuman Materi & Progres Berkala',
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-slate-50 text-slate-900">
      {/* Desktop Sidebar (256px) */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 bg-white border-r border-slate-200 z-20">
        <div className="px-5 py-5 border-b border-slate-100">
          <div className="font-display text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap">
            Agenda Belajar
          </div>
          <div className="text-xs text-slate-500 mt-0.5 truncate">
            {INITIAL_STUDENT_PROFILE.school}
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1" aria-label="Navigasi utama">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  if (item.id === 'tugas') setTaskSubjectFilter('');
                  setActiveTab(item.id);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                  active
                    ? 'bg-blue-50 text-blue-800 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <span className="flex items-center gap-2.5 whitespace-nowrap">
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      active ? 'text-blue-700' : 'text-slate-400'
                    }`}
                  />
                  {item.label}
                </span>
                {item.meta && (
                  <span className="font-mono text-[11px] text-slate-400 tabular-nums">
                    {item.meta}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100 space-y-3">
          <div className="text-xs text-slate-500 leading-relaxed">
            <div className="font-semibold text-slate-800">
              {INITIAL_STUDENT_PROFILE.name}
            </div>
            <div>{INITIAL_STUDENT_PROFILE.grade}</div>
          </div>
          <button
            type="button"
            onClick={handleResetDemoData}
            className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Data Awal
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        {/* Contextual Top Bar (<=15% mobile height, clean 3-zone contract) */}
        <header className="sticky top-0 z-10 bg-white/95 backdrop-blur border-b border-slate-200 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="text-xs text-slate-500 truncate">
              Agenda Belajar <span aria-hidden="true">/</span>{' '}
              <span className="text-slate-900 font-medium">
                {tabTitles[activeTab]}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setActiveTab('tugas')}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {activeTaskCount} Tugas Aktif
            </button>
          </div>
        </header>

        {/* Mobile Compact Nav Tabs (inline under header, not extra sticky height) */}
        <nav
          className="lg:hidden flex items-center gap-1.5 px-4 py-2.5 bg-white border-b border-slate-200 overflow-x-auto"
          aria-label="Navigasi seluler"
        >
          {navItems.map((item) => {
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  if (item.id === 'tugas') setTaskSubjectFilter('');
                  setActiveTab(item.id);
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  active
                    ? 'bg-blue-700 text-white'
                    : 'bg-slate-100 text-slate-700'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Workspace Viewport */}
        <main className="flex-1 px-4 sm:px-8 py-6 max-w-7xl w-full mx-auto">
          {activeTab === 'ringkasan' && (
            <DashboardOverview
              profile={INITIAL_STUDENT_PROFILE}
              schedule={schedule}
              assignments={assignments}
              materials={STUDY_MATERIALS}
              progressLogs={progressLogs}
              onNavigateSchedule={() => setActiveTab('jadwal')}
              onNavigateTasks={() => {
                setTaskSubjectFilter('');
                setActiveTab('tugas');
              }}
              onOpenMaterial={handleOpenMaterial}
              onUpdateTaskStatus={handleUpdateTaskStatus}
            />
          )}

          {activeTab === 'jadwal' && (
            <ScheduleView
              schedule={schedule}
              assignments={assignments}
              materials={STUDY_MATERIALS}
              onAddSchedule={handleAddSchedule}
              onDeleteSchedule={handleDeleteSchedule}
              onOpenMaterial={handleOpenMaterial}
              onOpenTasksForSubject={handleOpenTasksForSubject}
            />
          )}

          {activeTab === 'tugas' && (
            <AssignmentTracker
              key={taskSubjectFilter || 'all-subjects'}
              assignments={assignments}
              materials={STUDY_MATERIALS}
              subjectOptions={subjectOptions}
              initialSubjectFilter={taskSubjectFilter}
              onAddAssignment={handleAddAssignment}
              onUpdateStatus={handleUpdateTaskStatus}
              onToggleReminder={handleToggleReminder}
              onDeleteAssignment={handleDeleteAssignment}
              onOpenMaterial={handleOpenMaterial}
            />
          )}

          {activeTab === 'materi' && (
            <MaterialHub
              materials={STUDY_MATERIALS}
              selectedMaterialId={selectedMaterialId}
              onSelectMaterial={setSelectedMaterialId}
              progressLogs={progressLogs}
              onAddProgress={handleAddProgress}
              onDeleteProgress={handleDeleteProgress}
              assignments={assignments}
              onJumpToTasks={() => {
                setTaskSubjectFilter('Informatika');
                setActiveTab('tugas');
              }}
            />
          )}
        </main>

        {/* Quiet Academic Footer */}
        <footer className="px-4 sm:px-8 py-4 border-t border-slate-200 bg-white text-xs text-slate-500 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span>
            Agenda Belajar — {INITIAL_STUDENT_PROFILE.school} ({INITIAL_STUDENT_PROFILE.academicYear})
          </span>
          <span>Data tersimpan otomatis secara lokal di peramban.</span>
        </footer>
      </div>
    </div>
  );
}
