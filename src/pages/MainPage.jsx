import React, { useRef, useEffect, useState } from "react";
import { ExternalLink, FolderGit2, GitFork, Star, Code } from 'lucide-react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from 'react-i18next';
import asukaGif from "../assets/images/asuka.gif";
import ai from "../assets/images/ai.png";
import jabanner from "../assets/images/jabanner.png";
import nefren from "../assets/images/nefren.gif";
import nefrenpfp from "../assets/images/nefrenpfp.png";
import jaback from "../assets/images/jaback.png";
import eyes from "../assets/images/eyes.png";
import pfpasuka from "../assets/images/pfpasuka.png";
import LanguageSwitcher from "../components/LanguageSwitcher";

gsap.registerPlugin(ScrollTrigger);

// Функция возвращает набор изображений в зависимости от языка
const getAssetsByLanguage = (lang) => {
  switch (lang) {
    case 'ja':
      return {
        avatar: pfpasuka,
        banner: jabanner,
        background: jaback,
      };
    case 'ru':
      return {
        avatar: nefrenpfp,
        banner: nefren,
        background: 'https://st.depositphotos.com/1000401/2184/i/450/depositphotos_21847451-stock-illustration-starry-deep-outer-space-nebual.jpg',
      };
    default: // en
      return {
        avatar: ai,
        banner: eyes,
        background: 'https://st.depositphotos.com/1000401/2184/i/450/depositphotos_21847451-stock-illustration-starry-deep-outer-space-nebual.jpg',
      };
  }
};

const NowPlayingCard = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-black/40 border border-purple-500/30 rounded-lg px-6 py-4 mb-4 w-full">
      <div className="text-purple-300 text-xs uppercase tracking-wider mb-3 flex items-center justify-end gap-1">
        <span className="animate-pulse">●</span> {t('nowPlaying.title')}
      </div>
      <div className="text-white font-semibold text-lg mb-1">{t('nowPlaying.song')}</div>
      <div className="text-purple-400 text-sm mb-4">{t('nowPlaying.subtitle')}</div>
      <div className="w-full bg-purple-900/20 rounded-full h-1.5 mb-2">
        <div className="bg-gradient-to-r from-purple-400 to-indigo-400 h-1.5 rounded-full" style={{ width: '67%' }}></div>
      </div>
      <div className="flex justify-between items-center text-xs text-purple-300 mb-4 font-mono">
        <span>1:24</span>
        <span>3:42</span>
      </div>
      <div className="flex justify-center gap-6 mb-4">
        <button className="text-purple-300 hover:text-white transition text-xl">⏮</button>
        <button className="text-purple-300 hover:text-white transition text-2xl">▶</button>
        <button className="text-purple-300 hover:text-white transition text-xl">⏭</button>
      </div>
      <a href="#" className="block text-center text-xs text-purple-400 hover:text-purple-300 transition border-t border-purple-500/10 pt-3">
        {t('nowPlaying.listenOn')}
      </a>
    </div>
  );
};

const ProjectCard = ({ repo }) => {
  const { t } = useTranslation();
  return (
    <div className="group bg-black/30 border border-purple-500/20 rounded-lg p-5 hover:border-purple-400/40 hover:bg-black/40 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-1">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <FolderGit2 className="w-4 h-4 text-purple-400 flex-shrink-0" />
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-purple-300 font-semibold hover:text-purple-200 transition truncate text-base group-hover:underline">
            {repo.name}
          </a>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0 ml-2">
          {repo.forks_count > 0 && (
            <div className="flex items-center gap-1 text-gray-400">
              <GitFork className="w-3.5 h-3.5" />
              <span className="text-xs">{repo.forks_count}</span>
            </div>
          )}
          {repo.stargazers_count > 0 && (
            <div className="flex items-center gap-1 text-yellow-400">
              <Star className="w-3.5 h-3.5" />
              <span className="text-xs">{repo.stargazers_count}</span>
            </div>
          )}
        </div>
      </div>
      <p className="text-gray-400 text-sm mb-4 line-clamp-2 min-h-[40px]">
        {repo.description || t('projects.noDescription')}
      </p>
      {repo.languages && repo.languages.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {repo.languages.slice(0, 3).map((lang, i) => (
            <span key={i} className="text-xs px-2 py-1 bg-purple-600/20 rounded-md text-purple-300 border border-purple-500/20">
              {lang}
            </span>
          ))}
          {repo.languages.length > 3 && (
            <span className="text-xs px-2 py-1 text-gray-500">+{repo.languages.length - 3}</span>
          )}
        </div>
      )}
      <div className="flex items-center justify-between pt-3 border-t border-purple-500/10">
        <div className="text-xs text-gray-500">
          {t('projects.updated')} {new Date(repo.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </div>
        <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-purple-400 hover:text-purple-300 text-xs transition">
          <Code className="w-3.5 h-3.5" />
          <span>{t('projects.viewCode')}</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};

function MainPage() {
  const { t, i18n } = useTranslation();
  
  const skills = [
    "ReactJs", "JavaScript", "Python", "Next.js", "FastAPI",
    "Django", "Tailwind CSS", "C#", ".NET", "HTML", "CSS",
    "Git", "Docker", "AWS", "GraphQL", "TypeScript",
    "Nest.js", "MongoDB", "PostgreSQL", "Redis", "WebSockets",
  ];

  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('recent');
  const [userEvents, setUserEvents] = useState([]);
  const [contributions, setContributions] = useState(0);
  const [lastCommitDate, setLastCommitDate] = useState(null);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);

  // Состояние для динамических изображений
  const [assets, setAssets] = useState(() => getAssetsByLanguage(i18n.language));

  const profileRef = useRef(null);
  const steamProfileRef = useRef(null);
  const contentRef = useRef(null);

  // Обновляем изображения при смене языка
  useEffect(() => {
    setAssets(getAssetsByLanguage(i18n.language));
  }, [i18n.language]);

  const getFilteredRepos = () => {
    let filtered = [...repos];
    if (filter === 'stars') filtered.sort((a, b) => b.stargazers_count - a.stargazers_count);
    else if (filter === 'recent') filtered.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    return filtered.slice(0, 6);
  };

  // Получение репозиториев
  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.github.com/users/lampovayatyan999/repos?sort=updated&per_page=20');
        if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
        const data = await response.json();
        const reposWithLanguages = await Promise.all(
          data.map(async (repo) => {
            try {
              const langResponse = await fetch(repo.languages_url);
              const languages = await langResponse.json();
              return { ...repo, languages: Object.keys(languages).slice(0, 5) };
            } catch { return { ...repo, languages: [] }; }
          })
        );
        setRepos(reposWithLanguages);
      } catch (err) {
        setError(err.message);
        setRepos([
          { id: 1, name: 'awesome-project', description: 'A full-stack e-commerce platform', stargazers_count: 42, forks_count: 8, html_url: '#', languages: ['React', 'Node.js'], updated_at: new Date().toISOString() },
          { id: 2, name: 'dashboard-app', description: 'Real-time dashboard with WebSockets', stargazers_count: 28, forks_count: 5, html_url: '#', languages: ['Vue.js', 'Socket.io'], updated_at: new Date().toISOString() },
          { id: 3, name: 'api-service', description: 'RESTful API with FastAPI', stargazers_count: 15, forks_count: 3, html_url: '#', languages: ['Python', 'FastAPI'], updated_at: new Date().toISOString() },
          { id: 4, name: 'mobile-app', description: 'React Native mobile application', stargazers_count: 20, forks_count: 4, html_url: '#', languages: ['React Native', 'TypeScript'], updated_at: new Date().toISOString() },
        ]);
      } finally { setLoading(false); }
    };
    fetchRepos();
  }, []);

  // Получение событий пользователя для вычисления коммитов и стриков
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('https://api.github.com/users/lampovayatyan999/events');
        if (!response.ok) throw new Error('Failed to fetch events');
        const events = await response.json();
        setUserEvents(events);

        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        let commitCount = 0;
        const commitDates = [];

        events.forEach(event => {
          if (event.type === 'PushEvent') {
            const eventDate = new Date(event.created_at);
            if (eventDate >= thirtyDaysAgo) {
              commitCount += event.payload.size || event.payload.commits?.length || 0;
            }
            if (event.payload.commits) {
              event.payload.commits.forEach(() => {
                commitDates.push(eventDate.toISOString().split('T')[0]);
              });
            }
          }
        });
        setContributions(commitCount);

        const pushEvents = events.filter(e => e.type === 'PushEvent');
        if (pushEvents.length > 0) {
          const latest = new Date(pushEvents[0].created_at);
          setLastCommitDate(latest);
        } else {
          const latestRepo = repos.reduce((latest, repo) => {
            const repoDate = new Date(repo.updated_at);
            return repoDate > latest ? repoDate : latest;
          }, new Date(0));
          setLastCommitDate(latestRepo);
        }

        const uniqueDays = [...new Set(commitDates)].sort();
        let current = 0, longest = 0;
        let streak = 0;
        for (let i = 0; i < uniqueDays.length; i++) {
          const currentDate = new Date(uniqueDays[i]);
          const prevDate = i > 0 ? new Date(uniqueDays[i-1]) : null;
          if (prevDate && (currentDate - prevDate) / (1000*3600*24) === 1) {
            streak++;
          } else {
            streak = 1;
          }
          longest = Math.max(longest, streak);
          if (i === uniqueDays.length - 1) current = streak;
        }
        setCurrentStreak(current);
        setLongestStreak(longest);
      } catch (err) {
        console.error('Error fetching events:', err);
        setContributions(1247);
        setLastCommitDate(new Date());
        setCurrentStreak(12);
        setLongestStreak(45);
      }
    };
    if (repos.length > 0) fetchEvents();
  }, [repos]);

  const timeAgo = (date) => {
    if (!date) return 'N/A';
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = seconds / 86400;
    if (interval > 1) return `${Math.floor(interval)} days ago`;
    interval = seconds / 3600;
    if (interval > 1) return `${Math.floor(interval)} hours ago`;
    interval = seconds / 60;
    if (interval > 1) return `${Math.floor(interval)} minutes ago`;
    return `${Math.floor(seconds)} seconds ago`;
  };

  // GSAP анимации
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (profileRef.current) {
        gsap.fromTo(profileRef.current, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.8, scrollTrigger: { trigger: profileRef.current, start: "top 80%" } });
      }
      if (steamProfileRef.current) {
        gsap.fromTo(steamProfileRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: steamProfileRef.current, start: "top 85%" } });
      }
      if (contentRef.current?.children) {
        gsap.fromTo(contentRef.current.children, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.2, scrollTrigger: { trigger: contentRef.current, start: "top 75%" } });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050505] flex justify-center overflow-x-hidden">
      <LanguageSwitcher />

      {/* Фоновый слой — динамический */}
      <div className="fixed inset-0 z-0">
        <img
          src={assets.background}
          alt="Background"
          className="w-full h-full object-cover opacity-25 mix-blend-screen"
          key={assets.background}
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Боковые гифки — динамические */}
      {/* <div className="hidden xl:block fixed left-0 top-0 h-full w-[calc((100vw-1267px)/2)] min-w-[100px] z-10 opacity-30 pointer-events-none transition-all duration-500">
        <img src={assets.leftGif} alt="left gif" className="w-full h-full object-cover" key={assets.leftGif} />
      </div>
      <div className="hidden xl:block fixed right-0 top-0 h-full w-[calc((100vw-1267px)/2)] min-w-[100px] z-10 opacity-30 pointer-events-none transition-all duration-500">
        <img src={assets.rightGif} alt="right gif" className="w-full h-full object-cover" key={assets.rightGif} />
      </div> */}

      {/* Контент */}
      <div ref={contentRef} className="relative z-20 w-full max-w-[1267px] px-6 py-8">
        <div ref={steamProfileRef} className="mb-12">
          <div className="flex flex-col lg:flex-row items-start gap-8 mb-8">
            <div className="relative">
              <div className="w-60 h-60 rounded-lg overflow-hidden border-4 border-purple-500/40 shadow-2xl shadow-purple-500/20 transition-all duration-500">
                <img src={assets.avatar} alt="Profile" className="w-full h-full object-cover" key={assets.avatar} />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-white uppercase tracking-tight">lampovayatyan999</h1>
                <span className="text-sm text-purple-300 font-mono">
                  ✦ {t('profile.name')} ✦ {t('profile.location')}
                </span>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed">{t('profile.bio')}</p>
              <hr className="my-4 border-white/10" />
              <div className="flex justify-center items-center">
                <div className="text-purple-300 text-sm mb-3">·.·★·.·°·..·°¯°·.·★ .·°°★</div>
                <div className="text-purple-300 text-xs mb-3">°·..·°¯°·.★·°·..·°</div>
                <div className="text-purple-300 text-xs">°★ .·°°★</div>
              </div>
            </div>
            {/* <div className="w-full lg:w-80 flex-shrink-0">
              <NowPlayingCard />
            </div> */}
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 space-y-6">
              {/* Баннер — динамический */}
              <div className="relative rounded-lg overflow-hidden border-4 border-purple-500/40 shadow-2xl transition-all duration-500">
                <img src={assets.banner} alt="Showcase" className="w-full h-auto" key={assets.banner} />
              </div>
              
              <div className="bg-black/30 border border-purple-500/20 rounded-lg p-6">
                <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                  <h3 className="text-purple-200 text-lg font-semibold flex items-center gap-2">
                    <FolderGit2 className="w-5 h-5" />
                    {t('projects.title')}
                  </h3>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setFilter('recent')} className={`px-3 py-1.5 text-xs rounded-md transition ${filter === 'recent' ? 'bg-purple-600 text-white' : 'bg-purple-900/20 text-purple-300 hover:bg-purple-900/40'}`}>
                      {t('projects.filterRecent')}
                    </button>
                    <button onClick={() => setFilter('stars')} className={`px-3 py-1.5 text-xs rounded-md transition ${filter === 'stars' ? 'bg-purple-600 text-white' : 'bg-purple-900/20 text-purple-300 hover:bg-purple-900/40'}`}>
                      {t('projects.filterStars')}
                    </button>
                  </div>
                </div>
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="w-10 h-10 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mb-3"></div>
                    <p className="text-purple-300 text-sm">{t('projects.loading')}</p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      {getFilteredRepos().map((repo) => (
                        <ProjectCard key={repo.id} repo={repo} />
                      ))}
                    </div>
                    <div className="flex justify-center pt-4 border-t border-purple-500/10">
                      <a href="https://github.com/lampovayatyan999?tab=repositories" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 rounded-lg text-purple-300 hover:text-purple-200 transition text-sm font-medium">
                        {t('projects.viewAll')}
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </>
                )}
              </div>

              <div className="bg-black/30 border border-purple-500/20 rounded-lg p-6">
                <h3 className="text-purple-200 text-lg mb-4 font-semibold">{t('techStack.title')}</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span key={index} className="px-3 py-1.5 bg-purple-900/20 hover:bg-purple-900/40 border border-purple-500/20 rounded-lg text-sm font-medium transition-all text-purple-200">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-full lg:w-80 space-y-4">
              <div className="bg-black/30 border border-purple-500/20 rounded-lg p-6">
                <h3 className="text-purple-200 text-sm font-bold mb-4 flex items-center gap-2">
                  {t('githubStats.title')}
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-purple-300">{t('githubStats.totalStars')}</span>
                    <span className="text-white font-semibold flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      {repos.reduce((acc, repo) => acc + repo.stargazers_count, 0)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-purple-300">{t('githubStats.totalForks')}</span>
                    <span className="text-white font-semibold flex items-center gap-1">
                      <GitFork className="w-3.5 h-3.5 text-gray-400" />
                      {repos.reduce((acc, repo) => acc + (repo.forks_count || 0), 0)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-purple-300">{t('githubStats.publicRepos')}</span>
                    <span className="text-white font-semibold flex items-center gap-1">
                      📦 {repos.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-purple-500/10">
                    <span className="text-purple-300">{t('githubStats.contributions')}</span>
                    <span className="text-white font-semibold flex items-center gap-1">
                      🔥 {contributions}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-black/30 border border-purple-500/20 rounded-lg p-6">
                <h3 className="text-purple-200 text-sm font-bold mb-4 flex items-center gap-2">
                  <span className="animate-pulse">🟢</span> {t('activity.title')}
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-purple-300 text-xs">{t('activity.status')}:</span>
                    <span className="text-white font-semibold">
                      {lastCommitDate && (new Date() - new Date(lastCommitDate) < 86400000) ? 'Active' : 'Idle'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-purple-300 text-xs">{t('activity.lastCommit')}:</span>
                    <span className="text-white font-mono text-xs">{timeAgo(lastCommitDate)}</span>
                  </div>
                  <div className="pt-2 border-t border-purple-500/10">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-purple-300 text-xs">{t('profile.currentStreak')}</span>
                      <span className="text-orange-400 font-bold">{currentStreak} {t('profile.days')} 🔥</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-purple-300 text-xs">{t('profile.longestStreak')}</span>
                      <span className="text-yellow-400 font-bold">{longestStreak} {t('profile.days')} 🏆</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-black/30 border border-purple-500/20 rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-purple-300 text-sm font-bold">{t('social.title')}</span>
                </div>
                <div className="gap-y-3 flex flex-col">
                  <a href="https://github.com/lampovayatyan999" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white/5 hover:bg-purple-900/20 p-3 rounded-lg transition border border-white/5 group">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded flex items-center justify-center text-white font-bold">GH</div>
                  <div className="flex-1">
                    <div className="text-white text-xs group-hover:text-purple-300 transition">GitHub</div>
                    <div className="text-purple-400 text-[10px]">@lampovayatyan999</div>
                  </div>
                  <ExternalLink className="w-3 h-3 text-purple-400" />
                </a>
                <a href="https://www.linkedin.com/in/miroslav-shangelbaev-496143367" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white/5 hover:bg-purple-900/20 p-3 rounded-lg transition border border-white/5 group">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded flex items-center justify-center text-white font-bold">LI</div>
                  <div className="flex-1">
                    <div className="text-white text-xs group-hover:text-purple-300 transition">LinkedIn</div>
                    <div className="text-purple-400 text-[10px]">@miroslav-shangelbaev-496143367</div>
                  </div>
                  <ExternalLink className="w-3 h-3 text-purple-400" />
                </a>
                </div>
              </div>
              
              {/* <button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-lg py-4 text-white font-bold shadow-lg active:scale-95 transition-all">
                {t('social.downloadResume')}
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;