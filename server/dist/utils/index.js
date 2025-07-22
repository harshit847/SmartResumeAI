"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scoreResume = scoreResume;
function scoreResume(extractedText) {
    let keywordScore = 0;
    let structureScore = 0;
    let readabilityScore = 0;
    const keywords = ["JavaScript", "Node.js", "MongoDB", "React", "API", "Express", "Python", "Java", "C++", "Business Analyst", "DevOps"];
    const found = keywords.filter((word) => extractedText.toLowerCase().includes(word.toLowerCase()));
    keywordScore = Math.min((found.length / keywords.length) * 100, 100);
    const sections = ["education", "experience", "skills", "projects"];
    const structureFound = sections.filter((section) => extractedText.toLowerCase().includes(section));
    structureScore = Math.min((structureFound.length / sections.length) * 100, 100);
    const sentenceCount = extractedText.split(".").length;
    const wordCount = extractedText.split(/\s+/).length;
    const avgSentenceLength = wordCount / sentenceCount;
    readabilityScore =
        avgSentenceLength > 25
            ? 50
            : avgSentenceLength < 10
                ? 60
                : 90;
    const score = Math.round((keywordScore + structureScore + readabilityScore) / 3);
    return {
        score,
        breakdown: {
            keywords: Math.round(keywordScore),
            structure: Math.round(structureScore),
            readability: Math.round(readabilityScore),
        },
    };
}
