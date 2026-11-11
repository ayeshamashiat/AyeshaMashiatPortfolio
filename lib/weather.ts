export interface Weather {
  now: { temp: number; humidity: number; wind: number; code: number };
  days: { date: string; code: number; max: number; min: number }[];
}

const URL =
  "https://api.open-meteo.com/v1/forecast?latitude=23.8103&longitude=90.4125&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Asia%2FDhaka&forecast_days=5";

/** Dhaka's weather from Open-Meteo (free, no key). Null if the wire is down; the page copes without it. */
export async function getWeather(): Promise<Weather | null> {
  try {
    const res = await fetch(URL, { next: { revalidate: 60 * 30 } });
    if (!res.ok) return null;
    const j = await res.json();
    return {
      now: { temp: j.current.temperature_2m, humidity: j.current.relative_humidity_2m, wind: j.current.wind_speed_10m, code: j.current.weather_code },
      days: j.daily.time.map((date: string, i: number) => ({ date, code: j.daily.weather_code[i], max: j.daily.temperature_2m_max[i], min: j.daily.temperature_2m_min[i] })),
    };
  } catch {
    return null;
  }
}
