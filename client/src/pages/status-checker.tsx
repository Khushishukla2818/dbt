import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/hooks/use-language";
import { getTranslation } from "@/lib/translations";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface StatusResult {
  success: boolean;
  data?: {
    name: string;
    dbtEnabled: boolean;
  };
  status?: string;
  message?: string;
}

export default function StatusChecker() {
  const [aadhaar, setAadhaar] = useState("");
  const [result, setResult] = useState<StatusResult | null>(null);
  const { language } = useLanguage();
  const { toast } = useToast();

  const checkStatusMutation = useMutation({
    mutationFn: async (aadhaarNumber: string) => {
      // Use fetch directly to handle 404 properly, instead of apiRequest which throws on non-200
      const response = await fetch('/api/aadhaar/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ aadhaar: aadhaarNumber })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 404) {
          // Handle 404 as a valid "not found" result
          return {
            success: false,
            status: "not_found",
            message: errorData.message || "Aadhaar number not found in database"
          };
        }
        throw new Error(errorData.message || 'Network error');
      }
      
      return response.json();
    },
    onSuccess: (data: StatusResult) => {
      setResult(data);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: "Failed to check status. Please try again.",
        variant: "destructive"
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!/^\d{12}$/.test(aadhaar)) {
      toast({
        title: "Invalid Input",
        description: "Please enter a valid 12-digit Aadhaar number",
        variant: "destructive"
      });
      return;
    }

    checkStatusMutation.mutate(aadhaar);
  };

  const renderResult = () => {
    if (!result) return null;

    if (result.status === "not_found") {
      return (
        <Card className="mt-6 border-l-4 border-destructive bg-destructive/10">
          <CardContent className="p-4">
            <div className="flex items-center">
              <span className="text-2xl mr-3">❌</span>
              <div>
                <h4 className="font-semibold text-destructive" data-testid="status-not-found-title">Aadhaar Not Found</h4>
                <p className="text-sm text-muted-foreground" data-testid="status-not-found-message">
                  This Aadhaar number is not in our database.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }

    if (result.data?.dbtEnabled) {
      return (
        <Card className="mt-6 border-l-4 border-secondary bg-secondary/10">
          <CardContent className="p-4">
            <div className="flex items-center">
              <span className="text-2xl mr-3">✅</span>
              <div className="flex-1">
                <h4 className="font-semibold text-secondary" data-testid="status-enabled-title">
                  DBT-Enabled Account
                </h4>
                <p className="text-sm text-muted-foreground" data-testid="status-enabled-message">
                  Hello {result.data.name}! Your account is ready to receive scholarships.
                </p>
              </div>
            </div>
            <div className="mt-4 p-3 bg-secondary/5 rounded-lg">
              <h5 className="font-medium text-sm mb-2">✨ Benefits Active:</h5>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Direct scholarship transfers</li>
                <li>• Real-time transaction alerts</li>
                <li>• Secure Aadhaar-based verification</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      );
    } else {
      return (
        <Card className="mt-6 border-l-4 border-accent bg-accent/10">
          <CardContent className="p-4">
            <div className="flex items-center">
              <span className="text-2xl mr-3">⚠️</span>
              <div className="flex-1">
                <h4 className="font-semibold text-accent" data-testid="status-not-enabled-title">
                  Account Not DBT-Enabled
                </h4>
                <p className="text-sm text-muted-foreground" data-testid="status-not-enabled-message">
                  Hello {result.data?.name}! Your account needs DBT setup to receive scholarships.
                </p>
              </div>
            </div>
            <div className="mt-4 p-3 bg-accent/5 rounded-lg">
              <h5 className="font-medium text-sm mb-2">🚀 Next Steps:</h5>
              <ol className="text-xs text-muted-foreground space-y-1">
                <li>1. Visit your bank branch with Aadhaar card</li>
                <li>2. Fill Aadhaar seeding form</li>
                <li>3. Wait 7-15 days for activation</li>
                <li>4. Check status again</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      );
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">
          {getTranslation('status.title', language)}
        </h2>
        <p className="text-muted-foreground">
          {getTranslation('status.subtitle', language)}
        </p>
      </div>

      <Card className="card-shadow">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="aadhaar" className="text-sm font-medium">
                {getTranslation('status.form.label', language)}
              </Label>
              <Input
                id="aadhaar"
                type="text"
                value={aadhaar}
                onChange={(e) => setAadhaar(e.target.value.replace(/\D/g, '').slice(0, 12))}
                placeholder={getTranslation('status.form.placeholder', language)}
                maxLength={12}
                className="mt-2"
                data-testid="aadhaar-input"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {getTranslation('status.form.privacy', language)}
              </p>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={checkStatusMutation.isPending}
              data-testid="check-status-button"
            >
              {checkStatusMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Checking...
                </>
              ) : (
                getTranslation('status.form.button', language)
              )}
            </Button>
          </form>

          {renderResult()}
        </CardContent>
      </Card>

      {/* Demo Data Info */}
      <Card className="bg-muted/50">
        <CardContent className="p-4">
          <h4 className="font-medium mb-2" data-testid="demo-title">
            Demo Data (for testing)
          </h4>
          <div className="text-sm text-muted-foreground space-y-1">
            <div><strong>123456789012</strong> - Rahul Kumar (DBT Enabled ✅)</div>
            <div><strong>987654321098</strong> - Anita Sharma (Not DBT Enabled ⚠️)</div>
            <div><strong>555666777888</strong> - Priya Singh (DBT Enabled ✅)</div>
            <div>Other numbers will show "Not Found" ❌</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
