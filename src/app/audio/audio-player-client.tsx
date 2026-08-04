"use client";

import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Play, Pause, SkipForward, SkipBack, Volume2, VolumeX,
  Heart, Search, ListMusic, Home, Clock, Download,
  Menu, X
} from "lucide-react";
import { cn } from "@/lib/utils";

const audios = [
  { id: "1", title: "বদনজর (Evil Eye) | বদনজরের রুকইয়াহ", url: "https://files.ruqyahbd.org/audio/Ruqyah-EvilEye-ruqyahbd.org.mp3", size: "১০এমবি", duration: "৫৫মিনিট", category: "বদনজর" },
  { id: "2", title: "বদনজর (Eye Hasad)", url: "https://files.ruqyahbd.org/audio/Ruqyah-EyeHasad-ruqyahbd.org.mp3", size: "১৬এমবি", duration: "১ঘণ্টা ৩৪মিনিট", category: "বদনজর" },
  { id: "3", title: "জাদু ও জিন (Sihr-Mass) | সিহরের রুকইয়াহ", url: "https://files.ruqyahbd.org/audio/Ruqyah-Sihr-Mass-ruqyahbd.org.mp3", size: "১৪এমবি", duration: "১ঘন্টা ১৬মিনিট", category: "জাদু ও জিন" },
  { id: "4", title: "কালো যাদু, বান এবং জিন (Sihr-Hibshi)", url: "https://files.ruqyahbd.org/audio/Ruqyah-Sihr-Hibshi-ruqyahbd.org.mp3", size: "১৬এমবি", duration: "১ঘন্টা ৩৪মিনিট", category: "জাদু ও জিন" },
  { id: "5", title: "আয়াতুল হারক", url: "https://files.ruqyahbd.org/audio/Ruqyah-Harq-ruqyahbd.org.mp3", description: "আযাব এবং জাহান্নাম সংক্রান্ত আয়াত", size: "১৪এমবি", duration: "৪৬মিনিট", category: "অন্যান্য" },
  { id: "6", title: "জিনের আছর এর রুকইয়াহ", url: "https://files.ruqyahbd.org/audio/Ruqyah-Jinn-ruqyahbd.org.mp3", description: "জিন সংক্রান্ত সব সমস্যায় উপকারী আয়াতগুলো", size: "১৯এমবি", duration: "১ঘন্টা ৪৮মিনিট", category: "জাদু ও জিন" },
  { id: "7", title: "তিনকুল এর রুকইয়াহ", url: "https://files.ruqyahbd.org/audio/Ruqyah-3Kul-ruqyahbd.org.mp3", description: "সুরা ইখলাস, ফালাক, নাস এর পুনরাবৃত্তি", size: "৭এমবি", duration: "৩০ মিনিট", category: "অন্যান্য" },
  { id: "8", title: "আট সুরার রুকইয়াহ", url: "https://files.ruqyahbd.org/audio/Ruqyah-8surah-ruqyahbd.org.mp3", description: "সুরা ইয়াসিন, সফফাত, দুখান, জিন, যিলযাল, ৩কুল", size: "১২এমবি", duration: "৫১ মিনিট", category: "অন্যান্য" },
  { id: "9", title: "আয়াতুল কুরসির রুকইয়াহ", url: "https://files.ruqyahbd.org/audio/Ruqyah-AyatulKursi-ruqyahbd.org.mp3", size: "৭এমবি", duration: "৩০ মিনিট", category: "অন্যান্য" },
  { id: "10", title: "যাদুকরদের প্রতি অভিশাপ", url: "https://files.ruqyahbd.org/audio/curse-against-magician-ruqyahbd.org.mp3", size: "৪এমবি", duration: "১৩মিনিট", category: "জাদু ও জিন" },
  { id: "11", title: "শাইখ আস-সুদাইস", url: "https://files.ruqyahbd.org/audio/Ruqyah-Sudais-ruqyahbd.org.mp3", size: "৮এমবি", duration: "৪৩ মিনিট", category: "তেলাওয়াত" },
  { id: "12", title: "শাইখ হুজাইফি", url: "https://files.ruqyahbd.org/audio/Ruqyah-Hujaifi-ruqyahbd.org.mp3", size: "৯এমবি", duration: "১ঘন্টা ২০মিনিট", category: "তেলাওয়াত" },
  { id: "13", title: "শাইখ আশ-শুরাইম", url: "https://files.ruqyahbd.org/audio/Ruqyah-Shuraim-ruqyahbd.org.mp3", size: "১৪ এমবি", duration: "৫৮মিনিট", category: "তেলাওয়াত" },
  { id: "14", title: "সা'দ আল-গামিদী", url: "https://files.ruqyahbd.org/audio/Ruqyah-Ghamidi-ruqyahbd.org.mp3", size: "১৩এমবি", duration: "৩২মিনিট", category: "তেলাওয়াত" },
  { id: "15", title: "মিশারী রাশেদ আল-আফাসী", url: "https://files.ruqyahbd.org/audio/Ruqyah-Mishary-ruqyahbd.org.mp3", size: "৯এমবি", duration: "১ঘন্টা ১৪মিনিট", category: "তেলাওয়াত" },
  { id: "16", title: "সুরা ফাতিহার রুকইয়াহ", url: "https://files.ruqyahbd.org/audio/Ruqyah-SuraFatiha-ruqyahbd.org.mp3", size: "২৯এমবি", duration: "১ঘন্টা", category: "অন্যান্য" },
  { id: "17", title: "যিনা ফাহিশা বিষয়ক", url: "https://files.ruqyahbd.org/audio/Ruqyah-Zina-ruqyahbd.org.mp3", size: "১৮এমবি", duration: "১ঘন্টা ৫মিনিট", category: "অন্যান্য" },
  { id: "18", title: "শিফা - সাকিনাহ", url: "https://files.ruqyahbd.org/audio/Ruqyah-Shifa-Sakina-ruqyahbd.org.mp3", size: "১৪এমবি", duration: "৪৭ মিনিট", category: "অন্যান্য" },
  { id: "19", title: "রুকইয়াহ খুরুজ", url: "https://files.ruqyahbd.org/audio/Ruqyah-Khuruj-ruqyahbd.org.mp3", size: "১২ এমবি", duration: "৪৫ মিনিট", category: "জাদু ও জিন" }
];

const categories = ["সব", "বদনজর", "জাদু ও জিন", "তেলাওয়াত", "অন্যান্য"];

export function AudioPlayerClient() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  
  const [activeTab, setActiveTab] = useState<"home" | "search" | "favorites" | "recent">("home");
  const [activeCategory, setActiveCategory] = useState("সব");
  const [searchQuery, setSearchQuery] = useState("");
  
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recent, setRecent] = useState<string[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Load saved state
  useEffect(() => {
    const savedFavs = localStorage.getItem("ruqyah_favs");
    const savedRecent = localStorage.getItem("ruqyah_recent");
    if (savedFavs) setFavorites(JSON.parse(savedFavs));
    if (savedRecent) setRecent(JSON.parse(savedRecent));
  }, []);

  // Save favs
  useEffect(() => {
    localStorage.setItem("ruqyah_favs", JSON.stringify(favorites));
  }, [favorites]);

  // Save recent
  useEffect(() => {
    localStorage.setItem("ruqyah_recent", JSON.stringify(recent));
  }, [recent]);

  const togglePlay = () => {
    if (currentTrackIndex === null) {
      playTrack(0);
      return;
    }
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const playTrack = (index: number) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
    setProgress(0);
    
    // Add to recent
    const trackId = audios[index].id;
    setRecent(prev => {
      const newRecent = [trackId, ...prev.filter(id => id !== trackId)].slice(0, 20);
      return newRecent;
    });

    if (audioRef.current) {
      audioRef.current.src = audios[index].url;
      audioRef.current.play();
    }
  };

  const playNext = () => {
    if (currentTrackIndex === null) return;
    const nextIndex = (currentTrackIndex + 1) % audios.length;
    playTrack(nextIndex);
  };

  const playPrev = () => {
    if (currentTrackIndex === null) return;
    const prevIndex = (currentTrackIndex - 1 + audios.length) % audios.length;
    playTrack(prevIndex);
  };

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      if (duration) {
        setProgress((current / duration) * 100);
      }
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setProgress(value);
    if (audioRef.current) {
      audioRef.current.currentTime = (audioRef.current.duration / 100) * value;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setVolume(value);
    setIsMuted(value === 0);
    if (audioRef.current) {
      audioRef.current.volume = value;
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      const newMutedState = !isMuted;
      setIsMuted(newMutedState);
      audioRef.current.volume = newMutedState ? 0 : volume || 1;
    }
  };

  // Filtering Logic
  let displayTracks = audios;
  
  if (activeTab === "search") {
    displayTracks = audios.filter(a => a.title.toLowerCase().includes(searchQuery.toLowerCase()) || (a.description && a.description.toLowerCase().includes(searchQuery.toLowerCase())));
  } else if (activeTab === "favorites") {
    displayTracks = audios.filter(a => favorites.includes(a.id));
  } else if (activeTab === "recent") {
    // Keep recent order
    displayTracks = recent.map(id => audios.find(a => a.id === id)!).filter(Boolean);
  } else {
    // Home tab category filtering
    if (activeCategory !== "সব") {
      displayTracks = audios.filter(a => a.category === activeCategory);
    }
  }

  const currentTrack = currentTrackIndex !== null ? audios[currentTrackIndex] : null;

  return (
    <div className="flex h-screen bg-[#121212] text-slate-300 font-sans overflow-hidden">
      
      {/* Hidden Audio Element */}
      <audio 
        ref={audioRef} 
        onTimeUpdate={handleTimeUpdate} 
        onEnded={playNext}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-[#000000] p-6 gap-8 z-20">
        <div className="flex items-center gap-3 text-white">
          <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
            <ListMusic className="w-5 h-5 text-black" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">Audio Library</h1>
        </div>

        <nav className="flex flex-col gap-4">
          <button onClick={() => setActiveTab("home")} className={cn("flex items-center gap-4 text-sm font-bold transition-colors", activeTab === "home" ? "text-white" : "text-slate-400 hover:text-white")}>
            <Home className="w-6 h-6" /> হোম
          </button>
          <button onClick={() => setActiveTab("search")} className={cn("flex items-center gap-4 text-sm font-bold transition-colors", activeTab === "search" ? "text-white" : "text-slate-400 hover:text-white")}>
            <Search className="w-6 h-6" /> সার্চ করুন
          </button>
        </nav>

        <div className="flex flex-col gap-4 mt-4">
          <button onClick={() => setActiveTab("favorites")} className={cn("flex items-center gap-4 text-sm font-bold transition-colors", activeTab === "favorites" ? "text-white" : "text-slate-400 hover:text-white")}>
            <div className="w-6 h-6 rounded bg-gradient-to-br from-indigo-500 to-emerald-400 flex items-center justify-center">
              <Heart className="w-3.5 h-3.5 text-white fill-white" />
            </div>
            পছন্দের অডিও
          </button>
          <button onClick={() => setActiveTab("recent")} className={cn("flex items-center gap-4 text-sm font-bold transition-colors", activeTab === "recent" ? "text-white" : "text-slate-400 hover:text-white")}>
            <div className="w-6 h-6 rounded bg-slate-800 flex items-center justify-center text-emerald-400">
              <Clock className="w-4 h-4" />
            </div>
            সম্প্রতি শোনা
          </button>
        </div>

        <div className="mt-auto pt-4 border-t border-slate-800">
          <Link href="/" className="text-xs text-slate-500 hover:text-white transition-colors">মূল ওয়েবসাইটে ফিরে যান</Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto relative pb-28">
        
        {/* Dynamic Gradient Header */}
        <div className={cn(
          "h-64 absolute top-0 left-0 right-0 z-0 opacity-50",
          activeTab === "home" ? "bg-gradient-to-b from-emerald-900/60 to-[#121212]" :
          activeTab === "search" ? "bg-gradient-to-b from-blue-900/60 to-[#121212]" :
          activeTab === "favorites" ? "bg-gradient-to-b from-indigo-900/60 to-[#121212]" :
          "bg-gradient-to-b from-slate-800/60 to-[#121212]"
        )} />

        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 z-10 sticky top-0 bg-[#121212]/90 backdrop-blur-md">
          <div className="flex items-center gap-2 text-white">
            <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
              <ListMusic className="w-3.5 h-3.5 text-black" />
            </div>
            <h1 className="text-base font-bold">Audio Library</h1>
          </div>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white p-2">
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </header>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute inset-0 bg-[#000000] z-50 pt-20 px-6 flex flex-col gap-6 md:hidden"
            >
              <button onClick={() => { setActiveTab("home"); setIsMobileMenuOpen(false); }} className="text-2xl font-bold text-white text-left">হোম</button>
              <button onClick={() => { setActiveTab("search"); setIsMobileMenuOpen(false); }} className="text-2xl font-bold text-white text-left">সার্চ করুন</button>
              <button onClick={() => { setActiveTab("favorites"); setIsMobileMenuOpen(false); }} className="text-2xl font-bold text-white text-left">পছন্দের অডিও</button>
              <button onClick={() => { setActiveTab("recent"); setIsMobileMenuOpen(false); }} className="text-2xl font-bold text-white text-left">সম্প্রতি শোনা</button>
              <div className="mt-auto mb-32 border-t border-slate-800 pt-6">
                <Link href="/" className="text-slate-400">মূল ওয়েবসাইটে ফিরে যান</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative z-10 px-4 md:px-8 pt-6 md:pt-12 flex-1">
          
          {/* Header Content Based on Tab */}
          <div className="mb-8">
            {activeTab === "home" && (
              <>
                <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-8 tracking-tight">রুকইয়াহ কালেকশন</h2>
                {/* Categories */}
                <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
                  {categories.map(cat => (
                    <button 
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={cn(
                        "whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors",
                        activeCategory === cat ? "bg-white text-black" : "bg-white/10 text-white hover:bg-white/20"
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </>
            )}

            {activeTab === "search" && (
              <div className="max-w-xl">
                <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">খুঁজুন</h2>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-800" />
                  <input 
                    type="text" 
                    placeholder="কী খুঁজছেন?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-14 pl-12 pr-4 rounded-full bg-white text-black text-[15px] font-medium outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            )}

            {activeTab === "favorites" && (
              <div className="flex items-end gap-6">
                <div className="w-32 h-32 md:w-48 md:h-48 rounded-xl bg-gradient-to-br from-indigo-500 to-emerald-400 flex items-center justify-center shadow-2xl">
                  <Heart className="w-16 h-16 text-white fill-white" />
                </div>
                <div className="pb-2">
                  <span className="text-sm font-bold uppercase tracking-widest">প্লেলিস্ট</span>
                  <h2 className="text-4xl md:text-6xl font-extrabold text-white mt-2 mb-4 tracking-tight">পছন্দের অডিও</h2>
                  <span className="text-sm text-slate-300 font-medium">{favorites.length} টি অডিও</span>
                </div>
              </div>
            )}

            {activeTab === "recent" && (
              <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">সম্প্রতি শোনা</h2>
            )}
          </div>

          {/* Track List */}
          <div className="mt-8">
            {displayTracks.length === 0 ? (
              <div className="text-center py-20 text-slate-400">
                কোনো অডিও পাওয়া যায়নি
              </div>
            ) : (
              <div className="flex flex-col">
                {/* Header Row */}
                <div className="grid grid-cols-[40px_1fr_60px_80px] md:grid-cols-[48px_1fr_100px_60px_80px] gap-4 px-4 py-2 border-b border-white/10 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  <div className="text-center">#</div>
                  <div>শিরোনাম</div>
                  <div className="hidden md:block">সাইজ</div>
                  <div className="text-center"></div>
                  <div className="text-right flex items-center justify-end"><Clock className="w-4 h-4" /></div>
                </div>

                {/* Tracks */}
                {displayTracks.map((track, i) => {
                  const originalIndex = audios.findIndex(a => a.id === track.id);
                  const isThisPlaying = currentTrackIndex === originalIndex;
                  const isFav = favorites.includes(track.id);

                  return (
                    <div 
                      key={track.id}
                      onClick={() => playTrack(originalIndex)}
                      className={cn(
                        "grid grid-cols-[40px_1fr_60px_80px] md:grid-cols-[48px_1fr_100px_60px_80px] gap-4 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors group cursor-pointer items-center",
                        isThisPlaying ? "bg-white/10" : ""
                      )}
                    >
                      {/* Number / Play / Wave */}
                      <div className="text-center text-slate-400 text-sm flex justify-center relative">
                        {isThisPlaying && isPlaying ? (
                          <div className="flex items-end gap-0.5 h-4 w-4">
                            <motion.div animate={{ height: ["4px", "14px", "4px"] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-1 bg-emerald-500 rounded-full" />
                            <motion.div animate={{ height: ["10px", "4px", "10px"] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-1 bg-emerald-500 rounded-full" />
                            <motion.div animate={{ height: ["6px", "16px", "6px"] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-1 bg-emerald-500 rounded-full" />
                          </div>
                        ) : (
                          <>
                            <span className={cn("group-hover:hidden", isThisPlaying ? "text-emerald-500" : "")}>{i + 1}</span>
                            <Play className="w-4 h-4 text-white hidden group-hover:block" fill="white" />
                          </>
                        )}
                      </div>

                      {/* Title & Desc */}
                      <div className="min-w-0 pr-4">
                        <div className={cn("font-medium truncate text-[15px]", isThisPlaying ? "text-emerald-500" : "text-white")}>{track.title}</div>
                        {track.description && <div className="text-xs text-slate-400 truncate mt-0.5">{track.description}</div>}
                      </div>

                      {/* Size (Desktop) */}
                      <div className="hidden md:block text-sm text-slate-400">{track.size}</div>

                      {/* Actions */}
                      <div className="flex items-center justify-center gap-3">
                        <button 
                          onClick={(e) => toggleFavorite(track.id, e)}
                          className={cn("hover:text-white transition-colors", isFav ? "text-emerald-500" : "text-slate-400 opacity-0 group-hover:opacity-100")}
                        >
                          <Heart className="w-5 h-5" fill={isFav ? "currentColor" : "none"} />
                        </button>
                      </div>

                      {/* Duration */}
                      <div className="text-sm text-slate-400 text-right">{track.duration}</div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Fixed Bottom Player */}
      <div className="fixed bottom-0 left-0 right-0 h-24 bg-[#181818] border-t border-[#282828] px-4 flex items-center justify-between z-50">
        
        {/* Current Track Info */}
        <div className="flex items-center gap-4 w-[30%] min-w-[120px]">
          {currentTrack ? (
            <>
              <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-emerald-800 to-slate-900 rounded-md flex-shrink-0 flex items-center justify-center shadow-lg">
                <ListMusic className="w-6 h-6 text-emerald-500" />
              </div>
              <div className="min-w-0">
                <div className="text-sm md:text-[15px] text-white font-medium truncate hover:underline cursor-pointer">{currentTrack.title}</div>
                <div className="text-xs text-slate-400 truncate">{currentTrack.category}</div>
              </div>
              <button onClick={(e) => toggleFavorite(currentTrack.id, e)} className={cn("hidden md:block flex-shrink-0 ml-2", favorites.includes(currentTrack.id) ? "text-emerald-500" : "text-slate-400 hover:text-white")}>
                <Heart className="w-4 h-4" fill={favorites.includes(currentTrack.id) ? "currentColor" : "none"} />
              </button>
            </>
          ) : (
            <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">কোনো অডিও সিলেক্ট করা নেই</div>
          )}
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center max-w-xl w-full px-4">
          <div className="flex items-center gap-4 md:gap-6 mb-2">
            <button onClick={playPrev} className="text-slate-400 hover:text-white transition-colors disabled:opacity-50" disabled={!currentTrack}>
              <SkipBack className="w-5 h-5 fill-current" />
            </button>
            <button 
              onClick={togglePlay} 
              className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-50"
              disabled={!currentTrack}
            >
              {isPlaying ? <Pause className="w-4 h-4 md:w-5 md:h-5 fill-current" /> : <Play className="w-4 h-4 md:w-5 md:h-5 fill-current ml-1" />}
            </button>
            <button onClick={playNext} className="text-slate-400 hover:text-white transition-colors disabled:opacity-50" disabled={!currentTrack}>
              <SkipForward className="w-5 h-5 fill-current" />
            </button>
          </div>
          
          <div className="flex items-center w-full gap-2 text-xs text-slate-400 font-medium">
            <input 
              type="range" 
              min="0" max="100" 
              value={progress}
              onChange={handleProgressChange}
              disabled={!currentTrack}
              className="w-full h-1 bg-slate-600 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full disabled:opacity-50"
              style={{ backgroundSize: `${progress}% 100%`, backgroundImage: 'linear-gradient(#10b981, #10b981)', backgroundRepeat: 'no-repeat' }}
            />
          </div>
        </div>

        {/* Extra Controls */}
        <div className="flex items-center justify-end gap-3 w-[30%] min-w-[120px] text-slate-400">
          {currentTrack && (
            <a href={currentTrack.url} download target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors hidden md:block">
              <Download className="w-4 h-4" />
            </a>
          )}
          <button onClick={toggleMute} className="hover:text-white transition-colors hidden md:block">
            {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
          <input 
            type="range" 
            min="0" max="1" step="0.01"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-20 lg:w-24 h-1 bg-slate-600 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full hidden md:block"
            style={{ backgroundSize: `${isMuted ? 0 : volume * 100}% 100%`, backgroundImage: 'linear-gradient(#10b981, #10b981)', backgroundRepeat: 'no-repeat' }}
          />
        </div>
      </div>
    </div>
  );
}
