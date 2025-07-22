import puppeteer from "puppeteer";

export async function generatePDF(htmlContent: string): Promise<Buffer> {
  const browser = await puppeteer.launch({
    headless: true, 
    args: ["--no-sandbox", "--disable-setuid-sandbox"], 
  }); const page = await browser.newPage();

  await page.setContent(htmlContent, { waitUntil: "networkidle0" });

  const pdf = await page.pdf({ format: "A4" });
  await browser.close();

  return Buffer.from(pdf);
}
