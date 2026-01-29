
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
import { Trash2, Plus, Calendar, CheckCircle2, Circle, ChevronLeft, ChevronRight, RefreshCw, Filter, Star, PenLine } from 'lucide-react';

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
        <div className="animate-fade-in space-y-8">
          <div className="relative h-64 rounded-3xl overflow-hidden shadow-lg mb-8">
            <img 
              src="https://picsum.photos/seed/spiritual/800/600" 
              alt="Caminho Zen" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent flex flex-col justify-end p-6">
              <span className="text-white/80 text-xs font-bold uppercase tracking-widest mb-2">Boas-vindas</span>
              <h2 className="text-3xl text-white font-bold serif italic">Comece seu despertar</h2>
            </div>
          </div>

          <section className="bg-white p-6 rounded-3xl border border-stone-100 shadow-sm leading-relaxed text-stone-700 serif text-lg whitespace-pre-wrap">
            {OPENING_CONTENT}
          </section>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-stone-50 p-6 rounded-3xl text-center border border-stone-100">
              <span className="text-4xl block mb-2">🙏</span>
              <p className="text-stone-500 text-xs font-bold uppercase">Semanas</p>
              <p className="text-2xl font-bold text-stone-800">09</p>
            </div>
            <div className="bg-stone-50 p-6 rounded-3xl text-center border border-stone-100">
              <span className="text-4xl block mb-2">✨</span>
              <p className="text-stone-500 text-xs font-bold uppercase">Afirmações</p>
              <p className="text-2xl font-bold text-stone-800">63</p>
            </div>
          </div>

          <button 
            onClick={() => setActiveTab('guidelines')}
            className="w-full bg-stone-800 text-white py-4 rounded-2xl font-bold text-lg hover:bg-stone-700 transition-colors shadow-lg"
          >
            Começar Agora
          </button>
        </div>
      )}

      {activeTab === 'guidelines' && (
        <div className="animate-fade-in space-y-6">
          <h2 className="text-3xl font-bold text-stone-800 serif">Orientações Gerais</h2>
          <div className="space-y-4">
            {GUIDELINES_CONTENT.map((guide, idx) => (
              <div key={idx} className="flex gap-4 items-start bg-stone-50 p-4 rounded-2xl border border-stone-100">
                <div className="bg-stone-800 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <p className="text-stone-700">{guide}</p>
              </div>
            ))}
          </div>

          <div className="p-6 bg-amber-50 rounded-3xl border border-amber-100 mt-8">
            <h3 className="font-bold text-amber-800 mb-2">Dica de Ouro</h3>
            <p className="text-amber-700 text-sm italic">"A alma não tem pressa, ela tem profundidade. Permita-se sentir cada dia como único."</p>
          </div>
        </div>
      )}

      {activeTab === 'affirmations' && (
        <div className="animate-fade-in space-y-6">
          <div className="bg-stone-800 text-white p-6 rounded-3xl shadow-lg relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-stone-400 text-xs font-bold uppercase tracking-widest mb-1">Seu Progresso</p>
              <h2 className="text-3xl font-bold serif">{progressPercent}% Concluído</h2>
              <div className="w-full bg-stone-700 h-2 rounded-full mt-4 overflow-hidden">
                <div 
                  className="bg-stone-200 h-full transition-all duration-700" 
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="text-stone-400 text-xs mt-3">{totalCompleted} de 63 afirmações</p>
            </div>
            <div className="absolute top-[-20%] right-[-10%] opacity-10">
              <Star size={160} />
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

          <div className="space-y-4">
            {filteredAffirmations.map((aff) => (
              <div 
                key={aff.id} 
                className={`p-5 rounded-3xl border transition-all duration-300 ${
                  aff.completed ? 'bg-stone-50 border-stone-200 opacity-75' : 'bg-white border-stone-100 shadow-sm'
                }`}
              >
                <div className="flex justify-between items-start gap-4 mb-4">
                  <div className="flex-1">
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block mb-1">Dia {aff.day}</span>
                    <p className={`text-lg serif leading-snug italic ${aff.completed ? 'line-through text-stone-400' : 'text-stone-800'}`}>
                      "{aff.text}"
                    </p>
                  </div>
                  <button 
                    onClick={() => toggleAffirmation(aff.id)}
                    className={`mt-1 rounded-full p-1 transition-colors ${
                      aff.completed ? 'text-stone-800' : 'text-stone-300'
                    }`}
                  >
                    {aff.completed ? <CheckCircle2 size={32} /> : <Circle size={32} />}
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <AudioPlayer text={aff.text} />
                </div>
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
        <div className="animate-fade-in space-y-8">
          <section className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-3xl font-bold text-stone-800 serif">Oração da Manhã</h2>
              <AudioPlayer text={PRAYER_MORNING} />
            </div>
            <div className="bg-stone-50 p-8 rounded-[40px] border border-stone-100 leading-relaxed text-stone-700 italic serif text-xl whitespace-pre-wrap">
              {PRAYER_MORNING}
            </div>
          </section>

          <section className="space-y-4 pt-4 border-t border-stone-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-3xl font-bold text-stone-800 serif">Oração da Noite</h2>
              <AudioPlayer text={PRAYER_EVENING} />
            </div>
            <div className="bg-stone-900 p-8 rounded-[40px] leading-relaxed text-stone-300 italic serif text-xl whitespace-pre-wrap shadow-2xl">
              {PRAYER_EVENING}
            </div>
          </section>
        </div>
      )}

      {activeTab === 'journal' && (
        <div className="animate-fade-in space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-stone-800 serif">Diário Espiritual</h2>
            <button 
              onClick={() => setIsAddingEntry(!isAddingEntry)}
              className="bg-stone-800 text-white p-2 rounded-full shadow-lg hover:bg-stone-700 transition-transform active:scale-95"
            >
              <Plus size={24} />
            </button>
          </div>

          {isAddingEntry && (
            <div className="bg-white p-6 rounded-3xl border-2 border-stone-800 shadow-xl space-y-4 animate-slide-up">
              <textarea 
                className="w-full h-40 bg-stone-50 rounded-2xl p-4 text-stone-800 outline-none resize-none focus:ring-2 ring-stone-200"
                placeholder="Como sua alma se sente hoje? Quais milagres você percebeu?"
                value={newEntryContent}
                onChange={(e) => setNewEntryContent(e.target.value)}
              />
              <div className="flex justify-end gap-3">
                <button 
                  onClick={() => setIsAddingEntry(false)}
                  className="px-6 py-2 rounded-xl font-bold text-stone-400"
                >
                  Cancelar
                </button>
                <button 
                  onClick={addJournalEntry}
                  className="px-6 py-2 bg-stone-800 text-white rounded-xl font-bold shadow-md"
                >
                  Guardar
                </button>
              </div>
            </div>
          )}

          <div className="space-y-6">
            {journal.length === 0 ? (
              <div className="text-center py-20 bg-stone-50 rounded-[40px] border border-dashed border-stone-300">
                <PenLine size={48} className="mx-auto text-stone-300 mb-4" />
                <p className="text-stone-400 font-medium italic">Seu coração ainda não escreveu nada aqui...</p>
              </div>
            ) : (
              journal.map((entry) => (
                <div key={entry.id} className="bg-white p-6 rounded-3xl border border-stone-100 shadow-sm relative group">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar size={14} className="text-stone-400" />
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{entry.date}</span>
                  </div>
                  <p className="text-stone-700 leading-relaxed whitespace-pre-wrap">{entry.content}</p>
                  <button 
                    onClick={() => deleteJournalEntry(entry.id)}
                    className="absolute top-4 right-4 text-stone-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={18} />
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
