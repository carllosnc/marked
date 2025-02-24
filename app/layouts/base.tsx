import { Outlet } from "react-router";

export default function BaseLayout() {
  return (
    <main className="bg-neutral-100 w-full min-h-screen">
      <Outlet />
    </main>
  );
}
