import React from "react";
import { 
  Bell, 
  Search, 
  Menu,
  User
} from "lucide-react";

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-zinc-800 bg-[#151618]/80 px-4 backdrop-blur-md lg:px-8">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white lg:hidden"
        >
          <Menu size={20} />
        </button>
        
        <div className="hidden items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/50 px-4 py-1.5 md:flex">
          <Search size={16} className="text-zinc-500" />
          <input
            type="text"
            placeholder="Tìm kiếm phim, người dùng..."
            className="w-64 bg-transparent text-sm text-white placeholder-zinc-500 outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="relative rounded-full p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 flex h-2 w-2 rounded-full bg-rose-500"></span>
        </button>
        
        <div className="h-8 w-px bg-zinc-800 mx-1"></div>
        
        <button className="flex items-center gap-2 rounded-full pl-2 pr-1 py-1 hover:bg-zinc-800 transition-colors">
          <div className="flex flex-col items-end hidden md:flex">
            <span className="text-sm font-medium text-white">Admin</span>
            <span className="text-xs text-zinc-500">Quản trị viên</span>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
            <User size={16} />
          </div>
        </button>
      </div>
    </header>
  );
};
