import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, getDocs, doc, setDoc, increment } from 'firebase/firestore';
import { db } from '../firebase';
import FlightDealsWidget from './FlightDealsWidget';

export default function SeoBlog({ onOpenConcierge }) {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [activeIsland, setActiveIsland] = useState('all');
  const [loading, setLoading] = useState(true);

  // Pre-seeded SEO Articles for Instant Google Search Indexing
  const CURATED_ARTICLES = [
    {
      id: 'trinidad-carnival-2026-fete-guide',
      slug: 'trinidad-carnival-2026-fete-guide',
      island: 'trinidad',
      title: 'Trinidad Carnival 2026: Ultimate Fete List, Costume Pickup & Survival Guide',
      metaDescription: 'Discover the top fetes for Trinidad Carnival 2026 including Soca Brainwash, AM Bush, and Phuket. Find ticket prices, venue maps, doubles spots, and costume pickup tips.',
      publishDate: '2026-07-25',
      author: 'CaribPulse AI Travel Team',
      readTime: '6 min read',
      heroImage: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1200&q=80',
      content: `
        <h2>The Greatest Show on Earth is Back</h2>
        <p>Trinidad Carnival is the undisputed mecca of Caribbean carnivals. Every year, hundreds of thousands of masqueraders and soca lovers descend upon Port of Spain for a week of non-stop pumping, street parades, and world-class fetes.</p>

        <h3>Top 5 Must-Attend Fetes for 2026</h3>
        <ul>
          <li><strong>Soca Brainwash:</strong> DJ Private Ryan’s signature mega-event. Known for incredible vibes, themed decor, and all-star DJ lineups.</li>
          <li><strong>A.M.B.U.S.H.:</strong> Caesar’s Army premier alternative concept. Paint, powder, water trucks, and high-energy Soca before sunrise.</li>
          <li><strong>Phuket All-Inclusive:</strong> Ultra-premium venue, gourmet local food stations, and top-shelf drinks.</li>
          <li><strong>Soaka Street Festival:</strong> Heavy iron rhythm sections and raw carnival energy under the night sky.</li>
          <li><strong>Duck Work:</strong> The ultimate day-party cooler fete to warm up your carnival week.</li>
        </ul>

        <h3>Must-Try Street Food Between Fetes</h3>
        <p>You cannot experience Trinidad Carnival without indulging in authentic local street food:</p>
        <ul>
          <li><strong>Doubles:</strong> Fried baras filled with savory curry channa, topped with pepper sauce, shadow beni, and tamarind sauce. Best found at Sauce Doubles in Curepe or around the Savannah.</li>
          <li><strong>Bake & Shark:</strong> Head straight to Maracas Bay for hot fried bake loaded with crispy shark fillet and over 10 fresh sauces.</li>
          <li><strong>Corn Soup:</strong> Heavy, spicy pea soup with corn on the cob — the ultimate 4 AM post-fete recovery meal.</li>
        </ul>

        <h3>Costume Pickup & Band House Tips</h3>
        <p>When collecting your costume at Tribe, Bliss, Lost Tribe, or Yuma distribution centers:</p>
        <ol>
          <li>Bring your printed registration receipt and valid government ID.</li>
          <li>Bring the original credit card used for deposit.</li>
          <li>Try on your costume inside the fitting rooms BEFORE leaving the band house!</li>
        </ol>
      `,
      schemaJson: {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Trinidad Carnival 2026: Ultimate Fete List, Costume Pickup & Survival Guide",
        "description": "Discover top fetes, doubles spots, and costume pickup tips for Trinidad Carnival 2026.",
        "author": { "@type": "Organization", "name": "CaribPulse AI" },
        "publisher": { "@type": "Organization", "name": "CaribPulse AI", "url": "https://carnival-planner.web.app" }
      }
    },
    {
      id: 'barbados-crop-over-2026-guide',
      slug: 'barbados-crop-over-2026-guide',
      island: 'barbados',
      title: 'Barbados Crop Over 2026: Grand Kadooment, Foreday Morning & Top Cooler Fetes',
      metaDescription: 'Complete Barbados Crop Over 2026 travel guide. Find tickets for Mimosa, Lifted, Cohobblopot, and Foreday Morning jam.',
      publishDate: '2026-07-20',
      author: 'CaribPulse AI Travel Team',
      readTime: '5 min read',
      heroImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
      content: `
        <h2>Sweet Crop Over 2026</h2>
        <p>Barbados Crop Over is a 200-year-old cultural festival celebrating the end of the sugar cane harvest, culminating in the vibrant Grand Kadooment Day parade.</p>

        <h3>Top 4 Crop Over Events</h3>
        <ul>
          <li><strong>Mimosa Breakfast Party:</strong> Premium all-inclusive sunrise event with stunning ocean views.</li>
          <li><strong>Lifted Beach Fete:</strong> High-vibes beach party with top Bajan and Trinidadian Soca artistes.</li>
          <li><strong>Foreday Morning Jam:</strong> Barbados’ famous night-time mud, paint, and powder road march.</li>
          <li><strong>Grand Kadooment Day:</strong> Masqueraders in magnificent feather costumes jump along the highway ending at the beach.</li>
        </ul>

        <h3>Bajan Food You Must Try</h3>
        <p>Grab fried Flying Fish and Cou-Cou at Oistins Bay Garden on Friday night, paired with fresh Bajan rum punch!</p>
      `,
      schemaJson: {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Barbados Crop Over 2026 Travel & Fete Guide",
        "author": { "@type": "Organization", "name": "CaribPulse AI" }
      }
    },
    {
      id: 'jamaica-carnival-2026-guide',
      slug: 'jamaica-carnival-2026-guide',
      island: 'jamaica',
      title: 'Jamaica Carnival 2026: Sunrise Breakfast Fete, Xodus & Yard Mas Road March',
      metaDescription: 'Guide to Jamaica Carnival in Kingston. Fetes, costume pickup for Xodus and GenXS, Jerk chicken spots, and flight tips.',
      publishDate: '2026-07-15',
      author: 'CaribPulse AI Travel Team',
      readTime: '5 min read',
      heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      content: `
        <h2>Soca Meets Dancehall in Kingston</h2>
        <p>Jamaica Carnival has exploded into one of the most exciting carnivals in the region, bringing unmatched energy to the streets of Kingston.</p>

        <h3>Must-Attend Events in Kingston</h3>
        <ul>
          <li><strong>Sunrise Breakfast Party:</strong> The undisputed king of breakfast fetes in Kingston.</li>
          <li><strong>Frenchmen Fete:</strong> Ultra-exclusive food & drinks inclusive event.</li>
          <li><strong>AMBUSH Jamaica:</strong> High-energy paint & powder J'ouvert session.</li>
          <li><strong>Road March Sunday:</strong> Jump with Xodus, GenXS, or Yard Mas through New Kingston!</li>
        </ul>
      `,
      schemaJson: {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Jamaica Carnival 2026 Travel Guide",
        "author": { "@type": "Organization", "name": "CaribPulse AI" }
      }
    }
  ];

  useEffect(() => {
    async function fetchSeoArticles() {
      try {
        const q = query(collection(db, 'seoArticles'), orderBy('createdAt', 'desc'), limit(10));
        const snap = await getDocs(q);
        if (!snap.empty) {
          const dbArticles = [];
          snap.forEach((doc) => dbArticles.push({ id: doc.id, ...doc.data() }));
          setArticles([...dbArticles, ...CURATED_ARTICLES]);
        } else {
          fetchStaticBackup();
        }
      } catch (err) {
        console.warn('Using static/curated SEO articles fallback:', err.message);
        fetchStaticBackup();
      } finally {
        setLoading(false);
      }
    }

    async function fetchStaticBackup() {
      try {
        const res = await fetch('/data/latest_seo_articles.json');
        if (res.ok) {
          const jsonArticles = await res.json();
          setArticles([...jsonArticles, ...CURATED_ARTICLES]);
        } else {
          setArticles(CURATED_ARTICLES);
        }
      } catch (e) {
        setArticles(CURATED_ARTICLES);
      }
    }

    fetchSeoArticles();
  }, []);

  useEffect(() => {
    if (selectedArticle) {
      const container = document.getElementById('article-content');
      if (container) {
        const links = container.querySelectorAll('a[href^="http"]');
        links.forEach(link => {
          if (!link.href.includes(window.location.hostname)) {
            link.setAttribute('rel', 'nofollow sponsored');
            link.setAttribute('target', '_blank');
            link.classList.add('text-pink-400', 'font-bold', 'hover:text-pink-300', 'transition-colors', 'inline-flex', 'items-center', 'no-underline');
            
            if (!link.querySelector('.shop-badge')) {
              const badge = document.createElement('span');
              badge.className = 'shop-badge bg-pink-500/20 text-pink-300 text-[10px] px-1.5 py-0.5 rounded ml-1.5 border border-pink-500/30 font-bold tracking-wide uppercase';
              badge.innerText = 'Shop';
              link.appendChild(badge);
            }

            link.onclick = () => {
              const docRef = doc(db, 'analytics/affiliateClicks', selectedArticle.slug);
              setDoc(docRef, { clicks: increment(1), lastClicked: new Date().toISOString() }, { merge: true })
                .catch(err => console.error("Error tracking click", err));
            };
          }
        });
      }
    }
  }, [selectedArticle]);

  const filteredArticles = activeIsland === 'all'
    ? articles
    : articles.filter(a => {
        const i = (a.island || '').toLowerCase();
        const c = (a.category || '').toLowerCase();
        return i === activeIsland.toLowerCase() || c === activeIsland.toLowerCase();
      });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 text-white">
      {/* Dynamic Schema.org JSON-LD for Google Search Bot */}
      {selectedArticle && selectedArticle.schemaJson && (
        <script type="application/ld+json">
          {JSON.stringify(selectedArticle.schemaJson)}
        </script>
      )}

      {/* Flight Price Drop Alerts Widget */}
      <FlightDealsWidget />

      {/* Header Banner */}
      <div className="text-center mb-8 bg-gradient-to-r from-purple-900 via-pink-900 to-indigo-900 p-8 rounded-3xl border border-purple-500/30 shadow-2xl">

        <span className="bg-pink-500/20 text-pink-300 border border-pink-500/40 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          Google SEO & Travel Guides
        </span>
        <h1 className="text-3xl md:text-5xl font-black mt-3 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-300 to-cyan-400">
          Caribbean Carnival Travel & Fete Guides 🌴
        </h1>
        <p className="text-gray-300 text-sm md:text-base mt-2 max-w-2xl mx-auto">
          AI-curated event lists, costume pickup guides, local food spots, and fete ticket prices for Trinidad, Barbados, Jamaica, St. Lucia & Grenada.
        </p>

        {/* Island Filters */}
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {['all', 'trinidad', 'barbados', 'jamaica', 'stlucia', 'party planning', 'guides & tips'].map((island) => (
            <button
              key={island}
              onClick={() => { setActiveIsland(island); setSelectedArticle(null); }}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all ${
                activeIsland === island
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg scale-105'
                  : 'bg-white/10 hover:bg-white/20 text-gray-300'
              }`}
            >
              {island === 'all' ? '🌴 All Islands' : island}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Article Full View */}
      {selectedArticle ? (
        <div className="bg-slate-900/90 border border-purple-500/30 rounded-3xl p-6 md:p-10 shadow-2xl backdrop-blur-xl">
          <button
            onClick={() => setSelectedArticle(null)}
            className="mb-6 text-cyan-400 hover:text-cyan-300 text-sm font-bold flex items-center gap-2"
          >
            ← Back to All Guides
          </button>

          <img
            src={selectedArticle.heroImage}
            alt={selectedArticle.title}
            className="w-full h-64 md:h-96 object-cover rounded-2xl mb-6 shadow-xl"
          />

          <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
            <span className="bg-pink-500/20 text-pink-300 px-2.5 py-0.5 rounded-full uppercase font-bold">
              {selectedArticle.island}
            </span>
            <span>📅 {selectedArticle.publishDate}</span>
            <span>⏱️ {selectedArticle.readTime}</span>
          </div>

          <h1 className="text-2xl md:text-4xl font-extrabold text-white mb-6 leading-tight">
            {selectedArticle.title}
          </h1>

          <div
            id="article-content"
            className="prose prose-invert prose-pink max-w-none text-gray-300 space-y-4 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
          />

          {/* CTA Box inside Article */}
          <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-cyan-900/80 to-purple-900/80 border border-cyan-500/40 text-center">
            <h3 className="text-xl font-bold text-cyan-300 mb-2">Have Questions About This Carnival? 🤖</h3>
            <p className="text-sm text-gray-300 mb-4">
              Chat live with our AI Carnival Concierge for real-time ticket links, transport options, and squad planning.
            </p>
            <button
              onClick={onOpenConcierge}
              className="bg-gradient-to-r from-pink-500 to-cyan-500 text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition-all text-sm"
            >
              💬 Ask AI Concierge Now
            </button>
          </div>
        </div>
      ) : (
        /* Article Grid */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredArticles.map((art) => (
            <div
              key={art.id}
              onClick={() => setSelectedArticle(art)}
              className="group cursor-pointer bg-slate-900/80 hover:bg-slate-800/90 border border-purple-500/20 hover:border-pink-500/50 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={art.heroImage}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-pink-600/90 backdrop-blur-md text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {art.island}
                </span>
              </div>

              <div className="p-5">
                <div className="text-[11px] text-gray-400 mb-2 flex items-center justify-between">
                  <span>📅 {art.publishDate}</span>
                  <span>⏱️ {art.readTime}</span>
                </div>
                <h3 className="font-bold text-base text-white group-hover:text-pink-400 transition-colors line-clamp-2 mb-2">
                  {art.title}
                </h3>
                <p className="text-xs text-gray-400 line-clamp-3 mb-4">
                  {art.metaDescription}
                </p>

                <div className="flex items-center text-cyan-400 text-xs font-bold group-hover:translate-x-1 transition-transform">
                  Read Full Guide →
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
