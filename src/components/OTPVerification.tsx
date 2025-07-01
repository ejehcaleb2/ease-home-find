
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

interface OTPVerificationProps {
  email: string;
  password: string;
  fullName: string;
  onBack: () => void;
  onSuccess: () => void;
  demoOTP?: string;
}

const OTPVerification = ({ email, password, fullName, onBack, onSuccess, demoOTP }: OTPVerificationProps) => {
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const { toast } = useToast();
  const { verifyOTP } = useAuth();

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a 6-digit OTP code",
        variant: "destructive",
      });
      return;
    }

    setIsVerifying(true);

    const { error } = await verifyOTP(email, otp, password, fullName);

    if (error) {
      toast({
        title: "Verification Failed",
        description: error,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Account Created Successfully!",
        description: "Please login to continue",
      });
      onSuccess();
    }

    setIsVerifying(false);
  };

  return (
    <Card className="shadow-xl">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">Verify Your Email</CardTitle>
        <CardDescription className="text-center">
          We've sent a 6-digit code to {email}
        </CardDescription>
        {demoOTP && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-sm text-yellow-800">
              <strong>Demo OTP:</strong> {demoOTP}
            </p>
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="otp">Enter OTP Code</Label>
          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={(value) => setOtp(value)}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </div>

        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={onBack}
            className="flex-1"
            disabled={isVerifying}
          >
            Back
          </Button>
          <Button
            onClick={handleVerifyOTP}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
            disabled={isVerifying || otp.length !== 6}
          >
            {isVerifying ? "Verifying..." : "Verify & Create Account"}
          </Button>
        </div>

        <div className="text-center text-sm text-gray-600">
          <p>Didn't receive the code?</p>
          <button className="text-blue-600 hover:text-blue-500 font-medium">
            Resend OTP
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OTPVerification;
