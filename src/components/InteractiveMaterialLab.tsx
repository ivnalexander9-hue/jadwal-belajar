import { useEffect, useState } from 'react';
import {
  ArrowRight,
  Check,
  Copy,
  Cpu,
  Database,
  Globe,
  HardDrive,
  Keyboard,
  Monitor,
  Play,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
} from 'lucide-react';
import { InteractiveLabType } from '../types/study';

interface InteractiveMaterialLabProps {
  labType: InteractiveLabType;
}

interface IpoScenario {
  id: string;
  label: string;
  inputDevice: string;
  inputDetail: string;
  processDetail: string;
  ramDetail: string;
  outputDevice: string;
  outputDetail: string;
  storageDetail: string;
}

const IPO_SCENARIOS: IpoScenario[] = [
  {
    id: 'qr-absensi',
    label: 'Scan Kartu QR Absensi Sekolah',
    inputDevice: 'Kamera Scanner QR',
    inputDetail: 'Membaca pola matriks kode QR pada kartu pelajar dan mengubahnya menjadi angka ID siswa (misal: 20260814).',
    processDetail: 'Control Unit (CU) mengambil instruksi pencocokan absen; ALU membandingkan ID siswa dengan daftar kelas VIII-B dan memeriksa jam masuk (< 07:00).',
    ramDetail: 'Data profil Marchella sementara dimuat di RAM agar proses verifikasi berlangsung dalam milidetik.',
    outputDevice: 'Monitor Lobi & Buzzer',
    outputDetail: 'Layar menampilkan "Selamat Pagi, Marchella — Hadir 06:54 WIB" disertai bunyi bip konfirmasi.',
    storageDetail: 'Rekaman waktu hadir disimpan permanen ke SSD server basis data presensi sekolah.',
  },
  {
    id: 'cetak-makalah',
    label: 'Mengetik & Mencetak Tugas Makalah',
    inputDevice: 'Keyboard & Mouse',
    inputDetail: 'Menerima ketikan huruf paragraf dan klik tombol "Cetak Dokumen" dari siswi.',
    processDetail: 'CPU mengatur tata letak halaman, ukuran margin, dan mengonversi teks menjadi instruksi grafis siap cetak.',
    ramDetail: 'Dokumen yang sedang disunting berada di RAM supaya pengguliran dan pengetikan tetap responsif.',
    outputDevice: 'Monitor & Printer',
    outputDetail: 'Monitor menampilkan pratinjau halaman, lalu Printer menyemprotkan tinta menjadi lembaran kertas tugas.',
    storageDetail: 'File .docx atau .pdf disimpan di folder tugas pada SSD laptop agar bisa dibuka kembali besok.',
  },
  {
    id: 'voice-inggris',
    label: 'Rekam Audio Tugas Bahasa Inggris',
    inputDevice: 'Mikrofon Laptop',
    inputDetail: 'Menangkap getaran suara bacaan Recount Text dan mengubahnya menjadi gelombang sinyal digital.',
    processDetail: 'CPU melakukan kompresi audio dan menghitung durasi rekaman serta tingkat volume suara.',
    ramDetail: 'Aliran data audio sementara ditampung dalam buffer RAM sebelum ditulis menjadi file utuh.',
    outputDevice: 'Speaker / Headphone',
    outputDetail: 'Memutar ulang hasil rekaman suara dengan jernih untuk dicek pelafalannya.',
    storageDetail: 'Hasil rekaman tersimpan sebagai file audio .mp3 di penyimpanan lokal atau Google Drive.',
  },
  {
    id: 'hitung-nilai',
    label: 'Hitung Rata-Rata Nilai Rapor',
    inputDevice: 'Keyboard (Angka Nilai)',
    inputDetail: 'Memasukkan angka nilai ulangan: Informatika 90, Matematika 86, IPA 88.',
    processDetail: 'ALU menjumlahkan seluruh angka (264) lalu membaginya dengan 3 untuk mendapatkan rata-rata (88,0).',
    ramDetail: 'Tabel spreadsheet dan rumus =AVERAGE() aktif di dalam RAM selama sesi perhitungan.',
    outputDevice: 'Layar Monitor',
    outputDetail: 'Menampilkan angka rata-rata 88,0 beserta grafik batang perkembangan nilai pada sel spreadsheet.',
    storageDetail: 'File lembar kerja disimpan permanen ke dalam SSD laptop untuk evaluasi akhir semester.',
  },
];

export function InteractiveMaterialLab({ labType }: InteractiveMaterialLabProps) {
  if (labType === 'ipo-system') {
    return <IpoSystemLab />;
  }
  if (labType === 'social-impact') {
    return <SocialImpactLab />;
  }
  if (labType === 'data-privacy') {
    return <DataPrivacyLab />;
  }
  if (labType === 'digital-citizenship') {
    return <CitizenshipLab />;
  }
  if (labType === 'vibe-coding') {
    return <VibeCodingLab />;
  }
  return <CloudPipelineLab />;
}

function IpoSystemLab() {
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [activeStage, setActiveStage] = useState<number>(0); // 0=Input, 1=Process, 2=Output, 3=Storage
  const [isPlaying, setIsPlaying] = useState(false);

  const scenario = IPO_SCENARIOS[scenarioIdx];

  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setInterval(() => {
      setActiveStage((prev) => {
        if (prev >= 3) {
          setIsPlaying(false);
          return 3;
        }
        return prev + 1;
      });
    }, 1500);
    return () => window.clearInterval(timer);
  }, [isPlaying]);

  const stages = [
    {
      title: '1. INPUT',
      subtitle: scenario.inputDevice,
      detail: scenario.inputDetail,
      icon: Keyboard,
    },
    {
      title: '2. PROCESS (CPU & RAM)',
      subtitle: 'ALU · Control Unit · RAM',
      detail: `${scenario.processDetail} ${scenario.ramDetail}`,
      icon: Cpu,
    },
    {
      title: '3. OUTPUT',
      subtitle: scenario.outputDevice,
      detail: scenario.outputDetail,
      icon: Monitor,
    },
    {
      title: '4. STORAGE',
      subtitle: 'SSD / Penyimpanan Permanen',
      detail: scenario.storageDetail,
      icon: HardDrive,
    },
  ];

  const handlePlay = () => {
    setActiveStage(0);
    setIsPlaying(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="font-display text-base font-semibold text-slate-900">
            Simulasi Alur Kerja Computer Sistem (IPOS)
          </h4>
          <p className="text-sm text-slate-600 mt-1">
            Pilih skenario kegiatan sekolah lalu telusuri perpindahan data dari Input hingga Storage.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handlePlay}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5" />
            {isPlaying ? 'Berjalan...' : 'Putar Alur'}
          </button>
          <button
            type="button"
            onClick={() => {
              setIsPlaying(false);
              setActiveStage(0);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>
      </div>

      {/* Scenario selector */}
      <div className="flex flex-wrap gap-2">
        {IPO_SCENARIOS.map((item, idx) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              setScenarioIdx(idx);
              setIsPlaying(false);
              setActiveStage(0);
            }}
            className={`px-3 py-2 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              idx === scenarioIdx
                ? 'bg-blue-50 border-blue-600 text-blue-800'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Interactive Stage Flow Diagram */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {stages.map((st, idx) => {
          const Icon = st.icon;
          const isActive = activeStage === idx;
          const isPassed = idx < activeStage;
          return (
            <button
              key={st.title}
              type="button"
              onClick={() => {
                setIsPlaying(false);
                setActiveStage(idx);
              }}
              className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                isActive
                  ? 'bg-blue-700 text-white border-blue-700 shadow-sm'
                  : isPassed
                  ? 'bg-emerald-50/70 text-slate-900 border-emerald-300'
                  : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon
                  className={`w-5 h-5 ${
                    isActive
                      ? 'text-blue-100'
                      : isPassed
                      ? 'text-emerald-700'
                      : 'text-slate-500'
                  }`}
                />
                <span
                  className={`font-mono text-[11px] tabular-nums ${
                    isActive
                      ? 'text-blue-100'
                      : isPassed
                      ? 'text-emerald-700'
                      : 'text-slate-400'
                  }`}
                >
                  {isActive ? 'AKTIF' : isPassed ? 'SELESAI' : `0${idx + 1}`}
                </span>
              </div>
              <div className="font-display text-sm font-semibold">{st.title}</div>
              <div
                className={`text-xs mt-1 truncate ${
                  isActive ? 'text-blue-100' : 'text-slate-500'
                }`}
              >
                {st.subtitle}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Stage Detail */}
      <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl">
        <div className="flex items-center gap-2 text-xs font-mono text-blue-700 mb-1.5">
          <span>TAHAP AKTIF</span>
          <span aria-hidden="true">·</span>
          <span>{stages[activeStage].title}</span>
        </div>
        <h5 className="font-display text-base font-semibold text-slate-900">
          {stages[activeStage].subtitle}
        </h5>
        <p className="text-sm text-slate-700 leading-relaxed mt-2">
          {stages[activeStage].detail}
        </p>
      </div>
    </div>
  );
}

function SocialImpactLab() {
  const cases = [
    {
      id: 'c1',
      prompt:
        'Sebuah pesan berantai di grup WhatsApp menyebut besok sekolah libur mendadak karena perbaikan listrik, padahal tidak ada pengumuman resmi wali kelas.',
      options: [
        { text: 'Langsung meneruskan ke semua grup teman agar bersiap', correct: false },
        { text: 'Mengecek kanal resmi SMP Global Mandiri atau bertanya ke wali kelas sebelum menyebarkan', correct: true },
      ],
      feedback:
        'Tepat! Prinsip Saring Sebelum Sharing mencegah penyebaran hoaks di lingkungan sekolah.',
    },
    {
      id: 'c2',
      prompt:
        'Kamu menemukan foto ilustrasi bagus di internet untuk tugas presentasi IPS di kelas.',
      options: [
        { text: 'Menggunakan gambar berlisensi bebas/Creative Commons dan mencantumkan nama sumber pembuatnya', correct: true },
        { text: 'Menghapus watermark pembuatnya lalu mengakuinya sebagai gambar buatan sendiri', correct: false },
      ],
      feedback:
        'Benar! Menghargai Hak Kekayaan Intelektual merupakan bagian dari etika pemanfaatan informatika.',
    },
    {
      id: 'c3',
      prompt:
        'Sudah pukul 22.30 malam dan tugas sekolah sudah selesai, tetapi notifikasi video pendek terus muncul.',
      options: [
        { text: 'Mengaktifkan mode tidur / Do Not Disturb agar waktu istirahat tetap terjaga', correct: true },
        { text: 'Menonton hingga larut malam karena besok jadwal pelajaran padat', correct: false },
      ],
      feedback:
        'Bagus! Keseimbangan digital menjaga kesehatan mata, kualitas tidur, dan fokus belajar esok hari.',
    },
  ];

  const [answers, setAnswers] = useState<Record<string, number>>({});

  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-display text-base font-semibold text-slate-900">
          Latihan Keputusan Bijak Era Informatika
        </h4>
        <p className="text-sm text-slate-600 mt-1">
          Pilih tindakan paling bertanggung jawab untuk masing-masing situasi digital berikut.
        </p>
      </div>

      <div className="space-y-4">
        {cases.map((item, idx) => {
          const picked = answers[item.id];
          const isPicked = picked !== undefined;
          const isCorrect = isPicked && item.options[picked].correct;

          return (
            <div key={item.id} className="p-4 bg-white border border-slate-200 rounded-xl space-y-3">
              <div className="text-xs font-mono text-slate-500">KASUS 0{idx + 1}</div>
              <p className="text-sm font-medium text-slate-900">{item.prompt}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {item.options.map((opt, oIdx) => (
                  <button
                    key={opt.text}
                    type="button"
                    onClick={() => setAnswers((prev) => ({ ...prev, [item.id]: oIdx }))}
                    className={`text-left p-3 text-xs rounded-lg border transition-colors cursor-pointer ${
                      picked === oIdx
                        ? opt.correct
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-medium'
                          : 'bg-rose-50 border-rose-400 text-rose-900'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {opt.text}
                  </button>
                ))}
              </div>
              {isPicked && (
                <p
                  className={`text-xs font-medium ${
                    isCorrect ? 'text-emerald-700' : 'text-rose-700'
                  }`}
                >
                  {isCorrect
                    ? item.feedback
                    : 'Kurang tepat. Coba pertimbangkan dampak keakuratan informasi, hak cipta, dan kesehatan digital.'}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DataPrivacyLab() {
  type Category = 'sensitif' | 'aktif' | 'pasif';

  const items: { id: string; label: string; answer: Category; why: string }[] = [
    {
      id: 'dp-1',
      label: 'Nomor Induk Kependudukan (NIK) & Kode OTP SMS',
      answer: 'sensitif',
      why: 'Termasuk data pribadi sensitif/rahasia yang tidak boleh dibagikan ke siapa pun.',
    },
    {
      id: 'dp-2',
      label: 'Foto kegiatan pentas seni yang kamu unggah sendiri ke Instagram',
      answer: 'aktif',
      why: 'Jejak digital aktif karena diunggah secara sadar oleh pemilik akun.',
    },
    {
      id: 'dp-3',
      label: 'Riwayat cookies & alamat IP saat mengunjungi situs berita',
      answer: 'pasif',
      why: 'Jejak digital pasif karena terekam otomatis di latar belakang sistem.',
    },
    {
      id: 'dp-4',
      label: 'Kata sandi akun email belajar sekolah',
      answer: 'sensitif',
      why: 'Kredensial rahasia yang wajib dilindungi dengan kombinasi kuat dan 2FA.',
    },
  ];

  const [choices, setChoices] = useState<Record<string, Category>>({});

  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-display text-base font-semibold text-slate-900">
          Klasifikasi Data Pribadi & Jejak Digital
        </h4>
        <p className="text-sm text-slate-600 mt-1">
          Kelompokkan setiap contoh informasi ke dalam kategori yang sesuai.
        </p>
      </div>

      <div className="space-y-3">
        {items.map((item) => {
          const picked = choices[item.id];
          const isCorrect = picked === item.answer;
          return (
            <div key={item.id} className="p-4 bg-white border border-slate-200 rounded-xl space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-sm font-medium text-slate-900">{item.label}</span>
                <div className="flex items-center gap-1.5 shrink-0">
                  {(
                    [
                      { key: 'sensitif', label: 'Data Sensitif' },
                      { key: 'aktif', label: 'Jejak Aktif' },
                      { key: 'pasif', label: 'Jejak Pasif' },
                    ] as const
                  ).map((btn) => (
                    <button
                      key={btn.key}
                      type="button"
                      onClick={() => setChoices((prev) => ({ ...prev, [item.id]: btn.key }))}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        picked === btn.key
                          ? 'bg-blue-700 text-white border-blue-700'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
              </div>
              {picked && (
                <div
                  className={`flex items-start gap-2 text-xs font-medium ${
                    isCorrect ? 'text-emerald-700' : 'text-amber-700'
                  }`}
                >
                  {isCorrect ? (
                    <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
                  ) : (
                    <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                  )}
                  <span>{isCorrect ? `Tepat! ${item.why}` : `Belum tepat. ${item.why}`}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CitizenshipLab() {
  const [step, setStep] = useState(0);
  const steps = [
    {
      code: 'STOP',
      title: '1. Berhenti & Jangan Terpancing Emosi',
      prompt:
        'Teman sekelas mengirimkan meme yang mengejek penampilan salah satu siswi di grup chat.',
      goodAction: 'Menahan diri untuk tidak ikut tertawa, tidak membalas dengan kata kasar, dan menghentikan penyebaran gambar.',
      badAction: 'Ikut membalas dengan ejekan balasan agar terlihat lucu di grup.',
    },
    {
      code: 'SAVE',
      title: '2. Simpan Bukti Digital',
      prompt:
        'Sebelum pesan dihapus atau grup dibubarkan, dokumentasikan kejadian secara objektif.',
      goodAction: 'Mengambil tangkapan layar (screenshot) percakapan lengkap dengan nama pengirim dan waktu kejadian.',
      badAction: 'Langsung keluar dari grup tanpa menyimpan bukti sama sekali.',
    },
    {
      code: 'BLOCK & TELL',
      title: '3. Blokir Pelaku & Laporkan ke Pihak Berwenang',
      prompt:
        'Setelah bukti tersimpan dan komentar berbahaya dihentikan, langkah penyelesaian berikutnya adalah...',
      goodAction: 'Memblokir/melaporkan akun pengganggu jika di media sosial, lalu berbicara kepada Wali Kelas, Guru BK, atau Orang Tua.',
      badAction: 'Mendiamkan kasusnya agar tidak dianggap ikut campur.',
    },
  ];

  const [selectedChoice, setSelectedChoice] = useState<'good' | 'bad' | null>(null);
  const current = steps[step];

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h4 className="font-display text-base font-semibold text-slate-900">
            Protokol Upstander: STOP · SAVE · BLOCK · TELL
          </h4>
          <p className="text-sm text-slate-600 mt-1">
            Simulasikan langkah tepat menghadapi perundungan siber di lingkungan pelajar.
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          {steps.map((s, idx) => (
            <button
              key={s.code}
              type="button"
              onClick={() => {
                setStep(idx);
                setSelectedChoice(null);
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border whitespace-nowrap shrink-0 cursor-pointer ${
                step === idx
                  ? 'bg-blue-700 text-white border-blue-700'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {s.code}
            </button>
          ))}
        </div>
      </div>

      <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-4">
        <div>
          <div className="text-xs font-mono text-blue-700">{current.title}</div>
          <p className="text-sm font-medium text-slate-900 mt-1">{current.prompt}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setSelectedChoice('good')}
            className={`text-left p-4 rounded-xl border text-xs leading-relaxed cursor-pointer transition-colors ${
              selectedChoice === 'good'
                ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-medium'
                : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
            }`}
          >
            {current.goodAction}
          </button>
          <button
            type="button"
            onClick={() => setSelectedChoice('bad')}
            className={`text-left p-4 rounded-xl border text-xs leading-relaxed cursor-pointer transition-colors ${
              selectedChoice === 'bad'
                ? 'bg-rose-50 border-rose-400 text-rose-950'
                : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
            }`}
          >
            {current.badAction}
          </button>
        </div>

        {selectedChoice && (
          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <span
              className={`text-xs font-medium ${
                selectedChoice === 'good' ? 'text-emerald-700' : 'text-rose-700'
              }`}
            >
              {selectedChoice === 'good'
                ? 'Pilihan tepat! Ini menunjukkan sikap kewarganegaraan digital yang empatik dan aman.'
                : 'Hati-hati: tindakan ini justru memperpanjang masalah atau menghilangkan bukti penting.'}
            </span>
            {step < steps.length - 1 && selectedChoice === 'good' && (
              <button
                type="button"
                onClick={() => {
                  setStep((s) => s + 1);
                  setSelectedChoice(null);
                }}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-blue-700 hover:text-blue-900 cursor-pointer whitespace-nowrap shrink-0"
              >
                Lanjut Tahap Berikutnya
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function VibeCodingLab() {
  const [goal, setGoal] = useState('Aplikasi Pengatur Jadwal Belajar & Tugas SMP');
  const [features, setFeatures] = useState<string[]>([
    'Tabel jadwal Senin–Jumat',
    'Pengingat tenggat tugas otomatis',
    'Grafik progres pemahaman materi',
  ]);
  const [constraint, setConstraint] = useState(
    'Bahasa Indonesia rapi, tampilan bersih terang, simpan data di browser (localStorage)'
  );
  const [copied, setCopied] = useState(false);

  const allFeatures = [
    'Tabel jadwal Senin–Jumat',
    'Pengingat tenggat tugas otomatis',
    'Grafik progres pemahaman materi',
    'Kuis latihan 3 soal per bab',
    'Pencarian & filter status tugas',
  ];

  const toggleFeature = (feat: string) => {
    setFeatures((prev) =>
      prev.includes(feat) ? prev.filter((f) => f !== feat) : [...prev, feat]
    );
  };

  const generatedPrompt = `Saya seorang siswi SMP ingin membuat ${goal}.
Fitur utama yang harus ada:
${features.map((f, i) => `${i + 1}. ${f}`).join('\n')}
Ketentuan desain & teknis: ${constraint}.`;

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(generatedPrompt).catch(() => {});
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-display text-base font-semibold text-slate-900">
          Penyusun Prompt Vibe Coding (Konteks → Fitur → Batasan)
        </h4>
        <p className="text-sm text-slate-600 mt-1">
          Rangkai spesifikasi aplikasimu dan lihat perbedaan antara instruksi terstruktur dan instruksi kabur.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              1. Konteks & Tujuan Aplikasi
            </label>
            <input
              type="text"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <span className="block text-xs font-semibold text-slate-700 mb-2">
              2. Pilih Fitur Spesifik
            </span>
            <div className="flex flex-wrap gap-2">
              {allFeatures.map((feat) => {
                const active = features.includes(feat);
                return (
                  <button
                    key={feat}
                    type="button"
                    onClick={() => toggleFeature(feat)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                      active
                        ? 'bg-blue-700 text-white border-blue-700'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {feat}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              3. Batasan & Gaya Desain
            </label>
            <input
              type="text"
              value={constraint}
              onChange={(e) => setConstraint(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>

        <div className="p-4 bg-slate-900 text-slate-100 rounded-xl flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs text-blue-300">HASIL PROMPT TERSTRUKTUR</span>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-md cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Tersalin' : 'Salin Prompt'}
              </button>
            </div>
            <pre className="font-mono text-xs leading-relaxed whitespace-pre-wrap text-slate-200">
              {generatedPrompt}
            </pre>
          </div>

          <div className="pt-3 border-t border-slate-800 text-xs text-slate-400">
            Bandingkan dengan prompt kabur: <span className="italic text-slate-300">&ldquo;Buatkan web sekolah yang keren.&rdquo;</span> — Spesifikasi terstruktur membantu AI membangun fitur tepat sasaran.
          </div>
        </div>
      </div>
    </div>
  );
}

function CloudPipelineLab() {
  const [stage, setStage] = useState<0 | 1 | 2>(0);
  const [commitMessage, setCommitMessage] = useState('feat: tambah fitur pengingat tugas harian');
  const [deployCount, setDeployCount] = useState(1);

  const stages = [
    {
      title: '01. Google AI Studio',
      role: 'Merancang & Menguji Prototipe',
      icon: Cpu,
      summary:
        'Di Google AI Studio, siswi menuliskan prompt terstruktur untuk menghasilkan komponen React/TypeScript jadwal pelajaran dan langsung meninjau hasilnya.',
      artifact: 'Output: Kode Proyek Web (App.tsx, index.html, package.json)',
    },
    {
      title: '02. GitHub Repository',
      role: 'Menyimpan Kode & Melacak Versi',
      icon: Database,
      summary:
        'Kode proyek disimpan ke repository GitHub. Setiap perbaikan dicatat sebagai Commit sehingga riwayat versi aman dan mudah dikembalikan bila ada bug.',
      artifact: `Commit Terbaru: "${commitMessage}"`,
    },
    {
      title: '03. Vercel Deployment',
      role: 'Build Otomatis & Tayang Online',
      icon: Globe,
      summary:
        'Vercel mendeteksi commit baru dari GitHub, menjalankan npm run build secara otomatis, dan menerbitkan situs ke tautan HTTPS publik.',
      artifact: `Status Publikasi #${deployCount}: Tayang di https://agenda-belajar-marchella.vercel.app`,
    },
  ];

  const handleSimulatePush = () => {
    setStage(1);
    window.setTimeout(() => {
      setStage(2);
      setDeployCount((c) => c + 1);
    }, 650);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h4 className="font-display text-base font-semibold text-slate-900">
            Simulasi Pipeline: Google AI Studio → GitHub → Vercel
          </h4>
          <p className="text-sm text-slate-600 mt-1">
            Klik tiap tahap atau simulasikan pengiriman pembaruan kode ke server publik.
          </p>
        </div>
        <button
          type="button"
          onClick={handleSimulatePush}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          <Play className="w-3.5 h-3.5" />
          Simulasikan Push & Deploy
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {stages.map((item, idx) => {
          const Icon = item.icon;
          const active = stage === idx;
          return (
            <button
              key={item.title}
              type="button"
              onClick={() => setStage(idx as 0 | 1 | 2)}
              className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                active
                  ? 'bg-blue-700 text-white border-blue-700'
                  : 'bg-white text-slate-900 border-slate-200 hover:border-slate-300'
              }`}
            >
              <Icon className={`w-5 h-5 mb-2 ${active ? 'text-blue-100' : 'text-blue-700'}`} />
              <div className="font-display text-sm font-semibold">{item.title}</div>
              <div className={`text-xs mt-1 ${active ? 'text-blue-100' : 'text-slate-500'}`}>
                {item.role}
              </div>
            </button>
          );
        })}
      </div>

      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
        <p className="text-sm text-slate-800 leading-relaxed">{stages[stage].summary}</p>
        <div className="font-mono text-xs text-blue-800 bg-white border border-slate-200 rounded-lg px-3 py-2">
          {stages[stage].artifact}
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 pt-1">
          <label className="text-xs font-medium text-slate-600 whitespace-nowrap">
            Ubah Pesan Commit:
          </label>
          <input
            type="text"
            value={commitMessage}
            onChange={(e) => setCommitMessage(e.target.value)}
            className="flex-1 px-3 py-1.5 text-xs font-mono bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
      </div>
    </div>
  );
}
