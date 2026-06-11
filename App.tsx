import { useState, useEffect } from 'react';
import { Recycle, User, Menu, X, ChevronDown, Leaf, Sparkles, Gift } from 'lucide-react';
import { AuthModal } from './components/AuthModal';
import { UserDashboard } from './components/UserDashboard';
import { RewardsCatalog } from './components/RewardsCatalog';
import { PartnersSection } from './components/PartnersSection';
import { EcoMap } from './components/EcoMap';
import { StatsDashboard } from './components/StatsDashboard';
import { Footer } from './components/Footer';

// Demo user for hackathon presentation
type DemoUser = {
  email: string;
  points: number;
};

function Navbar({ demoUser, onLogout, onOpenAuth, onOpenDashboard }: {
  demoUser: DemoUser | null;
  onLogout: () => void;
  onOpenAuth: () => void;
  onOpenDashboard: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-lg shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Recycle className="w-6 h-6 md:w-7 md:h-7 text-white" />
              </div>
              <div>
                <span className={`text-xl md:text-2xl font-bold ${scrolled ? 'text-gray-900' : 'text-white'}`}>
                  Eco<span className="text-emerald-500">Aktau</span>
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <button
                onClick={() => scrollTo('rewards')}
                className={`font-medium transition-colors ${scrolled ? 'text-gray-700 hover:text-emerald-600' : 'text-white/90 hover:text-white'}`}
              >
                Где потратить
              </button>
              <button
                onClick={() => scrollTo('stats')}
                className={`font-medium transition-colors ${scrolled ? 'text-gray-700 hover:text-emerald-600' : 'text-white/90 hover:text-white'}`}
              >
                Статистика
              </button>
              <button
                onClick={() => scrollTo('map')}
                className={`font-medium transition-colors ${scrolled ? 'text-gray-700 hover:text-emerald-600' : 'text-white/90 hover:text-white'}`}
              >
                Карта
              </button>
              <button
                onClick={() => scrollTo('partners')}
                className={`font-medium transition-colors ${scrolled ? 'text-gray-700 hover:text-emerald-600' : 'text-white/90 hover:text-white'}`}
              >
                Партнеры
              </button>
              {demoUser ? (
                <div className="flex items-center gap-3">
                  <button
                    onClick={onOpenDashboard}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-cyan-600 text-white font-semibold rounded-lg hover:from-emerald-600 hover:to-cyan-700 transition-all shadow-lg"
                  >
                    <User className="w-4 h-4" />
                    Кабинет
                  </button>
                  <button
                    onClick={onLogout}
                    className={`font-medium ${scrolled ? 'text-gray-600 hover:text-red-600' : 'text-white/80 hover:text-white'}`}
                  >
                    Выйти
                  </button>
                </div>
              ) : (
                <button
                  onClick={onOpenAuth}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-600 text-white font-semibold rounded-lg hover:from-emerald-600 hover:to-cyan-700 transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40"
                >
                  <User className="w-4 h-4" />
                  Войти / Регистрация
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden p-2 rounded-lg ${scrolled ? 'text-gray-700' : 'text-white'}`}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white border-t shadow-xl animate-fade-in">
            <div className="px-4 py-4 space-y-3">
              <button
                onClick={() => scrollTo('rewards')}
                className="block w-full text-left py-2 text-gray-700 hover:text-emerald-600"
              >
                Где потратить
              </button>
              <button
                onClick={() => scrollTo('stats')}
                className="block w-full text-left py-2 text-gray-700 hover:text-emerald-600"
              >
                Статистика
              </button>
              <button
                onClick={() => scrollTo('map')}
                className="block w-full text-left py-2 text-gray-700 hover:text-emerald-600"
              >
                Карта
              </button>
              <button
                onClick={() => scrollTo('partners')}
                className="block w-full text-left py-2 text-gray-700 hover:text-emerald-600"
              >
                Партнеры
              </button>
              {demoUser ? (
                <>
                  <button
                    onClick={() => {
                      onOpenDashboard();
                      setIsOpen(false);
                    }}
                    className="w-full py-2 bg-gradient-to-r from-emerald-500 to-cyan-600 text-white font-semibold rounded-lg text-center"
                  >
                    Личный кабинет
                  </button>
                  <button
                    onClick={() => {
                      onLogout();
                      setIsOpen(false);
                    }}
                    className="block w-full text-left py-2 text-red-600"
                  >
                    Выйти
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    onOpenAuth();
                    setIsOpen(false);
                  }}
                  className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-600 text-white font-semibold rounded-lg text-center"
                >
                  Войти / Регистрация
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

function Hero() {
  const scrollToRewards = () => {
    const el = document.getElementById('rewards');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMiIvPjwvZz48L3N2Zz4=')] opacity-40"></div>
        {/* Animated circles */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-300/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
          <Sparkles className="w-5 h-5 text-yellow-300" />
          <span className="text-white/90 font-medium">Актау, Мангистау</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          Сдавай баклажки,<br />
          <span className="text-cyan-200">получай баллы!</span>
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto">
          ПЭТ-бутылки в Актау → баллы → скидки и эко-проекты.<br className="hidden sm:block" />
          Тариф: <span className="text-cyan-200 font-bold">1 кг = 500 баллов</span>
        </p>

        {/* Rate Card */}
        <div className="inline-block bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-10 border border-white/20">
          <div className="flex items-center justify-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
              <Leaf className="w-8 h-8 text-emerald-300" />
            </div>
            <div className="text-left">
              <p className="text-white/70 text-sm">Курс обмена</p>
              <p className="text-3xl font-bold text-white">500 <span className="text-cyan-200">баллов</span></p>
              <p className="text-white/60 text-sm">за 1 кг ПЭТ-бутылок</p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid sm:grid-cols-4 gap-4 mb-10 max-w-3xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-colors">
            <Recycle className="w-8 h-8 text-emerald-300 mx-auto mb-2" />
            <p className="text-white font-medium">Сбор пластика</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-colors">
            <Sparkles className="w-8 h-8 text-yellow-300 mx-auto mb-2" />
            <p className="text-white font-medium">Баллы и скидки</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-colors">
            <Gift className="w-8 h-8 text-cyan-300 mx-auto mb-2" />
            <p className="text-white font-medium">Трать у партнеров</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-colors">
            <Leaf className="w-8 h-8 text-green-300 mx-auto mb-2" />
            <p className="text-white font-medium">Чистые степи</p>
          </div>
        </div>

        <button
          onClick={scrollToRewards}
          className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors animate-bounce"
        >
          <span>Узнать больше</span>
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
}

function AppContent() {
  const [demoUser, setDemoUser] = useState<DemoUser | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  const handleDemoLogin = () => {
    setDemoUser({
      email: 'demo@ecoaktau.kz',
      points: 0, // Start with 0 - user earns points after courier weighs bottles
    });
    setShowDashboard(true);
  };

  const handleLogout = () => {
    setDemoUser(null);
  };

  const handlePointsChange = (newPoints: number) => {
    if (demoUser) {
      setDemoUser({ ...demoUser, points: newPoints });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar
        demoUser={demoUser}
        onLogout={handleLogout}
        onOpenAuth={() => setShowAuth(true)}
        onOpenDashboard={() => setShowDashboard(true)}
      />
      <Hero />
      <RewardsCatalog />
      <StatsDashboard />
      <EcoMap />
      <PartnersSection />
      <Footer />

      {/* Floating Action Button for logged-in users */}
      {demoUser && (
        <button
          onClick={() => setShowDashboard(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-emerald-500 to-cyan-600 rounded-full flex items-center justify-center shadow-xl shadow-emerald-500/30 hover:scale-110 transition-transform z-40 animate-pulse-green"
          title="Личный кабинет"
        >
          <User className="w-6 h-6 text-white" />
        </button>
      )}

      <AuthModal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        onDemoLogin={handleDemoLogin}
      />
      <UserDashboard
        isOpen={showDashboard}
        onClose={() => setShowDashboard(false)}
        demoUser={demoUser}
        onPointsChange={handlePointsChange}
      />
    </div>
  );
}

export default function App() {
  return <AppContent />;
}
