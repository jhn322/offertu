import { sendEmail } from '@/lib/email';
import { NextResponse } from 'next/server';
import { categoryTranslations } from '@/lib/constants';

export async function POST(req: Request) {
  try {
    const { to, category } = await req.json();

    // Översätt kategorin eller använd original om översättning saknas
    const translatedCategory = categoryTranslations[category] || category;

    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; color: #282828;">
        <div style="padding: 2rem;">
          <h1 style="color: #FFAE00; font-size: 24px; margin-bottom: 1.5rem;">Tack för din förfrågan!</h1>
          <p style="margin-bottom: 1rem;">Vi har mottagit din förfrågan gällande <strong>${translatedCategory}</strong>.</p>
          <p style="margin-bottom: 2rem;">Vi återkommer till dig så snart som möjligt.</p>
          
          <p style="margin-bottom: 0.5rem;">Med vänliga hälsningar,</p>
          <p style="font-weight: bold; margin-bottom: 2rem;">Offertu</p>
        </div>

        <footer style="background-color: #F1F1F1; border-top: 1px solid #E4E4E4; padding: 2rem;">
          <div style="margin-bottom: 1.5rem;">
            <img src="https://offertu.vercel.app/logo1.webp" alt="Offertu" style="height: 48px; margin-right: 1.5rem;">
          </div>
          
          <table cellpadding="0" cellspacing="0" style="width: 100%; margin-bottom: 2rem;">
            <tr>
              <td style="width: 50%; vertical-align: top; padding-right: 1rem;">
                <h3 style="color: #282828; font-size: 16px; font-weight: 600; margin-bottom: 0.75rem;">Om Offertu</h3>
                <table cellpadding="0" cellspacing="0" style="width: 100%;">
                  <tr>
                    <td style="padding-bottom: 0.5rem;">
                      <a href="https://offertu.vercel.app/karriarer" style="color: #555555; text-decoration: none;">${categoryTranslations.careers}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-bottom: 0.5rem;">
                      <a href="https://offertu.vercel.app/nyheter" style="color: #555555; text-decoration: none;">${categoryTranslations.news}</a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <a href="https://offertu.vercel.app/verktyg-resurser" style="color: #555555; text-decoration: none;">${categoryTranslations.tools}</a>
                    </td>
                  </tr>
                </table>
              </td>
              <td style="width: 50%; vertical-align: top; padding-left: 1rem;">
                <h3 style="color: #282828; font-size: 16px; font-weight: 600; margin-bottom: 0.75rem;">${categoryTranslations.api}</h3>
                <a href="https://offertu.vercel.app/api-dokumentation" style="color: #555555; text-decoration: none;">Dokumentation</a>
              </td>
            </tr>
          </table>

          <div style="border-top: 1px solid #E4E4E4; padding-top: 1rem; font-size: 14px; color: #555555;">
            <p style="margin-bottom: 0.5rem;">Copyright ${new Date().getFullYear()} | Offertu AB</p>
            <a href="https://offertu.vercel.app/integritetspolicy" style="color: #555555; text-decoration: none;">Integritetspolicy</a>
          </div>
        </footer>
      </div>
    `;

    // Plain text version med översatt kategori
    const plainTextContent = `
      Tack för din förfrågan!

      Vi har mottagit din förfrågan gällande ${translatedCategory}.
      Vi återkommer till dig så snart som möjligt.

      Med vänliga hälsningar,
      Offertu

      ---
      Offertu AB
      Copyright ${new Date().getFullYear()}
      https://offertu.vercel.app
    `;

    const result = await sendEmail({
      to,
      subject: `Bekräftelse på din förfrågan - ${translatedCategory}`,
      htmlContent: emailContent,
      textContent: plainTextContent,
      // If you have a template set up in Brevo, you can use it like this:
      // templateId: YOUR_TEMPLATE_ID,
      // params: {
      //   category: category,
      //   // other template parameters
      // }
    });

    if (!result.success) {
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 