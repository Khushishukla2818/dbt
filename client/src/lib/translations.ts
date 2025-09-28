export interface Translations {
  [key: string]: {
    en: string;
    hi: string;
  };
}

export const translations: Translations = {
  // Header
  'header.title': {
    en: 'DBT Awareness Hub',
    hi: 'डीबीटी जागरूकता हब'
  },
  
  // Navigation
  'nav.dashboard': {
    en: 'Dashboard',
    hi: 'डैशबोर्ड'
  },
  'nav.status': {
    en: 'Check Status',
    hi: 'स्थिति जांचें'
  },
  'nav.awareness': {
    en: 'Learn',
    hi: 'सीखें'
  },
  'nav.quiz': {
    en: 'Quiz',
    hi: 'प्रश्नोत्तरी'
  },
  'nav.analytics': {
    en: 'Analytics',
    hi: 'विश्लेषण'
  },

  // Dashboard
  'dashboard.hero.title': {
    en: 'Secure Your Scholarship with DBT-Enabled Accounts',
    hi: 'डीबीटी-सक्षम खातों के साथ अपनी छात्रवृत्ति सुरक्षित करें'
  },
  'dashboard.hero.subtitle': {
    en: 'Learn the difference between Aadhaar-linked and DBT-enabled accounts to ensure seamless scholarship transfers.',
    hi: 'निर्बाध छात्रवृत्ति स्थानांतरण सुनिश्चित करने के लिए आधार-लिंक और डीबीटी-सक्षम खातों के बीच अंतर जानें।'
  },
  'dashboard.hero.cta': {
    en: 'Check Your DBT Status',
    hi: 'अपनी डीबीटी स्थिति जांचें'
  },
  'dashboard.stats.enabled': {
    en: 'Students DBT-Enabled',
    hi: 'डीबीटी-सक्षम छात्र'
  },
  'dashboard.stats.pending': {
    en: 'Need DBT Setup',
    hi: 'डीबीटी सेटअप आवश्यक'
  },
  'dashboard.stats.students': {
    en: 'Total Students',
    hi: 'कुल छात्र'
  },

  // Status Checker
  'status.title': {
    en: 'Check Your DBT Status',
    hi: 'अपनी डीबीटी स्थिति जांचें'
  },
  'status.subtitle': {
    en: 'Enter your Aadhaar number to check if your account is DBT-enabled',
    hi: 'अपना आधार नंबर दर्ज करें यह जांचने के लिए कि आपका खाता डीबीटी-सक्षम है या नहीं'
  },
  'status.form.label': {
    en: 'Aadhaar Number (12 digits)',
    hi: 'आधार नंबर (12 अंक)'
  },
  'status.form.placeholder': {
    en: 'Enter 12-digit Aadhaar number',
    hi: '12-अंकीय आधार नंबर दर्ज करें'
  },
  'status.form.button': {
    en: 'Check DBT Status',
    hi: 'डीबीटी स्थिति जांचें'
  },
  'status.form.privacy': {
    en: '🔒 Your Aadhaar data is secure and not stored',
    hi: '🔒 आपका आधार डेटा सुरक्षित है और संग्रहीत नहीं है'
  },

  // Quiz
  'quiz.title': {
    en: 'Test Your Knowledge',
    hi: 'अपना ज्ञान परखें'
  },
  'quiz.subtitle': {
    en: 'Complete this quiz to earn your DBT Expert badge!',
    hi: 'अपना डीबीटी विशेषज्ञ बैज अर्जित करने के लिए यह प्रश्नोत्तरी पूरी करें!'
  },
  'quiz.progress': {
    en: 'Question',
    hi: 'प्रश्न'
  },
  'quiz.score': {
    en: 'Score',
    hi: 'स्कोर'
  },
  'quiz.next': {
    en: 'Next',
    hi: 'आगे'
  },
  'quiz.previous': {
    en: 'Previous',
    hi: 'पिछला'
  },
  'quiz.submit': {
    en: 'Submit Quiz',
    hi: 'प्रश्नोत्तरी जमा करें'
  },
  'quiz.restart': {
    en: 'Take Quiz Again',
    hi: 'दोबारा प्रश्नोत्तरी लें'
  },

  // Chatbot
  'chatbot.title': {
    en: 'DBT Help Assistant',
    hi: 'डीबीटी सहायता सहायक'
  },
  'chatbot.welcome': {
    en: '👋 Hello! I\'m here to help you with DBT-related questions.',
    hi: '👋 नमस्कार! मैं डीबीटी संबंधित प्रश्नों में आपकी सहायता के लिए यहाँ हूँ।'
  },
  'chatbot.placeholder': {
    en: 'Type your question...',
    hi: 'अपना प्रश्न टाइप करें...'
  },
  'chatbot.send': {
    en: 'Send',
    hi: 'भेजें'
  },

  // Analytics
  'analytics.title': {
    en: 'DBT Readiness Analytics',
    hi: 'डीबीटी तत्परता विश्लेषण'
  },
  'analytics.overview': {
    en: 'Overall Statistics',
    hi: 'समग्र आंकड़े'
  },
  'analytics.regional': {
    en: 'Regional Breakdown',
    hi: 'क्षेत्रीय विभाजन'
  }
};

export function getTranslation(key: string, language: 'en' | 'hi'): string {
  return translations[key]?.[language] || key;
}
