import { useEffect, useRef, useState } from "react";
import type { WorkItem, WorkMedia } from "../data/portfolio";
import { Section } from "./Section";

type PlateGridProps = {
  title: string;
  items: WorkItem[];
};

type GalleryState = {
  item: WorkItem;
  index: number;
};

function mediaUrl(path: string) {
  return `${import.meta.env.BASE_URL}${path}`;
}

function mediaMimeType(path: string) {
  if (path.endsWith(".mp4")) {
    return "video/mp4";
  }

  if (path.endsWith(".mov")) {
    return "video/quicktime";
  }

  return undefined;
}

function shiftIndex(current: number, length: number, offset: number) {
  return (current + offset + length) % length;
}

export function PlateGrid({ title, items }: PlateGridProps) {
  const [gallery, setGallery] = useState<GalleryState | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef(0);

  function moveGallery(offset: number) {
    setGallery((current) => {
      if (!current?.item.gallery?.length) {
        return current;
      }

      return {
        ...current,
        index: shiftIndex(current.index, current.item.gallery.length, offset),
      };
    });
  }

  useEffect(() => {
    if (!gallery) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setGallery(null);
        return;
      }

      if (event.key === "ArrowRight") {
        moveGallery(1);
      }

      if (event.key === "ArrowLeft") {
        moveGallery(-1);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [gallery]);

  const activeMedia = gallery?.item.gallery?.[gallery.index] ?? null;
  const galleryLength = gallery?.item.gallery?.length ?? 0;

  return (
    <Section title={title}>
      <div className="plates">
        {items.map((item) => {
          const isInteractive = Boolean(item.gallery?.length);

          return (
            <figure className="plate" key={`${item.title}-${item.meta}`}>
              <button
                className={`plate-button${isInteractive ? " is-interactive" : ""}`}
                disabled={!isInteractive}
                onClick={() => {
                  if (item.gallery?.length) {
                    setGallery({ item, index: 0 });
                  }
                }}
                type="button"
              >
                <div className="figure-frame">
                  {item.image ? (
                    <img
                      alt={item.alt ?? item.title}
                      className="media-image"
                      loading="lazy"
                      src={mediaUrl(item.image)}
                    />
                  ) : (
                    <span className="placeholder-text">Image</span>
                  )}
                </div>
                <figcaption>
                  <span className="plate-title">{item.title}</span>
                  <span className="plate-meta">{item.meta}</span>
                </figcaption>
              </button>
            </figure>
          );
        })}
      </div>

      {gallery && activeMedia ? (
        <div
          aria-modal="true"
          className="gallery-modal"
          onClick={() => setGallery(null)}
          role="dialog"
        >
          <div className="gallery-panel" onClick={(event) => event.stopPropagation()}>
            <div className="gallery-header">
              <div className="gallery-copy">
                <h3 className="gallery-title">{gallery.item.title}</h3>
                <div className="gallery-meta-row">
                  <p className="gallery-meta">{gallery.item.meta}</p>
                  <span className="gallery-count">
                    {gallery.index + 1} / {galleryLength}
                  </span>
                </div>
              </div>
              <button
                aria-label="Close gallery"
                className="gallery-close"
                onClick={() => setGallery(null)}
                type="button"
              >
                x
              </button>
            </div>

            <div className="gallery-stage">
              <button
                aria-label="Previous"
                className="gallery-nav gallery-nav-prev"
                onClick={() => moveGallery(-1)}
                type="button"
              >
                {"<"}
              </button>

              <div
                className="gallery-media-frame"
                onTouchEnd={(event) => {
                  if (touchStartX.current === null) {
                    return;
                  }

                  const delta = touchDeltaX.current || event.changedTouches[0].clientX - touchStartX.current;

                  touchStartX.current = null;
                  touchDeltaX.current = 0;

                  if (Math.abs(delta) < 42) {
                    return;
                  }

                  moveGallery(delta < 0 ? 1 : -1);
                }}
                onTouchMove={(event) => {
                  if (touchStartX.current === null) {
                    return;
                  }

                  touchDeltaX.current = event.changedTouches[0].clientX - touchStartX.current;
                }}
                onTouchStart={(event) => {
                  touchStartX.current = event.changedTouches[0].clientX;
                  touchDeltaX.current = 0;
                }}
              >
                <GalleryMedia media={activeMedia} />
              </div>

              <button
                aria-label="Next"
                className="gallery-nav gallery-nav-next"
                onClick={() => moveGallery(1)}
                type="button"
              >
                {">"}
              </button>
            </div>

            <div className="gallery-footer">
              <div aria-hidden="true" className="gallery-dots">
                {gallery.item.gallery?.map((media, index) => (
                  <span
                    className={`gallery-dot${gallery.index === index ? " is-active" : ""}`}
                    key={`${media.src}-${index}`}
                  />
                ))}
              </div>

              <div className="gallery-strip" role="list">
                {gallery.item.gallery?.map((media, index) => {
                  const thumb = media.thumb ?? media.poster ?? media.src;

                  return (
                    <button
                      aria-label={`${gallery.item.title} ${index + 1}`}
                      className={`gallery-thumb${gallery.index === index ? " is-active" : ""}`}
                      key={`${media.src}-${index}`}
                      onClick={() => setGallery((current) => (current ? { ...current, index } : current))}
                      role="listitem"
                      type="button"
                    >
                      <img alt="" className="gallery-thumb-image" loading="lazy" src={mediaUrl(thumb)} />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </Section>
  );
}

function GalleryMedia({ media }: { media: WorkMedia }) {
  if (media.type === "video") {
    return <GalleryVideo media={media} />;
  }

  return (
    <img
      alt={media.alt}
      className="gallery-media"
      onContextMenu={(event) => event.preventDefault()}
      src={mediaUrl(media.src)}
    />
  );
}

function GalleryVideo({ media }: { media: WorkMedia }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [paused, setPaused] = useState(false);

  return (
    <>
      <video
        aria-label={media.alt}
        autoPlay
        className="gallery-media"
        disablePictureInPicture
        loop
        muted
        onClick={() => {
          const video = videoRef.current;
          if (!video) return;
          if (video.paused) {
            void video.play();
          } else {
            video.pause();
          }
        }}
        onContextMenu={(event) => event.preventDefault()}
        onPause={() => setPaused(true)}
        onPlay={() => setPaused(false)}
        playsInline
        poster={media.poster ? mediaUrl(media.poster) : undefined}
        ref={videoRef}
      >
        <source src={mediaUrl(media.src)} type={mediaMimeType(media.src)} />
      </video>
      {paused ? (
        <span aria-hidden="true" className="gallery-video-paused-icon">
          ▶
        </span>
      ) : null}
    </>
  );
}
