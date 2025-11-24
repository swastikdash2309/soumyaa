import { useState, useEffect, useRef } from 'react';
import { Instagram, Linkedin } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [displayTab, setDisplayTab] = useState('home');
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [visibleElements, setVisibleElements] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
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
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

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

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden" style={{ backgroundColor: 'rgb(13, 39, 180)' }}>
        <div className="relative">
          <svg width="200" height="200" viewBox="0 0 200 200" className="animate-fade-in">
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: 'white', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: 'rgba(255,255,255,0.7)', stopOpacity: 1 }} />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            <g className="animate-draw-building">
              <rect x="70" y="80" width="60" height="90" fill="none" stroke="url(#grad1)" strokeWidth="3" filter="url(#glow)"
                style={{
                  strokeDasharray: '300',
                  strokeDashoffset: '300',
                  animation: 'draw 1.5s ease-out forwards'
                }}/>

              <line x1="85" y1="95" x2="95" y2="95" stroke="url(#grad1)" strokeWidth="2"
                style={{
                  strokeDasharray: '10',
                  strokeDashoffset: '10',
                  animation: 'draw 0.3s ease-out 0.5s forwards'
                }}/>
              <line x1="105" y1="95" x2="115" y2="95" stroke="url(#grad1)" strokeWidth="2"
                style={{
                  strokeDasharray: '10',
                  strokeDashoffset: '10',
                  animation: 'draw 0.3s ease-out 0.6s forwards'
                }}/>

              <line x1="85" y1="110" x2="95" y2="110" stroke="url(#grad1)" strokeWidth="2"
                style={{
                  strokeDasharray: '10',
                  strokeDashoffset: '10',
                  animation: 'draw 0.3s ease-out 0.7s forwards'
                }}/>
              <line x1="105" y1="110" x2="115" y2="110" stroke="url(#grad1)" strokeWidth="2"
                style={{
                  strokeDasharray: '10',
                  strokeDashoffset: '10',
                  animation: 'draw 0.3s ease-out 0.8s forwards'
                }}/>

              <line x1="85" y1="125" x2="95" y2="125" stroke="url(#grad1)" strokeWidth="2"
                style={{
                  strokeDasharray: '10',
                  strokeDashoffset: '10',
                  animation: 'draw 0.3s ease-out 0.9s forwards'
                }}/>
              <line x1="105" y1="125" x2="115" y2="125" stroke="url(#grad1)" strokeWidth="2"
                style={{
                  strokeDasharray: '10',
                  strokeDashoffset: '10',
                  animation: 'draw 0.3s ease-out 1s forwards'
                }}/>

              <rect x="85" y="145" width="30" height="25" fill="none" stroke="url(#grad1)" strokeWidth="2"
                style={{
                  strokeDasharray: '110',
                  strokeDashoffset: '110',
                  animation: 'draw 0.4s ease-out 1.2s forwards'
                }}/>

              <path d="M 50 80 L 100 50 L 150 80" fill="none" stroke="url(#grad1)" strokeWidth="3" filter="url(#glow)"
                style={{
                  strokeDasharray: '150',
                  strokeDashoffset: '150',
                  animation: 'draw 0.8s ease-out 1.6s forwards'
                }}/>
            </g>

            <circle cx="100" cy="100" r="70" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1"
              style={{
                strokeDasharray: '440',
                strokeDashoffset: '440',
                animation: 'draw 2s ease-out 0.3s forwards'
              }}/>
          </svg>

          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
            <p className="text-white text-xl font-normal tracking-wider"
               style={{
                 fontFamily: 'Franklin Gothic, Arial, sans-serif',
                 animation: 'fadeInUp 0.8s ease-out 2s forwards',
                 opacity: 0
               }}>
              Welcome
            </p>
          </div>
        </div>
      </div>
    );
  }

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
