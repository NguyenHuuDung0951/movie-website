import React from "react";
import { DashboardLayout } from "../layout/DashboardLayout";
import { MoviesFilter } from "../components/MoviesFilter";
import { MoviesTable } from "../components/MoviesTable";

export const MoviesManagementPage: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white">Quản lý Phim</h1>
        <p className="mt-1 text-zinc-500">
          Xem, thêm, sửa đổi hoặc xóa các bộ phim trên hệ thống.
        </p>
      </div>

      <MoviesFilter />
      <MoviesTable />
    </DashboardLayout>
  );
};
