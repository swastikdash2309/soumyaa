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
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 transition-all duration-300">
        <nav className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Soumyaa Dhandharia</h1>
            <div className="flex gap-8">
              <button
                onClick={() => handleTabChange('home')}
                className={`text-sm font-medium transition-colors duration-200 hover:text-gray-900 ${
                  activeTab === 'home' ? 'text-gray-900' : 'text-gray-600'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => handleTabChange('projects')}
                className={`text-sm font-medium transition-colors duration-200 hover:text-gray-900 ${
                  activeTab === 'projects' ? 'text-gray-900' : 'text-gray-600'
                }`}
              >
                Projects & Work
              </button>
              <button
                onClick={() => handleTabChange('academics')}
                className={`text-sm font-medium transition-colors duration-200 hover:text-gray-900 ${
                  activeTab === 'academics' ? 'text-gray-900' : 'text-gray-600'
                }`}
              >
                Academics
              </button>
              <button
                onClick={() => handleTabChange('honours')}
                className={`text-sm font-medium transition-colors duration-200 hover:text-gray-900 ${
                  activeTab === 'honours' ? 'text-gray-900' : 'text-gray-600'
                }`}
              >
                Honours
              </button>
            </div>
          </div>
        </nav>
      </header>

      <main className="pt-24">
        <div className={`transition-opacity duration-200 ease-in-out ${
          isFadingOut ? 'opacity-0' : 'opacity-100'
        }`}>
        {displayTab === 'home' && (
          <div>
            <section className="min-h-[60vh] flex items-center justify-center px-6 py-20">
              <div
                data-index="0"
                className={`text-center transition-all duration-700 ${
                  visibleElements.has(0) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}>
                <p className="text-xl md:text-2xl text-gray-600 mb-4 tracking-wide">hello, I'm</p>
                <h1 className="text-6xl md:text-8xl font-bold text-gray-900 tracking-tight">Soumyaa</h1>
              </div>
            </section>

            <section className="max-w-6xl mx-auto px-6 py-20">
              <div
                data-index="1"
                className={`grid md:grid-cols-2 gap-16 items-center transition-all duration-700 ${
                  visibleElements.has(1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}>
                <div>
                  <h2 className="text-4xl font-bold text-gray-900 mb-8 uppercase tracking-wide">WHO AM I?</h2>
                  <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
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
            </section>

            <section
              data-index="2"
              className={`bg-gray-100 py-20 transition-all duration-700 ${
                visibleElements.has(2) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
              <div className="max-w-4xl mx-auto px-6 text-center">
                <h3 className="text-4xl font-bold text-gray-900 mb-12 uppercase tracking-wide">CONNECT WITH ME</h3>
                <div className="flex flex-wrap items-center justify-center gap-8 mb-8">
                  <a href="https://www.instagram.com/soumyaad1808?igsh=MTYxenl4MDB6bHpzbg%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900 transition-colors">
                    <Instagram className="w-8 h-8" />
                  </a>
                  <a href="https://www.linkedin.com/in/soumyaa-dhandharria/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900 transition-colors">
                    <Linkedin className="w-8 h-8" />
                  </a>
                </div>
                <div className="space-y-2 text-gray-700">
                  <p className="text-lg">+91 8278689242</p>
                  <p className="text-lg">soumyadhandharia2912@gmail.com</p>
                </div>
              </div>
            </section>

            <section
              data-index="3"
              className={`bg-red-400 py-20 transition-all duration-700 ${
                visibleElements.has(3) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
              <div className="max-w-4xl mx-auto px-6 text-center">
                <p className="text-6xl text-white mb-8">:)</p>
                <p className="text-2xl md:text-3xl text-white leading-relaxed mb-8">
                  My defense mechanism is humor. When things get awkward, I just say something stupid and hope it lands.
                </p>
                <p className="text-xl text-white/90">- Also me</p>
              </div>
            </section>
          </div>
        )}

        {displayTab === 'projects' && (
          <div>
            <div className="bg-cover bg-center py-32 mb-0" style={{backgroundImage: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg?auto=compress&cs=tinysrgb&w=1920)'}}>
              <h2
                data-index="0"
                className={`text-5xl md:text-6xl font-light text-white text-center transition-all duration-700 ${
                  visibleElements.has(0) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}>The things I do for love</h2>
              <p className="text-xl md:text-2xl text-white/90 text-center mt-4 italic">Where ideas meet execution...and sometimes chaos</p>
            </div>

            <div
              data-index="1"
              className={`bg-gray-200 py-20 transition-all duration-700 ${
                visibleElements.has(1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
              <div className="max-w-4xl mx-auto px-8 text-center">
                <h3 className="text-3xl md:text-4xl font-light text-gray-900 mb-6 italic">Everest Base Camp & Kala Patthar Peak</h3>
                <p className="text-base text-gray-700 leading-relaxed">
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
                <h3 className="text-3xl md:text-4xl font-light text-gray-900 mb-6 italic">KeraX</h3>
                <p className="text-base text-gray-700 leading-relaxed">
                  Created the world's first keratin-based carry bag that is 100% biodegradable, eco-friendly, and 10x stronger than traditional plastic carry bags.
                </p>
              </div>
            </div>

            <div
              data-index="3"
              className={`bg-gray-200 py-20 transition-all duration-700 ${
                visibleElements.has(3) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
              <div className="max-w-4xl mx-auto px-8 text-center">
                <h3 className="text-3xl md:text-4xl font-light text-gray-900 mb-6 italic">ZeroCarb</h3>
                <p className="text-base text-gray-700 leading-relaxed">
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
                <h3 className="text-3xl md:text-4xl font-light text-gray-900 mb-6 italic">Do Mutthi Ka Dum - President</h3>
                <p className="text-base text-gray-700 leading-relaxed">
                  Rose from volunteer to president of this 7-year old social organisation working towards the betterment of the society. We have raised over $40k. I have been part of projects such as the toilet construction project in rural areas where we constructed over 110 toilets.
                </p>
              </div>
            </div>

            <div
              data-index="5"
              className={`bg-gray-200 py-20 transition-all duration-700 ${
                visibleElements.has(5) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
              <div className="max-w-4xl mx-auto px-8 text-center">
                <h3 className="text-3xl md:text-4xl font-light text-gray-900 mb-6 italic">Research Paper on Human Development Index</h3>
                <p className="text-base text-gray-700 leading-relaxed">
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
                <h3 className="text-3xl md:text-4xl font-light text-gray-900 mb-6 italic">School Captain</h3>
                <p className="text-base text-gray-700 leading-relaxed">
                  Managed 5+ school events for 2400+ students, like the IB League, where I was the Finance head. I was in the organising team of the TEDxYouth @ JPIS, and my work involved handling budgets, sponsorships of $12k+, and the hospitality of speakers.
                </p>
              </div>
            </div>

            <div
              data-index="7"
              className={`bg-gray-200 py-20 transition-all duration-700 ${
                visibleElements.has(7) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
              <div className="max-w-4xl mx-auto px-8 text-center">
                <h3 className="text-3xl md:text-4xl font-light text-gray-900 mb-6 italic">Finance Head of IB League</h3>
                <p className="text-base text-gray-700 leading-relaxed">
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
                <h3 className="text-3xl md:text-4xl font-light text-gray-900 mb-6 italic">Math Tutor for Underprivileged Children</h3>
                <p className="text-base text-gray-700 leading-relaxed">
                  Taught math to 50+ underprivileged kids over 2 summers. I created my own teaching plans, curriculum to do so, and also learnt how to use braille to teach them.
                </p>
              </div>
            </div>

            <div
              data-index="9"
              className={`bg-gray-200 py-20 transition-all duration-700 ${
                visibleElements.has(9) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
              <div className="max-w-4xl mx-auto px-8 text-center">
                <h3 className="text-3xl md:text-4xl font-light text-gray-900 mb-6 italic">Internship at TallyPrime</h3>
                <p className="text-base text-gray-700 leading-relaxed">
                  Did an internship at TallyPrime.
                </p>
              </div>
            </div>
          </div>
        )}

        {displayTab === 'academics' && (
          <div>
            <div className="bg-cover bg-center py-48 mb-0 relative" style={{backgroundImage: 'linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url(/ballon.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat'}}>
              <h2
                data-index="0"
                className={`text-6xl md:text-7xl font-light text-white text-center transition-all duration-700 ${
                  visibleElements.has(0) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}>Academic Plans and Interests</h2>
              <p className="text-xl md:text-2xl text-white/90 text-center mt-4 italic">Proof I read things other than memes</p>
            </div>
            <div className="bg-gray-50 py-20">
              <div className="max-w-5xl mx-auto px-12">
                <div className="space-y-12">
                  <div
                    data-index="1"
                    className={`transition-all duration-500 ${
                      visibleElements.has(1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                    <p className="text-base text-gray-900 leading-relaxed mb-4">
                      I intend to pursue Finance, then I want to end up doing Law. I also want to be a Professor for a while and also a Professional Triathlete. I know, it's all over the place.
                    </p>
                    <p className="text-base text-gray-900 leading-relaxed mb-4">
                      I dive into Finance and Markets with curiosity — from books to simulations — constantly testing how numbers shape real lives. I try to turn that understanding into ideas that help people make smarter financial choices. I'm fascinated by how Economics and Technology intersect; moments when a concept clicks in class feel like tiny market rallies in my mind. And yes, spreadsheets feel like playgrounds.
                    </p>
                    <p className="text-base text-gray-900 leading-relaxed">
                      My dream is to steer capital toward solutions that build stability, expand opportunity, and make our world more sustainable — where profit and purpose compound together.
                    </p>
                  </div>

                  <div
                    data-index="2"
                    className={`transition-all duration-500 ${
                      visibleElements.has(2) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">IGCSE</h3>
                    <div className="grid grid-cols-2 gap-x-16 gap-y-2 text-sm">
                      <div className="flex gap-2">
                        <span>-</span>
                        <p className="text-gray-900">English Language - A*</p>
                      </div>
                      <div className="flex gap-2">
                        <span>-</span>
                        <p className="text-gray-900">Additional Math - A*</p>
                      </div>
                      <div className="flex gap-2">
                        <span>-</span>
                        <p className="text-gray-900">Extended Math - A*</p>
                      </div>
                      <div className="flex gap-2">
                        <span>-</span>
                        <p className="text-gray-900">International Math - A*</p>
                      </div>
                      <div className="flex gap-2">
                        <span>-</span>
                        <p className="text-gray-900">Chemistry - A*</p>
                      </div>
                      <div className="flex gap-2">
                        <span>-</span>
                        <p className="text-gray-900">Physics - A*</p>
                      </div>
                      <div className="flex gap-2">
                        <span>-</span>
                        <p className="text-gray-900">Economics - A*</p>
                      </div>
                      <div className="flex gap-2">
                        <span>-</span>
                        <p className="text-gray-900">Global Perspectives - A*</p>
                      </div>
                      <div className="flex gap-2">
                        <span>-</span>
                        <p className="text-gray-900">English Literature - A</p>
                      </div>
                      <div className="flex gap-2">
                        <span>-</span>
                        <p className="text-gray-900">French - A</p>
                      </div>
                    </div>
                  </div>

                  <div
                    data-index="3"
                    className={`transition-all duration-500 ${
                      visibleElements.has(3) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">International Baccalaureate</h3>
                    <p className="text-sm text-gray-700 italic mb-6">Irregular Diploma for an Irregular Child</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex gap-3">
                        <span className="text-gray-900">-</span>
                        <p className="text-gray-900">Physics HL</p>
                      </div>
                      <div className="flex gap-3">
                        <span className="text-gray-900">-</span>
                        <p className="text-gray-900">Chemistry HL</p>
                      </div>
                      <div className="flex gap-3">
                        <span className="text-gray-900">-</span>
                        <p className="text-gray-900">Math AAHL</p>
                      </div>
                      <div className="flex gap-3">
                        <span className="text-gray-900">-</span>
                        <p className="text-gray-900">Economics - HL</p>
                      </div>
                      <div className="flex gap-3">
                        <span className="text-gray-900">-</span>
                        <p className="text-gray-900">Hindi - BSL</p>
                      </div>
                      <div className="flex gap-3">
                        <span className="text-gray-900">-</span>
                        <p className="text-gray-900">English - SL</p>
                      </div>
                    </div>
                  </div>

                  <div
                    data-index="4"
                    className={`transition-all duration-500 ${
                      visibleElements.has(4) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Testing</h3>
                    <p className="text-sm text-gray-700 italic mb-6">Almost cracked under pressure</p>
                    <div className="space-y-4 text-sm">
                      <div>
                        <p className="text-gray-900 font-semibold mb-2">SAT - 1540/1600</p>
                        <div className="ml-6 space-y-1">
                          <p className="text-gray-900">Evidence Based Reading & Writing - 740</p>
                          <p className="text-gray-900">Mathematics - 800</p>
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
            <div className="bg-sky-400 py-48 mb-0">
              <h2
                data-index="0"
                className={`text-6xl md:text-7xl font-light text-white text-center transition-all duration-700 ${
                  visibleElements.has(0) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}>Honors</h2>
              <p className="text-xl md:text-2xl text-white/90 text-center mt-4 italic">My carefully curated collection of participation trophies (that actually required effort)</p>
            </div>
            <div className="bg-gray-50 py-20">
              <div className="max-w-5xl mx-auto px-12">
                <div className="space-y-6">
                  <div
                    data-index="1"
                    className={`flex gap-4 transition-all duration-500 ${
                      visibleElements.has(1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                    <span className="text-gray-900 font-normal flex-shrink-0">1.</span>
                    <p className="text-gray-900 leading-relaxed">
                      <span className="font-semibold">S.T. Yau Science Award</span> - Finalist in Mathematics Category
                    </p>
                  </div>

                  <div
                    data-index="2"
                    className={`flex gap-4 transition-all duration-500 ${
                      visibleElements.has(2) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                    <span className="text-gray-900 font-normal flex-shrink-0">2.</span>
                    <p className="text-gray-900 leading-relaxed">
                      <span className="font-semibold">Beamline for Schools by CERN</span> - Top 50 teams globally
                    </p>
                  </div>

                  <div
                    data-index="3"
                    className={`flex gap-4 transition-all duration-500 ${
                      visibleElements.has(3) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                    <span className="text-gray-900 font-normal flex-shrink-0">3.</span>
                    <p className="text-gray-900 leading-relaxed">
                      <span className="font-semibold">Global Social Leaders Festival 2025</span> - Won the Climate & Sustainability in the senior track
                    </p>
                  </div>

                  <div
                    data-index="4"
                    className={`flex gap-4 transition-all duration-500 ${
                      visibleElements.has(4) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                    <span className="text-gray-900 font-normal flex-shrink-0">4.</span>
                    <p className="text-gray-900 leading-relaxed">
                      <span className="font-semibold">John Locke Global Essay Prize</span> - Finalist in Theology
                    </p>
                  </div>

                  <div
                    data-index="5"
                    className={`flex gap-4 transition-all duration-500 ${
                      visibleElements.has(5) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                    <span className="text-gray-900 font-normal flex-shrink-0">5.</span>
                    <p className="text-gray-900 leading-relaxed">
                      <span className="font-semibold">ISSO Nationals Basketball U14 & U17</span> - Champions
                    </p>
                  </div>

                  <div
                    data-index="6"
                    className={`flex gap-4 transition-all duration-500 ${
                      visibleElements.has(6) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                    <span className="text-gray-900 font-normal flex-shrink-0">6.</span>
                    <p className="text-gray-900 leading-relaxed">
                      <span className="font-semibold">ISSO Nationals Squash U17</span> - Runner up
                    </p>
                  </div>

                  <div
                    data-index="7"
                    className={`flex gap-4 transition-all duration-500 ${
                      visibleElements.has(7) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                    <span className="text-gray-900 font-normal flex-shrink-0">7.</span>
                    <p className="text-gray-900 leading-relaxed">
                      <span className="font-semibold">20th International UCMAS Abacus & Mental Arithmetic Competition 2015</span> - 3rd Runner Up globally at the age of 7 (competed against kids twice my age)
                    </p>
                  </div>

                  <div
                    data-index="8"
                    className={`flex gap-4 transition-all duration-500 ${
                      visibleElements.has(8) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                    <span className="text-gray-900 font-normal flex-shrink-0">8.</span>
                    <p className="text-gray-900 leading-relaxed">
                      <span className="font-semibold">100 Days of Running Challenge by HDOR</span> - Finished 14th internationally in teenagers category (Ran 464.21 km)
                    </p>
                  </div>

                  <div
                    data-index="9"
                    className={`flex gap-4 transition-all duration-500 ${
                      visibleElements.has(9) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                    <span className="text-gray-900 font-normal flex-shrink-0">9.</span>
                    <p className="text-gray-900 leading-relaxed">
                      <span className="font-semibold">Tuffman 10km Marathon</span> - Bronze medalist amongst thousands of athletes (first ever 10km marathon)
                    </p>
                  </div>

                  <div
                    data-index="10"
                    className={`flex gap-4 transition-all duration-500 ${
                      visibleElements.has(10) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                    <span className="text-gray-900 font-normal flex-shrink-0">10.</span>
                    <p className="text-gray-900 leading-relaxed">
                      <span className="font-semibold">World Mathematics Invitational</span> - Bronze medalist
                    </p>
                  </div>

                  <div
                    data-index="11"
                    className={`flex gap-4 transition-all duration-500 ${
                      visibleElements.has(11) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                    <span className="text-gray-900 font-normal flex-shrink-0">11.</span>
                    <p className="text-gray-900 leading-relaxed">
                      <span className="font-semibold">FISO Math National Olympiad</span> - Gold medalist
                    </p>
                  </div>

                  <div
                    data-index="12"
                    className={`flex gap-4 transition-all duration-500 ${
                      visibleElements.has(12) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                    <span className="text-gray-900 font-normal flex-shrink-0">12.</span>
                    <p className="text-gray-900 leading-relaxed">
                      <span className="font-semibold">FISO Math International Olympiad</span> - Silver medalist
                    </p>
                  </div>

                  <div
                    data-index="13"
                    className={`flex gap-4 transition-all duration-500 ${
                      visibleElements.has(13) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                    <span className="text-gray-900 font-normal flex-shrink-0">13.</span>
                    <p className="text-gray-900 leading-relaxed">
                      <span className="font-semibold">Singapore and Asian Mathematics Olympiad</span> - Bronze medalist
                    </p>
                  </div>

                  <div
                    data-index="14"
                    className={`flex gap-4 transition-all duration-500 ${
                      visibleElements.has(14) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                    <span className="text-gray-900 font-normal flex-shrink-0">14.</span>
                    <p className="text-gray-900 leading-relaxed">
                      <span className="font-semibold">Sparkle, IIT Guwahati 2025</span> - Top 6 out of 10,000+ participants
                    </p>
                  </div>

                  <div
                    data-index="15"
                    className={`flex gap-4 transition-all duration-500 ${
                      visibleElements.has(15) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                    <span className="text-gray-900 font-normal flex-shrink-0">15.</span>
                    <p className="text-gray-900 leading-relaxed">
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

      <footer className="bg-gray-900 text-white py-8 mt-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-400 text-sm">© 2025 Soumyaa Dhandharia. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
