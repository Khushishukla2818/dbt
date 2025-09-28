import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";
import { getTranslation } from "@/lib/translations";
import { ChevronDown, ChevronUp, Play, FileText, Target, HelpCircle } from "lucide-react";

export default function Awareness() {
  const { language } = useLanguage();
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);

  const toggleFAQ = (faqId: string) => {
    setOpenFAQ(openFAQ === faqId ? null : faqId);
  };

  const faqData = [
    {
      id: 'faq1',
      question: language === 'hi' ? 'डीबीटी सेटअप के लिए कौन से दस्तावेज आवश्यक हैं?' : 'What documents do I need for DBT setup?',
      answer: language === 'hi' ? 'आपको अपना मूल आधार कार्ड, बैंक पासबुक, और बैंक स्टाफ द्वारा प्रदान किया गया भरा हुआ आधार सीडिंग फॉर्म चाहिए।' : 'You need your original Aadhaar card, bank passbook, and a filled Aadhaar seeding form provided by bank staff.'
    },
    {
      id: 'faq2',
      question: language === 'hi' ? 'डीबीटी सक्रियकरण में कितना समय लगता है?' : 'How long does DBT activation take?',
      answer: language === 'hi' ? 'सफल आधार सीडिंग के बाद डीबीटी सक्रियकरण में आमतौर पर 7-15 कार्यदिवस लगते हैं।' : 'DBT activation typically takes 7-15 business days after successful Aadhaar seeding.'
    },
    {
      id: 'faq3',
      question: language === 'hi' ? 'क्या मैं इसे ऑनलाइन कर सकता हूँ?' : 'Can I do this online?',
      answer: language === 'hi' ? 'कुछ बैंक नेट बैंकिंग के माध्यम से ऑनलाइन आधार सीडिंग प्रदान करते हैं, लेकिन शाखा में जाना सबसे विश्वसनीय तरीका है।' : 'Some banks offer online Aadhaar seeding through net banking, but visiting the branch is the most reliable method.'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">
          Understanding DBT-Enabled accounts
        </h2>
        <p className="text-muted-foreground">
          Complete guide to setting up and understanding DBT-enabled accounts
        </p>
      </div>

      {/* Step-by-Step Guide and Benefits */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="card-shadow">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-3 text-primary" />
              Step-by-Step Guide
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1">
                  1
                </div>
                <div>
                  <h4 className="font-medium" data-testid="step-1-title">Visit Your Bank Branch</h4>
                  <p className="text-sm text-muted-foreground">Carry your Aadhaar card and bank passbook</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1">
                  2
                </div>
                <div>
                  <h4 className="font-medium" data-testid="step-2-title">Request Aadhaar Seeding</h4>
                  <p className="text-sm text-muted-foreground">Fill the Aadhaar seeding form provided by bank staff</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1">
                  3
                </div>
                <div>
                  <h4 className="font-medium" data-testid="step-3-title">Verification Process</h4>
                  <p className="text-sm text-muted-foreground">Bank will verify your details with UIDAI database</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1">
                  4
                </div>
                <div>
                  <h4 className="font-medium text-secondary" data-testid="step-4-title">DBT Activation Complete</h4>
                  <p className="text-sm text-muted-foreground">Your account is now ready to receive scholarships</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Benefits Section */}
        <Card className="card-shadow">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Target className="w-5 h-5 mr-3 text-secondary" />
              Benefits of DBT
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center p-3 bg-secondary/10 rounded-lg">
                <span className="text-xl mr-3">💰</span>
                <div>
                  <h4 className="font-medium text-sm" data-testid="benefit-1-title">Direct Transfer</h4>
                  <p className="text-xs text-muted-foreground">Receive scholarships instantly</p>
                </div>
              </div>
              
              <div className="flex items-center p-3 bg-primary/10 rounded-lg">
                <span className="text-xl mr-3">🔒</span>
                <div>
                  <h4 className="font-medium text-sm" data-testid="benefit-2-title">Secure & Transparent</h4>
                  <p className="text-xs text-muted-foreground">Track every transaction</p>
                </div>
              </div>
              
              <div className="flex items-center p-3 bg-accent/10 rounded-lg">
                <span className="text-xl mr-3">⚡</span>
                <div>
                  <h4 className="font-medium text-sm" data-testid="benefit-3-title">No Delays</h4>
                  <p className="text-xs text-muted-foreground">Eliminate middleman delays</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Video Tutorial */}
      <Card className="card-shadow">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Play className="w-5 h-5 mr-3 text-primary" />
            Video Tutorial
          </h3>
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600" 
              alt="Students learning about digital banking" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <Button 
                size="lg" 
                className="w-16 h-16 rounded-full bg-white/90 text-black hover:bg-white"
                data-testid="video-play-button"
              >
                <Play className="w-6 h-6 ml-1" />
              </Button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Watch our step-by-step video guide on setting up DBT-enabled accounts 
            (Available in Hindi and regional languages)
          </p>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <Card className="card-shadow">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <HelpCircle className="w-5 h-5 mr-3 text-accent" />
            Frequently Asked Questions
          </h3>
          
          <div className="space-y-4">
            {faqData.map((faq) => (
              <div key={faq.id} className="border border-border rounded-lg">
                <Button
                  variant="ghost"
                  className="w-full justify-between p-4 h-auto text-left font-medium hover:bg-muted"
                  onClick={() => toggleFAQ(faq.id)}
                  data-testid={`faq-toggle-${faq.id}`}
                >
                  <span>{faq.question}</span>
                  {openFAQ === faq.id ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </Button>
                {openFAQ === faq.id && (
                  <div className="px-4 pb-4 text-sm text-muted-foreground" data-testid={`faq-answer-${faq.id}`}>
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
