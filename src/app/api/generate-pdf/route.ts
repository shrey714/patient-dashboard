import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export const POST = async (req: NextRequest) => {
  try {
    // Parse the request body
    const { html }: { html: string } = await req.json();

    // Launch a headless browser
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Set the received HTML content
    await page.setContent(html, { waitUntil: 'networkidle0' });

    // Generate the PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
    });

    // Close the browser
    await browser.close();
    console.log("pdfbuffer : ",pdfBuffer)

    // Return the PDF response
    const x =  new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="document.pdf"',
      },
    });
    console.log(x)
    return x;
  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
};
