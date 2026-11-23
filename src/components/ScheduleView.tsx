import { FormEvent, useMemo, useState } from 'react';
import {
  BookOpen,
  CalendarDays,
  Clock,
  MapPin,
  Plus,
  Trash2,
  User,
  X,
} from 'lucide-react';
import { DAYS_OF_WEEK } from '../data/initialData';
import {
  Assignment,
  DayOfWeek,
  MaterialTopic,
  ScheduleItem,
} from '../types/study';
import { getRecommendedSchoolDay } from '../utils/studyHelpers';

interface ScheduleViewProps {
  schedule: ScheduleItem[];
  assignments: Assignment[];
  materials: MaterialTopic[];
  onAddSchedule: (item: Omit<ScheduleItem, 'id'>) => void;
  onDeleteSchedule: (id: string) => void;
  onOpenMaterial: (materialId: string) => void;
  onOpenTasksForSubject: (subject: string) => void;
}

export function ScheduleView({
  schedule,
  assignments,
  materials,
  onAddSchedule,
  onDeleteSchedule,
  onOpenMaterial,
  onOpenTasksForSubject,
}: ScheduleViewProps) {
  const recommendedDay = getRecommendedSchoolDay();
  const [viewMode, setViewMode] = useState<'weekly' | 'daily'>('weekly');
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>(recommendedDay);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Form state
  const [day, setDay] = useState<DayOfWeek>(recommendedDay);
  const [startTime, setStartTime] = useState('07:15');
  const [endTime, setEndTime] = useState('08:35');
  const [subject, setSubject] = useState('Informatika');
  const [room, setRoom] = useState('Lab Komputer 1');
  const [teacher, setTeacher] = useState('Bapak Dimas Pratama, S.Kom.');
  const [topicFocus, setTopicFocus] = useState('');
  const [linkedMaterialId, setLinkedMaterialId] = useState('');

  const selectedSlot = useMemo(
    () => schedule.find((item) => item.id === selectedSlotId) ?? null,
    [schedule, selectedSlotId]
  );

  const getPendingCountForSubject = (subj: string) =>
    assignments.filter(
      (a) =>
        a.subject.toLowerCase() === subj.toLowerCase() && a.status !== 'Selesai'
    ).length;

  const handleAddSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!subject.trim()) return;
    onAddSchedule({
      day,
      startTime,
      endTime,
      subject: subject.trim(),
      room: room.trim() || 'Ruang Kelas',
      teacher: teacher.trim() || 'Guru Mata Pelajaran',
      topicFocus: topicFocus.trim() || 'Pembelajaran Reguler',
      linkedMaterialId: linkedMaterialId || undefined,
    });
    setTopicFocus('');
    setLinkedMaterialId('');
    setShowAddForm(false);
  };

  const renderDayColumn = (dayName: DayOfWeek) => {
    const items = schedule
      .filter((s) => s.day === dayName)
      .sort((a, b) => a.startTime.localeCompare(b.startTime));

    const isRecommended = dayName === recommendedDay;

    return (
      <div
        key={dayName}
        className={`bg-white border rounded-xl flex flex-col ${
          isRecommended ? 'border-blue-300' : 'border-slate-200'
        }`}
      >
        <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-display text-sm font-bold text-slate-900">
              {dayName}
            </h3>
            {isRecommended && (
              <span className="text-[11px] font-mono text-blue-700">
                · Fokus Hari
              </span>
            )}
          </div>
          <span className="font-mono text-xs text-slate-400 tabular-nums">
            {items.length} sesi
          </span>
        </div>

        <div className="divide-y divide-slate-100 flex-1">
          {items.length === 0 ? (
            <div className="p-4 text-xs text-slate-400">
              Belum ada jadwal pelajaran.
            </div>
          ) : (
            items.map((slot) => {
              const pendingTasks = getPendingCountForSubject(slot.subject);
              const isSelected = selectedSlotId === slot.id;
              return (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() => setSelectedSlotId(slot.id)}
                  className={`w-full text-left p-3.5 transition-colors cursor-pointer ${
                    isSelected ? 'bg-blue-50/80' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 text-[11px] font-mono text-slate-500 tabular-nums">
                    <span>
                      {slot.startTime} – {slot.endTime}
                    </span>
                    <span className="truncate">{slot.room}</span>
                  </div>
                  <div className="font-display text-sm font-semibold text-slate-900 mt-1">
                    {slot.subject}
                  </div>
                  <div className="text-xs text-slate-600 mt-0.5 line-clamp-2">
                    {slot.topicFocus}
                  </div>
                  {(pendingTasks > 0 || slot.linkedMaterialId) && (
                    <div className="flex flex-wrap items-center gap-2 mt-2 text-[11px]">
                      {pendingTasks > 0 && (
                        <span className="font-medium text-amber-700 tabular-nums">
                          {pendingTasks} tugas aktif
                        </span>
                      )}
                      {pendingTasks > 0 && slot.linkedMaterialId && (
                        <span className="text-slate-300" aria-hidden="true">
                          ·
                        </span>
                      )}
                      {slot.linkedMaterialId && (
                        <span className="font-medium text-blue-700">
                          Ada rangkuman
                        </span>
                      )}
                    </div>
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>
    );
  };

  const selectedSlotTasks = selectedSlot
    ? assignments.filter(
        (a) => a.subject.toLowerCase() === selectedSlot.subject.toLowerCase()
      )
    : [];

  const selectedSlotMaterial = selectedSlot?.linkedMaterialId
    ? materials.find((m) => m.id === selectedSlot.linkedMaterialId)
    : undefined;

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-slate-900 tracking-tight">
            Jadwal Pelajaran Mingguan
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Terhubung langsung dengan tugas sekolah dan rangkuman materi tiap mata pelajaran.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1 p-1 bg-slate-200/70 rounded-lg">
            <button
              type="button"
              onClick={() => setViewMode('weekly')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                viewMode === 'weekly'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semua Hari (Senin–Jumat)
            </button>
            <button
              type="button"
              onClick={() => setViewMode('daily')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                viewMode === 'daily'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Fokus Per Hari
            </button>
          </div>

          <button
            type="button"
            onClick={() => setShowAddForm((prev) => !prev)}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Tambah Jam Pelajaran
          </button>
        </div>
      </div>

      {/* Add Schedule Form */}
      {showAddForm && (
        <form
          onSubmit={handleAddSubmit}
          className="p-5 bg-white border border-slate-200 rounded-xl space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-display text-sm font-semibold text-slate-900">
              Tambah Sesi Jadwal Baru
            </h3>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
              aria-label="Tutup formulir"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Hari
              </label>
              <select
                value={day}
                onChange={(e) => setDay(e.target.value as DayOfWeek)}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                {DAYS_OF_WEEK.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Jam Mulai
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Jam Selesai
              </label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Mata Pelajaran
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Contoh: Informatika"
                required
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Ruangan
              </label>
              <input
                type="text"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                placeholder="Lab Komputer 1"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Guru Pengajar
              </label>
              <input
                type="text"
                value={teacher}
                onChange={(e) => setTeacher(e.target.value)}
                placeholder="Nama Guru"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Fokus Topik
              </label>
              <input
                type="text"
                value={topicFocus}
                onChange={(e) => setTopicFocus(e.target.value)}
                placeholder="Contoh: Praktik Vibe Coding"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Hubungkan Materi (Opsional)
              </label>
              <select
                value={linkedMaterialId}
                onChange={(e) => setLinkedMaterialId(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="">Tidak dihubungkan</option>
                {materials.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.order}. {m.shortTitle}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2">
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
              Simpan Jadwal
            </button>
          </div>
        </form>
      )}

      {/* Daily Selector Bar when Daily View active */}
      {viewMode === 'daily' && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {DAYS_OF_WEEK.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setSelectedDay(d)}
              className={`px-4 py-2 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                selectedDay === d
                  ? 'bg-blue-700 text-white border-blue-700'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      )}

      {/* Main Timetable Grid */}
      {viewMode === 'weekly' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4 items-start">
          {DAYS_OF_WEEK.map((d) => renderDayColumn(d))}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7">{renderDayColumn(selectedDay)}</div>
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-5 text-sm text-slate-600">
            <p className="font-medium text-slate-800">
              Pilih salah satu sesi pelajaran di sebelah kiri untuk melihat detail guru, tugas terkait, dan rangkuman materi yang terhubung.
            </p>
          </div>
        </div>
      )}

      {/* Selected Class Detail Panel (Integrated with Tasks & Material) */}
      {selectedSlot && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1 font-medium text-blue-700">
                  <CalendarDays className="w-3.5 h-3.5" />
                  {selectedSlot.day}
                </span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1 font-mono tabular-nums">
                  <Clock className="w-3.5 h-3.5" />
                  {selectedSlot.startTime} – {selectedSlot.endTime}
                </span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {selectedSlot.room}
                </span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1">
                  <User className="w-3.5 h-3.5" />
                  {selectedSlot.teacher}
                </span>
              </div>
              <h3 className="font-display text-xl font-bold text-slate-900 mt-1.5">
                {selectedSlot.subject} — {selectedSlot.topicFocus}
              </h3>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => {
                  onDeleteSchedule(selectedSlot.id);
                  setSelectedSlotId(null);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg cursor-pointer whitespace-nowrap shrink-0"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Hapus Sesi
              </button>
              <button
                type="button"
                onClick={() => setSelectedSlotId(null)}
                className="px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <h4 className="font-display text-sm font-semibold text-slate-900">
                  Tugas Mata Pelajaran {selectedSlot.subject}
                </h4>
                <button
                  type="button"
                  onClick={() => onOpenTasksForSubject(selectedSlot.subject)}
                  className="text-xs font-medium text-blue-700 hover:underline cursor-pointer"
                >
                  Kelola di Pengingat Tugas
                </button>
              </div>
              {selectedSlotTasks.length === 0 ? (
                <p className="text-xs text-slate-500">
                  Tidak ada tugas tercatat untuk mata pelajaran {selectedSlot.subject}.
                </p>
              ) : (
                <ul className="divide-y divide-slate-100 border border-slate-200 rounded-lg">
                  {selectedSlotTasks.map((task) => (
                    <li key={task.id} className="p-3 text-xs flex items-center justify-between gap-3">
                      <span
                        className={
                          task.status === 'Selesai'
                            ? 'line-through text-slate-400'
                            : 'font-medium text-slate-800'
                        }
                      >
                        {task.title}
                      </span>
                      <span className="font-mono text-slate-500 whitespace-nowrap tabular-nums">
                        {task.status}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <h4 className="font-display text-sm font-semibold text-slate-900 mb-2.5">
                Rangkuman Materi Terhubung
              </h4>
              {selectedSlotMaterial ? (
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2.5">
                  <div className="font-display text-sm font-semibold text-slate-900">
                    {selectedSlotMaterial.order}. {selectedSlotMaterial.title}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {selectedSlotMaterial.summaryLead}
                  </p>
                  <button
                    type="button"
                    onClick={() => onOpenMaterial(selectedSlotMaterial.id)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    Pelajari Rangkuman & Cek Progres
                  </button>
                </div>
              ) : (
                <p className="text-xs text-slate-500">
                  Sesi ini belum ditautkan ke bab rangkuman materi Informatika.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
