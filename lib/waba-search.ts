import chunksRaw from "@/data/waba-kb.json";

interface KbChunk {
  file_path: string;
  heading: string;
  content: string;
  stage: string;
  topics: string[];
}

export interface SearchResult extends KbChunk {
  score: number;
}

const STOPWORDS = new Set([
  "a","an","the","is","are","was","were","be","been","being","have","has","had",
  "do","does","did","will","would","could","should","may","might","shall","can",
  "i","you","he","she","it","we","they","what","which","who","this","that",
  "these","those","am","in","of","to","for","on","with","at","by","from","up",
  "about","into","then","my","your","his","her","its","our","their","me","him",
  "us","them","or","and","not","but","so","if","as","how","when","where","why",
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOPWORDS.has(t));
}

const KB = chunksRaw as KbChunk[];

export function searchKb(query: string, topK = 8): SearchResult[] {
  const tokens = tokenize(query);
  if (tokens.length === 0) return [];

  const scored: SearchResult[] = KB.map((chunk) => {
    let score = 0;
    const hl = chunk.heading.toLowerCase();
    const cl = chunk.content.toLowerCase();
    const tl = chunk.topics.map((t) => t.toLowerCase());

    for (const token of tokens) {
      // Exact match scoring
      if (hl.includes(token)) score += 3;
      if (tl.some((t) => t.includes(token))) score += 5;
      if (cl.includes(token)) score += 1;

      // Partial/stem matching for tokens >= 5 chars
      if (token.length >= 5) {
        const stem = token.slice(0, -2);
        if (hl.includes(stem)) score += 1.5;
        if (cl.includes(stem)) score += 0.5;
      }
    }

    return { ...chunk, score };
  });

  return scored
    .filter((c) => c.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}
