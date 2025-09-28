import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useLanguage } from "@/hooks/use-language";
import { getTranslation } from "@/lib/translations";
import { Search, BookOpen, MessageCircle, Trophy } from "lucide-react";

export default function Dashboard() {
  const { language } = useLanguage();

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="gradient-bg rounded-xl p-6 md:p-8 text-primary-foreground">
        <div className="flex flex-col md:flex-row items-center">
          <div className="flex-1 mb-6 md:mb-0">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {getTranslation('dashboard.hero.title', language)}
            </h2>
            <p className="text-lg opacity-90 mb-6">
              {getTranslation('dashboard.hero.subtitle', language)}
            </p>
            <Link href="/status">
              <Button 
                variant="secondary" 
                size="lg"
                data-testid="hero-cta-button"
              >
                {getTranslation('dashboard.hero.cta', language)}
              </Button>
            </Link>
          </div>
          <div className="w-full md:w-80">
            <img 
              src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Digital banking illustration" 
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="card-shadow">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                <span className="text-2xl">✅</span>
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-secondary" data-testid="stat-enabled-count">78%</h3>
                <p className="text-muted-foreground text-sm">
                  {getTranslation('dashboard.stats.enabled', language)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-shadow">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <span className="text-2xl">⚠️</span>
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-accent" data-testid="stat-pending-count">22%</h3>
                <p className="text-muted-foreground text-sm">
                  {getTranslation('dashboard.stats.pending', language)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-shadow">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🎓</span>
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-primary" data-testid="stat-total-count">2,458</h3>
                <p className="text-muted-foreground text-sm">
                  {getTranslation('dashboard.stats.students', language)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Differences */}
      <Card className="card-shadow">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-6" data-testid="differences-title">
            Key Differences
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-border rounded-lg p-4">
              <div className="flex items-center mb-3">
                <span className="text-2xl mr-3">🔗</span>
                <h4 className="font-semibold">Aadhaar-Linked Account</h4>
              </div>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Basic account connection with Aadhaar</li>
                <li>• Used for KYC verification</li>
                <li>• Cannot receive direct benefit transfers</li>
              </ul>
            </div>
            
            <div className="border border-secondary border-2 rounded-lg p-4 bg-secondary/5">
              <div className="flex items-center mb-3">
                <span className="text-2xl mr-3">💳</span>
                <h4 className="font-semibold text-secondary">DBT-Enabled Account</h4>
              </div>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Aadhaar-seeded and NPCI registered</li>
                <li>• Receives scholarships directly</li>
                <li>• Real-time transaction updates</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href="/status">
          <Button 
            className="w-full h-24 bg-primary hover:bg-primary/90 flex-col gap-2"
            data-testid="action-check-status"
          >
            <Search className="w-6 h-6" />
            <span>Check Status</span>
          </Button>
        </Link>
        
        <Link href="/awareness">
          <Button 
            className="w-full h-24 bg-secondary hover:bg-secondary/90 flex-col gap-2"
            data-testid="action-learn"
          >
            <BookOpen className="w-6 h-6" />
            <span>Learn More</span>
          </Button>
        </Link>
        
        <Button 
          className="w-full h-24 bg-accent hover:bg-accent/90 flex-col gap-2 text-accent-foreground"
          data-testid="action-chat"
        >
          <MessageCircle className="w-6 h-6" />
          <span>Get Help</span>
        </Button>
        
        <Link href="/quiz">
          <Button 
            variant="outline" 
            className="w-full h-24 hover:bg-accent hover:text-accent-foreground flex-col gap-2"
            data-testid="action-quiz"
          >
            <Trophy className="w-6 h-6" />
            <span>Take Quiz</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
