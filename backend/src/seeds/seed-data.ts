import bcrypt from "bcryptjs";
import { User } from "../models/User";
import { Playlist } from "../models/Playlist";
import { connectDB } from "../config/db";

/**
 * Seed script to populate the database with sample users and playlists.
 * Uses real TMDB movie/TV data for realistic testing.
 *
 * Run: npx tsx src/seeds/seed-data.ts
 */

const seedData = async () => {
  await connectDB();

  try {
    // ──────────────────────────────────────────────
    // 1. Create sample users
    // ──────────────────────────────────────────────
    const hashedPassword = await bcrypt.hash("123456", 10);

    const usersData = [
      {
        username: "admin",
        email: "admin@gmail.com",
        password: hashedPassword,
        role: "admin" as const,
      },
      {
        username: "nguyenvana",
        email: "nguyenvana@gmail.com",
        password: hashedPassword,
        role: "user" as const,
      },
      {
        username: "tranthib",
        email: "tranthib@gmail.com",
        password: hashedPassword,
        role: "user" as const,
      },
      {
        username: "levanc",
        email: "levanc@gmail.com",
        password: hashedPassword,
        role: "user" as const,
      },
    ];

    const createdUsers = [];
    for (const userData of usersData) {
      const existing = await User.findOne({ email: userData.email });
      if (existing) {
        console.log(`  ⏭ User "${userData.username}" already exists, skipping.`);
        createdUsers.push(existing);
      } else {
        const user = await User.create(userData);
        console.log(`  ✓ Created user: ${user.username} (${user.email})`);
        createdUsers.push(user);
      }
    }

    const [adminUser, userA, userB, userC] = createdUsers;

    // ──────────────────────────────────────────────
    // 2. Create playlists with real TMDB movie data
    // ──────────────────────────────────────────────

    // Clear existing playlists (optional, for clean re-seeding)
    await Playlist.deleteMany({});
    console.log("\n  🗑 Cleared existing playlists.");

    const playlistsData = [
      // ── User A: Nguyễn Văn A ──
      {
        userId: userA._id,
        name: "Phim Hành Động Chiếu Rạp",
        description: "Bộ sưu tập phim hành động đỉnh cao Hollywood",
        isPublic: true,
        movies: [
          {
            tmdbId: 550,
            mediaType: "movie" as const,
            title: "Fight Club",
            posterPath: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
          },
          {
            tmdbId: 155,
            mediaType: "movie" as const,
            title: "The Dark Knight",
            posterPath: "/qJ2tW6WMUDux911Ma1cz0hnNFMa.jpg",
          },
          {
            tmdbId: 680,
            mediaType: "movie" as const,
            title: "Pulp Fiction",
            posterPath: "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
          },
          {
            tmdbId: 238,
            mediaType: "movie" as const,
            title: "The Godfather",
            posterPath: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
          },
          {
            tmdbId: 27205,
            mediaType: "movie" as const,
            title: "Inception",
            posterPath: "/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
          },
        ],
      },
      {
        userId: userA._id,
        name: "Phim Hoạt Hình Yêu Thích",
        description: "Những bộ phim hoạt hình hay nhất mọi thời đại",
        isPublic: true,
        movies: [
          {
            tmdbId: 129,
            mediaType: "movie" as const,
            title: "Spirited Away",
            posterPath: "/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",
          },
          {
            tmdbId: 862,
            mediaType: "movie" as const,
            title: "Toy Story",
            posterPath: "/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg",
          },
          {
            tmdbId: 508442,
            mediaType: "movie" as const,
            title: "Soul",
            posterPath: "/hm58Jw4Lw8OIeECIq5qyPYhAeRJ.jpg",
          },
        ],
      },

      // ── User B: Trần Thị B ──
      {
        userId: userB._id,
        name: "Phim Hàn Quốc Hay",
        description: "K-Drama và phim điện ảnh Hàn đỉnh nhất",
        isPublic: true,
        movies: [
          {
            tmdbId: 496243,
            mediaType: "movie" as const,
            title: "Parasite",
            posterPath: "/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
          },
          {
            tmdbId: 677179,
            mediaType: "movie" as const,
            title: "Crouching Tiger, Hidden Dragon",
            posterPath: "/iNJdMNhHfQzDk6g0V2CdEdYYwVL.jpg",
          },
        ],
      },
      {
        userId: userB._id,
        name: "Series Xem Mùa Hè",
        description: "Những bộ series dài tập để cày vào kỳ nghỉ hè",
        isPublic: false,
        movies: [
          {
            tmdbId: 1399,
            mediaType: "tv" as const,
            title: "Game of Thrones",
            posterPath: "/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg",
          },
          {
            tmdbId: 66732,
            mediaType: "tv" as const,
            title: "Stranger Things",
            posterPath: "/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
          },
          {
            tmdbId: 94997,
            mediaType: "tv" as const,
            title: "House of the Dragon",
            posterPath: "/z2yahl2uefxDCl0nogcRBstwruJ.jpg",
          },
          {
            tmdbId: 76479,
            mediaType: "tv" as const,
            title: "The Boys",
            posterPath: "/stTEycfG9Wkf4S2zy2MiruifK3s.jpg",
          },
        ],
      },

      // ── User C: Lê Văn C ──
      {
        userId: userC._id,
        name: "Phim Kinh Dị Halloween",
        description: "Xem vào tối thứ 6 ngày 13",
        isPublic: true,
        movies: [
          {
            tmdbId: 694,
            mediaType: "movie" as const,
            title: "The Shining",
            posterPath: "/nRj5511mZdTl4saWEPoj9QroTIu.jpg",
          },
          {
            tmdbId: 539,
            mediaType: "movie" as const,
            title: "Psycho",
            posterPath: "/yz4QVBb1OKCOSgt4HAPFm6JJaBe.jpg",
          },
          {
            tmdbId: 346364,
            mediaType: "movie" as const,
            title: "It",
            posterPath: "/9E2y5Q7WlCVNEhP5GiVTjhEhx1o.jpg",
          },
        ],
      },
      {
        userId: userC._id,
        name: "Marvel Cinematic Universe",
        description: "Toàn bộ phim MCU theo thứ tự",
        isPublic: true,
        movies: [
          {
            tmdbId: 1726,
            mediaType: "movie" as const,
            title: "Iron Man",
            posterPath: "/78lPtwv72eTNqFW9COBYI0dWDJa.jpg",
          },
          {
            tmdbId: 1771,
            mediaType: "movie" as const,
            title: "Captain America: The First Avenger",
            posterPath: "/vSNxAJTlD0r02V9sPYpOjqDZXUK.jpg",
          },
          {
            tmdbId: 24428,
            mediaType: "movie" as const,
            title: "The Avengers",
            posterPath: "/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg",
          },
          {
            tmdbId: 299536,
            mediaType: "movie" as const,
            title: "Avengers: Infinity War",
            posterPath: "/7WsyChQLEftFiDhRkZS3DC5E6r.jpg",
          },
          {
            tmdbId: 299534,
            mediaType: "movie" as const,
            title: "Avengers: Endgame",
            posterPath: "/or06FN3Dka5tukK1e9SlMR1bc7q.jpg",
          },
        ],
      },

      // ── Admin: Playlist công khai ──
      {
        userId: adminUser._id,
        name: "Top Phim Kinh Điển",
        description: "Danh sách phim kinh điển được biên tập bởi Admin",
        isPublic: true,
        movies: [
          {
            tmdbId: 278,
            mediaType: "movie" as const,
            title: "The Shawshank Redemption",
            posterPath: "/9cjIGRQL4apOVZRjjrNgLEfGQoV.jpg",
          },
          {
            tmdbId: 238,
            mediaType: "movie" as const,
            title: "The Godfather",
            posterPath: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
          },
          {
            tmdbId: 424,
            mediaType: "movie" as const,
            title: "Schindler's List",
            posterPath: "/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg",
          },
          {
            tmdbId: 240,
            mediaType: "movie" as const,
            title: "The Godfather Part II",
            posterPath: "/hek3koDUyRQq7gkV4SDsKSsC3c7.jpg",
          },
          {
            tmdbId: 389,
            mediaType: "movie" as const,
            title: "12 Angry Men",
            posterPath: "/ppd84D2i9W8jXmsyInGyihiSyqz.jpg",
          },
        ],
      },
    ];

    for (const playlistData of playlistsData) {
      const playlist = await Playlist.create(playlistData);
      console.log(`  ✓ Created playlist: "${playlist.name}" (${playlist.movies.length} movies)`);
    }

    // ──────────────────────────────────────────────
    // Summary
    // ──────────────────────────────────────────────
    const totalUsers = await User.countDocuments();
    const totalPlaylists = await Playlist.countDocuments();

    console.log("\n╔══════════════════════════════════════╗");
    console.log("║       SEED DATA HOÀN TẤT ✓          ║");
    console.log("╠══════════════════════════════════════╣");
    console.log(`║  Users:     ${String(totalUsers).padStart(3)}                     ║`);
    console.log(`║  Playlists: ${String(totalPlaylists).padStart(3)}                     ║`);
    console.log("╠══════════════════════════════════════╣");
    console.log("║  Login credentials (all users):      ║");
    console.log("║  Password: 123456                    ║");
    console.log("╚══════════════════════════════════════╝");

    process.exit(0);
  } catch (error) {
    console.error("✗ Seed failed:", error);
    process.exit(1);
  }
};

seedData();
