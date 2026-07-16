interface PageHeaderProps {
  title: string;
}

export default function PageHeader({ title }: PageHeaderProps) {
  return (
    <div className="relative w-full py-24 bg-transparent border-b border-zinc-900">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900/50 via-black to-black opacity-50" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-black text-white tracking-widest uppercase italic">
          {title}
        </h1>
        <div className="w-24 h-1 bg-studio-gold mx-auto mt-6" />
      </div>
    </div>
  );
}