"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface Source {
  heading: string;
  stage: string;
  stageLabel: string;
}

interface HelpSidebarProps {
  open: boolean;
  onClose: () => void;
}

// ── Simple markdown renderer ─────────────────────────────────────────────────
// Handles **bold**, numbered lists, and line breaks from Gemini's output format

function renderAnswer(text: string): React.ReactNode[] {
  const lines = text.split("\n");
  const nodes: React.ReactNode[] = [];
  let listItems: string[] = [];

  function flushList() {
    if (listItems.length === 0) return;
    nodes.push(
      <ol key={`list-${nodes.length}`} className="list-decimal list-inside space-y-1 my-2 text-rio-black">
        {listItems.map((item, i) => (
          <li key={i} className="text-sm leading-relaxed">{renderInline(item)}</li>
        ))}
      </ol>
    );
    listItems = [];
  }

  function renderInline(str: string): React.ReactNode {
    const parts = str.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i} className="font-semibold text-rio-teal">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  }

  for (const line of lines) {
    const numbered = line.match(/^(\d+)\.\s+(.+)$/);
    if (numbered) {
      listItems.push(numbered[2]);
      continue;
    }
    flushList();

    if (line.trim() === "") {
      nodes.push(<div key={`br-${nodes.length}`} className="h-1" />);
      continue;
    }

    // Headings like "**Direct Answer**:" become bold paragraph starters
    nodes.push(
      <p key={`p-${nodes.length}`} className="text-sm leading-relaxed text-rio-black">
        {renderInline(line)}
      </p>
    );
  }

  flushList();
  return nodes;
}

// ── Icons (inline SVG, no CDN) ───────────────────────────────────────────────

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin">
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function HelpSidebar({ open, onClose }: HelpSidebarProps) {
  const [query, setQuery] = useState("");
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState<string | null>(null);
  const [sources, setSources] = useState<Source[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [sourcesOpen, setSourcesOpen] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Esc to close
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Focus search input when opened
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  const handleScreenshotChange = useCallback((file: File) => {
    setScreenshot(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  }, []);

  const clearScreenshot = useCallback(() => {
    setScreenshot(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, [previewUrl]);

  const handleSubmit = useCallback(async () => {
    const q = query.trim();
    if (!q && !screenshot) return;
    if (loading) return;

    setLoading(true);
    setAnswer(null);
    setSources([]);
    setError(null);
    setSourcesOpen(false);

    try {
      let screenshotData: string | undefined;
      if (screenshot) {
        screenshotData = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(screenshot);
        });
      }

      const res = await fetch("/api/waba-help", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q || "Analyze this screenshot", screenshot: screenshotData }),
      });

      const data = await res.json();

      if (data.error === "rate_limit") {
        setError("Our AI helper is temporarily busy. Please try again in a moment, or chat with us on WhatsApp for immediate help.");
        return;
      }

      if (data.error || !data.answer) {
        setError("Something went wrong. Please try again or reach out on WhatsApp.");
        return;
      }

      setAnswer(data.answer);
      setSources(data.sources ?? []);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }, [query, screenshot, loading]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }, [handleSubmit]);

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/20"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <div
        className="fixed right-0 top-0 bottom-0 z-50 flex flex-col w-full sm:w-[420px] shadow-2xl"
        role="dialog"
        aria-label="WABA Setup Help"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-rio-teal text-white flex-shrink-0">
          <div>
            <h2 className="font-semibold text-base">WABA Setup Help</h2>
            <p className="text-xs text-white/70 mt-0.5">Ask anything about your WhatsApp Business or about setting up your WhatsApp Business account.</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close help sidebar"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto bg-rio-beige">
          <div className="p-4 space-y-4">

            {/* Search input */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-rio-green/60">
                  <SearchIcon />
                </div>
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask a question about your setup..."
                  className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border border-rio-green/20 bg-white text-rio-black placeholder:text-rio-green/50 focus:outline-none focus:ring-2 focus:ring-rio-teal focus:border-rio-teal"
                  disabled={loading}
                />
              </div>
              <button
                onClick={handleSubmit}
                disabled={loading || (!query.trim() && !screenshot)}
                className="px-4 py-2.5 rounded-lg bg-rio-teal text-white text-sm font-medium hover:opacity-90 disabled:opacity-40 transition-opacity flex items-center gap-1.5 flex-shrink-0"
              >
                {loading ? <SpinnerIcon /> : "Ask"}
              </button>
            </div>

            {/* Suggestion hint */}
            <p className="text-xs text-rio-green/60">We suggest uploading an image of your error or pasting in the error that you're getting.</p>

            {/* Screenshot upload */}
            <div>
              {previewUrl ? (
                <div className="relative rounded-lg overflow-hidden border border-rio-green/20 bg-white">
                  <img src={previewUrl} alt="Uploaded screenshot" className="w-full max-h-40 object-contain" />
                  <button
                    onClick={clearScreenshot}
                    className="absolute top-2 right-2 p-1 rounded-full bg-white/90 shadow text-rio-black hover:bg-white"
                    aria-label="Remove screenshot"
                  >
                    <CloseIcon />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragOver(false);
                    const file = e.dataTransfer.files?.[0];
                    if (file && file.type.startsWith("image/")) handleScreenshotChange(file);
                  }}
                  className={`w-full flex flex-col items-center justify-center gap-1.5 py-4 px-4 rounded-lg border border-dashed text-sm cursor-pointer transition-colors ${
                    dragOver
                      ? "border-rio-teal bg-rio-mint/30 text-rio-teal"
                      : "border-rio-green/30 bg-white text-rio-green/70 hover:border-rio-teal hover:text-rio-teal"
                  }`}
                >
                  <UploadIcon />
                  <span>{dragOver ? "Drop to upload" : "Drag & drop a screenshot, or click to browse"}</span>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleScreenshotChange(file);
                }}
              />
            </div>

            {/* Loading state */}
            {loading && (
              <div className="flex items-center gap-2.5 py-4 text-rio-green/70">
                <SpinnerIcon />
                <span className="text-sm">Searching knowledge base...</span>
              </div>
            )}

            {/* Error state */}
            {error && !loading && (
              <div className="rounded-lg bg-red-50 border border-red-100 p-4">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* AI Answer */}
            {answer && !loading && (
              <div className="rounded-xl bg-white border border-rio-green/15 p-4 space-y-2 shadow-sm">
                <div className="flex items-center gap-1.5 mb-3">
                  <div className="w-2 h-2 rounded-full bg-rio-teal" />
                  <span className="text-xs font-semibold text-rio-teal uppercase tracking-wide">AI Answer</span>
                </div>
                <div className="space-y-1">
                  {renderAnswer(answer)}
                </div>

                {/* Sources collapsible */}
                {sources.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-rio-green/10">
                    <button
                      onClick={() => setSourcesOpen(!sourcesOpen)}
                      className="flex items-center gap-1.5 text-xs text-rio-green/70 hover:text-rio-teal transition-colors w-full text-left"
                    >
                      <ChevronIcon open={sourcesOpen} />
                      More information ({sources.length} source{sources.length !== 1 ? "s" : ""})
                    </button>
                    {sourcesOpen && (
                      <ul className="mt-2 space-y-1.5">
                        {sources.map((src, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-rio-black/80">
                            <span className="mt-0.5 px-1.5 py-0.5 rounded bg-rio-mint/50 text-rio-teal font-medium flex-shrink-0">
                              {src.stageLabel}
                            </span>
                            <span>{src.heading}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 border-t border-rio-green/10 bg-white px-4 py-4">
          <p className="text-xs text-rio-green/60 mb-3 text-center">Still need help?</p>
          <div className="flex gap-2">
            <a
              href="https://wa.me/16462092333"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-rio-teal px-3 py-2.5 text-sm font-medium text-white no-underline hover:opacity-90 transition-opacity"
            >
              <WhatsAppIcon />
              WhatsApp
            </a>
            <a
              href="mailto:support@joinrio.app"
              className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-rio-green/20 px-3 py-2.5 text-sm font-medium text-rio-black no-underline hover:bg-rio-sand/30 transition-colors"
            >
              Email us
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
