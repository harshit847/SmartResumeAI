"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResumeReportHTML = getResumeReportHTML;
function getResumeReportHTML(name, email, score, breakdown, suggestions) {
    return `
    <html>
      <head>
        <style>
          body { font-family: Arial; padding: 20px; }
          h1 { color: #4CAF50; }
          .score { font-size: 18px; }
        </style>
      </head>
      <body>
        <h1>Resume Report</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <div class="score">
          <p><strong>Total Score:</strong> ${score}/100</p>
          <p><strong>Breakdown:</strong></p>
          <ul>
            <li>Keywords: ${breakdown.keywords}/100</li>
            <li>Structure: ${breakdown.structure}/100</li>
            <li>Readability: ${breakdown.readability}/100</li>
          </ul>
        </div>
        <h3>Suggestions:</h3>
        <p>${suggestions
        .split('\n')
        .map(line => `<p>${line}</p>`)
        .join('')}</p>
      </body>
    </html>
  `;
}
