import { Assignment, DayOfWeek, ProgressEntry } from '../types/study';

export function getTodayIso(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function getRecommendedSchoolDay(): DayOfWeek {
  const dayIndex = new Date().getDay(); // 0 Sun, 1 Mon ... 6 Sat
  const map: Record<number, DayOfWeek> = {
    1: 'Senin',
    2: 'Selasa',
    3: 'Rabu',
    4: 'Kamis',
    5: 'Jumat',
  };
  return map[dayIndex] ?? 'Senin';
}

export function formatIndonesianDate(isoDate: string): string {
  if (!isoDate) return '-';
  const parsed = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return isoDate;
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(parsed);
}

export function getDeadlineBadgeInfo(assignment: Assignment): {
  label: string;
  tone: 'done' | 'urgent' | 'soon' | 'normal';
} {
  if (assignment.status === 'Selesai') {
    return { label: 'Selesai', tone: 'done' };
  }

  const today = new Date(`${getTodayIso()}T00:00:00`).getTime();
  const due = new Date(`${assignment.dueDate}T00:00:00`).getTime();
  const diffDays = Math.round((due - today) / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return { label: `Terlewat ${Math.abs(diffDays)} hari`, tone: 'urgent' };
  }
  if (diffDays === 0) {
    return { label: `Hari ini · ${assignment.dueTime}`, tone: 'urgent' };
  }
  if (diffDays === 1) {
    return { label: `Besok · ${assignment.dueTime}`, tone: 'soon' };
  }
  if (diffDays <= 3) {
    return { label: `${diffDays} hari lagi`, tone: 'soon' };
  }
  return { label: formatIndonesianDate(assignment.dueDate), tone: 'normal' };
}

export function getLatestProgressForMaterial(
  logs: ProgressEntry[],
  materialId: string
): ProgressEntry | undefined {
  const filtered = logs
    .filter((log) => log.materialId === materialId)
    .sort((a, b) => b.date.localeCompare(a.date));
  return filtered[0];
}

export function getAverageComprehension(
  logs: ProgressEntry[],
  materialIds: string[]
): number {
  if (materialIds.length === 0) return 0;
  let total = 0;
  for (const id of materialIds) {
    const latest = getLatestProgressForMaterial(logs, id);
    total += latest ? latest.score : 0;
  }
  return Math.round(total / materialIds.length);
}

export function getWeekLabelFromDate(isoDate: string): string {
  const parsed = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return 'Evaluasi';
  const day = parsed.getDate();
  const weekNum = Math.min(4, Math.ceil(day / 7));
  const monthShort = new Intl.DateTimeFormat('id-ID', { month: 'short' }).format(parsed);
  return `Pekan ${weekNum} · ${monthShort}`;
}
