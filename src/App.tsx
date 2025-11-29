import { useState, useEffect, useRef } from 'react';
import { Instagram, Linkedin } from 'lucide-react';
import { MountainTrekAnimation } from './components/MountainTrekAnimation';

function App() {
  const [activeTab, setActiveTab] = useState('intro');
  const [displayTab, setDisplayTab] = useState('intro');
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [visibleElements, setVisibleElements] = useState<Set<number>>(new Set());
  const [awardFilter, setAwardFilter] = useState('ALL');
  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleTabChange = (tab: string) => {
    if (tab === activeTab) return;

    setIsFadingOut(true);
    window.scrollTo({ top: 0, behavior: 'instant' });

    setTimeout(() => {
      setDisplayTab(tab);
      setActiveTab(tab);
      setIsFadingOut(false);
    }, 200);
  };

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleElements((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    setVisibleElements(new Set());

    const timer = setTimeout(() => {
      const elements = document.querySelectorAll('[data-index]');
      elements.forEach((el) => {
        if (observerRef.current) {
          observerRef.current.observe(el);
        }
      });
    }, 250);

    return () => {
      clearTimeout(timer);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [displayTab]);


  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
        <nav className="max-w-7xl mx-auto px-8 py-5">
          <div className="flex items-center justify-between">
            <button
              onClick={() => handleTabChange('intro')}
              className="text-2xl font-bold"
              style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#000' }}
            >
              SD.
            </button>
            <div className="flex gap-12">
              <button
                onClick={() => handleTabChange('academics')}
                className={`text-sm font-medium tracking-wider transition-colors duration-200 ${
                  activeTab === 'academics' ? 'text-black' : 'text-gray-500 hover:text-black'
                }`}
                style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif' }}
              >
                ACADEMICS
              </button>
              <button
                onClick={() => handleTabChange('projects')}
                className={`text-sm font-medium tracking-wider transition-colors duration-200 ${
                  activeTab === 'projects' ? 'text-black' : 'text-gray-500 hover:text-black'
                }`}
                style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif' }}
              >
                ACTIVITIES
              </button>
              <button
                onClick={() => handleTabChange('honours')}
                className={`text-sm font-medium tracking-wider transition-colors duration-200 ${
                  activeTab === 'honours' ? 'text-black' : 'text-gray-500 hover:text-black'
                }`}
                style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif' }}
              >
                AWARDS
              </button>
              <button
                onClick={() => handleTabChange('everest')}
                className={`text-sm font-medium tracking-wider transition-colors duration-200 ${
                  activeTab === 'everest' ? 'text-red-500' : 'text-red-400 hover:text-red-500'
                }`}
                style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif' }}
              >
                THE EVEREST
              </button>
            </div>
          </div>
        </nav>
      </header>

      <main className="pt-16">
        <div className={`transition-opacity duration-200 ease-in-out ${
          isFadingOut ? 'opacity-0' : 'opacity-100'
        }`}>
        {displayTab === 'intro' && (
          <div className="bg-white">
            <div
              data-index="0"
              className={`min-h-screen flex items-center justify-center transition-all duration-700 ${
                visibleElements.has(0) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
              <div className="text-center px-8">
                <p className="text-2xl md:text-3xl text-gray-500 mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                  hello, i'm
                </p>
                <h1 className="text-8xl md:text-9xl font-black" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#000' }}>
                  soumyaa
                </h1>
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-8 py-32">
              <div className="grid md:grid-cols-2 gap-16 items-start mb-20">
                <div
                  data-index="1"
                  className={`transition-all duration-700 ${
                    visibleElements.has(1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}>
                  <h2 className="text-4xl font-black mb-6" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#000' }}>
                    WHO AM I?
                  </h2>
                  <div className="flex gap-6 mb-8">
                    <a
                      href="https://www.instagram.com/soumyaad1808/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-black transition-colors duration-200"
                      aria-label="Instagram"
                    >
                      <Instagram size={28} strokeWidth={1.5} />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/soumyaa-dhandharria/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-black transition-colors duration-200"
                      aria-label="LinkedIn"
                    >
                      <Linkedin size={28} strokeWidth={1.5} />
                    </a>
                  </div>
                  <div className="space-y-4 text-left" style={{ fontFamily: 'Georgia, serif', color: '#666' }}>
                    <p className="text-base leading-relaxed">
                      Hi, I'm Soumya from Jaipur, India.
                    </p>
                    <p className="text-base leading-relaxed">
                      I'm in high school and spend most of my time learning about the stock market and testing out trading strategies — mostly short-term trades focused on momentum and patterns.
                    </p>
                    <p className="text-base leading-relaxed">
                      When I'm not tracking charts, I'm on a basketball or squash court; I've been playing both for years and have played on the national level.
                    </p>
                    <p className="text-base leading-relaxed">
                      I'm also a mountaineer, and I've done the Everest Base Camp trek. Currently, I'm cooking plans for another trek, next summer.
                    </p>
                  </div>
                </div>

                <div
                  data-index="2"
                  className={`transition-all duration-700 ${
                    visibleElements.has(2) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}>
                  <img
                    src="/soumyaamo.jpeg"
                    alt="Soumya at Everest"
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                </div>
              </div>

              <div
                data-index="3"
                className={`transition-all duration-700 ${
                  visibleElements.has(3) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}>
                <h2 className="text-5xl md:text-6xl font-black text-center mb-16" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#000' }}>
                  GALLERY
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 md:row-span-2 h-[350px] md:h-[620px]">
                    <img
                      src="/WhatsApp Image 2025-11-24 at 22.23.42.jpeg"
                      alt="Speaking at event"
                      className="w-full h-full object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                    />
                  </div>

                  <div className="h-[300px]">
                    <img
                      src="/WhatsApp Image 2025-11-24 at 22.24.20.jpeg"
                      alt="Team photo with medals"
                      className="w-full h-full object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                    />
                  </div>

                  <div className="h-[300px]">
                    <img
                      src="/WhatsApp Image 2025-11-24 at 22.24.20 (1).jpeg"
                      alt="Cambridge award ceremony"
                      className="w-full h-full object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                    />
                  </div>

                  <div className="h-[300px]">
                    <img
                      src="/WhatsApp Image 2025-11-24 at 22.24.21 (1).jpeg"
                      alt="Mountain trekking - Namche"
                      className="w-full h-full object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                    />
                  </div>

                  <div className="h-[300px]">
                    <img
                      src="/WhatsApp Image 2025-11-24 at 22.24.21 (3).jpeg"
                      alt="Himalayan mountains"
                      className="w-full h-full object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                    />
                  </div>

                  <div className="h-[300px]">
                    <img
                      src="/WhatsApp Image 2025-11-24 at 22.24.21 (4).jpeg"
                      alt="Mountain peak view"
                      className="w-full h-full object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {displayTab === 'everest' && (
          <div className="bg-white">
            <section className="py-16 px-6">
              <div className="max-w-7xl mx-auto">
                <div
                  data-index="0"
                  className={`text-center mb-12 transition-all duration-700 ${
                    visibleElements.has(0) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}>
                  <h1 className="text-7xl md:text-8xl font-black mb-6 tracking-tight" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif' }}>
                    THE EVEREST
                  </h1>
                  <p className="text-lg italic text-gray-600 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>
                    "I undertook a solo trek to Everest Base Camp (17,589ft) and Kala Patthar Peak (18,514ft). I was guided by Mr. Poorna Malavath, the youngest girl to ever climb Mt. Everest. This wasn't just a physical challenge; it was a lesson in sheer will."
                  </p>
                </div>

                <div
                  data-index="1"
                  className={`grid grid-cols-1 md:grid-cols-4 gap-4 mb-16 transition-all duration-700 ${
                    visibleElements.has(1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}>
                  <div className="border-2 border-black rounded-lg p-8 text-center">
                    <h3 className="text-4xl font-black mb-2" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif' }}>18,514 ft</h3>
                    <p className="text-xs uppercase tracking-widest text-gray-600" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif' }}>PEAK ELEVATION</p>
                  </div>
                  <div className="border-2 border-black rounded-lg p-8 text-center">
                    <h3 className="text-4xl font-black mb-2" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif' }}>-15°C</h3>
                    <p className="text-xs uppercase tracking-widest text-gray-600" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif' }}>MIN TEMP</p>
                  </div>
                  <div className="border-2 border-black rounded-lg p-8 text-center">
                    <h3 className="text-4xl font-black mb-2" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif' }}>SOLO</h3>
                    <p className="text-xs uppercase tracking-widest text-gray-600" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif' }}>EXPEDITION TYPE</p>
                  </div>
                  <div className="border-2 border-black rounded-lg p-8 text-center">
                    <h3 className="text-4xl font-black mb-2" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif' }}>130km</h3>
                    <p className="text-xs uppercase tracking-widest text-gray-600" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif' }}>DISTANCE COVERED</p>
                  </div>
                </div>

                <div
                  data-index="2"
                  className={`mb-16 transition-all duration-700 ${
                    visibleElements.has(2) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-3xl font-black mb-1" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif' }}>THE EXPEDITION ROUTE</h2>
                      <p className="text-sm text-gray-600" style={{ fontFamily: 'Georgia, serif' }}>Phakding → Namche → Tengboche → Dingboche → Lobuche → Gorak Shep → EBC → Kala Patthar</p>
                    </div>
                    <div className="px-4 py-2 bg-black text-white text-xs uppercase tracking-widest" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif' }}>
                      ANIMATED JOURNEY
                    </div>
                  </div>

                  <MountainTrekAnimation />
                </div>

                <div
                  data-index="3"
                  className={`transition-all duration-700 ${
                    visibleElements.has(3) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="h-[350px]">
                      <img
                        src="/WhatsApp Image 2025-11-24 at 22.24.21 (7).jpeg"
                        alt="Everest expedition"
                        className="w-full h-full object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                      />
                    </div>
                    <div className="h-[350px]">
                      <img
                        src="/WhatsApp Image 2025-11-24 at 22.24.21.jpeg"
                        alt="Trekking journey"
                        className="w-full h-full object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                      />
                    </div>
                    <div className="h-[350px]">
                      <img
                        src="/WhatsApp Image 2025-11-24 at 22.24.21 (6).jpeg"
                        alt="Base camp"
                        className="w-full h-full object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                      />
                    </div>
                    <div className="h-[350px]">
                      <img
                        src="/WhatsApp Image 2025-11-24 at 22.24.21 (2) copy.jpeg"
                        alt="Mountain temple"
                        className="w-full h-full object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                      />
                    </div>
                  </div>
                </div>

              </div>
            </section>
          </div>
        )}

        {displayTab === 'projects' && (
          <div className="bg-white min-h-screen py-20">
            <div className="max-w-7xl mx-auto px-8">
              <h1
                data-index="0"
                className={`text-7xl md:text-8xl font-bold text-center mb-20 transition-all duration-700 ${
                  visibleElements.has(0) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#000' }}>
                ACTIVITIES
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div
                  data-index="1"
                  className={`rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] bg-gradient-to-br from-gray-900 to-gray-800 p-10 transition-all duration-700 ${
                    visibleElements.has(1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}>
                  <div className="inline-block px-4 py-1 bg-white rounded-full text-xs font-bold mb-6">
                    PATENT PENDING
                  </div>
                  <h2 className="text-4xl font-bold text-white mb-6" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif' }}>
                    KeraX
                  </h2>
                  <p className="text-lg text-gray-300 leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>
                    Created the world's first keratin-based carry bag. 100% biodegradable, eco-friendly, and 10x stronger than traditional plastic. Utilizing human hair waste to solve the single-use plastic crisis.
                  </p>
                </div>

                <div
                  data-index="2"
                  className={`rounded-3xl bg-gradient-to-br from-orange-50 to-yellow-50 p-10 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] transition-all duration-700 ${
                    visibleElements.has(2) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}>
                  <div className="text-4xl mb-4">🎨</div>
                  <h3 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#000' }}>
                    ZeroCarb
                  </h3>
                  <p className="text-base text-gray-700 leading-relaxed mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                    Developing a CO2 absorbing wall paint that absorbs 500x more CO2 than traditional paints, engineered to repel water/dust with a longer lifespan and application.
                  </p>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-white rounded-full text-xs font-semibold text-gray-700">Chemistry</span>
                    <span className="px-3 py-1 bg-white rounded-full text-xs font-semibold text-gray-700">Climate Tech</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div
                  data-index="3"
                  className={`rounded-3xl bg-gradient-to-br from-yellow-50 to-orange-50 p-10 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] transition-all duration-700 ${
                    visibleElements.has(3) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}>
                  <div className="text-4xl mb-4">🤝</div>
                  <h3 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#000' }}>
                    Do Mutthi Ka Dum
                  </h3>
                  <p className="text-base text-gray-700 leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>
                    Rose from volunteer to President of this 7-year-old social organization. We have raised over $40k and led to constructing 110+ toilets in rural areas to improve sanitation and hygiene.
                  </p>
                </div>

                <div
                  data-index="4"
                  className={`rounded-3xl bg-gradient-to-br from-blue-50 to-cyan-50 p-10 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] transition-all duration-700 ${
                    visibleElements.has(4) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}>
                  <div className="text-4xl mb-4">🚀</div>
                  <h3 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#000' }}>
                    TKS Fellow
                  </h3>
                  <p className="text-base text-gray-700 leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>
                    Accepted into one of the world's most prestigious accelerators for teenagers. Part of the Velocity cohort, with the top 30-40 students at TKS.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div
                  data-index="5"
                  className={`rounded-3xl bg-gradient-to-br from-emerald-50 to-teal-50 p-10 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] transition-all duration-700 ${
                    visibleElements.has(5) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}>
                  <div className="text-4xl mb-4">📄</div>
                  <h3 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#000' }}>
                    HDI Research Paper
                  </h3>
                  <p className="text-base text-gray-700 leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>
                    Authored a paper on the 'Limitations of Human Development Index' under Shree Ram College of Commerce professor. Submitted for international publication.
                  </p>
                </div>

                <div
                  data-index="6"
                  className={`rounded-3xl bg-gradient-to-br from-gray-50 to-slate-100 p-10 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] transition-all duration-700 ${
                    visibleElements.has(6) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}>
                  <div className="text-4xl mb-4">🎓</div>
                  <h3 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#000' }}>
                    School Captain & IB League
                  </h3>
                  <p className="text-base text-gray-700 leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>
                    Managed 5+ school events for 2400+ students. Handled $12k+ in sponsorships. In organizing team of TEDxYouth@JPIS and Finance head of IB League.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div
                  data-index="7"
                  className={`rounded-3xl bg-gradient-to-br from-rose-50 to-pink-50 p-10 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] transition-all duration-700 ${
                    visibleElements.has(7) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}>
                  <div className="text-4xl mb-4">💼</div>
                  <h3 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#000' }}>
                    Finance Head of IB League
                  </h3>
                  <p className="text-base text-gray-700 leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>
                    Managed the sponsorships, budget, and costing of a national event, where the top 21 IB schools of India participated.
                  </p>
                </div>

                <div
                  data-index="8"
                  className={`rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50 p-10 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] transition-all duration-700 ${
                    visibleElements.has(8) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}>
                  <div className="text-4xl mb-4">📚</div>
                  <h3 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#000' }}>
                    Math Teaching Initiative
                  </h3>
                  <p className="text-base text-gray-700 leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>
                    Taught math to 50+ underprivileged kids over 2 summers. Created custom teaching plans and curriculum, and learned braille to make math accessible for visually impaired students.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div
                  data-index="9"
                  className={`rounded-3xl bg-gradient-to-br from-violet-50 to-purple-50 p-10 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] transition-all duration-700 ${
                    visibleElements.has(9) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}>
                  <div className="text-4xl mb-4">💻</div>
                  <h3 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#000' }}>
                    TallyPrime Internship
                  </h3>
                  <p className="text-base text-gray-700 leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>
                    Completed a comprehensive internship at TallyPrime, gaining hands-on experience in enterprise accounting software, financial data management, and business process automation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {displayTab === 'academics' && (
          <div className="bg-white min-h-screen">
            <div className="max-w-6xl mx-auto px-8 py-20">
              <div
                data-index="0"
                className={`text-center mb-16 transition-all duration-700 ${
                  visibleElements.has(0) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}>
                <h1 className="text-7xl md:text-8xl font-bold mb-6" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#000' }}>
                  ACADEMICS
                </h1>
                <div className="w-16 h-1 mx-auto mb-6" style={{ backgroundColor: 'rgb(13, 39, 180)' }}></div>
                <p className="text-xl" style={{ fontFamily: 'Georgia, serif', color: '#666' }}>
                  Proof I read things other than memes
                </p>
              </div>

              <div
                data-index="1"
                className={`max-w-4xl mx-auto mb-20 transition-all duration-500 ${
                  visibleElements.has(1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}>
                <p className="text-lg leading-relaxed mb-6 text-center" style={{ fontFamily: 'Georgia, serif', color: '#666' }}>
                  I intend to pursue Finance, then I want to end up doing Law. I also want to be a Professor for a while and also a Professional Triathlete. I know, it's all over the place.
                </p>
                <p className="text-lg leading-relaxed mb-6 text-center" style={{ fontFamily: 'Georgia, serif', color: '#666' }}>
                  I dive into Finance and Markets with curiosity — from books to simulations — constantly testing how numbers shape real lives. I try to turn that understanding into ideas that help people make smarter financial choices. I'm fascinated by how Economics and Technology intersect; moments when a concept clicks in class feel like tiny market rallies in my mind. And yes, spreadsheets feel like playgrounds.
                </p>
                <p className="text-lg leading-relaxed text-center" style={{ fontFamily: 'Georgia, serif', color: '#666' }}>
                  My dream is to steer capital toward solutions that build stability, expand opportunity, and make our world more sustainable — where profit and purpose compound together.
                </p>
              </div>

              <div
                data-index="2"
                className={`mb-16 transition-all duration-500 ${
                  visibleElements.has(2) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}>
                <div className="mb-12">
                  <h2 className="text-4xl font-bold mb-8" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#000' }}>
                    IBDP
                  </h2>
                  <div className="w-16 h-1 mb-8" style={{ backgroundColor: 'rgb(13, 39, 180)' }}></div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="border-2 border-gray-200 rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-bold" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#000' }}>Physics</h3>
                      <span className="px-4 py-1 bg-gray-100 rounded-full text-sm font-semibold" style={{ color: '#666' }}>HL</span>
                    </div>
                  </div>
                  <div className="border-2 border-gray-200 rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-bold" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#000' }}>Chemistry</h3>
                      <span className="px-4 py-1 bg-gray-100 rounded-full text-sm font-semibold" style={{ color: '#666' }}>HL</span>
                    </div>
                  </div>
                  <div className="border-2 border-gray-200 rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-bold" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#000' }}>Math AA</h3>
                      <span className="px-4 py-1 bg-gray-100 rounded-full text-sm font-semibold" style={{ color: '#666' }}>HL</span>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="border-2 border-gray-200 rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-bold" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#000' }}>Economics</h3>
                      <span className="px-4 py-1 bg-gray-100 rounded-full text-sm font-semibold" style={{ color: '#666' }}>HL</span>
                    </div>
                  </div>
                  <div className="border-2 border-gray-200 rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-bold" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#000' }}>English</h3>
                      <span className="px-4 py-1 bg-gray-100 rounded-full text-sm font-semibold" style={{ color: '#666' }}>SL</span>
                    </div>
                  </div>
                  <div className="border-2 border-gray-200 rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-bold" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#000' }}>Hindi B</h3>
                      <span className="px-4 py-1 bg-gray-100 rounded-full text-sm font-semibold" style={{ color: '#666' }}>SL</span>
                    </div>
                  </div>
                </div>
              </div>

              <div
                data-index="3"
                className={`mb-16 transition-all duration-500 ${
                  visibleElements.has(3) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-4xl font-bold" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#000' }}>
                      IGCSE
                    </h2>
                    <div className="w-16 h-1 mt-4" style={{ backgroundColor: 'rgb(13, 39, 180)' }}></div>
                  </div>
                  <div className="text-right">
                    <p className="text-5xl font-bold" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#000' }}>96.8%</p>
                  </div>
                </div>

                <div className="border-2 rounded-xl p-8 mb-8 shadow-sm" style={{ borderColor: 'rgb(13, 39, 180)' }}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl" style={{ backgroundColor: 'rgb(13, 39, 180)' }}>
                      🌍
                    </div>
                    <div className="flex-1">
                      <div className="inline-block px-3 py-1 bg-black text-white text-xs font-bold rounded mb-2">
                        OUTSTANDING LEARNERS AWARD
                      </div>
                      <h3 className="text-2xl font-bold" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#000' }}>
                        World Topper in Extended Math
                      </h3>
                      <p className="text-sm" style={{ fontFamily: 'Georgia, serif', color: '#666' }}>
                        Achieved the Highest mark globally.
                      </p>
                    </div>
                    <div className="text-6xl font-bold" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#000' }}>
                      A*
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-gray-50 rounded-lg p-6 text-center">
                    <p className="text-4xl font-bold mb-2" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#000' }}>99%</p>
                    <p className="text-xs uppercase tracking-wide" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#666' }}>ADDL MATH</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6 text-center">
                    <p className="text-4xl font-bold mb-2" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#000' }}>A*</p>
                    <p className="text-xs uppercase tracking-wide" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#666' }}>PHYSICS</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6 text-center">
                    <p className="text-4xl font-bold mb-2" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#000' }}>A*</p>
                    <p className="text-xs uppercase tracking-wide" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#666' }}>CHEMISTRY</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6 text-center">
                    <p className="text-4xl font-bold mb-2" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#000' }}>A*</p>
                    <p className="text-xs uppercase tracking-wide" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#666' }}>ECONOMICS</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-50 rounded-lg p-6 text-center">
                    <p className="text-4xl font-bold mb-2" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#000' }}>A*</p>
                    <p className="text-xs uppercase tracking-wide" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#666' }}>GLOBAL PERSPECTIVES</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6 text-center">
                    <p className="text-4xl font-bold mb-2" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#000' }}>A*</p>
                    <p className="text-xs uppercase tracking-wide" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#666' }}>ENGLISH LANG</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6 text-center">
                    <p className="text-4xl font-bold mb-2" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#000' }}>A*</p>
                    <p className="text-xs uppercase tracking-wide" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#666' }}>INTL MATH</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6 text-center">
                    <p className="text-4xl font-bold mb-2" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#000' }}>A</p>
                    <p className="text-xs uppercase tracking-wide" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#666' }}>FRENCH</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6 text-center">
                    <p className="text-4xl font-bold mb-2" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#000' }}>A</p>
                    <p className="text-xs uppercase tracking-wide" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#666' }}>ENGLISH LIT</p>
                  </div>
                </div>
              </div>

              <div
                data-index="4"
                className={`transition-all duration-500 ${
                  visibleElements.has(4) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}>
                <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#000' }}>
                  SAT
                </h2>
                <div className="w-16 h-1 mb-8" style={{ backgroundColor: 'rgb(13, 39, 180)' }}></div>

                <div className="bg-black rounded-2xl p-12 text-white">
                  <div className="grid md:grid-cols-3 gap-8 text-center">
                    <div>
                      <p className="text-6xl font-bold mb-2" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif' }}>1540</p>
                      <p className="text-sm uppercase tracking-widest" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#999' }}>TOTAL SCORE</p>
                    </div>
                    <div className="border-l border-r border-gray-700">
                      <p className="text-6xl font-bold mb-2" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif' }}>800</p>
                      <p className="text-sm uppercase tracking-widest" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#999' }}>MATH</p>
                    </div>
                    <div>
                      <p className="text-6xl font-bold mb-2" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif' }}>740</p>
                      <p className="text-sm uppercase tracking-widest" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#999' }}>ENGLISH R&W</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {displayTab === 'honours' && (
          <div className="bg-white min-h-screen py-20">
            <div className="max-w-7xl mx-auto px-8">
              <h1
                data-index="0"
                className={`text-7xl md:text-8xl font-bold text-center mb-12 transition-all duration-700 ${
                  visibleElements.has(0) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#000' }}>
                HALL OF FAME
              </h1>

              <div className="flex justify-center gap-4 mb-16">
                <button
                  onClick={() => setAwardFilter('ALL')}
                  className={`px-8 py-3 rounded-full text-sm font-bold tracking-wide transition-all duration-200 ${
                    awardFilter === 'ALL' ? 'bg-black text-white' : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                  style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif' }}>
                  ALL
                </button>
                <button
                  onClick={() => setAwardFilter('ACADEMIC')}
                  className={`px-8 py-3 rounded-full text-sm font-bold tracking-wide transition-all duration-200 ${
                    awardFilter === 'ACADEMIC' ? 'bg-yellow-400 text-black' : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                  style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif' }}>
                  ACADEMIC
                </button>
                <button
                  onClick={() => setAwardFilter('INNOVATION')}
                  className={`px-8 py-3 rounded-full text-sm font-bold tracking-wide transition-all duration-200 ${
                    awardFilter === 'INNOVATION' ? 'bg-blue-400 text-white' : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                  style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif' }}>
                  INNOVATION
                </button>
                <button
                  onClick={() => setAwardFilter('SPORT')}
                  className={`px-8 py-3 rounded-full text-sm font-bold tracking-wide transition-all duration-200 ${
                    awardFilter === 'SPORT' ? 'bg-red-400 text-white' : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                  style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif' }}>
                  SPORT
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {(awardFilter === 'ALL' || awardFilter === 'ACADEMIC') && (
                  <div
                    data-index="1"
                    className={`relative rounded-3xl bg-gradient-to-b from-amber-50/30 via-white to-white p-10 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] overflow-hidden ${
                      visibleElements.has(1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                    <div className="flex items-start justify-between mb-16">
                      <span className="text-xs font-bold tracking-widest" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#D4A574' }}>
                        ACADEMIC
                      </span>
                    </div>
                    <h3 className="text-3xl font-bold mb-4 leading-tight" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#000' }}>
                      S.T. Yau Science Award Finalist
                    </h3>
                    <p className="text-sm text-gray-500 mb-20" style={{ fontFamily: 'Georgia, serif' }}>
                      Finalist in Mathematics Category.
                    </p>
                    <p className="text-xs text-gray-300 uppercase tracking-widest" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif' }}>
                      UNITED STATES OF AMERICA
                    </p>
                  </div>
                )}

                {(awardFilter === 'ALL' || awardFilter === 'ACADEMIC') && (
                  <div
                    data-index="2"
                    className={`relative rounded-3xl bg-gradient-to-b from-amber-50/30 via-white to-white p-10 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] overflow-hidden ${
                      visibleElements.has(2) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                    <div className="flex items-start justify-between mb-16">
                      <span className="text-xs font-bold tracking-widest" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#D4A574' }}>
                        ACADEMIC
                      </span>
                    </div>
                    <h3 className="text-3xl font-bold mb-4 leading-tight" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#000' }}>
                      CERN Beamline for Schools
                    </h3>
                    <p className="text-sm text-gray-500 mb-20" style={{ fontFamily: 'Georgia, serif' }}>
                      Top 50 teams globally.
                    </p>
                    <p className="text-xs text-gray-300 uppercase tracking-widest" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif' }}>
                      SWITZERLAND
                    </p>
                  </div>
                )}

                {(awardFilter === 'ALL' || awardFilter === 'INNOVATION') && (
                  <div
                    data-index="3"
                    className={`relative rounded-3xl bg-gradient-to-b from-blue-50/30 via-white to-white p-10 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] overflow-hidden ${
                      visibleElements.has(3) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                    <div className="flex items-start justify-between mb-16">
                      <span className="text-xs font-bold tracking-widest" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#7B9FD8' }}>
                        INNOVATION
                      </span>
                    </div>
                    <h3 className="text-3xl font-bold mb-4 leading-tight" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#000' }}>
                      Climate & Sustainability Winner
                    </h3>
                    <p className="text-sm text-gray-500 mb-20" style={{ fontFamily: 'Georgia, serif' }}>
                      Global Social Leaders Festival 2025 (Senior Track).
                    </p>
                    <p className="text-xs text-gray-300 uppercase tracking-widest" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif' }}>
                      UNITED KINGDOM
                    </p>
                  </div>
                )}

                {(awardFilter === 'ALL' || awardFilter === 'ACADEMIC') && (
                  <div
                    data-index="4"
                    className={`relative rounded-3xl bg-gradient-to-b from-amber-50/30 via-white to-white p-10 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] overflow-hidden ${
                      visibleElements.has(4) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                    <div className="flex items-start justify-between mb-16">
                      <span className="text-xs font-bold tracking-widest" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#D4A574' }}>
                        ACADEMIC
                      </span>
                    </div>
                    <h3 className="text-3xl font-bold mb-4 leading-tight" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#000' }}>
                      John Locke Essay Prize Finalist
                    </h3>
                    <p className="text-sm text-gray-500 mb-20" style={{ fontFamily: 'Georgia, serif' }}>
                      Theology category finalist.
                    </p>
                    <p className="text-xs text-gray-300 uppercase tracking-widest" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif' }}>
                      UNITED KINGDOM
                    </p>
                  </div>
                )}

                {(awardFilter === 'ALL' || awardFilter === 'ACADEMIC') && (
                  <div
                    data-index="5"
                    className={`relative rounded-3xl bg-gradient-to-b from-amber-50/30 via-white to-white p-10 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] overflow-hidden ${
                      visibleElements.has(5) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                    <div className="flex items-start justify-between mb-16">
                      <span className="text-xs font-bold tracking-widest" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#D4A574' }}>
                        ACADEMIC
                      </span>
                    </div>
                    <h3 className="text-3xl font-bold mb-4 leading-tight" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#000' }}>
                      World Topper - Extended Math
                    </h3>
                    <p className="text-sm text-gray-500 mb-20" style={{ fontFamily: 'Georgia, serif' }}>
                      IGCSE Outstanding Learner Award.
                    </p>
                    <p className="text-xs text-gray-300 uppercase tracking-widest" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif' }}>
                      GLOBAL
                    </p>
                  </div>
                )}

                {(awardFilter === 'ALL' || awardFilter === 'SPORT') && (
                  <div
                    data-index="6"
                    className={`relative rounded-3xl bg-gradient-to-b from-red-50/30 via-white to-white p-10 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] overflow-hidden ${
                      visibleElements.has(6) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                    <div className="flex items-start justify-between mb-16">
                      <span className="text-xs font-bold tracking-widest" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#E89BA0' }}>
                        SPORT
                      </span>
                    </div>
                    <h3 className="text-3xl font-bold mb-4 leading-tight" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#000' }}>
                      ISSO Nationals Basketball
                    </h3>
                    <p className="text-sm text-gray-500 mb-20" style={{ fontFamily: 'Georgia, serif' }}>
                      U14 & U17 Champions.
                    </p>
                    <p className="text-xs text-gray-300 uppercase tracking-widest" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif' }}>
                      INDIA
                    </p>
                  </div>
                )}

                {(awardFilter === 'ALL' || awardFilter === 'SPORT') && (
                  <div
                    data-index="7"
                    className={`relative rounded-3xl bg-gradient-to-b from-red-50/30 via-white to-white p-10 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] overflow-hidden ${
                      visibleElements.has(7) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                    <div className="flex items-start justify-between mb-16">
                      <span className="text-xs font-bold tracking-widest" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#E89BA0' }}>
                        SPORT
                      </span>
                    </div>
                    <h3 className="text-3xl font-bold mb-4 leading-tight" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#000' }}>
                      ISSO Nationals Squash
                    </h3>
                    <p className="text-sm text-gray-500 mb-20" style={{ fontFamily: 'Georgia, serif' }}>
                      U17 Runner up.
                    </p>
                    <p className="text-xs text-gray-300 uppercase tracking-widest" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif' }}>
                      INDIA
                    </p>
                  </div>
                )}

                {(awardFilter === 'ALL' || awardFilter === 'ACADEMIC') && (
                  <div
                    data-index="8"
                    className={`relative rounded-3xl bg-gradient-to-b from-amber-50/30 via-white to-white p-10 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] overflow-hidden ${
                      visibleElements.has(8) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                    <div className="flex items-start justify-between mb-16">
                      <span className="text-xs font-bold tracking-widest" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#D4A574' }}>
                        ACADEMIC
                      </span>
                    </div>
                    <h3 className="text-3xl font-bold mb-4 leading-tight" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#000' }}>
                      UCMAS Mental Arithmetic
                    </h3>
                    <p className="text-sm text-gray-500 mb-20" style={{ fontFamily: 'Georgia, serif' }}>
                      3rd Runner Up globally at age 7.
                    </p>
                    <p className="text-xs text-gray-300 uppercase tracking-widest" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif' }}>
                      GLOBAL
                    </p>
                  </div>
                )}

                {(awardFilter === 'ALL' || awardFilter === 'ACADEMIC') && (
                  <div
                    data-index="9"
                    className={`relative rounded-3xl bg-gradient-to-b from-amber-50/30 via-white to-white p-10 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] overflow-hidden ${
                      visibleElements.has(9) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                    <div className="flex items-start justify-between mb-16">
                      <span className="text-xs font-bold tracking-widest" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#D4A574' }}>
                        ACADEMIC
                      </span>
                    </div>
                    <h3 className="text-3xl font-bold mb-4 leading-tight" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#000' }}>
                      FISO Math Int'l Olympiad
                    </h3>
                    <p className="text-sm text-gray-500 mb-20" style={{ fontFamily: 'Georgia, serif' }}>
                      Silver Medalist.
                    </p>
                    <p className="text-xs text-gray-300 uppercase tracking-widest" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif' }}>
                      UNITED STATES OF AMERICA
                    </p>
                  </div>
                )}

                {(awardFilter === 'ALL' || awardFilter === 'ACADEMIC') && (
                  <div
                    data-index="10"
                    className={`relative rounded-3xl bg-gradient-to-b from-amber-50/30 via-white to-white p-10 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] overflow-hidden ${
                      visibleElements.has(10) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                    <div className="flex items-start justify-between mb-16">
                      <span className="text-xs font-bold tracking-widest" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#D4A574' }}>
                        ACADEMIC
                      </span>
                    </div>
                    <h3 className="text-3xl font-bold mb-4 leading-tight" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#000' }}>
                      FISO Math National Olympiad
                    </h3>
                    <p className="text-sm text-gray-500 mb-20" style={{ fontFamily: 'Georgia, serif' }}>
                      Gold Medalist.
                    </p>
                    <p className="text-xs text-gray-300 uppercase tracking-widest" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif' }}>
                      INDIA
                    </p>
                  </div>
                )}

                {(awardFilter === 'ALL' || awardFilter === 'ACADEMIC') && (
                  <div
                    data-index="11"
                    className={`relative rounded-3xl bg-gradient-to-b from-amber-50/30 via-white to-white p-10 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] overflow-hidden ${
                      visibleElements.has(11) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                    <div className="flex items-start justify-between mb-16">
                      <span className="text-xs font-bold tracking-widest" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#D4A574' }}>
                        ACADEMIC
                      </span>
                    </div>
                    <h3 className="text-3xl font-bold mb-4 leading-tight" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#000' }}>
                      World Math Invitational
                    </h3>
                    <p className="text-sm text-gray-500 mb-20" style={{ fontFamily: 'Georgia, serif' }}>
                      Bronze Medalist.
                    </p>
                    <p className="text-xs text-gray-300 uppercase tracking-widest" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif' }}>
                      GLOBAL
                    </p>
                  </div>
                )}

                {(awardFilter === 'ALL' || awardFilter === 'ACADEMIC') && (
                  <div
                    data-index="12"
                    className={`relative rounded-3xl bg-gradient-to-b from-amber-50/30 via-white to-white p-10 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] overflow-hidden ${
                      visibleElements.has(12) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                    <div className="flex items-start justify-between mb-16">
                      <span className="text-xs font-bold tracking-widest" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#D4A574' }}>
                        ACADEMIC
                      </span>
                    </div>
                    <h3 className="text-3xl font-bold mb-4 leading-tight" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#000' }}>
                      Singapore & Asian Math Olympiad
                    </h3>
                    <p className="text-sm text-gray-500 mb-20" style={{ fontFamily: 'Georgia, serif' }}>
                      Bronze Medalist.
                    </p>
                    <p className="text-xs text-gray-300 uppercase tracking-widest" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif' }}>
                      SINGAPORE
                    </p>
                  </div>
                )}

                {(awardFilter === 'ALL' || awardFilter === 'INNOVATION') && (
                  <div
                    data-index="13"
                    className={`relative rounded-3xl bg-gradient-to-b from-blue-50/30 via-white to-white p-10 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] overflow-hidden ${
                      visibleElements.has(13) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                    <div className="flex items-start justify-between mb-16">
                      <span className="text-xs font-bold tracking-widest" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#7B9FD8' }}>
                        INNOVATION
                      </span>
                    </div>
                    <h3 className="text-3xl font-bold mb-4 leading-tight" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#000' }}>
                      Sparkle, IIT Guwahati
                    </h3>
                    <p className="text-sm text-gray-500 mb-20" style={{ fontFamily: 'Georgia, serif' }}>
                      Top 6 out of 10,000+ participants.
                    </p>
                    <p className="text-xs text-gray-300 uppercase tracking-widest" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif' }}>
                      INDIA
                    </p>
                  </div>
                )}

                {(awardFilter === 'ALL' || awardFilter === 'ACADEMIC') && (
                  <div
                    data-index="14"
                    className={`relative rounded-3xl bg-gradient-to-b from-amber-50/30 via-white to-white p-10 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] overflow-hidden ${
                      visibleElements.has(14) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                    <div className="flex items-start justify-between mb-16">
                      <span className="text-xs font-bold tracking-widest" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#D4A574' }}>
                        ACADEMIC
                      </span>
                    </div>
                    <h3 className="text-3xl font-bold mb-4 leading-tight" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#000' }}>
                      Int'l Business Olympiad
                    </h3>
                    <p className="text-sm text-gray-500 mb-20" style={{ fontFamily: 'Georgia, serif' }}>
                      Highest Distinction (282/300).
                    </p>
                    <p className="text-xs text-gray-300 uppercase tracking-widest" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif' }}>
                      GLOBAL
                    </p>
                  </div>
                )}

                {(awardFilter === 'ALL' || awardFilter === 'SPORT') && (
                  <div
                    data-index="15"
                    className={`relative rounded-3xl bg-gradient-to-b from-red-50/30 via-white to-white p-10 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] overflow-hidden ${
                      visibleElements.has(15) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                    <div className="flex items-start justify-between mb-16">
                      <span className="text-xs font-bold tracking-widest" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#E89BA0' }}>
                        SPORT
                      </span>
                    </div>
                    <h3 className="text-3xl font-bold mb-4 leading-tight" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#000' }}>
                      Tuffman 10km Marathon
                    </h3>
                    <p className="text-sm text-gray-500 mb-20" style={{ fontFamily: 'Georgia, serif' }}>
                      Bronze medalist.
                    </p>
                    <p className="text-xs text-gray-300 uppercase tracking-widest" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif' }}>
                      INDIA
                    </p>
                  </div>
                )}

              </div>
            </div>
          </div>
        )}
        </div>

      </main>

      <footer className="text-white py-8 mt-20" style={{ backgroundColor: 'rgb(13, 39, 180)' }}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-white/80 text-sm" style={{ fontFamily: 'Georgia, serif' }}>© 2025 Soumyaa Dhandharia. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
