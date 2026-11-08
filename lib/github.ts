import type { Arrival } from "@/components/ui/LatelyBoard";

const USER = "ayeshamashiat";
const HEADERS = { Accept: "application/vnd.github+json", "User-Agent": "portfolio-site" };
const OPTS = { headers: HEADERS, next: { revalidate: 60 * 60 } };

interface Repo {
  name: string;
  description: string | null;
  pushed_at: string;
  language: string | null;
  html_url: string;
  homepage: string | null;
  fork: boolean;
}
interface PushEvent {
  type: string;
  repo: { name: string };
  payload?: { commits?: { message: string }[] };
}

/** My most recently pushed public repos, with the latest commit message when GitHub provides it. */
export async function getArrivals(): Promise<Arrival[]> {
  try {
    const [repoRes, eventRes] = await Promise.all([
      fetch(`https://api.github.com/users/${USER}/repos?sort=pushed&per_page=12`, OPTS),
      fetch(`https://api.github.com/users/${USER}/events/public?per_page=50`, OPTS).catch(() => null),
    ]);
    if (!repoRes.ok) return [];
    const repos = ((await repoRes.json()) as Repo[]).filter((r) => !r.fork && r.name.toLowerCase() !== USER);

    const messages = new Map<string, string>();
    if (eventRes?.ok) {
      for (const e of (await eventRes.json()) as PushEvent[]) {
        const name = e.repo.name.split("/")[1];
        const msg = e.type === "PushEvent" ? e.payload?.commits?.at(-1)?.message : undefined;
        if (msg && !messages.has(name)) messages.set(name, msg.split("\n")[0]);
      }
    }

    return repos.slice(0, 6).map((r) => ({
      name: r.name,
      pushedAt: r.pushed_at,
      language: r.language,
      description: r.description,
      lastCommit: messages.get(r.name) ?? null,
      url: r.html_url,
      homepage: r.homepage || null,
    }));
  } catch {
    return [];
  }
}
