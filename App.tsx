
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import { TabType, Affirmation, JournalEntry, UserProgress } from './types';
import {
  AFFIRMATIONS_SEED,
  OPENING_CONTENT,
  GUIDELINES_CONTENT,
  PRAYER_MORNING,
  PRAYER_EVENING
} from './constants';
import AudioPlayer from './components/AudioPlayer';
// Added missing Star and PenLine icons to the import list
import { Trash2, Plus, Calendar, CheckCircle2, Circle, ChevronLeft, ChevronRight, RefreshCw, Filter, Star, PenLine, BookOpen } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('opening');
  const [affirmations, setAffirmations] = useState<Affirmation[]>([]);
  const [journal, setJournal] = useState<JournalEntry[]>([]);
  const [currentWeek, setCurrentWeek] = useState(1);
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');
  const [isAddingEntry, setIsAddingEntry] = useState(false);
  const [newEntryContent, setNewEntryContent] = useState('');

  // Initial load
  useEffect(() => {
    const savedAffs = localStorage.getItem('spiritual_affirmations');
    const savedJournal = localStorage.getItem('spiritual_journal');
    const savedWeek = localStorage.getItem('spiritual_current_week');

    if (savedAffs) setAffirmations(JSON.parse(savedAffs));
    else setAffirmations(AFFIRMATIONS_SEED);

    if (savedJournal) setJournal(JSON.parse(savedJournal));
    if (savedWeek) setCurrentWeek(parseInt(savedWeek));
  }, []);

  // Save changes
  useEffect(() => {
    if (affirmations.length > 0) {
      localStorage.setItem('spiritual_affirmations', JSON.stringify(affirmations));
    }
  }, [affirmations]);

  useEffect(() => {
    localStorage.setItem('spiritual_journal', JSON.stringify(journal));
  }, [journal]);

  useEffect(() => {
    localStorage.setItem('spiritual_current_week', currentWeek.toString());
  }, [currentWeek]);

  const toggleAffirmation = (id: string) => {
    setAffirmations(prev => prev.map(a => a.id === id ? { ...a, completed: !a.completed } : a));
  };

  const resetProgram = () => {
    if (confirm("Tem certeza que deseja reiniciar todo o programa? Isso limpará seu progresso de afirmações.")) {
      setAffirmations(AFFIRMATIONS_SEED);
      setCurrentWeek(1);
    }
  };

  const addJournalEntry = () => {
    if (!newEntryContent.trim()) return;
    const entry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('pt-BR'),
      content: newEntryContent,
    };
    setJournal([entry, ...journal]);
    setNewEntryContent('');
    setIsAddingEntry(false);
  };

  const deleteJournalEntry = (id: string) => {
    if (confirm("Excluir esta entrada do diário?")) {
      setJournal(prev => prev.filter(e => e.id !== id));
    }
  };

  const totalCompleted = affirmations.filter(a => a.completed).length;
  const progressPercent = Math.round((totalCompleted / 63) * 100);

  const filteredAffirmations = affirmations
    .filter(a => a.week === currentWeek)
    .filter(a => {
      if (filter === 'completed') return a.completed;
      if (filter === 'pending') return !a.completed;
      return true;
    });

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === 'opening' && (
        <div className="animate-fade-in-up space-y-10">
          <div className="relative h-[400px] rounded-[48px] overflow-hidden shadow-2xl group">
            <img
              src="/hero.png"
              alt="Caminho Zen"
              className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent flex flex-col justify-end p-10">
              <span className="text-white/60 text-[10px] font-bold uppercase tracking-[0.3em] mb-3 outfit">Bem-vindo à Jornada</span>
              <h2 className="text-5xl text-white font-bold serif italic mb-2 leading-tight">Desperte sua Luz Interior</h2>
              <p className="text-white/80 text-sm max-w-md font-light">Um programa de 63 dias desenhado para reconectar você com sua essência divina.</p>
            </div>
          </div>

          <section className="bg-white/50 p-10 rounded-[48px] border border-stone-100/50 shadow-sm leading-relaxed text-stone-800 serif text-xl text-center italic">
            <span className="text-4xl block mb-6 opacity-30 italic">"</span>
            {OPENING_CONTENT}
            <span className="text-4xl block mt-6 opacity-30 italic">"</span>
          </section>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-[40px] text-center border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#B7C9B1]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="text-[#B7C9B1]" size={24} />
              </div>
              <p className="text-stone-400 text-[10px] font-bold uppercase tracking-widest outfit mb-1">Duração</p>
              <p className="text-3xl font-bold text-stone-900 serif">09 Semanas</p>
            </div>
            <div className="bg-white p-8 rounded-[40px] text-center border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-amber-100/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Star className="text-amber-500" size={24} />
              </div>
              <p className="text-stone-400 text-[10px] font-bold uppercase tracking-widest outfit mb-1">Prática</p>
              <p className="text-3xl font-bold text-stone-900 serif">63 Afirmações</p>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('guidelines')}
            className="w-full bg-stone-900 text-white py-6 rounded-3xl font-bold text-lg hover:bg-stone-800 transition-all shadow-xl hover:-translate-y-1 active:scale-95 outfit uppercase tracking-widest"
          >
            Iniciar Travessia
          </button>
        </div>
      )}

      {activeTab === 'guidelines' && (
        <div className="animate-fade-in-up space-y-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="h-[1px] flex-1 bg-stone-100"></div>
            <h2 className="text-3xl font-bold text-stone-900 serif italic">Senda do Praticante</h2>
            <div className="h-[1px] flex-1 bg-stone-100"></div>
          </div>

          <div className="grid gap-4">
            {GUIDELINES_CONTENT.map((guide, idx) => (
              <div key={idx} className="group flex gap-6 items-center bg-white p-8 rounded-[32px] border border-stone-100 transition-all duration-300 hover:border-[#B7C9B1] hover:shadow-xl hover:-translate-y-1">
                <div className="bg-[#FDFBF7] text-[#B7C9B1] w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-bold shrink-0 border border-stone-50 outfit transition-colors group-hover:bg-[#B7C9B1] group-hover:text-white">
                  {idx + 1}
                </div>
                <p className="text-stone-600 text-lg leading-relaxed">{guide}</p>
              </div>
            ))}
          </div>

          <div className="p-10 bg-stone-900 rounded-[48px] shadow-2xl relative overflow-hidden mt-10">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Star size={80} />
            </div>
            <h3 className="font-bold text-amber-200 mb-3 uppercase tracking-widest text-xs outfit">Sabedoria Ancestral</h3>
            <p className="text-stone-300 text-xl italic serif leading-relaxed">"A alma não tem pressa, ela tem profundidade. Permita-se sentir cada dia como único."</p>
          </div>
        </div>
      )}

      {activeTab === 'affirmations' && (
        <div className="animate-fade-in-up space-y-8">
          <div className="bg-stone-900 text-white p-10 rounded-[48px] shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.3em] mb-4 outfit">Seu Progresso de Cura</p>
              <div className="flex items-baseline gap-2">
                <h2 className="text-6xl font-bold serif italic">{progressPercent}%</h2>
                <span className="text-white/40 text-sm outfit font-bold uppercase tracking-widest">Alinhado</span>
              </div>

              <div className="w-full bg-white/10 h-1.5 rounded-full mt-8 overflow-hidden">
                <div
                  className="bg-white h-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="text-white/40 text-[10px] mt-4 font-bold uppercase tracking-widest outfit">{totalCompleted} de 63 mantras realizados</p>
            </div>
            <div className="absolute top-[-20%] right-[-10%] opacity-10 pointer-events-none">
              <Star size={240} strokeWidth={1} />
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 py-2 sticky top-[72px] bg-white z-40">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide no-scrollbar">
              <button
                onClick={() => setCurrentWeek(w => Math.max(1, w - 1))}
                disabled={currentWeek === 1}
                className="p-2 rounded-full bg-stone-100 text-stone-600 disabled:opacity-30"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="whitespace-nowrap font-bold text-stone-800 px-2 min-w-[100px] text-center">
                Semana {currentWeek}
              </div>
              <button
                onClick={() => setCurrentWeek(w => Math.min(9, w + 1))}
                disabled={currentWeek === 9}
                className="p-2 rounded-full bg-stone-100 text-stone-600 disabled:opacity-30"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            <select
              className="bg-stone-50 border-none rounded-xl p-2 text-sm font-bold text-stone-600 outline-none"
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
            >
              <option value="all">Todas</option>
              <option value="completed">Concluídas</option>
              <option value="pending">Pendentes</option>
            </select>
          </div>

          <div className="space-y-6">
            {filteredAffirmations.map((aff) => (
              <div
                key={aff.id}
                className={`p-8 rounded-[40px] border transition-all duration-500 ${aff.completed
                  ? 'bg-stone-50/50 border-stone-100 opacity-60 grayscale'
                  : 'bg-white border-stone-100/50 shadow-sm hover:shadow-xl hover:-translate-y-1'
                  }`}
              >
                <div className="flex justify-between items-start gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B7C9B1]"></span>
                      <span className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] outfit">Pórtico {aff.day}</span>
                    </div>
                    <p className={`text-2xl serif leading-relaxed italic ${aff.completed ? 'text-stone-400' : 'text-stone-800'}`}>
                      "{aff.text}"
                    </p>
                  </div>
                  <button
                    onClick={() => toggleAffirmation(aff.id)}
                    className={`mt-1 transition-all duration-500 transform active:scale-90 ${aff.completed ? 'text-[#B7C9B1]' : 'text-stone-200 hover:text-stone-300'
                      }`}
                  >
                    {aff.completed ? <CheckCircle2 size={40} strokeWidth={1.5} /> : <Circle size={40} strokeWidth={1} />}
                  </button>
                </div>
                {!aff.completed && (
                  <div className="mt-8 flex items-center justify-between border-t border-stone-50 pt-6">
                    <AudioPlayer text={aff.text} />
                    <span className="text-[10px] text-stone-300 font-bold uppercase tracking-widest outfit">Expanda sua Voz</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="pt-8 flex justify-center">
            <button
              onClick={resetProgram}
              className="flex items-center gap-2 text-stone-400 text-sm font-bold hover:text-stone-600 transition-colors"
            >
              <RefreshCw size={14} />
              Reiniciar Programa
            </button>
          </div>
        </div>
      )}

      {activeTab === 'prayers' && (
        <div className="animate-fade-in-up space-y-12">
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[#B7C9B1] text-[10px] font-bold uppercase tracking-[0.3em] outfit mb-1 block">Amanhecer</span>
                <h2 className="text-4xl font-bold text-stone-800 serif italic">Oração Matinal</h2>
              </div>
              <AudioPlayer text={PRAYER_MORNING} />
            </div>
            <div className="bg-white p-12 rounded-[56px] border border-stone-100 shadow-sm leading-[2] text-stone-700 italic serif text-2xl text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-full blur-3xl opacity-50 -mr-10 -mt-10"></div>
              {PRAYER_MORNING}
            </div>
          </section>

          <section className="space-y-6 pt-6 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-indigo-400 text-[10px] font-bold uppercase tracking-[0.3em] outfit mb-1 block">Crepúsculo</span>
                <h2 className="text-4xl font-bold text-stone-800 serif italic">Oração Noturna</h2>
              </div>
              <AudioPlayer text={PRAYER_EVENING} />
            </div>
            <div className="relative p-12 rounded-[56px] leading-[2] text-white italic serif text-2xl text-center shadow-2xl overflow-hidden min-h-[400px] flex items-center justify-center">
              <img src="/evening.png" className="absolute inset-0 w-full h-full object-cover brightness-[0.3]" alt="Evening scene" />
              <div className="relative z-10">
                {PRAYER_EVENING}
              </div>
            </div>
          </section>
        </div>
      )}

      {activeTab === 'journal' && (
        <div className="animate-fade-in-up space-y-10">
          <div className="flex items-center justify-between">
            <h2 className="text-4xl font-bold text-stone-900 serif italic">Diário Espiritual</h2>
            <button
              onClick={() => setIsAddingEntry(!isAddingEntry)}
              className="bg-stone-900 text-white p-4 rounded-3xl shadow-xl hover:bg-stone-800 transition-all hover:-translate-y-1 active:scale-95"
            >
              <Plus size={28} />
            </button>
          </div>

          {isAddingEntry && (
            <div className="bg-white p-10 rounded-[48px] border border-stone-100 shadow-2xl space-y-6 animate-fade-in-up">
              <div className="flex items-center gap-2 mb-2">
                <PenLine size={18} className="text-[#B7C9B1]" />
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest outfit">Nova Reflexão</span>
              </div>
              <textarea
                className="w-full h-64 bg-[#FDFBF7] rounded-[32px] p-8 text-stone-800 outline-none resize-none focus:ring-2 ring-[#B7C9B1]/30 serif text-xl leading-relaxed"
                placeholder="Como sua alma se sente hoje? Quais milagres você percebeu?"
                value={newEntryContent}
                onChange={(e) => setNewEntryContent(e.target.value)}
              />
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setIsAddingEntry(false)}
                  className="px-8 py-3 rounded-2xl font-bold text-stone-400 outfit uppercase tracking-widest text-xs hover:text-stone-600"
                >
                  Cancelar
                </button>
                <button
                  onClick={addJournalEntry}
                  className="px-10 py-3 bg-[#B7C9B1] text-white rounded-2xl font-bold shadow-lg shadow-[#B7C9B1]/20 hover:bg-[#A6B8A0] transition-colors outfit uppercase tracking-widest text-xs"
                >
                  Guardar
                </button>
              </div>
            </div>
          )}

          <div className="space-y-8">
            {journal.length === 0 ? (
              <div className="text-center py-32 bg-white rounded-[56px] border border-dashed border-stone-200">
                <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen size={32} className="text-stone-200" />
                </div>
                <p className="text-stone-400 font-medium italic serif text-xl">Seu coração ainda não escreveu nada aqui...</p>
                <p className="text-stone-300 text-xs mt-2 outfit uppercase tracking-widest">Toque no + para começar</p>
              </div>
            ) : (
              journal.map((entry) => (
                <div key={entry.id} className="bg-white p-10 rounded-[48px] border border-stone-50 shadow-sm relative group hover:shadow-xl transition-all duration-500">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-stone-50 p-2 rounded-xl">
                      <Calendar size={14} className="text-stone-400" />
                    </div>
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] outfit">{entry.date}</span>
                  </div>
                  <p className="text-stone-700 leading-relaxed serif text-xl italic whitespace-pre-wrap">{entry.content}</p>
                  <button
                    onClick={() => deleteJournalEntry(entry.id)}
                    className="absolute top-8 right-8 text-stone-200 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-all transform hover:scale-110"
                  >
                    <Trash2 size={22} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default App;
