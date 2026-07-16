export default function IletisimPage() {
  return (
    <main className="min-h-screen bg-metagami-bg pt-32 pb-20 px-6">
      <div className="max-w-[1440px] mx-auto">
        <h1 className="text-4xl font-black tracking-[0.2em] mb-16 text-center text-metagami-text font-display uppercase">
          İLETİŞİM
        </h1>
        
        <div className="grid md:grid-cols-2 gap-16 items-start">
          
          {/* İletişim Bilgileri */}
          <div className="space-y-12 border-t border-metagami-text/20 pt-8">
            <div>
              <h3 className="text-[10px] font-bold tracking-[0.3em] text-metagami-muted mb-4 font-display uppercase">
                BİZE ULAŞIN
              </h3>
              <p className="text-metagami-text/80 text-sm leading-relaxed font-sans max-w-sm">
                Her türlü soru, özel tasarım talepleri ve iş birlikleri için bize yazabilirsiniz.
              </p>
            </div>
            
            <div className="space-y-6 font-sans text-sm">
              <p className="flex items-center gap-4 text-metagami-text">
                <span className="text-metagami-muted">EMAIL</span> info@metagamistudio.com
              </p>
              <p className="flex items-center gap-4 text-metagami-text">
                <span className="text-metagami-muted">LOCATION</span> Gaziantep, Türkiye
              </p>
              <p className="flex items-center gap-4 text-metagami-text">
                <span className="text-metagami-muted">PHONE</span> +90 5XX XXX XX XX
              </p>
            </div>
          </div>

          {/* Form Alanı - Endüstriyel Stil */}
          <form className="space-y-6 border border-metagami-border/50 p-10 bg-transparent">
            <input 
              type="text" 
              placeholder="ADINIZ" 
              className="w-full bg-transparent border-b border-metagami-border/50 py-3 text-metagami-text placeholder:text-metagami-muted/50 text-[11px] tracking-widest focus:outline-none focus:border-metagami-text transition-colors" 
            />
            <input 
              type="email" 
              placeholder="E-POSTA ADRESİNİZ" 
              className="w-full bg-transparent border-b border-metagami-border/50 py-3 text-metagami-text placeholder:text-metagami-muted/50 text-[11px] tracking-widest focus:outline-none focus:border-metagami-text transition-colors" 
            />
            <textarea 
              placeholder="MESAJINIZ" 
              rows={4} 
              className="w-full bg-transparent border-b border-metagami-border/50 py-3 text-metagami-text placeholder:text-metagami-muted/50 text-[11px] tracking-widest focus:outline-none focus:border-metagami-text transition-colors"
            ></textarea>
            
            <button className="w-full bg-metagami-text text-metagami-bg font-bold py-4 text-[11px] uppercase tracking-widest hover:bg-black transition-all duration-300">
              GÖNDER
            </button>
          </form>
          
        </div>
      </div>
    </main>
  );
}