export default function MountainLoading() {
  return (
    <div className="flex h-screen bg-slate-950">
      <div className="hidden lg:block w-72 border-r border-slate-800 bg-slate-900" />
      <main className="flex-1 p-6 space-y-6 animate-pulse">
        <div className="h-24 bg-slate-800 rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="h-32 bg-slate-800 rounded-xl" />
          <div className="h-32 bg-slate-800 rounded-xl" />
          <div className="h-32 bg-slate-800 rounded-xl" />
          <div className="h-32 bg-slate-800 rounded-xl" />
        </div>
        <div className="h-96 bg-slate-800 rounded-xl" />
      </main>
    </div>
  );
}
