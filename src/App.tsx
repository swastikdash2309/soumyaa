import { useState, useEffect, useRef } from 'react';
import { Instagram, Linkedin } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [displayTab, setDisplayTab] = useState('home');
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [visibleElements, setVisibleElements] = useState<Set<number>>(new Set());
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
      <header className="fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: 'rgb(13, 39, 180)' }}>
        <nav className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-center">
            <div className="flex gap-12">
              <button
                onClick={() => handleTabChange('home')}
                className={`text-base font-normal tracking-wide transition-colors duration-200 hover:text-white ${
                  activeTab === 'home' ? 'text-white' : 'text-white/80'
                }`}
                style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif' }}
              >
                Home
              </button>
              <button
                onClick={() => handleTabChange('projects')}
                className={`text-base font-normal tracking-wide transition-colors duration-200 hover:text-white ${
                  activeTab === 'projects' ? 'text-white' : 'text-white/80'
                }`}
                style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif' }}
              >
                Projects & Work
              </button>
              <button
                onClick={() => handleTabChange('academics')}
                className={`text-base font-normal tracking-wide transition-colors duration-200 hover:text-white ${
                  activeTab === 'academics' ? 'text-white' : 'text-white/80'
                }`}
                style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif' }}
              >
                Academics
              </button>
              <button
                onClick={() => handleTabChange('honours')}
                className={`text-base font-normal tracking-wide transition-colors duration-200 hover:text-white ${
                  activeTab === 'honours' ? 'text-white' : 'text-white/80'
                }`}
                style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif' }}
              >
                Honours
              </button>
            </div>
          </div>
        </nav>
      </header>

      <main className="pt-16">
        <div className={`transition-opacity duration-200 ease-in-out ${
          isFadingOut ? 'opacity-0' : 'opacity-100'
        }`}>
        {displayTab === 'home' && (
          <div>
            <section className="min-h-[60vh] flex items-center justify-center px-6 py-20" style={{ backgroundColor: 'rgb(13, 39, 180)' }}>
              <div
                data-index="0"
                className={`text-center transition-all duration-700 ${
                  visibleElements.has(0) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}>
                <p className="text-xl md:text-2xl text-white/90 mb-4 tracking-wide" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif' }}>hello, I'm</p>
                <h1 className="text-6xl md:text-8xl font-normal text-white tracking-tight" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif' }}>Soumyaa</h1>
              </div>
            </section>

            <section className="bg-white py-20">
              <div className="max-w-6xl mx-auto px-6">
                <div
                  data-index="1"
                  className={`grid md:grid-cols-2 gap-16 items-center transition-all duration-700 ${
                    visibleElements.has(1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}>
                  <div>
                    <h2 className="text-4xl font-normal mb-8 uppercase tracking-wide" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: 'rgb(13, 39, 180)' }}>WHO AM I?</h2>
                    <div className="space-y-4 text-lg leading-relaxed" style={{ fontFamily: 'Georgia, serif', color: '#262626' }}>
                      <p>Hi, I'm Soumyaa from Jaipur, India.</p>
                      <p>I'm in high school and spend most of my time learning about the stock market and testing out trading strategies — mostly short-term trades focused on momentum and patterns.</p>
                      <p>When I'm not tracking charts, I'm on a basketball or squash court; I've been playing both for years and have played on the national level.</p>
                      <p>I'm also a mountaineer, and I've done the Everest Base Camp trek. Currently, I'm cooking plans for another trek, next summer.</p>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <img
                      src="/soumyaa.jpeg"
                      alt="Soumyaa"
                      className="w-full max-w-md h-auto object-cover shadow-2xl"
                    />
                  </div>
                </div>
              </div>
            </section>

            <section
              data-index="2"
              className={`py-20 transition-all duration-700 ${
                visibleElements.has(2) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ backgroundColor: '#f3f3f3' }}>
              <div className="max-w-4xl mx-auto px-6 text-center">
                <h3 className="text-4xl font-normal mb-12 uppercase tracking-wide" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: 'rgb(13, 39, 180)' }}>CONNECT WITH ME</h3>
                <div className="flex flex-wrap items-center justify-center gap-8 mb-8">
                  <a href="https://www.instagram.com/soumyaad1808?igsh=MTYxenl4MDB6bHpzbg%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="transition-colors" style={{ color: 'rgb(13, 39, 180)' }}>
                    <Instagram className="w-8 h-8" />
                  </a>
                  <a href="https://www.linkedin.com/in/soumyaa-dhandharria/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" rel="noopener noreferrer" className="transition-colors" style={{ color: 'rgb(13, 39, 180)' }}>
                    <Linkedin className="w-8 h-8" />
                  </a>
                </div>
                <div className="space-y-2" style={{ fontFamily: 'Georgia, serif', color: '#262626' }}>
                  <p className="text-lg">+91 8278689242</p>
                  <p className="text-lg">soumyadhandharia2912@gmail.com</p>
                </div>
              </div>
            </section>

            <section
              data-index="3"
              className={`py-20 transition-all duration-700 ${
                visibleElements.has(3) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ backgroundColor: 'rgb(13, 39, 180)' }}>
              <div className="max-w-4xl mx-auto px-6 text-center">
                <p className="text-6xl text-white mb-8">:)</p>
                <p className="text-2xl md:text-3xl text-white leading-relaxed mb-8" style={{ fontFamily: 'Georgia, serif' }}>
                  My defense mechanism is humor. When things get awkward, I just say something stupid and hope it lands.
                </p>
                <p className="text-xl text-white/90" style={{ fontFamily: 'Georgia, serif' }}>- Also me</p>
              </div>
            </section>
          </div>
        )}

        {displayTab === 'projects' && (
          <div>
            <div className="bg-cover bg-center py-32 mb-0" style={{ backgroundColor: 'rgb(13, 39, 180)' }}>
              <h2
                data-index="0"
                className={`text-5xl md:text-6xl font-normal text-white text-center transition-all duration-700 ${
                  visibleElements.has(0) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif' }}>The things I do for love</h2>
              <p className="text-xl md:text-2xl text-white/90 text-center mt-4 italic" style={{ fontFamily: 'Georgia, serif' }}>Where ideas meet execution...and sometimes chaos</p>
            </div>

            <div
              data-index="1"
              className={`py-20 transition-all duration-700 ${
                visibleElements.has(1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ backgroundColor: '#f3f3f3' }}>
              <div className="max-w-4xl mx-auto px-8 text-center">
                <h3 className="text-3xl md:text-4xl font-normal mb-6 italic" style={{ fontFamily: 'Georgia, serif', color: '#262626' }}>Everest Base Camp & Kala Patthar Peak</h3>
                <p className="text-base leading-relaxed" style={{ fontFamily: 'Georgia, serif', color: '#262626' }}>
                  Did a solo trek to the Everest Base Camp (17,589ft) & Kala Patthar Peak (18,514ft), alongside my guide, Ms. Poorna Malavath, who is also the youngest girl to ever climb Mount Everest and even has a biopic made on her.
                </p>
              </div>
            </div>

            <div
              data-index="2"
              className={`bg-white py-20 transition-all duration-700 ${
                visibleElements.has(2) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
              <div className="max-w-4xl mx-auto px-8 text-center">
                <h3 className="text-3xl md:text-4xl font-normal mb-6 italic" style={{ fontFamily: 'Georgia, serif', color: '#262626' }}>KeraX</h3>
                <p className="text-base leading-relaxed" style={{ fontFamily: 'Georgia, serif', color: '#262626' }}>
                  Created the world's first keratin-based carry bag that is 100% biodegradable, eco-friendly, and 10x stronger than traditional plastic carry bags.
                </p>
              </div>
            </div>

            <div
              data-index="3"
              className={`py-20 transition-all duration-700 ${
                visibleElements.has(3) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ backgroundColor: '#f3f3f3' }}>
              <div className="max-w-4xl mx-auto px-8 text-center">
                <h3 className="text-3xl md:text-4xl font-normal mb-6 italic" style={{ fontFamily: 'Georgia, serif', color: '#262626' }}>ZeroCarb</h3>
                <p className="text-base leading-relaxed" style={{ fontFamily: 'Georgia, serif', color: '#262626' }}>
                  Developing a CO2 absorbing wall paint that absorbs 500 times more CO2 than traditional wall paints while also repelling water/dust with a longer lifespan.
                </p>
              </div>
            </div>

            <div
              data-index="4"
              className={`bg-white py-20 transition-all duration-700 ${
                visibleElements.has(4) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
              <div className="max-w-4xl mx-auto px-8 text-center">
                <h3 className="text-3xl md:text-4xl font-normal mb-6 italic" style={{ fontFamily: 'Georgia, serif', color: '#262626' }}>Do Mutthi Ka Dum - President</h3>
                <p className="text-base leading-relaxed" style={{ fontFamily: 'Georgia, serif', color: '#262626' }}>
                  Rose from volunteer to president of this 7-year old social organisation working towards the betterment of the society. We have raised over $40k. I have been part of projects such as the toilet construction project in rural areas where we constructed over 110 toilets.
                </p>
              </div>
            </div>

            <div
              data-index="5"
              className={`py-20 transition-all duration-700 ${
                visibleElements.has(5) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ backgroundColor: '#f3f3f3' }}>
              <div className="max-w-4xl mx-auto px-8 text-center">
                <h3 className="text-3xl md:text-4xl font-normal mb-6 italic" style={{ fontFamily: 'Georgia, serif', color: '#262626' }}>Research Paper on Human Development Index</h3>
                <p className="text-base leading-relaxed" style={{ fontFamily: 'Georgia, serif', color: '#262626' }}>
                  Wrote a research paper on the Limitations of Human Development Index under the supervision of a Shree Ram College of Commerce professor. It has been submitted for publishing in an international journal.
                </p>
              </div>
            </div>

            <div
              data-index="6"
              className={`bg-white py-20 transition-all duration-700 ${
                visibleElements.has(6) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
              <div className="max-w-4xl mx-auto px-8 text-center">
                <h3 className="text-3xl md:text-4xl font-normal mb-6 italic" style={{ fontFamily: 'Georgia, serif', color: '#262626' }}>School Captain</h3>
                <p className="text-base leading-relaxed" style={{ fontFamily: 'Georgia, serif', color: '#262626' }}>
                  Managed 5+ school events for 2400+ students, like the IB League, where I was the Finance head. I was in the organising team of the TEDxYouth @ JPIS, and my work involved handling budgets, sponsorships of $12k+, and the hospitality of speakers.
                </p>
              </div>
            </div>

            <div
              data-index="7"
              className={`py-20 transition-all duration-700 ${
                visibleElements.has(7) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ backgroundColor: '#f3f3f3' }}>
              <div className="max-w-4xl mx-auto px-8 text-center">
                <h3 className="text-3xl md:text-4xl font-normal mb-6 italic" style={{ fontFamily: 'Georgia, serif', color: '#262626' }}>Finance Head of IB League</h3>
                <p className="text-base leading-relaxed" style={{ fontFamily: 'Georgia, serif', color: '#262626' }}>
                  Managed the sponsorships, budget, and costing of a national event, where the top 21 IB schools of India participated.
                </p>
              </div>
            </div>

            <div
              data-index="8"
              className={`bg-white py-20 transition-all duration-700 ${
                visibleElements.has(8) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
              <div className="max-w-4xl mx-auto px-8 text-center">
                <h3 className="text-3xl md:text-4xl font-normal mb-6 italic" style={{ fontFamily: 'Georgia, serif', color: '#262626' }}>Math Tutor for Underprivileged Children</h3>
                <p className="text-base leading-relaxed" style={{ fontFamily: 'Georgia, serif', color: '#262626' }}>
                  Taught math to 50+ underprivileged kids over 2 summers. I created my own teaching plans, curriculum to do so, and also learnt how to use braille to teach them.
                </p>
              </div>
            </div>

            <div
              data-index="9"
              className={`py-20 transition-all duration-700 ${
                visibleElements.has(9) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ backgroundColor: '#f3f3f3' }}>
              <div className="max-w-4xl mx-auto px-8 text-center">
                <h3 className="text-3xl md:text-4xl font-normal mb-6 italic" style={{ fontFamily: 'Georgia, serif', color: '#262626' }}>Internship at TallyPrime</h3>
                <p className="text-base leading-relaxed" style={{ fontFamily: 'Georgia, serif', color: '#262626' }}>
                  Did an internship at TallyPrime.
                </p>
              </div>
            </div>
          </div>
        )}

        {displayTab === 'academics' && (
          <div>
            <div className="bg-cover bg-center py-48 mb-0 relative" style={{ backgroundColor: 'rgb(13, 39, 180)' }}>
              <h2
                data-index="0"
                className={`text-6xl md:text-7xl font-normal text-white text-center transition-all duration-700 ${
                  visibleElements.has(0) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif' }}>Academic Plans and Interests</h2>
              <p className="text-xl md:text-2xl text-white/90 text-center mt-4 italic" style={{ fontFamily: 'Georgia, serif' }}>Proof I read things other than memes</p>
            </div>
            <div className="bg-white py-20">
              <div className="max-w-5xl mx-auto px-12">
                <div className="space-y-12">
                  <div
                    data-index="1"
                    className={`transition-all duration-500 ${
                      visibleElements.has(1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                    <p className="text-base leading-relaxed mb-4" style={{ fontFamily: 'Georgia, serif', color: '#262626' }}>
                      I intend to pursue Finance, then I want to end up doing Law. I also want to be a Professor for a while and also a Professional Triathlete. I know, it's all over the place.
                    </p>
                    <p className="text-base leading-relaxed mb-4" style={{ fontFamily: 'Georgia, serif', color: '#262626' }}>
                      I dive into Finance and Markets with curiosity — from books to simulations — constantly testing how numbers shape real lives. I try to turn that understanding into ideas that help people make smarter financial choices. I'm fascinated by how Economics and Technology intersect; moments when a concept clicks in class feel like tiny market rallies in my mind. And yes, spreadsheets feel like playgrounds.
                    </p>
                    <p className="text-base leading-relaxed" style={{ fontFamily: 'Georgia, serif', color: '#262626' }}>
                      My dream is to steer capital toward solutions that build stability, expand opportunity, and make our world more sustainable — where profit and purpose compound together.
                    </p>
                  </div>

                  <div
                    data-index="2"
                    className={`transition-all duration-500 ${
                      visibleElements.has(2) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                    <h3 className="text-2xl font-normal mb-4" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: 'rgb(13, 39, 180)' }}>IGCSE</h3>
                    <div className="grid grid-cols-2 gap-x-16 gap-y-2 text-sm" style={{ fontFamily: 'Georgia, serif', color: '#262626' }}>
                      <div className="flex gap-2">
                        <span>-</span>
                        <p>English Language - A*</p>
                      </div>
                      <div className="flex gap-2">
                        <span>-</span>
                        <p>Additional Math - A*</p>
                      </div>
                      <div className="flex gap-2">
                        <span>-</span>
                        <p>Extended Math - A*</p>
                      </div>
                      <div className="flex gap-2">
                        <span>-</span>
                        <p>International Math - A*</p>
                      </div>
                      <div className="flex gap-2">
                        <span>-</span>
                        <p>Chemistry - A*</p>
                      </div>
                      <div className="flex gap-2">
                        <span>-</span>
                        <p>Physics - A*</p>
                      </div>
                      <div className="flex gap-2">
                        <span>-</span>
                        <p>Economics - A*</p>
                      </div>
                      <div className="flex gap-2">
                        <span>-</span>
                        <p>Global Perspectives - A*</p>
                      </div>
                      <div className="flex gap-2">
                        <span>-</span>
                        <p>English Literature - A</p>
                      </div>
                      <div className="flex gap-2">
                        <span>-</span>
                        <p>French - A</p>
                      </div>
                    </div>
                  </div>

                  <div
                    data-index="3"
                    className={`transition-all duration-500 ${
                      visibleElements.has(3) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                    <h3 className="text-2xl font-normal mb-2" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: 'rgb(13, 39, 180)' }}>International Baccalaureate</h3>
                    <p className="text-sm italic mb-6" style={{ fontFamily: 'Georgia, serif', color: '#262626' }}>Irregular Diploma for an Irregular Child</p>
                    <div className="space-y-2 text-sm" style={{ fontFamily: 'Georgia, serif', color: '#262626' }}>
                      <div className="flex gap-3">
                        <span>-</span>
                        <p>Physics HL</p>
                      </div>
                      <div className="flex gap-3">
                        <span>-</span>
                        <p>Chemistry HL</p>
                      </div>
                      <div className="flex gap-3">
                        <span>-</span>
                        <p>Math AAHL</p>
                      </div>
                      <div className="flex gap-3">
                        <span>-</span>
                        <p>Economics - HL</p>
                      </div>
                      <div className="flex gap-3">
                        <span>-</span>
                        <p>Hindi - BSL</p>
                      </div>
                      <div className="flex gap-3">
                        <span>-</span>
                        <p>English - SL</p>
                      </div>
                    </div>
                  </div>

                  <div
                    data-index="4"
                    className={`transition-all duration-500 ${
                      visibleElements.has(4) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                    <h3 className="text-2xl font-normal mb-2" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: 'rgb(13, 39, 180)' }}>Testing</h3>
                    <p className="text-sm italic mb-6" style={{ fontFamily: 'Georgia, serif', color: '#262626' }}>Almost cracked under pressure</p>
                    <div className="space-y-4 text-sm" style={{ fontFamily: 'Georgia, serif', color: '#262626' }}>
                      <div>
                        <p className="font-semibold mb-2">SAT - 1540/1600</p>
                        <div className="ml-6 space-y-1">
                          <p>Evidence Based Reading & Writing - 740</p>
                          <p>Mathematics - 800</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {displayTab === 'honours' && (
          <div>
            <div className="py-48 mb-0" style={{ backgroundColor: 'rgb(13, 39, 180)' }}>
              <h2
                data-index="0"
                className={`text-6xl md:text-7xl font-normal text-white text-center transition-all duration-700 ${
                  visibleElements.has(0) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif' }}>Honors</h2>
              <p className="text-xl md:text-2xl text-white/90 text-center mt-4 italic" style={{ fontFamily: 'Georgia, serif' }}>My carefully curated collection of participation trophies (that actually required effort)</p>
            </div>
            <div className="bg-white py-20">
              <div className="max-w-5xl mx-auto px-12">
                <div className="space-y-6">
                  <div
                    data-index="1"
                    className={`flex gap-4 transition-all duration-500 ${
                      visibleElements.has(1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                    <span className="font-normal flex-shrink-0" style={{ fontFamily: 'Georgia, serif', color: '#262626' }}>1.</span>
                    <p className="leading-relaxed" style={{ fontFamily: 'Georgia, serif', color: '#262626' }}>
                      <span className="font-semibold">S.T. Yau Science Award</span> - Finalist in Mathematics Category
                    </p>
                  </div>

                  <div
                    data-index="2"
                    className={`flex gap-4 transition-all duration-500 ${
                      visibleElements.has(2) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                    <span className="font-normal flex-shrink-0" style={{ fontFamily: 'Georgia, serif', color: '#262626' }}>2.</span>
                    <p className="leading-relaxed" style={{ fontFamily: 'Georgia, serif', color: '#262626' }}>
                      <span className="font-semibold">Beamline for Schools by CERN</span> - Top 50 teams globally
                    </p>
                  </div>

                  <div
                    data-index="3"
                    className={`flex gap-4 transition-all duration-500 ${
                      visibleElements.has(3) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                    <span className="font-normal flex-shrink-0" style={{ fontFamily: 'Georgia, serif', color: '#262626' }}>3.</span>
                    <p className="leading-relaxed" style={{ fontFamily: 'Georgia, serif', color: '#262626' }}>
                      <span className="font-semibold">Global Social Leaders Festival 2025</span> - Won the Climate & Sustainability in the senior track
                    </p>
                  </div>

                  <div
                    data-index="4"
                    className={`flex gap-4 transition-all duration-500 ${
                      visibleElements.has(4) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                    <span className="font-normal flex-shrink-0" style={{ fontFamily: 'Georgia, serif', color: '#262626' }}>4.</span>
                    <p className="leading-relaxed" style={{ fontFamily: 'Georgia, serif', color: '#262626' }}>
                      <span className="font-semibold">John Locke Global Essay Prize</span> - Finalist in Theology
                    </p>
                  </div>

                  <div
                    data-index="5"
                    className={`flex gap-4 transition-all duration-500 ${
                      visibleElements.has(5) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                    <span className="font-normal flex-shrink-0" style={{ fontFamily: 'Georgia, serif', color: '#262626' }}>5.</span>
                    <p className="leading-relaxed" style={{ fontFamily: 'Georgia, serif', color: '#262626' }}>
                      <span className="font-semibold">ISSO Nationals Basketball U14 & U17</span> - Champions
                    </p>
                  </div>

                  <div
                    data-index="6"
                    className={`flex gap-4 transition-all duration-500 ${
                      visibleElements.has(6) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                    <span className="font-normal flex-shrink-0" style={{ fontFamily: 'Georgia, serif', color: '#262626' }}>6.</span>
                    <p className="leading-relaxed" style={{ fontFamily: 'Georgia, serif', color: '#262626' }}>
                      <span className="font-semibold">ISSO Nationals Squash U17</span> - Runner up
                    </p>
                  </div>

                  <div
                    data-index="7"
                    className={`flex gap-4 transition-all duration-500 ${
                      visibleElements.has(7) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                    <span className="font-normal flex-shrink-0" style={{ fontFamily: 'Georgia, serif', color: '#262626' }}>7.</span>
                    <p className="leading-relaxed" style={{ fontFamily: 'Georgia, serif', color: '#262626' }}>
                      <span className="font-semibold">20th International UCMAS Abacus & Mental Arithmetic Competition 2015</span> - 3rd Runner Up globally at the age of 7 (competed against kids twice my age)
                    </p>
                  </div>

                  <div
                    data-index="8"
                    className={`flex gap-4 transition-all duration-500 ${
                      visibleElements.has(8) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                    <span className="font-normal flex-shrink-0" style={{ fontFamily: 'Georgia, serif', color: '#262626' }}>8.</span>
                    <p className="leading-relaxed" style={{ fontFamily: 'Georgia, serif', color: '#262626' }}>
                      <span className="font-semibold">100 Days of Running Challenge by HDOR</span> - Finished 14th internationally in teenagers category (Ran 464.21 km)
                    </p>
                  </div>

                  <div
                    data-index="9"
                    className={`flex gap-4 transition-all duration-500 ${
                      visibleElements.has(9) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                    <span className="font-normal flex-shrink-0" style={{ fontFamily: 'Georgia, serif', color: '#262626' }}>9.</span>
                    <p className="leading-relaxed" style={{ fontFamily: 'Georgia, serif', color: '#262626' }}>
                      <span className="font-semibold">Tuffman 10km Marathon</span> - Bronze medalist amongst thousands of athletes (first ever 10km marathon)
                    </p>
                  </div>

                  <div
                    data-index="10"
                    className={`flex gap-4 transition-all duration-500 ${
                      visibleElements.has(10) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                    <span className="font-normal flex-shrink-0" style={{ fontFamily: 'Georgia, serif', color: '#262626' }}>10.</span>
                    <p className="leading-relaxed" style={{ fontFamily: 'Georgia, serif', color: '#262626' }}>
                      <span className="font-semibold">World Mathematics Invitational</span> - Bronze medalist
                    </p>
                  </div>

                  <div
                    data-index="11"
                    className={`flex gap-4 transition-all duration-500 ${
                      visibleElements.has(11) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                    <span className="font-normal flex-shrink-0" style={{ fontFamily: 'Georgia, serif', color: '#262626' }}>11.</span>
                    <p className="leading-relaxed" style={{ fontFamily: 'Georgia, serif', color: '#262626' }}>
                      <span className="font-semibold">FISO Math National Olympiad</span> - Gold medalist
                    </p>
                  </div>

                  <div
                    data-index="12"
                    className={`flex gap-4 transition-all duration-500 ${
                      visibleElements.has(12) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                    <span className="font-normal flex-shrink-0" style={{ fontFamily: 'Georgia, serif', color: '#262626' }}>12.</span>
                    <p className="leading-relaxed" style={{ fontFamily: 'Georgia, serif', color: '#262626' }}>
                      <span className="font-semibold">FISO Math International Olympiad</span> - Silver medalist
                    </p>
                  </div>

                  <div
                    data-index="13"
                    className={`flex gap-4 transition-all duration-500 ${
                      visibleElements.has(13) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                    <span className="font-normal flex-shrink-0" style={{ fontFamily: 'Georgia, serif', color: '#262626' }}>13.</span>
                    <p className="leading-relaxed" style={{ fontFamily: 'Georgia, serif', color: '#262626' }}>
                      <span className="font-semibold">Singapore and Asian Mathematics Olympiad</span> - Bronze medalist
                    </p>
                  </div>

                  <div
                    data-index="14"
                    className={`flex gap-4 transition-all duration-500 ${
                      visibleElements.has(14) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                    <span className="font-normal flex-shrink-0" style={{ fontFamily: 'Georgia, serif', color: '#262626' }}>14.</span>
                    <p className="leading-relaxed" style={{ fontFamily: 'Georgia, serif', color: '#262626' }}>
                      <span className="font-semibold">Sparkle, IIT Guwahati 2025</span> - Top 6 out of 10,000+ participants
                    </p>
                  </div>

                  <div
                    data-index="15"
                    className={`flex gap-4 transition-all duration-500 ${
                      visibleElements.has(15) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                    <span className="font-normal flex-shrink-0" style={{ fontFamily: 'Georgia, serif', color: '#262626' }}>15.</span>
                    <p className="leading-relaxed" style={{ fontFamily: 'Georgia, serif', color: '#262626' }}>
                      <span className="font-semibold">International Business Olympiad</span> - Highest Distinction - Scored 282/300
                    </p>
                  </div>
                </div>
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
