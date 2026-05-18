import { FaFilm, FaRegFaceSmile, FaUserGroup } from "react-icons/fa6";
import { GiDramaMasks, GiFireBowl, GiGhost } from "react-icons/gi";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import { IoMusicalNotesOutline } from "react-icons/io5";
import { LuDna, LuHistory, LuWaves } from "react-icons/lu";
import { MdOutlineFamilyRestroom, MdOutlineMilitaryTech } from "react-icons/md";
import { PiDetectiveBold, PiRocketLaunchBold } from "react-icons/pi";
import { TbSword } from "react-icons/tb";
import type { IconType } from "react-icons";

export type GenreConfig = {
  slug: string;
  name: string;
  tmdbId: number;
  icon: IconType;
};

/**
 * Central genre configuration mapping slug → TMDB genre ID.
 * TMDB genre IDs: https://developer.themoviedb.org/reference/genre-movie-list
 */
export const GENRE_LIST: GenreConfig[] = [
  { slug: "action", name: "Hành động", tmdbId: 28, icon: TbSword },
  { slug: "adventure", name: "Phiêu lưu", tmdbId: 12, icon: PiRocketLaunchBold },
  { slug: "animation", name: "Hoạt hình", tmdbId: 16, icon: FaRegFaceSmile },
  { slug: "comedy", name: "Hài", tmdbId: 35, icon: FaRegFaceSmile },
  { slug: "crime", name: "Tội phạm", tmdbId: 80, icon: PiDetectiveBold },
  { slug: "documentary", name: "Tài liệu", tmdbId: 99, icon: HiOutlineAcademicCap },
  { slug: "drama", name: "Chính kịch", tmdbId: 18, icon: GiDramaMasks },
  { slug: "family", name: "Gia đình", tmdbId: 10751, icon: MdOutlineFamilyRestroom },
  { slug: "fantasy", name: "Giả tưởng", tmdbId: 14, icon: GiFireBowl },
  { slug: "history", name: "Lịch sử", tmdbId: 36, icon: LuHistory },
  { slug: "horror", name: "Kinh dị", tmdbId: 27, icon: GiGhost },
  { slug: "music", name: "Âm nhạc", tmdbId: 10402, icon: IoMusicalNotesOutline },
  { slug: "mystery", name: "Bí ẩn", tmdbId: 9648, icon: FaFilm },
  { slug: "romance", name: "Lãng mạn", tmdbId: 10749, icon: FaUserGroup },
  { slug: "science-fiction", name: "Khoa học viễn tưởng", tmdbId: 878, icon: LuDna },
  { slug: "thriller", name: "Giật gân", tmdbId: 53, icon: LuWaves },
  { slug: "war", name: "Chiến tranh", tmdbId: 10752, icon: MdOutlineMilitaryTech },
];

/** Look up a genre config by its URL slug. */
export const getGenreBySlug = (slug: string): GenreConfig | undefined =>
  GENRE_LIST.find((g) => g.slug === slug);

/** Look up a genre config by its TMDB numeric ID. */
export const getGenreByTmdbId = (tmdbId: number): GenreConfig | undefined =>
  GENRE_LIST.find((g) => g.tmdbId === tmdbId);
