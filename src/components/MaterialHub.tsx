import { FormEvent, useMemo, useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  LineChart,
  Plus,
  Trash2,
  XCircle,
} from 'lucide-react';
import {
  Assignment,
  ConfidenceLevel,
  MaterialTopic,
  ProgressEntry,
} from '../types/study';
import {
  formatIndonesianDate,
  getLatestProgressForMaterial,
  getTodayIso,
  getWeekLabelFromDate,
} from '../utils/studyHelpers';
import { D3ComprehensionBarChart } from './D3ComprehensionBarChart';
import { InteractiveMaterialLab } from './InteractiveMaterialLab';
import { PeriodicProgressChart } from './PeriodicProgressChart';
import { SafeImage } from './SafeImage';

interface MaterialHubProps {
  materials: MaterialTopic[];
  selectedMaterialId: string;
  onSelectMaterial: (id: string) => void;
  progressLogs: ProgressEntry[];
  onAddProgress: (entry: Omit<ProgressEntry, 'id'>) => void;
  onDeleteProgress: (id: string) => void;
  assignments: Assignment[];
  onJumpToTasks: () => void;
}

type MaterialSubTab = 'rangkuman' | 'simulasi' | 'progres';

export function MaterialHub({
  materials,
  selectedMaterialId,
  onSelectMaterial,
  progressLogs,
  onAddProgress,
  onDeleteProgress,
  assignments,
  onJumpToTasks,
}: MaterialHubProps) {
  const [subTab, setSubTab] = useState<MaterialSubTab>('rangkuman');
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<Record<string, boolean>>({});

  // Periodic Progress Form State
  const [evalDate, setEvalDate] = useState<string>(getTodayIso());
  const [evalScore, setEvalScore] = useState<number>(80);
  const [evalConfidence, setEvalConfidence] = useState<ConfidenceLevel>('Paham');
  const [evalNote, setEvalNote] = useState<string>('');
  const [savedFeedback, setSavedFeedback] = useState<string>('');

  const activeMaterial =
    materials.find((m) => m.id === selectedMaterialId) ?? materials[0];

  const materialLogs = useMemo(
    () =>
      progressLogs
        .filter((log) => log.materialId === activeMaterial.id)
        .sort((a, b) => b.date.localeCompare(a.date)),
    [progressLogs, activeMaterial.id]
  );

  const latestProgress = getLatestProgressForMaterial(
    progressLogs,
    activeMaterial.id
  );

  const linkedTasks = assignments.filter(
    (t) => t.linkedMaterialId === activeMaterial.id && t.status !== 'Selesai'
  );

  const isQuizChecked = Boolean(quizSubmitted[activeMaterial.id]);

  const quizCorrectCount = activeMaterial.quiz.reduce((acc, q) => {
    return acc + (quizAnswers[q.id] === q.correctIndex ? 1 : 0);
  }, 0);
  const computedQuizPct = Math.round(
    (quizCorrectCount / activeMaterial.quiz.length) * 100
  );

  const handleLogQuizToProgress = () => {
    const inferredConfidence: ConfidenceLevel =
      computedQuizPct >= 85
        ? 'Menguasai'
        : computedQuizPct >= 65
        ? 'Paham'
        : 'Mulai Mengerti';
    onAddProgress({
      materialId: activeMaterial.id,
      date: getTodayIso(),
      weekLabel: getWeekLabelFromDate(getTodayIso()),
      score: computedQuizPct,
      confidence: inferredConfidence,
      note: `Evaluasi kuis mandiri: benar ${quizCorrectCount} dari ${activeMaterial.quiz.length} soal.`,
      quizScore: computedQuizPct,
    });
    setSavedFeedback('Skor kuis berhasil dicatat ke riwayat progres berkala.');
    window.setTimeout(() => setSavedFeedback(''), 3000);
    setSubTab('progres');
  };

  const handleSubmitProgress = (e: FormEvent) => {
    e.preventDefault();
    onAddProgress({
      materialId: activeMaterial.id,
      date: evalDate,
      weekLabel: getWeekLabelFromDate(evalDate),
      score: evalScore,
      confidence: evalConfidence,
      note:
        evalNote.trim() ||
        `Check-in pemahaman berkala materi ${activeMaterial.shortTitle}.`,
    });
    setEvalNote('');
    setSavedFeedback('Evaluasi pemahaman berkala berhasil disimpan.');
    window.setTimeout(() => setSavedFeedback(''), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Compact Study Hub Hero */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
        <div className="lg:col-span-8 p-6 flex flex-col justify-between gap-4">
          <div>
            <div className="text-xs font-mono text-blue-700 mb-1.5">
              MODUL INFORMATIKA · KELAS VIII · SMP GLOBAL MANDIRI JAKARTA
            </div>
            <h2 className="font-display text-2xl font-bold text-slate-900 tracking-tight text-balance">
              Rangkuman Materi & Pelacakan Pemahaman Berkala
            </h2>
            <p className="text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
              Pelajari 6 topik inti Informatika, praktikkan simulasi alur sistem dan keamanan digital, lalu catat evaluasi pemahamanmu setiap pekan.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-6 pt-3 border-t border-slate-100 text-xs text-slate-600">
            <div>
              <span className="text-slate-400">Total Topik</span>
              <span className="ml-2 font-mono font-semibold text-slate-900 tabular-nums">
                {materials.length} Bab
              </span>
            </div>
            <div>
              <span className="text-slate-400">Total Check-in Berkala</span>
              <span className="ml-2 font-mono font-semibold text-slate-900 tabular-nums">
                {progressLogs.length} Catatan
              </span>
            </div>
            <div>
              <span className="text-slate-400">Topik Aktif</span>
              <span className="ml-2 font-semibold text-blue-700">
                {activeMaterial.order}. {activeMaterial.shortTitle}
              </span>
            </div>
          </div>
        </div>
        <div className="lg:col-span-4 min-h-[160px] bg-slate-100">
          <SafeImage
            src="/src/assets/images/study_desk_informatika_1795407767122.jpg"
            alt="Meja belajar digital siswi SMP Global Mandiri Jakarta"
            fallbackTitle="Ruang Belajar Informatika"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* D3 Bar Chart: Progres Pemahaman Materi dari Waktu ke Waktu */}
      <D3ComprehensionBarChart
        entries={progressLogs}
        materials={materials}
        activeMaterialId={activeMaterial.id}
        onSelectMaterial={onSelectMaterial}
      />

      {/* Main 2-Column Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Topic Index */}
        <aside className="lg:col-span-4 bg-white border border-slate-200 rounded-xl divide-y divide-slate-100">
          <div className="px-4 py-3.5">
            <h3 className="font-display text-sm font-semibold text-slate-900">
              Daftar Materi Dipelajari
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Pilih bab untuk membaca rangkuman atau mencatat progres.
            </p>
          </div>
          <div className="divide-y divide-slate-100">
            {materials.map((mat) => {
              const latest = getLatestProgressForMaterial(progressLogs, mat.id);
              const score = latest ? latest.score : 0;
              const isSelected = mat.id === activeMaterial.id;
              return (
                <button
                  key={mat.id}
                  type="button"
                  onClick={() => {
                    onSelectMaterial(mat.id);
                    setSavedFeedback('');
                  }}
                  className={`w-full text-left px-4 py-3.5 transition-colors cursor-pointer ${
                    isSelected ? 'bg-blue-50/70' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span className="font-mono text-blue-700 font-semibold">
                          {mat.order}.
                        </span>
                        <span className="truncate">{mat.subject}</span>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums">{mat.estimatedReadMin} mnt</span>
                      </div>
                      <div
                        className={`text-sm font-semibold mt-1 leading-snug ${
                          isSelected ? 'text-blue-900' : 'text-slate-900'
                        }`}
                      >
                        {mat.title}
                      </div>
                    </div>
                    <span
                      className={`font-mono text-xs font-semibold tabular-nums shrink-0 mt-0.5 ${
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
                  {/* Slim progress meter */}
                  <div className="mt-2.5 h-1.5 w-full bg-slate-100 rounded-sm overflow-hidden">
                    <div
                      className={`h-full transition-all ${
                        score >= 80
                          ? 'bg-emerald-600'
                          : score >= 60
                          ? 'bg-blue-600'
                          : 'bg-amber-500'
                      }`}
                      style={{ width: `${score}%` }}
                    />
                  </div>
                  <div className="mt-1.5 flex items-center justify-between text-[11px] text-slate-500">
                    <span>{latest ? latest.confidence : 'Belum dievaluasi'}</span>
                    <span>
                      {latest ? formatIndonesianDate(latest.date) : 'Belum ada log'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Right Active Material Content */}
        <section className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-6 space-y-6">
          {/* Topic Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-slate-200">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-1.5">
                <span className="font-mono font-semibold text-blue-700">
                  Bab {activeMaterial.order}
                </span>
                <span aria-hidden="true">·</span>
                <span>{activeMaterial.subject}</span>
                <span aria-hidden="true">·</span>
                <span>Estimasi baca {activeMaterial.estimatedReadMin} menit</span>
                <span aria-hidden="true">·</span>
                <span className="font-medium text-slate-800">
                  Pemahaman terkini:{' '}
                  <strong className="font-mono tabular-nums">
                    {latestProgress ? `${latestProgress.score}%` : '0%'}
                  </strong>{' '}
                  ({latestProgress ? latestProgress.confidence : 'Belum dicatat'})
                </span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                {activeMaterial.title}
              </h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed max-w-2xl">
                {activeMaterial.summaryLead}
              </p>
            </div>
          </div>

          {/* Linked Task Notice if any */}
          {linkedTasks.length > 0 && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl text-xs">
              <div className="text-amber-950">
                <span className="font-semibold">Tugas Terkait Materi Ini:</span>{' '}
                {linkedTasks[0].title} (tenggat {formatIndonesianDate(linkedTasks[0].dueDate)})
              </div>
              <button
                type="button"
                onClick={onJumpToTasks}
                className="font-semibold text-amber-900 underline underline-offset-2 hover:text-amber-700 whitespace-nowrap shrink-0 cursor-pointer text-left"
              >
                Lihat di Pengingat Tugas
              </button>
            </div>
          )}

          {/* Segmented Sub-navigation */}
          <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-lg w-fit">
            <button
              type="button"
              onClick={() => setSubTab('rangkuman')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                subTab === 'rangkuman'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Rangkuman Materi
            </button>
            <button
              type="button"
              onClick={() => setSubTab('simulasi')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                subTab === 'simulasi'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ClipboardCheck className="w-3.5 h-3.5" />
              Simulasi & Kuis
            </button>
            <button
              type="button"
              onClick={() => setSubTab('progres')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                subTab === 'progres'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LineChart className="w-3.5 h-3.5" />
              Progres Berkala ({materialLogs.length})
            </button>
          </div>

          {savedFeedback && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs font-medium text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{savedFeedback}</span>
            </div>
          )}

          {/* TAB 1: RANGKUMAN MATERI */}
          {subTab === 'rangkuman' && (
            <div className="space-y-6">
              <div className="space-y-5">
                {activeMaterial.sections.map((sec) => (
                  <div
                    key={sec.heading}
                    className="pb-5 border-b border-slate-100 last:border-none last:pb-0"
                  >
                    <h4 className="font-display text-base font-semibold text-slate-900">
                      {sec.heading}
                    </h4>
                    <p className="text-sm text-slate-600 mt-1 max-w-prose">
                      {sec.summary}
                    </p>
                    <ul className="mt-3 space-y-2">
                      {sec.points.map((pt) => (
                        <li
                          key={pt}
                          className="text-sm text-slate-800 leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-blue-700 before:rounded-xs"
                        >
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Real World Example */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="text-xs font-mono text-blue-700 mb-1">
                  CONTOH PENERAPAN DI SEKOLAH
                </div>
                <p className="text-sm text-slate-800 leading-relaxed">
                  {activeMaterial.realWorldExample}
                </p>
              </div>

              {/* Key Terms */}
              <div>
                <h4 className="font-display text-sm font-semibold text-slate-900 mb-3">
                  Istilah Penting yang Wajib Dikuasai
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {activeMaterial.keyTerms.map((kt) => (
                    <div
                      key={kt.term}
                      className="p-3.5 bg-white border border-slate-200 rounded-xl"
                    >
                      <div className="font-display text-xs font-bold text-slate-900">
                        {kt.term}
                      </div>
                      <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                        {kt.definition}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <span className="text-xs text-slate-500">
                  Sudah selesai membaca rangkuman bab ini?
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSubTab('simulasi')}
                    className="px-4 py-2 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Uji Pemahaman di Simulasi & Kuis
                  </button>
                  <button
                    type="button"
                    onClick={() => setSubTab('progres')}
                    className="px-4 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Catat Progres Berkala
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SIMULASI & KUIS */}
          {subTab === 'simulasi' && (
            <div className="space-y-8">
              <InteractiveMaterialLab labType={activeMaterial.interactiveLabType} />

              <div className="pt-6 border-t border-slate-200 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="font-display text-base font-semibold text-slate-900">
                      Kuis Evaluasi Singkat ({activeMaterial.quiz.length} Soal)
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Jawab semua pertanyaan lalu periksa hasilnya untuk memperbarui progres pemahamanmu.
                    </p>
                  </div>
                  {isQuizChecked && (
                    <div className="font-mono text-sm font-bold text-blue-700 tabular-nums">
                      Skor: {computedQuizPct}% ({quizCorrectCount}/{activeMaterial.quiz.length})
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  {activeMaterial.quiz.map((q, idx) => {
                    const selected = quizAnswers[q.id];
                    const isCorrect = selected === q.correctIndex;
                    return (
                      <div
                        key={q.id}
                        className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3"
                      >
                        <div className="text-sm font-medium text-slate-900">
                          <span className="font-mono text-blue-700 mr-2">
                            0{idx + 1}.
                          </span>
                          {q.question}
                        </div>
                        <div className="space-y-2">
                          {q.options.map((opt, optIdx) => {
                            const picked = selected === optIdx;
                            let btnStyle =
                              'bg-white border-slate-200 text-slate-800 hover:bg-slate-100';
                            if (isQuizChecked) {
                              if (optIdx === q.correctIndex) {
                                btnStyle =
                                  'bg-emerald-50 border-emerald-500 text-emerald-950 font-medium';
                              } else if (picked && optIdx !== q.correctIndex) {
                                btnStyle =
                                  'bg-rose-50 border-rose-400 text-rose-900';
                              }
                            } else if (picked) {
                              btnStyle =
                                'bg-blue-50 border-blue-600 text-blue-900 font-medium';
                            }

                            return (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => {
                                  if (isQuizChecked) return;
                                  setQuizAnswers((prev) => ({
                                    ...prev,
                                    [q.id]: optIdx,
                                  }));
                                }}
                                className={`w-full text-left px-3.5 py-2.5 text-xs rounded-lg border transition-colors cursor-pointer ${btnStyle}`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                        {isQuizChecked && (
                          <div
                            className={`flex items-start gap-2 text-xs pt-1 ${
                              isCorrect ? 'text-emerald-700' : 'text-rose-700'
                            }`}
                          >
                            {isCorrect ? (
                              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                            ) : (
                              <XCircle className="w-4 h-4 shrink-0 mt-0.5" />
                            )}
                            <span>{q.explanation}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {!isQuizChecked ? (
                    <button
                      type="button"
                      onClick={() =>
                        setQuizSubmitted((prev) => ({
                          ...prev,
                          [activeMaterial.id]: true,
                        }))
                      }
                      disabled={activeMaterial.quiz.some(
                        (q) => quizAnswers[q.id] === undefined
                      )}
                      className="px-4 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 disabled:bg-slate-300 disabled:cursor-not-allowed rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Periksa Jawaban Kuis
                    </button>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={handleLogQuizToProgress}
                        className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        Simpan Skor ({computedQuizPct}%) ke Progres Berkala
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setQuizSubmitted((prev) => ({
                            ...prev,
                            [activeMaterial.id]: false,
                          }));
                          setQuizAnswers((prev) => {
                            const next = { ...prev };
                            for (const q of activeMaterial.quiz) {
                              delete next[q.id];
                            }
                            return next;
                          });
                        }}
                        className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        Ulangi Kuis
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PROGRES BERKALA */}
          {subTab === 'progres' && (
            <div className="space-y-6">
              <PeriodicProgressChart
                entries={materialLogs}
                title={`Grafik Perkembangan: ${activeMaterial.shortTitle}`}
              />

              {/* Form Catat Evaluasi Baru */}
              <form
                onSubmit={handleSubmitProgress}
                className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-4"
              >
                <div>
                  <h4 className="font-display text-sm font-semibold text-slate-900">
                    Catat Evaluasi Pemahaman Berkala Baru
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Lakukan refleksi rutin tiap minggu atau setelah mengulang materi agar perkembangan belajarmu terukur.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Tanggal Evaluasi
                    </label>
                    <input
                      type="date"
                      value={evalDate}
                      onChange={(e) => setEvalDate(e.target.value)}
                      required
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Tingkat Keyakinan Diri
                    </label>
                    <select
                      value={evalConfidence}
                      onChange={(e) =>
                        setEvalConfidence(e.target.value as ConfidenceLevel)
                      }
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      <option value="Perlu Bimbingan">Perlu Bimbingan</option>
                      <option value="Mulai Mengerti">Mulai Mengerti</option>
                      <option value="Paham">Paham</option>
                      <option value="Menguasai">Menguasai</option>
                    </select>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor="comprehension-slider"
                      className="text-xs font-semibold text-slate-700"
                    >
                      Skor Pemahaman Materi
                    </label>
                    <span className="font-mono text-sm font-bold text-blue-700 tabular-nums">
                      {evalScore}%
                    </span>
                  </div>
                  <input
                    id="comprehension-slider"
                    type="range"
                    min={0}
                    max={100}
                    step={2}
                    value={evalScore}
                    onChange={(e) => setEvalScore(Number(e.target.value))}
                    className="w-full accent-blue-700 cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] font-mono text-slate-400 mt-1">
                    <span>0%</span>
                    <span>50%</span>
                    <span>80% (Target)</span>
                    <span>100%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Catatan Refleksi Belajar (Bagian yang sudah paham / perlu diulang)
                  </label>
                  <textarea
                    rows={2}
                    value={evalNote}
                    onChange={(e) => setEvalNote(e.target.value)}
                    placeholder="Contoh: Sudah lancar membedakan Input, ALU, dan Output; minggu depan perlu latihan soal lagi."
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  Simpan Catatan Evaluasi
                </button>
              </form>

              {/* Riwayat Log Table */}
              <div>
                <h4 className="font-display text-sm font-semibold text-slate-900 mb-3">
                  Riwayat Catatan Pemahaman Berkala
                </h4>
                {materialLogs.length === 0 ? (
                  <p className="text-xs text-slate-500">Belum ada catatan tersimpan.</p>
                ) : (
                  <div className="border border-slate-200 rounded-xl overflow-hidden">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-semibold text-slate-500">
                          <th className="py-2.5 px-4">Tanggal</th>
                          <th className="py-2.5 px-4">Status</th>
                          <th className="py-2.5 px-4 text-right">Skor</th>
                          <th className="py-2.5 px-4">Catatan Refleksi</th>
                          <th className="py-2.5 px-3 text-right">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs">
                        {materialLogs.map((log) => (
                          <tr key={log.id} className="hover:bg-slate-50/70">
                            <td className="py-3 px-4 whitespace-nowrap font-mono text-slate-700 tabular-nums">
                              {formatIndonesianDate(log.date)}
                            </td>
                            <td className="py-3 px-4 whitespace-nowrap font-medium text-slate-800">
                              {log.confidence}
                            </td>
                            <td className="py-3 px-4 whitespace-nowrap text-right font-mono font-semibold text-blue-700 tabular-nums">
                              {log.score}%
                            </td>
                            <td className="py-3 px-4 text-slate-600">{log.note}</td>
                            <td className="py-3 px-3 text-right">
                              <button
                                type="button"
                                onClick={() => onDeleteProgress(log.id)}
                                aria-label="Hapus catatan progres"
                                className="p-1.5 text-slate-400 hover:text-rose-600 rounded-md cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
