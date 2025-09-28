export interface ChatbotResponse {
  en: string;
  hi: string;
}

export const chatbotResponses: Record<string, ChatbotResponse> = {
  welcome: {
    en: "👋 Hello! I'm here to help you with DBT-related questions. Try asking:\n• How to enable DBT?\n• What documents do I need?\n• Difference between accounts?",
    hi: "👋 नमस्कार! मैं डीबीटी संबंधित प्रश्नों में आपकी सहायता के लिए यहाँ हूँ। पूछने का प्रयास करें:\n• डीबीटी कैसे सक्षम करें?\n• मुझे किन दस्तावेजों की आवश्यकता है?\n• खातों के बीच अंतर?"
  },
  enable_dbt: {
    en: "To enable DBT: 1) Visit your bank branch 2) Carry Aadhaar card and passbook 3) Fill Aadhaar seeding form 4) Wait 7-15 days for activation.",
    hi: "डीबीटी सक्षम करने के लिए: 1) अपनी बैंक शाखा में जाएं 2) आधार कार्ड और पासबुक लेकर जाएं 3) आधार सीडिंग फॉर्म भरें 4) सक्रियकरण के लिए 7-15 दिन प्रतीक्षा करें।"
  },
  documents: {
    en: "You need: Original Aadhaar card, Bank passbook, and filled Aadhaar seeding form (provided by bank).",
    hi: "आपको चाहिए: मूल आधार कार्ड, बैंक पासबुक, और भरा हुआ आधार सीडिंग फॉर्म (बैंक द्वारा प्रदान किया गया)।"
  },
  difference: {
    en: "Aadhaar-linked account is for KYC only. DBT-enabled account can receive direct benefit transfers like scholarships.",
    hi: "आधार-लिंक खाता केवल केवाईसी के लिए है। डीबीटी-सक्षम खाता छात्रवृत्ति जैसे प्रत्यक्ष लाभ स्थानांतरण प्राप्त कर सकता है।"
  },
  timeline: {
    en: "DBT activation typically takes 7-15 business days after successful Aadhaar seeding at your bank.",
    hi: "आपके बैंक में सफल आधार सीडिंग के बाद डीबीटी सक्रियकरण में आमतौर पर 7-15 कार्यदिवस लगते हैं।"
  },
  default: {
    en: "I can help you with DBT setup, required documents, account differences, and activation timeline. What would you like to know?",
    hi: "मैं डीबीटी सेटअप, आवश्यक दस्तावेज, खाता अंतर, और सक्रियकरण समयसीमा में आपकी सहायता कर सकता हूँ। आप क्या जानना चाहेंगे?"
  }
};

export function generateBotResponse(message: string, language: 'en' | 'hi'): string {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('enable') || lowerMessage.includes('setup') || lowerMessage.includes('how') || lowerMessage.includes('सक्षम') || lowerMessage.includes('सेटअप')) {
    return chatbotResponses.enable_dbt[language];
  } else if (lowerMessage.includes('document') || lowerMessage.includes('need') || lowerMessage.includes('दस्तावेज') || lowerMessage.includes('चाहिए')) {
    return chatbotResponses.documents[language];
  } else if (lowerMessage.includes('difference') || lowerMessage.includes('linked') || lowerMessage.includes('enabled') || lowerMessage.includes('अंतर') || lowerMessage.includes('लिंक')) {
    return chatbotResponses.difference[language];
  } else if (lowerMessage.includes('time') || lowerMessage.includes('long') || lowerMessage.includes('समय') || lowerMessage.includes('कितना')) {
    return chatbotResponses.timeline[language];
  } else {
    return chatbotResponses.default[language];
  }
}
