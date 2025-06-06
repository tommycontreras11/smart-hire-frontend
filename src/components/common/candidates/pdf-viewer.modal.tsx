"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Loader2
} from "lucide-react";
import { useState } from "react";

import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

interface PdfViewerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pdfUrl: string;
  candidateName: string;
}

export function PdfViewerModal({
  open,
  onOpenChange,
  pdfUrl,
  candidateName,
}: PdfViewerModalProps) {
  const [scale, setScale] = useState(1.0);
  const [loading, setLoading] = useState(true);

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-4xl h-[80vh]">
        <DialogHeader>
          <DialogTitle>{`${candidateName}'s`} CV</DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-auto flex justify-center">
          {loading && (
            <div className="flex items-center justify-center w-full">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          )}
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.10.111/build/pdf.worker.min.js">
            <Viewer
              fileUrl={pdfUrl}
              onDocumentLoad={() => setLoading(false)}
              defaultScale={scale}
              onZoom={(e) => setScale(e.scale)}
              renderLoader={() => (
                <div className="flex items-center justify-center w-full">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              )}
              plugins={[defaultLayoutPluginInstance]}
            />
          </Worker>
        </div>
      </DialogContent>
    </Dialog>
  );
}
