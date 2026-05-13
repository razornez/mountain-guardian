export default function Loading() {
  return (
    <div className="flex h-screen bg-slate-950">
      <div className="hidden lg:block w-72 border-r border-slate-800 bg-slate-900" />
      <main className="flex-1 p-8 space-y-6 animate-pulse">
        <div className="h-64 bg-slate-800 rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-40 bg-slate-800 rounded-xl" />
          <div className="h-40 bg-slate-800 rounded-xl" />
          <div className="h-40 bg-slate-800 rounded-xl" />
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="h-96 bg-slate-800 rounded-xl" />
          <div className="h-96 bg-slate-800 rounded-xl" />
        </div>
      </main>
    </div>
  );
}
