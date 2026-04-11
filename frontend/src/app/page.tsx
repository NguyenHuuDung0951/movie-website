import { Header } from "@/components/layout/header";
import { HomeContent } from "@/components/home/home-content";
import { HomeMoviesResponse, MovieItem } from "@/features/movies/types";

const fallbackHotMovies: MovieItem[] = [
  {
    _id: "fallback-hot-1",
    title: "The Last Signal",
    slug: "the-last-signal",
    description: "A sci-fi survival story in deep space.",
    genre: "Sci-Fi",
    releaseYear: 2025,
  },
  {
    _id: "fallback-hot-2",
    title: "Shadow Streets",
    slug: "shadow-streets",
    description: "A crime thriller set in a neon city.",
    genre: "Crime",
    releaseYear: 2024,
  },
  {
    _id: "fallback-hot-3",
    title: "Ocean of Fire",
    slug: "ocean-of-fire",
    description: "Action-packed rescue across storm seas.",
    genre: "Action",
    releaseYear: 2026,
  },
  {
    _id: "fallback-hot-4",
    title: "Noir City",
    slug: "noir-city",
    description: "A dark mystery in the heart of downtown.",
    genre: "Thriller",
    releaseYear: 2025,
  },
];

const fallbackNewMovies: MovieItem[] = [
  {
    _id: "fallback-new-1",
    title: "Midnight Echo",
    slug: "midnight-echo",
    description: "A character-driven drama with emotional twists.",
    genre: "Drama",
    releaseYear: 2026,
  },
  {
    _id: "fallback-new-2",
    title: "Blue Horizon",
    slug: "blue-horizon",
    description: "Adventure to discover a lost island legend.",
    genre: "Adventure",
    releaseYear: 2026,
  },
  {
    _id: "fallback-new-3",
    title: "Code of Dust",
    slug: "code-of-dust",
    description: "A puzzle mystery tied to old cinema reels.",
    genre: "Mystery",
    releaseYear: 2025,
  },
  {
    _id: "fallback-new-4",
    title: "City in Rain",
    slug: "city-in-rain",
    description: "A romance blooming in a crowded rainy city.",
    genre: "Romance",
    releaseYear: 2026,
  },
];

const getHomeMovies = async (): Promise<HomeMoviesResponse> => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

  try {
    const response = await fetch(`${baseUrl}/movies/home?hotLimit=4&newLimit=4`, {
      next: { revalidate: 120 },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch home movies");
    }

    const data = (await response.json()) as HomeMoviesResponse;

    return {
      hotMovies: data.hotMovies?.length ? data.hotMovies : fallbackHotMovies,
      newMovies: data.newMovies?.length ? data.newMovies : fallbackNewMovies,
    };
  } catch {
    return { hotMovies: fallbackHotMovies, newMovies: fallbackNewMovies };
  }
};

export default async function Home() {
  const { hotMovies, newMovies } = await getHomeMovies();

  return (
    <>
      <Header />
      <HomeContent hotMovies={hotMovies} newMovies={newMovies} />
    </>
  );
}
