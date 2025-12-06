import { useEffect } from "react";
import { X } from "lucide-react";

interface ARViewerProps {
  onClose: () => void;
}

export function ARViewer({ onClose }: ARViewerProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Get the full URL to the model
  const modelUrl = `${window.location.origin}/models/fox-avatar.glb`;

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex flex-col items-center justify-center p-4">
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={onClose}
          className="p-2 rounded-full bg-card hover:bg-muted transition-colors"
          aria-label="Close AR viewer"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">View Mousey in AR! 🐭</h2>
        <p className="text-muted-foreground">Tap the AR button in the viewer to see Mousey in your room</p>
      </div>

      <div className="w-full max-w-md aspect-square bg-card rounded-3xl overflow-hidden shadow-card">
        {/* Load model-viewer via CDN to avoid Three.js version conflict */}
        <iframe
          src={`data:text/html,
            <!DOCTYPE html>
            <html>
            <head>
              <script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js"></script>
              <style>
                body { margin: 0; background: transparent; }
                model-viewer { width: 100%; height: 100%; background: transparent; }
              </style>
            </head>
            <body>
              <model-viewer
                src="${modelUrl}"
                alt="Mousey 3D character"
                ar
                ar-modes="webxr scene-viewer quick-look"
                ar-scale="auto"
                camera-controls
                auto-rotate
                shadow-intensity="1"
              ></model-viewer>
            </body>
            </html>
          `}
          className="w-full h-full border-0"
          allow="xr-spatial-tracking"
          title="AR Viewer"
        />
      </div>

      <p className="text-sm text-muted-foreground mt-4 text-center max-w-sm">
        📱 On mobile: Look for the AR icon in the 3D viewer to place Mousey in your space!
      </p>
    </div>
  );
}
