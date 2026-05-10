// Height the suggestion strip occupies inside the input container.
// Original (prompting) variant is taller because it wraps to two text rows;
// praise variant is a single centered line and stays compact; profanity
// warning splits an icon+message and a Fix-it action across the strip.
export const SUGGESTIONS_HEIGHT = 54
export const PRAISE_HEIGHT = 34
export const PROFANITY_HEIGHT = 38
// Once the review text mentions this many tags, the strip switches from
// the prompting variant to the celebratory praise variant.
export const PRAISE_TOPICS_THRESHOLD = 4

// Tags shown in the suggestion strip — joined by 2px ellipse dividers.
// Also drives the topic-coverage count that gates the praise variant.
export const SUGGESTION_TAGS = [
  "Performance",
  "Comfort",
  "Fit",
  "Battery",
  "Build Quality",
] as const

export function countCoveredTopics(text: string): number {
  const normalized = text.toLowerCase()
  return SUGGESTION_TAGS.reduce(
    (acc, tag) => (normalized.includes(tag.toLowerCase()) ? acc + 1 : acc),
    0,
  )
}

// Local profanity blocklist — kept lowercase, matched as whole words
// case-insensitively. Skews toward common English profanity, internet
// abbreviations (fk, fkn, wtf), and mild gripe words like "sucks".
const PROFANITY_WORDS = [
  "shit",
  "shitty",
  "fuck",
  "fucked",
  "fucker",
  "fucking",
  "fck",
  "fckn",
  "fk",
  "fkn",
  "fking",
  "fking",
  "damn",
  "damned",
  "ass",
  "asshole",
  "bitch",
  "bitches",
  "piss",
  "pissed",
  "pissing",
  "crap",
  "crappy",
  "sucks",
  "sux",
  "sucky",
  "bastard",
  "hell",
  "wtf",
  "stfu",
  "bs",
  "bullshit",
  "cunt",
  "dick",
  "dickhead",
  "cock",
  "pussy",
  "whore",
  "slut",
] as const

const PROFANITY_REGEX = new RegExp(
  `\\b(?:${PROFANITY_WORDS.join("|")})\\b`,
  "gi",
)

// Non-profane stand-ins that preserve the original emotion/intensity. Picked
// to keep negative reviews still negative and positive intensifiers still
// punchy — we're cleaning language, not flipping sentiment.
const PROFANITY_REPLACEMENTS: Record<string, string> = {
  shit: "rubbish",
  shitty: "lousy",
  fuck: "dang",
  fucked: "ruined",
  fucker: "jerk",
  fucking: "really",
  fck: "really",
  fckn: "really",
  fk: "really",
  fkn: "really",
  fking: "really",
  damn: "really",
  damned: "darn",
  ass: "fool",
  asshole: "jerk",
  bitch: "annoying",
  bitches: "annoyances",
  piss: "annoy",
  pissed: "upset",
  pissing: "annoying",
  crap: "junk",
  crappy: "poor",
  sucks: "underwhelms",
  sux: "underwhelms",
  sucky: "poor",
  bastard: "jerk",
  hell: "heck",
  wtf: "what",
  stfu: "quiet",
  bs: "nonsense",
  bullshit: "nonsense",
  cunt: "jerk",
  dick: "jerk",
  dickhead: "jerk",
  cock: "rubbish",
  pussy: "weak",
  whore: "sellout",
  slut: "sellout",
}

export interface ProfanityMatch {
  start: number
  end: number
}

export function detectProfanity(text: string): ProfanityMatch[] {
  if (!text) return []
  const matches: ProfanityMatch[] = []
  // Reset state on the shared global regex.
  PROFANITY_REGEX.lastIndex = 0
  let m: RegExpExecArray | null
  while ((m = PROFANITY_REGEX.exec(text)) !== null) {
    matches.push({ start: m.index, end: m.index + m[0].length })
  }
  return matches
}

// Keep "Shit" → "Rubbish", "SHIT" → "RUBBISH", "shit" → "rubbish".
export function preserveCase(original: string, replacement: string): string {
  if (!replacement) return replacement
  if (original === original.toUpperCase()) return replacement.toUpperCase()
  if (original[0] === original[0].toUpperCase()) {
    return replacement[0].toUpperCase() + replacement.slice(1)
  }
  return replacement
}

export function cleanProfanity(text: string): string {
  PROFANITY_REGEX.lastIndex = 0
  return text.replace(PROFANITY_REGEX, (match) => {
    const replacement = PROFANITY_REPLACEMENTS[match.toLowerCase()] ?? match
    return preserveCase(match, replacement)
  })
}

// Per-word shimmer caps at 800ms. Random spread so multiple flagged words
// don't sweep in lockstep.
const SHIMMER_MIN_MS = 240
export const SHIMMER_MAX_MS = 800
export function randomShimmerMs(): number {
  return SHIMMER_MIN_MS + Math.random() * (SHIMMER_MAX_MS - SHIMMER_MIN_MS)
}

export type SuggestionVariant = "original" | "praise" | "profane"

// Heights per variant — praise stays compact at 34px (single centered line);
// profanity warning is 38px (icon + warning text + Fix it action).
export function heightForVariant(variant: SuggestionVariant): number {
  if (variant === "praise") return PRAISE_HEIGHT
  if (variant === "profane") return PROFANITY_HEIGHT
  return SUGGESTIONS_HEIGHT
}
