import { useEffect, useRef } from "react";
import "@google/model-viewer";

// Extend JSX to recognize model-viewer
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src?: string;
          alt?: string;
          ar?: boolean;
          "ar-modes"?: string;
          "ar-scale"?: string;
          "camera-controls"?: boolean;
          "auto-rotate"?: boolean;
          "shadow-intensity"?: string;
          "environment-image"?: string;
          exposure?: string;
        },
        HTMLElement
      >;
    }
  }
}

interface ARViewerProps {
  onClose: () => void;
}

export function ARViewer({ onClose }: ARViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex flex-col items-center justify-center p-4"
    >
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={onClose}
          className="p-2 rounded-full bg-card hover:bg-muted transition-colors"
          aria-label="Close AR viewer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">View Mousey in AR! 🐭</h2>
        <p className="text-muted-foreground">Tap the AR button below to see Mousey in your room</p>
      </div>

      <div className="w-full max-w-md aspect-square bg-card rounded-3xl overflow-hidden shadow-card">
        <model-viewer
          src="/models/fox-avatar.glb"
          alt="Mousey 3D character"
          ar
          ar-modes="webxr scene-viewer quick-look"
          ar-scale="auto"
          camera-controls
          auto-rotate
          shadow-intensity="1"
          exposure="1"
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      <p className="text-sm text-muted-foreground mt-4 text-center max-w-sm">
        📱 On mobile: Look for the AR icon in the 3D viewer to place Mousey in your space!
      </p>
    </div>
  );
}
