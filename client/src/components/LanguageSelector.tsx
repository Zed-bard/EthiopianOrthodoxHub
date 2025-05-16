import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Language, useLanguage, languageNames } from "@/lib/LanguageContext";

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  // Calculate the displayed value based on language
  const displayValue = language.length === 2 ? 
    // If it's a language code (en, am, etc.)
    (language === 'en' ? 'English' : 
     language === 'am' ? 'Amharic' :
     language === 'om' ? 'Afaan Oromoo' :
     language === 'ti' ? 'Tigrinya' : 'English') : 
    // Otherwise it's already the full name
    language;

  const handleLanguageChange = (value: string) => {
    // Map the display name to the language code if needed
    const languageCode = 
      value === 'English' ? 'en' :
      value === 'Amharic' ? 'am' :
      value === 'Afaan Oromoo' ? 'om' :
      value === 'Tigrinya' ? 'ti' : value;
      
    setLanguage(languageCode as Language);
  };

  return (
    <div className="flex items-center relative z-30">
      <Select value={displayValue} onValueChange={handleLanguageChange}>
        <SelectTrigger className="w-[150px] h-9 border-burgundy text-burgundy focus:ring-burgundy bg-white bg-opacity-95">
          <SelectValue placeholder="Select Language" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectItem value="English">English</SelectItem>
          <SelectItem value="Amharic">አማርኛ</SelectItem>
          <SelectItem value="Afaan Oromoo">Afaan Oromoo</SelectItem>
          <SelectItem value="Tigrinya">ትግርኛ</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;