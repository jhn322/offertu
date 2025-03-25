import { sendEmail } from '@/lib/email';
import { NextResponse } from 'next/server';
import { categoryTranslations } from '@/lib/constants';
import { jobs } from '@/app/karriarer/data';

export async function POST(req: Request) {
  try {
    const { to, category, referenceId } = await req.json();

    // Översätt kategorin eller använd original om översättning saknas
    const translatedCategory = categoryTranslations[category] || category;

    // Get job title if it's a career application
    let jobTitle = '';
    if (category === 'careers' && referenceId) {
      const job = jobs.find((job) => job.id === referenceId);
      if (job) {
        jobTitle = job.title;
      }
    }

    // Category-specific messages
    const categoryMessages: Record<
      string,
      { message: string; followUp: string }
    > = {
      careers: {
        message: `Vi har mottagit din ansökan för tjänsten <strong>${jobTitle}</strong> inom <strong>${translatedCategory}</strong>.`,
        followUp:
          'Vi kommer att granska din ansökan och återkomma med feedback inom kort.',
      },
      service: {
        message: `Vi har mottagit din serviceförfrågan gällande <strong>${translatedCategory}</strong>.`,
        followUp:
          'Vi kommer att kontakta dig inom 24 timmar för att diskutera dina behov.',
      },
      api: {
        message: `Tack för ditt intresse för vår <strong>${translatedCategory}</strong>!`,
        followUp:
          'Vi kommer att skicka dig detaljerad dokumentation om vårat API inom kort.',
      },
      templates: {
        message: `Vi har mottagit din förfrågan om <strong>${translatedCategory}</strong>.`,
        followUp:
          'Du kommer att få tillgång till mallarna så snart de är tillgängliga.',
      },
      tools: {
        message: `Tack för ditt intresse för våra <strong>${translatedCategory}</strong>!`,
        followUp:
          'Vi kommer att meddela dig så snart verktygen är lanserade och tillgängliga för användning.',
      },
    };

    const defaultMessage = {
      message: `Vi har mottagit din förfrågan gällande <strong>${translatedCategory}</strong>.`,
      followUp: 'Vi återkommer till dig så snart som möjligt.',
    };

    const messageContent = categoryMessages[category] || defaultMessage;

    const emailContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 40px 20px; font-family: Arial, sans-serif; background-color: #f7f7f7;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);">
                  <tr>
                    <td style="padding: 40px;">
                      <h1 style="color: #FFAE00; font-size: 24px; margin: 0 0 24px 0; font-weight: 600;">Tack för din förfrågan!</h1>
                      <p style="margin: 0 0 16px 0; color: #333333; line-height: 1.6;">${
                        messageContent.message
                      }</p>
                      <p style="margin: 0 0 32px 0; color: #333333; line-height: 1.6;">${
                        messageContent.followUp
                      }</p>
                      
                      <p style="margin: 0 0 8px 0; color: #333333;">Med vänliga hälsningar,</p>
                      <p style="margin: 0; font-weight: 600; color: #333333;">Offertu</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding-top: 32px;">
                <img src="https://offertu.vercel.app/logo1.webp" alt="Offertu" style="height: 48px; margin-bottom: 24px;">
                <table width="600" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td align="center" style="padding-bottom: 16px;">
                      <table cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td style="padding: 0 8px;">
                            <a href="https://offertu.vercel.app/karriarer" style="color: #666666; text-decoration: underline; font-size: 14px;">${
                              categoryTranslations.careers
                            }</a>
                          </td>
                          <td style="padding: 0 8px;">
                            <a href="https://offertu.vercel.app/verktyg-resurser" style="color: #666666; text-decoration: underline; font-size: 14px;">${
                              categoryTranslations.tools
                            }</a>
                          </td>
                          <td style="padding: 0 8px;">
                            <a href="https://offertu.vercel.app/nyheter" style="color: #666666; text-decoration: underline; font-size: 14px;">${
                              categoryTranslations.news
                            }</a>
                          </td>
                          <td style="padding: 0 8px;">
                            <a href="https://offertu.vercel.app/api-dokumentation" style="color: #666666; text-decoration: underline; font-size: 14px;">API</a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="color: #666666; font-size: 14px;">
                      <p style="margin: 0 0 8px 0;">Copyright ${new Date().getFullYear()} | Offertu AB</p>
                      <a href="https://offertu.vercel.app/integritetspolicy" style="color: #666666; text-decoration: underline;">Integritetspolicy</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;

    // Plain text version med översatt kategori
    const plainTextContent = `
      Tack för din förfrågan!

      ${messageContent.message.replace(/<strong>|<\/strong>/g, '')}
      ${messageContent.followUp}

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
