import "./App.css";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xojbdyvn";

const fields = [
  {
    title: "Elektronik",
    text: "Devre mantığı, sensörler, güç sistemleri ve ölçüm kültürü.",
  },
  {
    title: "Yazılım",
    text: "Modern yazılım geliştirme, algoritmik düşünme ve ürün üretimi.",
  },
  {
    title: "Donanım Tasarımı",
    text: "PCB, prototipleme, sistem entegrasyonu ve test süreçleri.",
  },
  {
    title: "Gömülü Sistemler",
    text: "Mikrodenetleyiciler, gerçek zamanlı kontrol ve cihaz yazılımları.",
  },
  {
    title: "İHA Sistemleri",
    text: "Aviyonik, kontrol, haberleşme, simülasyon ve görev sistemleri.",
  },
  {
    title: "Roket & Havacılık",
    text: "Uçuş mekaniği, simülasyon, güvenlik ve mühendislik disiplini.",
  },
];

const methods = [
  {
    number: "01",
    title: "Teori",
    text: "Konular yalnızca ezberlenmez; arkasındaki sistem mantığıyla anlaşılır.",
  },
  {
    number: "02",
    title: "Prototip",
    text: "Öğrenme süreci üretimle birleşir. Her modül bir çıktıya dönüşür.",
  },
  {
    number: "03",
    title: "Test",
    text: "Tasarlanan sistemler ölçülür, doğrulanır, iyileştirilir ve yeniden denenir.",
  },
];

function App() {
  async function handleSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        alert("Başvurun alındı. INVISIO yakında seninle iletişime geçecek.");
        form.reset();
      } else {
        alert("Bir hata oluştu. Lütfen tekrar dene.");
      }
    } catch {
      alert("Bağlantı hatası. Lütfen tekrar dene.");
    }
  }

  return (
    <main className="page">
      <nav className="navbar">
        <a className="brand" href="#">
          <span className="brand-symbol">◐</span>

          <div className="brand-text">
            <strong>INVISIO</strong>
            <small>Technology Academy</small>
          </div>
        </a>

        <div className="nav-links">
          <a href="#manifesto">Manifesto</a>
          <a href="#fields">Alanlar</a>
          <a href="#method">Metot</a>
          <a href="#access">Başvuru</a>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-orbit hero-orbit-one" />
        <div className="hero-orbit hero-orbit-two" />

        <p className="eyebrow">Technology Academy</p>

        <h1>
          Mastering the <span>Unseen</span>
        </h1>

        <p className="hero-text">
          Elektronikten gömülü sistemlere, İHA teknolojilerinden roket ve
          havacılık sistemlerine uzanan seçici bir mühendislik akademisi.
        </p>

        <div className="hero-actions">
          <a className="primary-btn" href="#access">
            Erken Erişim
          </a>

          <a className="secondary-btn" href="#manifesto">
            Manifestoyu Oku
          </a>
        </div>

        <div className="status-bar">
          <span />
          <p>Kapalı geliştirme süreci aktif</p>
        </div>
      </section>

      <section id="manifesto" className="section manifesto">
        <p className="eyebrow">Manifesto</p>

        <div className="section-header">
          <h2>Görünmeyeni anlamadan teknoloji üretilemez.</h2>

          <p>
            INVISIO, yalnızca araçları kullanmayı değil; sistemlerin arkasındaki
            mantığı, mühendislik disiplinini ve üretim kültürünü öğretmek için
            tasarlanmış bağımsız bir akademidir.
          </p>
        </div>
      </section>

      <section id="fields" className="section">
        <p className="eyebrow">Odak Alanları</p>

        <div className="section-header">
          <h2>Teknolojiyi parça parça değil, sistem olarak ele alıyoruz.</h2>

          <p>
            Her alan kendi içinde güçlüdür; fakat gerçek mühendislik bu
            alanların birlikte çalıştığı yerde başlar.
          </p>
        </div>

        <div className="field-grid">
          {fields.map((field) => (
            <article className="field-card" key={field.title}>
              <span className="card-plus">+</span>
              <h3>{field.title}</h3>
              <p>{field.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="method" className="section">
        <p className="eyebrow">Metot</p>

        <div className="section-header">
          <h2>Teori, prototip ve test aynı masada.</h2>

          <p>
            INVISIO modeli; öğrenmeyi üretim, disiplin ve sürekli iyileştirme
            kültürüyle birleştirir.
          </p>
        </div>

        <div className="method-grid">
          {methods.map((method) => (
            <article className="method-card" key={method.title}>
              <span>{method.number}</span>
              <h3>{method.title}</h3>
              <p>{method.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="access" className="access-section">
        <div>
          <p className="eyebrow">Erken Erişim</p>

          <h2>İlk dönem sınırlı kontenjanla açılacak.</h2>

          <p>
            Başvurular açıldığında seçili adaylara program detayları, kabul
            süreci ve ilk dönem takvimi iletilecektir.
          </p>
        </div>

        <form className="waitlist-form" onSubmit={handleSubmit}>
          <input name="name" type="text" placeholder="Ad Soyad" required />

          <input name="email" type="email" placeholder="E-posta" required />

          <select name="field" defaultValue="" required>
            <option value="" disabled>
              İlgi alanı seç
            </option>
            <option>Elektronik</option>
            <option>Yazılım</option>
            <option>Donanım Tasarımı</option>
            <option>Gömülü Sistemler</option>
            <option>İHA Sistemleri</option>
            <option>Roket & Havacılık</option>
          </select>

          <button type="submit">Listeye Katıl</button>
        </form>
      </section>
      <footer className="footer">
        <div>
          <strong>INVISIO</strong>
          <p>Technology Academy</p>
        </div>

        <div className="footer-right">
          <a href="mailto:invisiotechnology@gmail.com">
          invisiotechnology@gmail.com
          </a>

        <div className="footer-links">
          <a href="/gizlilik.html">Gizlilik</a>
          <a href="/kvkk.html">KVKK</a>
        </div>

        <span>Mastering the Unseen</span>
      </div>
      </footer>
        </main>
  );
}
      export default App;