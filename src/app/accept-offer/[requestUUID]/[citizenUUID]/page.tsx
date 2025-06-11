'use client';

import { useAcceptJob } from "@/mutations/api/requests";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import Link from "next/link";

export default function AcceptOffer() {
  const { requestUUID, citizenUUID } = useParams();

  const { mutate: acceptJob, status, error } = useAcceptJob(() => {

  });

  useEffect(() => {
    if (!citizenUUID || !requestUUID) return;

    acceptJob({
      candidateUUID: citizenUUID as string,
      requestUUID: requestUUID as string
    });
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-background to-background/95">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            {status === 'loading' && 'Processing Your Acceptance'}
            {status === 'success' && 'Congratulations!'}
            {status === 'error' && 'An Error Occurred'}
          </CardTitle>
          <CardDescription>
            {status === 'loading' && 'Please wait while we process your acceptance...'}
            {status === 'success' && 'You have successfully accepted the job offer'}
            {status === 'error' && error}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6">
          {status === 'loading' && (
            <Loader2 className="h-16 w-16 text-primary animate-spin" />
          )}
          
          {status === 'success' && (
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