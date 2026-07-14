import { Header } from "@/components/layout/header";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="flex flex-1 items-center justify-center bg-zinc-50 px-6 py-12">{children}</div>
    </>
  );
}
