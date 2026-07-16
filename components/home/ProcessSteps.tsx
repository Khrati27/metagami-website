export default function ProcessSteps() {
  const steps = [
    {
      number: "01",
      title: "Dijital Tasarım",
      subtitle: "Digital Design",
      description: "Hassas imalat için optimize edilmiş, milimetrik detaylara sahip 3D mühendislik modelleri hazırlıyoruz."
    },
    {
      number: "02",
      title: "Lazer Kesim",
      subtitle: "Laser Cutting",
      description: "Yüksek hassasiyetli fiber lazer teknolojisi ile paslanmaz çelik levhaları pürüzsüzce kesiyoruz."
    },
    {
      number: "03",
      title: "Form Verme",
      subtitle: "Forming",
      description: "Her bir geometrik paneli, heykelin low-poly karakterini oluşturacak şekilde ustalıkla büküyoruz."
    },
    {
      number: "04",
      title: "Hassas Montaj",
      subtitle: "Precision Assembly",
      description: "Tüm parçaları el işçiliğiyle bir araya getirip birleştiriyor ve kusursuz yüzey bitişini uyguluyoruz."
    }
  ];

  return (
    <section className="py-24 relative border-t border-metagami-border/30">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        
        {/* Bölüm Başlığı */}
        <div className="text-center mb-16 space-y-4">
          <p className="text-[10px] tracking-[0.3em] text-metagami-muted uppercase font-medium font-display">
            Zanaat ve Mühendislik
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-metagami-text font-display uppercase">
            Bir Heykelin <span className="font-light">Yapım Hikayesi</span>
          </h2>
          <p className="text-metagami-text/70 text-sm max-w-xl mx-auto font-sans">
            Her bir sanat eseri, Türkiye'deki stüdyomuzda dijital tasarım ve üst düzey el işçiliğinin birleşimiyle hayat buluyor.
          </p>
        </div>

        {/* Süreç Kartları Grid Yapısı */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="bg-metagami-bg border border-metagami-border/50 p-8 relative overflow-hidden group hover:border-metagami-text/30 transition-all duration-300"
            >
              {/* Arka plandaki loş numara efekti */}
              <div className="absolute -right-2 -bottom-4 text-7xl font-black text-metagami-text/[0.04] group-hover:text-metagami-text/[0.08] transition-colors duration-500 pointer-events-none select-none">
                {step.number}
              </div>

              {/* Kart İçeriği */}
              <div className="space-y-4 relative z-10">
                <span className="text-[10px] font-bold tracking-widest text-metagami-muted uppercase font-display">
                  Aşama {step.number}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-metagami-text font-display uppercase tracking-wide group-hover:text-black transition-colors duration-300">
                    {step.title}
                  </h3>
                  <span className="text-[9px] text-metagami-muted uppercase tracking-[0.2em] block mt-1 font-display">
                    {step.subtitle}
                  </span>
                </div>
                <p className="text-xs text-metagami-text/80 leading-relaxed font-sans">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}