import { Article, DribbbleShot } from "types/Sections";

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



export const getDribbbleShots = async (): Promise<DribbbleShot[]> => {
  const accessToken = process.env.DRIBBBLE_ACCESS_TOKEN;

  if (!accessToken) {
    console.error("Dribbble Access Token is missing.");
    return []; // Fallback to an empty array
  }

  const url = `https://api.dribbble.com/v2/user/shots`;

  try {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!res.ok) {
      throw new Error(`Dribbble API error: ${res.status} ${res.statusText}`);
    }

    const data = (await res.json()) as DribbbleShot[];

    if (!data || data.length === 0) {
      throw new Error("No Dribbble shots found.");
    }

    return data;
  } catch (error) {
    console.error("Error fetching Dribbble shots:", error);
    return []; // Return empty array as a fallback
  }
};

