import { FormEvent, useMemo, useState } from 'react';
import {
  AlertTriangle,
  Bell,
  BellOff,
  BookOpen,
  CheckCircle2,
  Circle,
  Clock,
  Plus,
  Search,
  Trash2,
  X,
} from 'lucide-react';
import {
  Assignment,
  MaterialTopic,
  TaskPriority,
  TaskStatus,
} from '../types/study';
import { getDeadlineBadgeInfo, getTodayIso } from '../utils/studyHelpers';

interface AssignmentTrackerProps {
  assignments: Assignment[];
  materials: MaterialTopic[];
  subjectOptions: string[];
  initialSubjectFilter?: string;
  onAddAssignment: (task: Omit<Assignment, 'id'>) => void;
  onUpdateStatus: (id: string, status: TaskStatus) => void;
  onToggleReminder: (id: string) => void;
  onDeleteAssignment: (id: string) => void;
  onOpenMaterial: (materialId: string) => void;
}

type StatusFilter = 'all' | 'active' | 'urgent' | 'done';

export function AssignmentTracker({
  assignments,
  materials,
  subjectOptions,
  initialSubjectFilter = '',
  onAddAssignment,
  onUpdateStatus,
  onToggleReminder,
  onDeleteAssignment,
  onOpenMaterial,
}: AssignmentTrackerProps) {
  const [searchQuery, setSearchQuery] = useState(initialSubjectFilter);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [showAddForm, setShowAddForm] = useState(false);

  // Add Task Form State
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState(subjectOptions[0] || 'Informatika');
  const [dueDate, setDueDate] = useState(getTodayIso());
  const [dueTime, setDueTime] = useState('19:00');
  const [priority, setPriority] = useState<TaskPriority>('Sedang');
  const [description, setDescription] = useState('');
  const [linkedMaterialId, setLinkedMaterialId] = useState('');
  const [reminderEnabled, setReminderEnabled] = useState(true);

  const urgentTasks = useMemo(
    () =>
      assignments.filter((t) => {
        if (t.status === 'Selesai') return false;
        const info = getDeadlineBadgeInfo(t);
        return info.tone === 'urgent' || info.tone === 'soon';
      }),
    [assignments]
  );

  const filteredTasks = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return [...assignments]
      .filter((t) => {
        if (statusFilter === 'active' && t.status === 'Selesai') return false;
        if (statusFilter === 'done' && t.status !== 'Selesai') return false;
        if (
          statusFilter === 'urgent' &&
          (t.status === 'Selesai' || t.priority !== 'Mendesak')
        ) {
          return false;
        }
        if (!q) return true;
        return (
          t.title.toLowerCase().includes(q) ||
          t.subject.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => {
        if (a.status === 'Selesai' && b.status !== 'Selesai') return 1;
        if (a.status !== 'Selesai' && b.status === 'Selesai') return -1;
        return `${a.dueDate}T${a.dueTime}`.localeCompare(`${b.dueDate}T${b.dueTime}`);
      });
  }, [assignments, searchQuery, statusFilter]);

  const handleCreateTask = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAddAssignment({
      title: title.trim(),
      subject,
      dueDate,
      dueTime,
      priority,
      status: 'Belum',
      description:
        description.trim() || 'Kerjakan sesuai instruksi guru mata pelajaran.',
      linkedMaterialId: linkedMaterialId || undefined,
      reminderEnabled,
    });
    setTitle('');
    setDescription('');
    setLinkedMaterialId('');
    setShowAddForm(false);
  };

  const nextStatus = (current: TaskStatus): TaskStatus => {
    if (current === 'Belum') return 'Dikerjakan';
    if (current === 'Dikerjakan') return 'Selesai';
    return 'Belum';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-slate-900 tracking-tight">
            Pengingat Tugas Sekolah
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Pantau tenggat pengumpulan, aktifkan pengingat belajar, dan buka rangkuman materi terkait dalam satu klik.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddForm((prev) => !prev)}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer w-fit"
        >
          <Plus className="w-4 h-4" />
          Tambah Tugas Baru
        </button>
      </div>

      {/* Reminder Strip for Upcoming Deadlines */}
      {urgentTasks.length > 0 && (
        <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <div className="font-display text-sm font-semibold text-amber-950">
                Pengingat Tenggat Dekat ({urgentTasks.length} Tugas)
              </div>
              <p className="text-xs text-amber-900 mt-0.5">
                Prioritaskan{' '}
                <span className="font-semibold">{urgentTasks[0].title}</span>{' '}
                ({urgentTasks[0].subject} ·{' '}
                {getDeadlineBadgeInfo(urgentTasks[0]).label}).
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setStatusFilter('active')}
            className="text-xs font-semibold text-amber-950 underline underline-offset-2 hover:text-amber-700 whitespace-nowrap shrink-0 cursor-pointer text-left"
          >
            Tampilkan Tugas Aktif
          </button>
        </div>
      )}

      {/* Add Assignment Form */}
      {showAddForm && (
        <form
          onSubmit={handleCreateTask}
          className="p-5 bg-white border border-slate-200 rounded-xl space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-display text-sm font-semibold text-slate-900">
              Catat Tugas Sekolah Baru
            </h3>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
              aria-label="Tutup formulir tugas"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Judul Tugas
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Membuat Flowchart Input-Process-Output"
                required
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Mata Pelajaran
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                {subjectOptions.map((subj) => (
                  <option key={subj} value={subj}>
                    {subj}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Prioritas
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="Mendesak">Mendesak</option>
                <option value="Sedang">Sedang</option>
                <option value="Santai">Santai</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tanggal Tenggat
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Jam Pengumpulan
              </label>
              <input
                type="time"
                value={dueTime}
                onChange={(e) => setDueTime(e.target.value)}
                required
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tautkan Rangkuman Materi
              </label>
              <select
                value={linkedMaterialId}
                onChange={(e) => setLinkedMaterialId(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="">Tidak ada tautan materi</option>
                {materials.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.order}. {m.shortTitle}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Catatan / Instruksi Tugas
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tuliskan rincian halaman buku atau ketentuan pengumpulan..."
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <label className="inline-flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={reminderEnabled}
                onChange={(e) => setReminderEnabled(e.target.checked)}
                className="rounded border-slate-300 accent-blue-700"
              />
              Aktifkan pengingat tenggat di beranda belajar
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg cursor-pointer"
              >
                Simpan Tugas
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Search & Segmented Status Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari tugas atau mata pelajaran..."
            className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="flex items-center gap-1 p-1 bg-slate-200/70 rounded-lg w-fit overflow-x-auto">
          {(
            [
              { key: 'all', label: 'Semua' },
              { key: 'active', label: 'Aktif' },
              { key: 'urgent', label: 'Mendesak' },
              { key: 'done', label: 'Selesai' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setStatusFilter(tab.key)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                statusFilter === tab.key
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tasks List */}
      <div className="bg-white border border-slate-200 rounded-xl divide-y divide-slate-100">
        {filteredTasks.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-sm font-medium text-slate-700">
              Tidak ada tugas yang cocok dengan filter saat ini.
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Ubah kata kunci pencarian atau tambahkan tugas sekolah baru.
            </p>
          </div>
        ) : (
          filteredTasks.map((task) => {
            const deadline = getDeadlineBadgeInfo(task);
            const linkedMat = task.linkedMaterialId
              ? materials.find((m) => m.id === task.linkedMaterialId)
              : undefined;
            const isDone = task.status === 'Selesai';

            return (
              <div
                key={task.id}
                className="p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors"
              >
                <div className="flex items-start gap-3.5 min-w-0">
                  <button
                    type="button"
                    onClick={() => onUpdateStatus(task.id, nextStatus(task.status))}
                    aria-label={`Ubah status tugas ${task.title}`}
                    className="mt-0.5 text-slate-400 hover:text-blue-700 transition-colors shrink-0 cursor-pointer"
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : task.status === 'Dikerjakan' ? (
                      <Clock className="w-5 h-5 text-blue-600" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-300" />
                    )}
                  </button>

                  <div className="min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <span className="font-semibold text-slate-800">
                        {task.subject}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span
                        className={`font-mono tabular-nums font-medium ${
                          deadline.tone === 'urgent'
                            ? 'text-rose-700'
                            : deadline.tone === 'soon'
                            ? 'text-amber-700'
                            : deadline.tone === 'done'
                            ? 'text-emerald-700'
                            : 'text-slate-600'
                        }`}
                      >
                        {deadline.label}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>Prioritas {task.priority}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-medium text-slate-700">
                        Status: {task.status}
                      </span>
                    </div>

                    <h3
                      className={`font-display text-base font-semibold ${
                        isDone ? 'line-through text-slate-400' : 'text-slate-900'
                      }`}
                    >
                      {task.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                      {task.description}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0 pl-8 lg:pl-0">
                  {linkedMat && (
                    <button
                      type="button"
                      onClick={() => onOpenMaterial(linkedMat.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      Materi {linkedMat.order}
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => onToggleReminder(task.id)}
                    title={
                      task.reminderEnabled
                        ? 'Pengingat aktif'
                        : 'Pengingat nonaktif'
                    }
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      task.reminderEnabled
                        ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        : 'bg-slate-100 border-slate-200 text-slate-400'
                    }`}
                  >
                    {task.reminderEnabled ? (
                      <Bell className="w-3.5 h-3.5 text-blue-700" />
                    ) : (
                      <BellOff className="w-3.5 h-3.5" />
                    )}
                    {task.reminderEnabled ? 'Pengingat Aktif' : 'Senyap'}
                  </button>

                  <select
                    aria-label={`Pilih status untuk ${task.title}`}
                    value={task.status}
                    onChange={(e) =>
                      onUpdateStatus(task.id, e.target.value as TaskStatus)
                    }
                    className="px-2.5 py-1.5 text-xs font-medium bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer"
                  >
                    <option value="Belum">Belum</option>
                    <option value="Dikerjakan">Dikerjakan</option>
                    <option value="Selesai">Selesai</option>
                  </select>

                  <button
                    type="button"
                    onClick={() => onDeleteAssignment(task.id)}
                    aria-label={`Hapus tugas ${task.title}`}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-md cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
