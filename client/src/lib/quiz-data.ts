export interface QuizQuestion {
  question: string;
  questionHi: string;
  options: string[];
  optionsHi: string[];
  correct: number;
  explanation: string;
  explanationHi: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    question: "What is required for receiving scholarships directly?",
    questionHi: "छात्रवृत्ति सीधे प्राप्त करने के लिए क्या आवश्यक है?",
    options: [
      "Aadhaar-linked account",
      "DBT-enabled account", 
      "Any bank account",
      "PAN card"
    ],
    optionsHi: [
      "आधार-लिंक खाता",
      "डीबीटी-सक्षम खाता",
      "कोई भी बैंक खाता", 
      "पैन कार्ड"
    ],
    correct: 1,
    explanation: "Only DBT-enabled accounts can receive direct benefit transfers like scholarships.",
    explanationHi: "केवल डीबीटी-सक्षम खाते ही छात्रवृत्ति जैसे प्रत्यक्ष लाभ स्थानांतरण प्राप्त कर सकते हैं।"
  },
  {
    question: "Is an Aadhaar-linked account the same as DBT-enabled account?",
    questionHi: "क्या आधार-लिंक खाता डीबीटी-सक्षम खाते के समान है?",
    options: [
      "Yes, they are exactly the same",
      "No, DBT requires additional setup",
      "Only for some banks",
      "Depends on account type"
    ],
    optionsHi: [
      "हाँ, वे बिल्कुल समान हैं",
      "नहीं, डीबीटी के लिए अतिरिक्त सेटअप की आवश्यकता है",
      "केवल कुछ बैंकों के लिए",
      "खाते के प्रकार पर निर्भर करता है"
    ],
    correct: 1,
    explanation: "DBT-enabled accounts require Aadhaar seeding and NPCI registration beyond basic linking.",
    explanationHi: "डीबीटी-सक्षम खातों के लिए बेसिक लिंकिंग के अतिरिक्त आधार सीडिंग और एनपीसीआई पंजीकरण की आवश्यकता होती है।"
  },
  {
    question: "Where should you go to make your account DBT-enabled?",
    questionHi: "अपने खाते को डीबीटी-सक्षम बनाने के लिए आपको कहाँ जाना चाहिए?",
    options: [
      "Post office",
      "Your bank branch",
      "Government office",
      "Online only"
    ],
    optionsHi: [
      "पोस्ट ऑफिस",
      "आपकी बैंक शाखा",
      "सरकारी कार्यालय",
      "केवल ऑनलाइन"
    ],
    correct: 1,
    explanation: "Visit your bank branch with Aadhaar card and passbook for Aadhaar seeding.",
    explanationHi: "आधार सीडिंग के लिए आधार कार्ड और पासबुक के साथ अपनी बैंक शाखा में जाएं।"
  },
  {
    question: "How long does DBT activation typically take?",
    questionHi: "डीबीटी सक्रियकरण में आमतौर पर कितना समय लगता है?",
    options: [
      "1-2 days",
      "7-15 business days",
      "1 month",
      "3 months"
    ],
    optionsHi: [
      "1-2 दिन",
      "7-15 कार्यदिवस",
      "1 महीना",
      "3 महीने"
    ],
    correct: 1,
    explanation: "DBT activation usually takes 7-15 business days after successful Aadhaar seeding.",
    explanationHi: "सफल आधार सीडिंग के बाद डीबीटी सक्रियकरण में आमतौर पर 7-15 कार्यदिवस लगते हैं।"
  },
  {
    question: "What is the main benefit of DBT-enabled accounts?",
    questionHi: "डीबीटी-सक्षम खातों का मुख्य लाभ क्या है?",
    options: [
      "Higher interest rates",
      "Free transactions",
      "Direct scholarship transfers",
      "Better customer service"
    ],
    optionsHi: [
      "उच्च ब्याज दरें",
      "मुफ्त लेन-देन",
      "प्रत्यक्ष छात्रवृत्ति स्थानांतरण",
      "बेहतर ग्राहक सेवा"
    ],
    correct: 2,
    explanation: "DBT-enabled accounts allow direct transfer of government benefits like scholarships.",
    explanationHi: "डीबीटी-सक्षम खाते छात्रवृत्ति जैसे सरकारी लाभों के प्रत्यक्ष स्थानांतरण की अनुमति देते हैं।"
  }
];
