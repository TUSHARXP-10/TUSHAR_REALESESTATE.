import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { IndianRupee, Calculator } from "lucide-react";

export const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  const calculateEMI = () => {
    const principal = loanAmount;
    const ratePerMonth = interestRate / 12 / 100;
    const numberOfMonths = tenure * 12;

    const emi =
      (principal * ratePerMonth * Math.pow(1 + ratePerMonth, numberOfMonths)) /
      (Math.pow(1 + ratePerMonth, numberOfMonths) - 1);

    const totalAmount = emi * numberOfMonths;
    const totalInterest = totalAmount - principal;

    return {
      emi: Math.round(emi),
      totalAmount: Math.round(totalAmount),
      totalInterest: Math.round(totalInterest),
      principal: Math.round(principal),
    };
  };

  const result = calculateEMI();

  return (
    <Card className="w-full shadow-medium">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Calculator className="h-6 w-6 text-primary" />
          <CardTitle className="text-2xl">EMI Calculator</CardTitle>
        </div>
        <CardDescription>
          Calculate your monthly home loan payments instantly
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Loan Amount */}
        <div className="space-y-2">
          <Label htmlFor="loanAmount">Loan Amount (₹)</Label>
          <Input
            id="loanAmount"
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            className="text-lg"
          />
          <Slider
            value={[loanAmount]}
            onValueChange={([value]) => setLoanAmount(value)}
            min={500000}
            max={50000000}
            step={100000}
            className="mt-2"
          />
          <p className="text-sm text-muted-foreground">
            ₹{loanAmount.toLocaleString('en-IN')}
          </p>
        </div>

        {/* Interest Rate */}
        <div className="space-y-2">
          <Label htmlFor="interestRate">Interest Rate (% per annum)</Label>
          <Input
            id="interestRate"
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            step="0.1"
            className="text-lg"
          />
          <Slider
            value={[interestRate]}
            onValueChange={([value]) => setInterestRate(value)}
            min={5}
            max={15}
            step={0.1}
            className="mt-2"
          />
          <p className="text-sm text-muted-foreground">{interestRate}% p.a.</p>
        </div>

        {/* Tenure */}
        <div className="space-y-2">
          <Label htmlFor="tenure">Loan Tenure (Years)</Label>
          <Input
            id="tenure"
            type="number"
            value={tenure}
            onChange={(e) => setTenure(Number(e.target.value))}
            className="text-lg"
          />
          <Slider
            value={[tenure]}
            onValueChange={([value]) => setTenure(value)}
            min={1}
            max={30}
            step={1}
            className="mt-2"
          />
          <p className="text-sm text-muted-foreground">{tenure} Years</p>
        </div>

        {/* Results */}
        <div className="space-y-4 pt-6 border-t">
          <div className="bg-primary/10 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Monthly EMI</span>
              <div className="flex items-center gap-1">
                <IndianRupee className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold text-primary">
                  {result.emi.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-1">Principal Amount</p>
              <p className="text-lg font-semibold">
                ₹{result.principal.toLocaleString('en-IN')}
              </p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-1">Total Interest</p>
              <p className="text-lg font-semibold">
                ₹{result.totalInterest.toLocaleString('en-IN')}
              </p>
            </div>
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-xs text-muted-foreground mb-1">Total Amount Payable</p>
            <p className="text-xl font-bold">
              ₹{result.totalAmount.toLocaleString('en-IN')}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
