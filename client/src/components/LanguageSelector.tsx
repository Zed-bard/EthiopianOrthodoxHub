import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Language, useLanguage } from "@/lib/LanguageContext";

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (value: string) => {
    setLanguage(value as Language);
  };

  return (
    <div className="flex items-center relative z-30">
      <Select value={language} onValueChange={handleLanguageChange}>
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