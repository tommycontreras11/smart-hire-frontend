"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAcceptJob } from "@/mutations/api/requests";
import { set } from "date-fns";
import { CheckCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function AcceptOffer() {
  const hasRun = useRef(false);
  const { requestUUID, citizenUUID } = useParams();

  const [localStatus, setLocalStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("loading");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { mutate: acceptJob } = useAcceptJob(() => {
    setLocalStatus("success");
  }, () => {
    setLocalStatus("error");
  });

  useEffect(() => {
    if (!citizenUUID || !requestUUID || hasRun.current) return;
    
    // Set hasRun to true to prevent multiple executions
    hasRun.current = true;

    acceptJob(
      {
        candidateUUID: citizenUUID as string,
        requestUUID: requestUUID as string,
      }
    );
  }, [citizenUUID, requestUUID, acceptJob]);

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-background to-background/95">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            {localStatus  === "loading" && "Processing Your Acceptance"}
            {localStatus  === "success" && "Congratulations!"}
            {localStatus  === "error" && "An Error Occurred"}
          </CardTitle>
          <CardDescription>
            {localStatus  === "loading" &&
              "Please wait while we process your acceptance..."}
            {localStatus  === "success" &&
              "You have successfully accepted the job offer"}
            {localStatus  === "error" && errorMessage}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6">
          {localStatus  === "loading" && (
            <Loader2 className="h-16 w-16 text-primary animate-spin" />
          )}

          {localStatus  === "success" && (
            <>
              <CheckCircle className="h-16 w-16 text-green-500" />
              <div className="text-center space-y-2">
                <p className="text-muted-foreground">
                  We will contact you soon with the next steps.
                </p>
                <Button asChild className="mt-4">
                  <Link href="/">Go to Dashboard</Link>
                </Button>
              </div>
            </>
          )}

          {/* {status === 'error' && (
            <>
              <XCircle className="h-16 w-16 text-destructive" />
              <div className="text-center space-y-2">
                <p className="text-muted-foreground">
                  If the problem persists, please contact support.
                </p>
                <Button asChild variant="outline" className="mt-4">
                  <Link href="/support">Contact Support</Link>
                </Button>
              </div>
            </>
          )} */}
        </CardContent>
      </Card>
    </main>
  );
}
