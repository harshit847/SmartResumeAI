import puppeteer from "puppeteer";

export async function generatePDF(htmlContent: string): Promise<Buffer> {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(htmlContent, { waitUntil: "networkidle0" });

  const pdf = await page.pdf({ format: "A4" });
  await browser.close();

  // ✅ Just return the PDF buffer
  return Buffer.from(pdf);
}
