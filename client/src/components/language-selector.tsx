import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/hooks/use-language";

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <Select value={language} onValueChange={(value: 'en' | 'hi') => setLanguage(value)}>
      <SelectTrigger 
        className="w-32 bg-white/20 border-white/30 text-white"
        data-testid="language-selector"
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en" data-testid="language-option-en">English</SelectItem>
        <SelectItem value="hi" data-testid="language-option-hi">हिंदी</SelectItem>
      </SelectContent>
    </Select>
  );
}
