import { useState, useEffect, useRef } from 'react';
import { Instagram, Linkedin } from 'lucide-react';

const CountryIcon = ({ country, color }: { country: string; color: string }) => {
  const icons: { [key: string]: JSX.Element } = {
    'USA': (
      <svg viewBox="0 0 120 80" className="w-20 h-14" style={{ opacity: 0.15 }}>
        <path d="M10,30 L15,28 L20,25 L25,20 L30,18 L35,16 L40,15 L45,15 L50,16 L55,18 L60,20 L65,22 L70,25 L75,28 L80,32 L85,35 L88,38 L90,42 L92,46 L93,50 L92,54 L90,57 L87,60 L83,62 L78,64 L73,65 L68,64 L63,62 L58,60 L53,58 L48,56 L43,54 L38,52 L33,50 L28,47 L23,44 L18,40 L13,36 L10,32 Z M95,30 L98,32 L100,35 L102,38 L103,42 L102,45 L100,48 L98,50 L95,51 L92,50 L90,48 L88,45 L87,42 L88,38 L90,35 L92,32 L95,30 Z"
              fill={color} />
      </svg>
    ),
    'SWITZERLAND': (
      <svg viewBox="0 0 60 50" className="w-14 h-12" style={{ opacity: 0.15 }}>
        <path d="M15,20 L20,18 L25,17 L30,16 L35,17 L40,19 L43,22 L45,26 L46,30 L45,34 L42,37 L38,39 L33,40 L28,40 L23,38 L18,35 L15,31 L13,27 L13,23 L15,20 Z"
              fill={color} />
      </svg>
    ),
    'UK': (
      <svg viewBox="0 0 60 100" className="w-14 h-20" style={{ opacity: 0.15 }}>
        <path d="M35,10 L38,12 L40,15 L42,20 L44,26 L45,33 L44,40 L42,46 L40,52 L38,58 L35,64 L32,70 L30,76 L28,82 L26,87 L23,90 L20,88 L18,84 L17,78 L16,72 L15,66 L14,60 L14,54 L15,48 L17,42 L19,36 L22,30 L25,24 L28,18 L31,13 L35,10 Z M40,22 L42,25 L43,29 L42,33 L40,36 L37,37 L35,35 L34,32 L35,28 L37,25 L40,22 Z"
              fill={color} />
      </svg>
    ),
    'INDIA': (
      <svg viewBox="0 0 70 100" className="w-16 h-22" style={{ opacity: 0.15 }}>
        <path d="M35,8 L38,10 L40,13 L42,17 L44,22 L46,28 L48,35 L50,42 L51,49 L52,56 L51,63 L49,70 L46,76 L43,81 L39,85 L35,88 L31,90 L27,91 L23,90 L20,88 L17,85 L14,81 L11,76 L9,70 L7,63 L6,56 L7,49 L9,42 L11,35 L14,28 L17,22 L20,17 L23,13 L27,10 L31,8 L35,8 Z M35,45 L30,48 L28,52 L30,56 L35,58 L40,56 L42,52 L40,48 L35,45 Z"
              fill={color} />
      </svg>
    ),
    'SINGAPORE': (
      <svg viewBox="0 0 30 30" className="w-10 h-10" style={{ opacity: 0.15 }}>
        <path d="M10,12 L12,10 L15,10 L18,12 L20,15 L20,18 L18,20 L15,20 L12,18 L10,15 Z"
              fill={color} />
      </svg>
    ),
    'GLOBAL': (
      <svg viewBox="0 0 100 100" className="w-16 h-16" style={{ opacity: 0.15 }}>
        <path d="M20,30 L15,35 L12,42 L11,50 L12,58 L15,65 L20,70 L25,74 L32,77 L40,79 L50,80 L60,79 L68,77 L75,74 L80,70 L85,65 L88,58 L89,50 L88,42 L85,35 L80,30 L75,26 L68,23 L60,21 L50,20 L40,21 L32,23 L25,26 Z M30,50 L35,45 L40,42 L50,40 L60,42 L65,45 L70,50 L65,55 L60,58 L50,60 L40,58 L35,55 Z M50,25 L50,75 M25,38 L75,38 M25,62 L75,62"
              fill={color} />
      </svg>
    ),
  };

  return icons[country] || icons['GLOBAL'];
};

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [displayTab, setDisplayTab] = useState('home');
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [visibleElements, setVisibleElements] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
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
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
        <nav className="max-w-7xl mx-auto px-8 py-5">
          <div className="flex items-center justify-between">
            <button
              onClick={() => handleTabChange('home')}
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
                onClick={() => handleTabChange('home')}
                className={`text-sm font-medium tracking-wider transition-colors duration-200 ${
                  activeTab === 'home' ? 'text-red-500' : 'text-red-400 hover:text-red-500'
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

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div
                  data-index="1"
                  className={`lg:col-span-2 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] bg-gradient-to-br from-gray-900 to-gray-800 p-10 transition-all duration-700 ${
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
                  className={`rounded-3xl bg-gradient-to-br from-orange-50 to-yellow-50 p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] transition-all duration-700 ${
                    visibleElements.has(2) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}>
                  <div className="text-4xl mb-4">🎨</div>
                  <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#000' }}>
                    ZeroCarb
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>
                    Developing a CO2 absorbing wall paint that absorbs 500x more CO2 than traditional paints, engineered to repel water/dust with a longer lifespan and application.
                  </p>
                  <div className="flex gap-2 mt-6">
                    <span className="px-3 py-1 bg-white rounded-full text-xs font-semibold text-gray-700">Chemistry</span>
                    <span className="px-3 py-1 bg-white rounded-full text-xs font-semibold text-gray-700">Climate Tech</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div
                  data-index="3"
                  className={`rounded-3xl bg-gradient-to-br from-yellow-50 to-orange-50 p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] transition-all duration-700 ${
                    visibleElements.has(3) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}>
                  <div className="text-4xl mb-4">🤝</div>
                  <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#000' }}>
                    Do Mutthi Ka Dum
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                    Rose from volunteer to President of this 7-year-old social organization. We have raised over $40k and led to constructing 110+ toilets in rural areas to improve sanitation and hygiene.
                  </p>
                </div>

                <div
                  data-index="4"
                  className={`rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] transition-all duration-700 ${
                    visibleElements.has(4) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}>
                  <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#000' }}>
                    HDI Research Paper
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                    Authored a paper on the 'Limitations of Human Development Index' under Shree Ram College of Commerce professor. Submitted for international publication.
                  </p>
                </div>

                <div
                  data-index="5"
                  className={`rounded-3xl bg-gradient-to-br from-gray-50 to-slate-100 p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] transition-all duration-700 ${
                    visibleElements.has(5) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}>
                  <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Franklin Gothic, Arial, sans-serif', color: '#000' }}>
                    School Captain & IB League
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                    Managed 5+ school events for 2400+ students. Handled $12k+ in sponsorships. In organizing team of TEDxYouth@JPIS and Finance head of IB League.
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
                      <CountryIcon country="USA" color="#D4A574" />
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
                      <CountryIcon country="SWITZERLAND" color="#D4A574" />
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
                      <CountryIcon country="UK" color="#7B9FD8" />
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
                      <CountryIcon country="UK" color="#D4A574" />
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
                      <CountryIcon country="GLOBAL" color="#D4A574" />
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
                      <CountryIcon country="INDIA" color="#E89BA0" />
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
                      <CountryIcon country="INDIA" color="#E89BA0" />
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
                      <CountryIcon country="GLOBAL" color="#D4A574" />
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
                      <CountryIcon country="USA" color="#D4A574" />
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
                      <CountryIcon country="INDIA" color="#D4A574" />
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
                      <CountryIcon country="GLOBAL" color="#D4A574" />
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
                      <CountryIcon country="SINGAPORE" color="#D4A574" />
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
                      <CountryIcon country="INDIA" color="#7B9FD8" />
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
                      <CountryIcon country="GLOBAL" color="#D4A574" />
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
                      <CountryIcon country="INDIA" color="#E89BA0" />
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
