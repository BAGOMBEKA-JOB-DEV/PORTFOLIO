import { Article } from "types/Sections";

export const getArticles = async (): Promise<Article[]> => {
  const pageSize = 3;
  const username = "bagombeka_job";
  const apiKey = process.env.DEV_COMMUNITY_API_KEY;

  if (!apiKey) return [];

  const url = `https://dev.to/api/articles?username=${username}&per_page=${pageSize}`;

  try {
    const res = await fetch(url, { headers: { "api-key": apiKey } });
    const data: Article[] = await res.json();

    if (!data) throw new Error("Error occurred while retrieving DEV articles.");

    return data;
  } catch {
    return [];
  }
};

