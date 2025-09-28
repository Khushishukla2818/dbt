import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/hooks/use-language";
import { getTranslation } from "@/lib/translations";
import { quizQuestions, type QuizQuestion } from "@/lib/quiz-data";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Trophy, Award, Medal } from "lucide-react";

export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<string>("");
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const { language } = useLanguage();
  const { toast } = useToast();

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;

  const submitQuizMutation = useMutation({
    mutationFn: async (quizData: { studentName: string; score: number; totalQuestions: number }) => {
      const response = await apiRequest('POST', '/api/quiz/submit', quizData);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Quiz Submitted",
        description: "Your quiz results have been saved successfully!",
      });
    }
  });

  const handleAnswerSelect = (value: string) => {
    setCurrentAnswer(value);
  };

  const handleNext = () => {
    const answerIndex = parseInt(currentAnswer);
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      // Check if next question has a saved answer
      const nextAnswer = newAnswers[currentQuestionIndex + 1];
      setCurrentAnswer(nextAnswer !== undefined ? nextAnswer.toString() : "");
    } else {
      // Calculate final score and show results
      const finalScore = calculateScore(newAnswers);
      setScore(finalScore);
      setShowResults(true);
      
      // Submit quiz results
      submitQuizMutation.mutate({
        studentName: "Anonymous Student",
        score: finalScore,
        totalQuestions: quizQuestions.length
      });
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      const previousAnswer = selectedAnswers[currentQuestionIndex - 1];
      setCurrentAnswer(previousAnswer !== undefined ? previousAnswer.toString() : "");
    }
  };

  const calculateScore = (answers: number[]) => {
    return answers.reduce((total, answer, index) => {
      return total + (answer === quizQuestions[index].correct ? 1 : 0);
    }, 0);
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setCurrentAnswer("");
    setShowResults(false);
    setScore(0);
  };

  const getBadgeInfo = () => {
    const percentage = (score / quizQuestions.length) * 100;
    
    if (percentage === 100) {
      return {
        icon: <Trophy className="w-16 h-16 text-yellow-500" />,
        title: "Perfect Score!",
        message: "You're a DBT expert! Share your knowledge with others.",
        color: "text-yellow-500"
      };
    } else if (percentage >= 80) {
      return {
        icon: <Award className="w-16 h-16 text-blue-500" />,
        title: "Excellent Work!",
        message: "You have a great understanding of DBT accounts!",
        color: "text-blue-500"
      };
    } else if (percentage >= 60) {
      return {
        icon: <Medal className="w-16 h-16 text-orange-500" />,
        title: "Good Job!",
        message: "You're on the right track! Review the learning content for better results.",
        color: "text-orange-500"
      };
    } else {
      return {
        icon: <div className="w-16 h-16 flex items-center justify-center text-4xl">📚</div>,
        title: "Keep Learning!",
        message: "Review the awareness section and try again to improve your score.",
        color: "text-muted-foreground"
      };
    }
  };

  if (showResults) {
    const badgeInfo = getBadgeInfo();
    
    return (
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Quiz Complete!</h2>
          <p className="text-muted-foreground">Here are your results</p>
        </div>

        <Card className="card-shadow">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <div className="mb-4" data-testid="quiz-badge">
                {badgeInfo.icon}
              </div>
              <h3 className={`text-2xl font-bold mb-2 ${badgeInfo.color}`} data-testid="quiz-result-title">
                {badgeInfo.title}
              </h3>
              <p className="text-muted-foreground mb-4" data-testid="quiz-result-message">
                {badgeInfo.message}
              </p>
              <div className="bg-primary/10 rounded-lg p-4 inline-block">
                <div className="text-3xl font-bold text-primary" data-testid="final-score">
                  {score}/{quizQuestions.length}
                </div>
                <div className="text-sm text-muted-foreground">Final Score</div>
              </div>
            </div>
            <Button onClick={restartQuiz} size="lg" data-testid="restart-quiz-button">
              {getTranslation('quiz.restart', language)}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">
          {getTranslation('quiz.title', language)}
        </h2>
        <p className="text-muted-foreground">
          {getTranslation('quiz.subtitle', language)}
        </p>
      </div>

      <Card className="card-shadow">
        <CardContent className="p-6">
          {/* Progress */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium" data-testid="quiz-progress">
                {getTranslation('quiz.progress', language)} {currentQuestionIndex + 1} of {quizQuestions.length}
              </span>
              <span className="text-sm text-muted-foreground" data-testid="quiz-current-score">
                {getTranslation('quiz.score', language)}: {score}/{quizQuestions.length}
              </span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>

          {/* Question */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4" data-testid="quiz-question">
              {language === 'hi' ? currentQuestion.questionHi : currentQuestion.question}
            </h3>
            
            <RadioGroup value={currentAnswer} onValueChange={handleAnswerSelect}>
              <div className="space-y-3">
                {(language === 'hi' ? currentQuestion.optionsHi : currentQuestion.options).map((option, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-muted transition-colors">
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label 
                      htmlFor={`option-${index}`} 
                      className="flex-1 cursor-pointer text-sm"
                      data-testid={`quiz-option-${index}`}
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              data-testid="quiz-previous-button"
            >
              {getTranslation('quiz.previous', language)}
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={!currentAnswer}
              data-testid="quiz-next-button"
            >
              {currentQuestionIndex === quizQuestions.length - 1 
                ? getTranslation('quiz.submit', language)
                : getTranslation('quiz.next', language)}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
