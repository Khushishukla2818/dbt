import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/hooks/use-language";
import { getTranslation } from "@/lib/translations";

const navItems = [
  { path: '/', key: 'nav.dashboard', testId: 'nav-dashboard' },
  { path: '/status', key: 'nav.status', testId: 'nav-status' },
  { path: '/awareness', key: 'nav.awareness', testId: 'nav-awareness' },
  { path: '/quiz', key: 'nav.quiz', testId: 'nav-quiz' },
  { path: '/analytics', key: 'nav.analytics', testId: 'nav-analytics' }
];

export function Navigation() {
  const [location] = useLocation();
  const { language } = useLanguage();

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-1 overflow-x-auto">
          {navItems.map(({ path, key, testId }) => {
            const isActive = location === path;
            return (
              <Link key={path} href={path}>
                <button
                  className={cn(
                    "px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors",
                    isActive
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                  )}
                  data-testid={testId}
                >
                  {getTranslation(key, language)}
                </button>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
