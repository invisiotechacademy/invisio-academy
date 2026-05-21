import { useEffect, useState } from "react";
import "./App.css";

const FORMSPREE_ENDPOINT = "invisio-academy-7xpigsg2r";

const fields = [
  {
    slug: "elektronik",
    title: "Elektronik",
    label: "Circuit Systems",
    text: "Devre mantığı, sensörler, güç sistemleri ve ölçüm kültürü.",
    modules: ["Devre analizi", "Sensör sistemleri", "Güç elektroniği", "Ölçüm & test"],
    outcome: "Kendi elektronik prototipini tasarlayıp test edebilecek temel mühendislik refleksi.",
  },
  {
    slug: "yazilim",
    title: "Yazılım",
    label: "Software",
    text: "Modern yazılım geliştirme, algoritmik düşünme ve ürün üretimi.",
    modules: ["Frontend", "Backend", "Algoritmalar", "Ürün geliştirme"],
    outcome: "Fikirden çalışan ürüne giden yazılım geliştirme sürecini yönetebilme.",
  },
  {
    slug: "donanim",
    title: "Donanım Tasarımı",
    label: "Hardware Design",
    text: "PCB, prototipleme, sistem entegrasyonu ve test süreçleri.",
    modules: ["PCB tasarım", "Prototipleme", "Entegrasyon", "Hata ayıklama"],
    outcome: "Donanım fikrini şematikten fiziksel prototipe taşıyabilme.",
  },
  {
    slug: "gomulu",
    title: "Gömülü Sistemler",
    label: "Embedded Systems",
    text: "Mikrodenetleyiciler, gerçek zamanlı kontrol ve cihaz yazılımları.",
    modules: ["Mikrodenetleyiciler", "RTOS mantığı", "C/C++ temelleri", "Haberleşme protokolleri"],
    outcome: "Sensör, kontrolcü ve yazılımı tek sistemde buluşturabilme.",
  },
  {
    slug: "iha",
    title: "İHA Sistemleri",
    label: "UAV Systems",
    text: "Aviyonik, kontrol, haberleşme, simülasyon ve görev sistemleri.",
    modules: ["Aviyonik temeller", "Simülasyon", "Kontrol sistemleri", "Görev planlama"],
    outcome: "İHA sistemlerini güvenli, akademik ve mühendislik odaklı şekilde analiz edebilme.",
  },
  {
    slug: "havacilik",
    title: "Roket & Havacılık",
    label: "Aerospace",
    text: "Uçuş mekaniği, simülasyon, güvenlik ve mühendislik disiplini.",
    modules: ["Uçuş mekaniği", "Simülasyon", "Telemetri mantığı", "Güvenlik protokolleri"],
    outcome: "Havacılık sistemlerini simülasyon, test ve güvenlik disipliniyle kavrayabilme.",
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

const stats = [
  "Project Based",
  "Small Cohorts",
  "Engineering First",
  "Closed Access",
];

function App() {
  const [selectedField, setSelectedField] = useState(fields[0]);
  const [formStatus, setFormStatus] = useState("idle");

  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.14 }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  function handleFieldClick(field) {
    setSelectedField(field);

    setTimeout(() => {
      document.querySelector("#program-detail")?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 80);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setFormStatus("loading");

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setFormStatus("success");
        form.reset();
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  }

  return (
    <main className="page">
      <div className="ambient-grid" />
      <div className="scan-line" />

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
        <div className="hero-pulse" />

        <p className="eyebrow reveal">Technology Academy</p>

        <h1 className="reveal">
          Mastering the <span>Unseen</span>
        </h1>

        <p className="hero-text reveal">
          Elektronikten gömülü sistemlere, İHA teknolojilerinden roket ve
          havacılık sistemlerine uzanan seçici bir mühendislik akademisi.
        </p>

        <div className="hero-actions reveal">
          <a className="primary-btn" href="#access">
            Erken Erişim
          </a>

          <a className="secondary-btn" href="#fields">
            Programları İncele
          </a>
        </div>

        <div className="stats-strip reveal">
          {stats.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>

        <div className="status-bar reveal">
          <span />
          <p>Kapalı geliştirme süreci aktif</p>
        </div>
      </section>

      <section id="manifesto" className="section manifesto reveal">
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

      <section id="fields" className="section reveal">
        <p className="eyebrow">Odak Alanları</p>

        <div className="section-header">
          <h2>Teknolojiyi parça parça değil, sistem olarak ele alıyoruz.</h2>

          <p>
            Her alan kendi içinde güçlüdür; fakat gerçek mühendislik bu
            alanların birlikte çalıştığı yerde başlar. Kartlara basarak program
            detaylarını inceleyebilirsin.
          </p>
        </div>

        <div className="field-grid">
          {fields.map((field) => (
            <button
              className={`field-card ${
                selectedField.slug === field.slug ? "active" : ""
              }`}
              key={field.slug}
              onClick={() => handleFieldClick(field)}
              type="button"
            >
              <span className="card-label">{field.label}</span>
              <span className="card-plus">+</span>
              <h3>{field.title}</h3>
              <p>{field.text}</p>
              <em>İncele →</em>
            </button>
          ))}
        </div>
      </section>

      <section id="program-detail" className="program-detail reveal">
        <div className="detail-left">
          <p className="eyebrow">Program Detayı</p>
          <h2>{selectedField.title}</h2>
          <p>{selectedField.text}</p>
        </div>

        <div className="detail-right">
          <div className="module-box">
            <h3>Modüller</h3>

            <div className="module-list">
              {selectedField.modules.map((module) => (
                <span key={module}>{module}</span>
              ))}
            </div>
          </div>

          <div className="outcome-box">
            <h3>Çıktı</h3>
            <p>{selectedField.outcome}</p>
          </div>
        </div>
      </section>

      <section id="method" className="section reveal">
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

      <section className="lab-section reveal">
        <p className="eyebrow">INVISIO Lab</p>
        <h2>Üretim disiplini, simülasyon ve sistem düşüncesi.</h2>

        <div className="lab-tags">
          <span>Aviyonik</span>
          <span>Embedded</span>
          <span>PCB</span>
          <span>Control</span>
          <span>Simulation</span>
          <span>Telemetry</span>
          <span>UI Systems</span>
          <span>Prototyping</span>
        </div>
      </section>

      <section id="access" className="access-section reveal">
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
            {fields.map((field) => (
              <option key={field.slug}>{field.title}</option>
            ))}
          </select>

          <button type="submit" disabled={formStatus === "loading"}>
            {formStatus === "loading" ? "Gönderiliyor..." : "Listeye Katıl"}
          </button>

          {formStatus === "success" && (
            <p className="form-message success">
              Başvurun alındı. INVISIO yakında seninle iletişime geçecek.
            </p>
          )}

          {formStatus === "error" && (
            <p className="form-message error">
              Bir hata oluştu. Lütfen tekrar dene.
            </p>
          )}
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