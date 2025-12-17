import React, { useState, useRef } from 'react';
import Snow from './components/Snow';
import Santa from './components/Santa';
import GiftBox from './components/GiftBox';
import MusicPlayer from './components/MusicPlayer';
import { generateGiftMessages } from './services/geminiService';
import { GiftMessage, AppState, Language } from './types';

const translations = {
  en: {
    title: "The Wish Gallery",
    subtitle: "Tell Santa your wish.",
    placeholder: "I wish for financial freedom...",
    btnIdle: "Make a Wish",
    btnWishing: "Santa is preparing for your gifts...",
    reset: "Make Another Wish",
    giftLocked: "Locked",
    giftOpen: "Open Me",
    chooseOne: "You can only choose one gift."
  },
  zh: {
    title: "许愿",
    subtitle: "告诉圣诞老人你的愿望",
    placeholder: "我希望能实现财富自由...",
    btnIdle: "许愿",
    btnWishing: "圣诞老人正在准备你的礼物...",
    reset: "许下另一个愿望",
    giftLocked: "已锁定",
    giftOpen: "打开我",
    chooseOne: "你只能选择一份礼物。"
  }
};

const App: React.FC = () => {
  const [wish, setWish] = useState('');
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [gifts, setGifts] = useState<GiftMessage[]>([]);
  const [openedGiftIndex, setOpenedGiftIndex] = useState<number | null>(null);
  const [language, setLanguage] = useState<Language>('en');
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const t = translations[language];

  const handleWishSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wish.trim()) return;

    setAppState(AppState.WISHING);
    
    try {
      const messages = await generateGiftMessages(wish, language);
      setGifts(messages);
      
      // Short artificial delay if API is too fast, to let Santa prepare
      setTimeout(() => {
        setAppState(AppState.OPENING);
        setTimeout(() => {
            scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      }, 1500);
      
    } catch (error) {
      console.error(error);
      setAppState(AppState.IDLE);
    }
  };

  const reset = () => {
    setWish('');
    setGifts([]);
    setOpenedGiftIndex(null);
    setAppState(AppState.IDLE);
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'zh' : 'en');
  };

  const handleGiftOpen = (index: number) => {
    setOpenedGiftIndex(index);
    // Scroll to ensure the magnified gift is perfectly centered
    setTimeout(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white overflow-x-hidden font-sans selection:bg-red-500 selection:text-white pb-20 relative">
      <Snow />

      {/* Top Right Controls */}
      <div className="absolute top-4 right-4 z-50 flex items-center gap-3">
        <MusicPlayer />
        <button 
          onClick={toggleLanguage}
          className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-3 py-2 rounded-full text-sm font-bold hover:bg-white/20 transition-colors"
        >
          {language === 'en' ? '中文' : 'English'}
        </button>
      </div>

      {/* Backdrop overlay when a gift is opened */}
      <div className={`fixed inset-0 bg-black/60 z-30 transition-opacity duration-1000 pointer-events-none ${openedGiftIndex !== null ? 'opacity-100' : 'opacity-0'}`}></div>

      <main className="relative z-10 container mx-auto px-4 py-8 flex flex-col items-center min-h-screen justify-center">
        
        {/* Header */}
        <header className={`text-center mb-8 animate-fade-in transition-all duration-500 ${openedGiftIndex !== null ? 'opacity-30 scale-75 blur-sm' : ''}`}>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)] mb-2">
            {t.title}
          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-lg mx-auto font-serif">
            {t.subtitle}
          </p>
        </header>

        {/* Central Stage */}
        <div className="flex flex-col items-center justify-center w-full max-w-4xl relative">
          
          {/* Santa (Replaces Stocking) - Hide when gift is magnified to save space */}
          {openedGiftIndex === null && (
            <div className="mb-8 z-20">
              <Santa isPreparing={appState === AppState.WISHING} />
            </div>
          )}

          {/* Input Area (Only visible when IDLE or WISHING) */}
          {appState !== AppState.OPENING && (
            <div className={`w-full max-w-md transition-opacity duration-500 ${appState === AppState.WISHING ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
              <form onSubmit={handleWishSubmit} className="flex flex-col gap-4 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-2xl">
                <label htmlFor="wish" className="sr-only">Your Wish</label>
                <textarea
                  id="wish"
                  value={wish}
                  onChange={(e) => setWish(e.target.value)}
                  placeholder={t.placeholder}
                  className="w-full h-32 p-4 rounded-xl bg-slate-800/80 border border-slate-600 text-white placeholder-slate-400 focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none resize-none transition-all"
                  required
                />
                <button
                  type="submit"
                  disabled={appState === AppState.WISHING}
                  className="w-full py-3 px-6 bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white font-bold rounded-xl shadow-lg transform transition hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group"
                >
                  {appState === AppState.WISHING ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      {t.btnWishing}
                    </>
                  ) : (
                    <>
                      <span>{t.btnIdle}</span>
                      <span className="group-hover:translate-x-1 transition-transform">✨</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {/* Results Area (Gifts) */}
          {appState === AppState.OPENING && (
            <div ref={scrollRef} className="w-full flex flex-col items-center transition-all duration-700 relative z-40">
              
              {/* Reminder text - only show if no gift is opened yet */}
              {openedGiftIndex === null && (
                <div className="mb-6 animate-fade-in text-center">
                  <p className="text-xl md:text-2xl text-yellow-300 font-serif font-bold drop-shadow-lg">
                    {t.chooseOne}
                  </p>
                </div>
              )}

              {/* Gift Container Logic */}
              <div className={`
                w-full transition-all duration-700
                ${openedGiftIndex !== null ? 'flex justify-center items-center h-[70vh]' : 'grid grid-cols-1 md:grid-cols-3 gap-8 place-items-center mb-12'}
              `}>
                {gifts.map((gift, index) => {
                  // If a gift is opened, only render that specific gift. 
                  // If none are opened, render all.
                  if (openedGiftIndex !== null && openedGiftIndex !== index) return null;

                  return (
                    <GiftBox 
                      key={index} 
                      gift={gift} 
                      index={index} 
                      isOpened={openedGiftIndex === index}
                      isDisabled={openedGiftIndex !== null && openedGiftIndex !== index}
                      isMagnified={openedGiftIndex === index}
                      onOpen={() => handleGiftOpen(index)}
                      tagLabel={openedGiftIndex !== null && openedGiftIndex !== index ? t.giftLocked : t.giftOpen}
                    />
                  );
                })}
              </div>
              
              {openedGiftIndex !== null && (
                <button 
                  onClick={reset}
                  className="mt-8 py-3 px-10 bg-red-600 hover:bg-red-700 text-white border-2 border-red-500/50 rounded-full font-bold text-lg shadow-lg transition-all hover:scale-110 animate-fade-in z-50"
                >
                  {t.reset}
                </button>
              )}
            </div>
          )}

        </div>
      </main>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
