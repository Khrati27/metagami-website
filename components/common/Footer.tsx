export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-metagami-bg border-t border-metagami-border/30 py-12 px-6 md:px-12">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Sol Taraf: Telif Hakkı */}
        <div className="text-[10px] text-metagami-muted tracking-[0.2em] font-display uppercase font-medium">
          © {currentYear} METAGAMI STUDIO. TÜM HAKLARI SAKLIDIR.
        </div>

        {/* Sağ Taraf: İmalat Bilgisi */}
        <div className="text-[10px] text-metagami-muted tracking-[0.3em] uppercase font-display font-bold">
          HANDCRAFTED IN TÜRKIYE
        </div>
        
      </div>
    </footer>
  );
}