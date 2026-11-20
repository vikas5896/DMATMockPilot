import type { SubjectText } from "../types";

export const DATA_TRANSFER: SubjectText = {
  passage: {
    id: "b-data-transfer",
    title: "File Sizes, Compression and Download Times",
    field: "Computer Science",
    blocks: [
      {
        k: "p",
        text: "Computers store all data as **bits** (0 or 1). Eight bits form one **byte**. File sizes are usually given in bytes, with the prefixes kilo ($10^3$), mega ($10^6$) and giga ($10^9$): 1 kB = 1,000 bytes, 1 MB = 1,000 kB, 1 GB = 1,000 MB. Internet speeds, in contrast, are given in **bits per second**, e.g. Mbit/s. The transfer time is:",
      },
      { k: "formula", tex: "t = \\frac{\\text{file size in bits}}{\\text{transfer rate in bits per second}}", label: "(1)" },
      {
        k: "p",
        text: "A digital colour image consists of pixels. In an uncompressed image with 24-bit colour, each pixel needs 3 bytes (one each for red, green and blue), so the size is width × height × 3 bytes. Audio is described by its **bit rate**: an audio file with 128 kbit/s needs 128,000 bits for every second of sound.",
      },
      {
        k: "p",
        text: "**Compression** reduces file sizes. The compression ratio is the original size divided by the compressed size. **Lossless** methods (e.g. ZIP) restore the original data exactly. **Lossy** methods (e.g. JPEG for photos, MP3 for music) remove details that people hardly notice and achieve much smaller files, but the original cannot be restored exactly.",
      },
      {
        k: "table",
        caption: "Table 1. Example files.",
        head: ["File", "Description"],
        rows: [
          ["Photo", "4,000 × 3,000 pixels, 24-bit colour"],
          ["Text document", "200,000 characters, 1 byte per character"],
          ["Song", "4 minutes at 128 kbit/s"],
          ["Film", "1 GB"],
        ],
      },
    ],
  },
  questions: [
    {
      difficulty: "low",
      stem: "How many megabits (Mbit) does a 2 MB file contain?",
      options: ["0.25 Mbit", "2 Mbit", "16 Mbit", "2,000 Mbit"],
      answer: 2,
      explanation: "One byte has 8 bits: $2$ MB $\\cdot 8 = 16$ Mbit.",
    },
    {
      difficulty: "low",
      stem: "Which kind of compression must be used for the text document if every character has to be restored exactly?",
      options: ["Lossy compression", "Lossless compression", "JPEG compression", "MP3 compression"],
      answer: 1,
      explanation: "Only lossless methods restore the original data exactly. JPEG and MP3 are lossy methods.",
    },
    {
      difficulty: "medium",
      stem: "What is the size of the photo in Table 1 without compression?",
      options: ["4.5 MB", "12 MB", "36 MB", "288 MB"],
      answer: 2,
      explanation: "$4{,}000 \\cdot 3{,}000 = 12{,}000{,}000$ pixels; $\\cdot\\, 3$ bytes $= 36{,}000{,}000$ bytes $= 36$ MB. 12 MB forgets the 3 bytes per pixel, 288 MB is the size in megabits.",
    },
    {
      difficulty: "medium",
      stem: "Saved as a JPEG, the photo has a size of 3 MB. What is the compression ratio?",
      options: ["3 : 1", "12 : 1", "33 : 1", "108 : 1"],
      answer: 1,
      explanation: "Original size divided by compressed size: $36 / 3 = 12$, i.e. 12 : 1.",
    },
    {
      difficulty: "high",
      stem: "How large is the song in Table 1?",
      options: ["0.48 MB", "3.84 MB", "30.72 MB", "3,840 MB"],
      answer: 1,
      explanation: "$128$ kbit/s $\\cdot 240$ s $= 30{,}720$ kbit. Divided by 8: $3{,}840$ kB $= 3.84$ MB. 30.72 would be the size in megabits.",
    },
    {
      difficulty: "high",
      stem: "How long does it take to download the film at a transfer rate of 50 Mbit/s?",
      options: ["20 s", "2 min 40 s", "20 min", "2 h 40 min"],
      answer: 1,
      explanation: "$1$ GB $= 1{,}000$ MB $= 8{,}000$ Mbit. Formula (1): $8{,}000 / 50 = 160$ s $= 2$ min $40$ s. 20 s forgets the factor 8.",
    },
    {
      difficulty: "high",
      stem: "A camera uploads uncompressed photos like the one in Table 1 at 10 Mbit/s. How many complete photos are uploaded per minute?",
      options: ["1", "2", "16", "20"],
      answer: 1,
      explanation: "One photo: $36$ MB $= 288$ Mbit, which takes $288 / 10 = 28.8$ s. In 60 s: $60 / 28.8 \\approx 2.1$, so 2 complete photos.",
    },
  ],
};
