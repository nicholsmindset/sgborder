"use client";
import { useState } from "react";
import { useLiveCameras } from "@/hooks/useLiveData";
import type { CameraFeed } from "@/lib/types";
import { X, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export const CameraGrid = ({
  cameras: propCameras,
  checkpoint,
}: {
  cameras?: CameraFeed[];
  checkpoint?: string;
}) => {
  const [modalIdx, setModalIdx] = useState<number | null>(null);
  const { data: liveCameras, isLoading } = useLiveCameras(checkpoint);
  const { t } = useTranslation();

  const cameras =
    liveCameras && liveCameras.length > 0
      ? liveCameras
      : propCameras && propCameras.length > 0
        ? propCameras
        : [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        <span className="ml-2 text-label-sm text-muted-foreground">{t("camera_loading")}</span>
      </div>
    );
  }

  if (cameras.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-card p-6 text-center">
        <p className="text-sm text-muted-foreground">{t("camera_no_feeds")}</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {cameras.map((cam, i) => (
          <button
            key={cam.camera_id}
            onClick={() => setModalIdx(i)}
            className="group overflow-hidden rounded-lg border border-border bg-card transition-all hover:shadow-card-hover active:scale-[0.98]"
          >
            <div className="aspect-video overflow-hidden bg-muted">
              <img
                src={cam.image_url}
                alt={cam.label}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/placeholder.svg";
                }}
              />
            </div>
            <div className="px-3 py-2">
              <p className="text-label-sm font-medium text-foreground">{cam.label}</p>
            </div>
          </button>
        ))}
      </div>
      <p className="mt-2 text-label-sm text-muted-foreground">{t("camera_refresh_note")}</p>

      {/* Modal */}
      {modalIdx !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/80 backdrop-blur-sm p-4"
          onClick={() => setModalIdx(null)}
        >
          <div
            className="relative max-h-[90vh] max-w-3xl w-full overflow-hidden rounded-2xl bg-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <p className="font-heading text-sm font-semibold">{cameras[modalIdx].label}</p>
              <button onClick={() => setModalIdx(null)} className="rounded-lg p-1.5 hover:bg-muted" aria-label="Close">
                <X className="h-5 w-5" />
              </button>
            </div>
            <img
              src={cameras[modalIdx].image_url}
              alt={cameras[modalIdx].label}
              className="w-full"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/placeholder.svg";
              }}
            />
            <div className="flex items-center justify-between border-t border-border px-4 py-3">
              <button
                onClick={() => setModalIdx(Math.max(0, modalIdx - 1))}
                disabled={modalIdx === 0}
                className="rounded-lg p-2 hover:bg-muted disabled:opacity-30"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span className="text-label-sm text-muted-foreground">
                {modalIdx + 1} / {cameras.length}
              </span>
              <button
                onClick={() => setModalIdx(Math.min(cameras.length - 1, modalIdx + 1))}
                disabled={modalIdx === cameras.length - 1}
                className="rounded-lg p-2 hover:bg-muted disabled:opacity-30"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
