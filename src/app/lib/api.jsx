const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export function normalizeImageUrl(path) {
  if (!path) return "";
  if (path.startsWith("http")) return path;

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";

  return `${baseUrl.replace(/\/$/, "")}${
    path.startsWith("/") ? "" : "/"
  }${path}`;
}

export async function fetchHeaderFooterData() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/header-footer/`, {
      next: { revalidate: 60 },
    });
    return res.ok ? res.json() : null;
  } catch (err) {
    console.error("fetchHeaderFooterData error:", err);
    return null;
  }
}

export async function fetchHomePage() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/fetch-home_page`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error(`Failed to fetch home page: ${res.status}`);
    return res.json();
  } catch (err) {
    console.error(" fetchHomePage error:", err);
    return null;
  }
}

export async function fetchServicePage() {
  try {
    const res = await fetch(`${API_BASE_URL}/services/api/fetch-service_page`, {
      next: { revalidate: 60 },
    });
    return res.ok ? res.json() : null;
  } catch (err) {
    console.error("fetchServicePage error:", err);
    return null;
  }
}

export async function fetchPortfolioPage() {
  try {
    if (!API_BASE_URL) throw new Error("API_BASE_URL is missing");
    const res = await fetch(
      `${API_BASE_URL}/portfolio/api/fetch-portfolio_page`,
      {
        next: { revalidate: 60 },
      }
    );
    return res.ok ? res.json() : null;
  } catch (err) {
    console.error("fetchPortfolioPage error:", err);
    return null;
  }
}
export async function fetchAboutPage() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/about/api/fetch-about_page`,
      { next: { revalidate: 10 } }
    );
    if (!res.ok) throw new Error("Failed to fetch About Page");
    return await res.json();
  } catch (error) {
    console.error("Error fetching About Page:", error);
    return null;
  }
}
