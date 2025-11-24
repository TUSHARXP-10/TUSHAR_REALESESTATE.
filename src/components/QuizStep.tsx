import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";

interface Option {
  value: string;
  label: string;
  points?: number;
}

interface QuizStepProps {
  title: string;
  description?: string;
  type: "radio" | "checkbox" | "text" | "contact";
  options?: Option[];
  value: any;
  onChange: (value: any) => void;
  onNext: () => void;
  onBack?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
}

export const QuizStep = ({
  title,
  description,
  type,
  options = [],
  value,
  onChange,
  onNext,
  onBack,
  isFirst,
  isLast,
}: QuizStepProps) => {
  const handleCheckboxChange = (optionValue: string) => {
    const current = Array.isArray(value) ? value : [];
    if (current.includes(optionValue)) {
      onChange(current.filter((v: string) => v !== optionValue));
    } else {
      onChange([...current, optionValue]);
    }
  };

  const isValid = () => {
    if (type === "contact") {
      return value.name && (value.email || value.phone);
    }
    if (type === "checkbox") {
      return Array.isArray(value) && value.length > 0;
    }
    return value && value.length > 0;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-display font-bold mb-2">{title}</h2>
        {description && (
          <p className="text-muted-foreground">{description}</p>
        )}
      </div>

      <div className="space-y-4">
        {type === "radio" && (
          <RadioGroup value={value} onValueChange={onChange}>
            {options.map((option) => (
              <div
                key={option.value}
                className="flex items-center space-x-3 p-4 rounded-lg border-2 border-border hover:border-primary transition-colors cursor-pointer"
                onClick={() => onChange(option.value)}
              >
                <RadioGroupItem value={option.value} id={option.value} />
                <Label
                  htmlFor={option.value}
                  className="text-lg cursor-pointer flex-1"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )}

        {type === "checkbox" && (
          <div className="space-y-3">
            {options.map((option) => (
              <div
                key={option.value}
                className="flex items-center space-x-3 p-4 rounded-lg border-2 border-border hover:border-primary transition-colors cursor-pointer"
                onClick={() => handleCheckboxChange(option.value)}
              >
                <Checkbox
                  id={option.value}
                  checked={Array.isArray(value) && value.includes(option.value)}
                  onCheckedChange={() => handleCheckboxChange(option.value)}
                />
                <Label
                  htmlFor={option.value}
                  className="text-lg cursor-pointer flex-1"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        )}

        {type === "text" && (
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="text-lg p-4"
            placeholder="Type your answer..."
          />
        )}

        {type === "contact" && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={value.name || ""}
                onChange={(e) => onChange({ ...value, name: e.target.value })}
                className="mt-2"
                placeholder="John Doe"
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={value.email || ""}
                onChange={(e) => onChange({ ...value, email: e.target.value })}
                className="mt-2"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone *</Label>
              <Input
                id="phone"
                type="tel"
                value={value.phone || ""}
                onChange={(e) => onChange({ ...value, phone: e.target.value })}
                className="mt-2"
                placeholder="+91 98765 43210"
                required
              />
            </div>
            <p className="text-sm text-muted-foreground">
              * At least one contact method is required
            </p>
          </div>
        )}
      </div>

      <div className="flex gap-4">
        {!isFirst && (
          <Button onClick={onBack} variant="outline" className="flex-1">
            Back
          </Button>
        )}
        <Button
          onClick={onNext}
          disabled={!isValid()}
          className="flex-1"
        >
          {isLast ? "Submit" : "Next"}
        </Button>
      </div>
    </div>
  );
};