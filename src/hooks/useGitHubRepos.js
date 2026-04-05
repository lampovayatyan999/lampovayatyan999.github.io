import { useState, useEffect } from 'react';

export const useGitHub = (username) => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`);
        const data = await res.json();
        const detailed = await Promise.all(data.map(async (repo) => {
          const langRes = await fetch(repo.languages_url);
          const langs = await langRes.json();
          return { ...repo, languages: Object.keys(langs).slice(0, 3) };
        }));
        setRepos(detailed);
      } catch (e) {
        setRepos([{ id: 1, name: 'Offline Demo', languages: ['React'], updated_at: new Date().toISOString() }]);
      } finally { setLoading(false); }
    };
    fetchRepos();
  }, [username]);

  return { repos, loading };
};