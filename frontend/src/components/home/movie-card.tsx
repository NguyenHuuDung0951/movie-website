type Props = {
  title: string;
  subtitle: string;
  imageSrc: string;
  badge?: string;
};

export const MovieCard = ({ title, subtitle, imageSrc, badge = "P.Đề" }: Props) => {
  return (
    <button
      type="button"
      className="group relative h-72 w-44 shrink-0 overflow-hidden rounded-xl border border-zinc-700/60 bg-zinc-900/60 text-left transition hover:shadow-lg hover:shadow-black/50"
      aria-label={`Xem phim ${title}`}
    >
      <img
        src={imageSrc}
        alt={title}
        className="absolute inset-0 block h-full w-full object-cover transition duration-300 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/40 to-transparent" />
      // tag phụ đề
      {/* {badge && (
        <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-center">
          <span className="rounded-full border border-white/40 bg-white/10 px-2 py-1 text-xs font-semibold text-white backdrop-blur-sm">
            {badge}
          </span>
        </div>
      )} */}
      <div className="absolute inset-x-0 bottom-0 space-y-1.5 p-3">
        <p className="line-clamp-2 text-sm font-semibold text-white">{title}</p>
        <p className="line-clamp-1 text-xs text-zinc-300">{subtitle}</p>
      </div>
    </button>
  );
};
