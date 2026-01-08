import type { VercelRequest, VercelResponse } from '@vercel/node';

type FormData = {
  companyName: string;
  averageTicket: string;
  email: string;
  whatsapp: string;
  mainGoal: string;
  teamDescription: string;
};

type ResponseData = {
  success?: boolean;
  message?: string;
  error?: string;
};

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const formData: FormData = req.body;

    // Validate required fields
    if (!formData.email || !formData.companyName) {
      return res.status(400).json({ error: 'Email y nombre de empresa son requeridos' });
    }

    // Send email (will implement with Resend)
    await sendEmail(formData);

    // Send WhatsApp (will implement with Twilio)
    if (formData.whatsapp) {
      await sendWhatsApp(formData);
    }

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Diagnóstico solicitado exitosamente. Revisa tu email y WhatsApp.'
    });

  } catch (error) {
    console.error('Error processing form:', error);
    return res.status(500).json({
      error: 'Error al procesar tu solicitud. Por favor intenta nuevamente.'
    });
  }
}

async function sendEmail(data: FormData) {
  // Check if Resend is configured
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not configured. Email not sent.');
    return;
  }

  const { Resend } = await import('resend');
  const resend = new Resend(process.env.RESEND_API_KEY);

  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5; }
        .container { max-width: 600px; margin: 0 auto; background: white; }
        .header { background: #000; color: #fff; padding: 40px 30px; text-align: center; }
        .logo { font-size: 28px; font-weight: 900; letter-spacing: 1px; }
        .orange { color: #FF4B00; }
        .content { padding: 40px 30px; }
        .content h1 { color: #000; font-size: 28px; margin-bottom: 20px; }
        .content p { color: #333; line-height: 1.6; font-size: 16px; }
        .steps { background: #f9f9f9; border-left: 4px solid #FF4B00; padding: 20px; margin: 30px 0; }
        .steps ul { margin: 10px 0; padding-left: 20px; }
        .steps li { margin: 10px 0; color: #333; }
        .cta { display: inline-block; background: #FF4B00; color: white; padding: 15px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
        .cta:hover { background: #00D4FF; }
        .footer { background: #f5f5f5; padding: 30px; text-align: center; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">KLELERS SALES <span class="orange">AI</span></div>
          <p style="margin: 10px 0 0 0; color: #ccc; font-size: 14px;">Biocoaching + Automatización IA</p>
        </div>
        
        <div class="content">
          <h1>¡Gracias ${data.companyName}! 🎉</h1>
          
          <p>Hemos recibido tu solicitud de <strong>diagnóstico gratuito ($0 USD)</strong>.</p>
          
          <div class="steps">
            <h3 style="margin-top: 0; color: #FF4B00;">📊 ¿Qué sigue?</h3>
            <ul>
              <li><strong>Análisis personalizado:</strong> Revisaremos tu información en las próximas 12 horas</li>
              <li><strong>Contacto directo:</strong> Te llamaremos al ${data.whatsapp || 'número proporcionado'}</li>
              <li><strong>Plan a medida:</strong> Diseñaremos una estrategia para: <em>${data.mainGoal}</em></li>
            </ul>
          </div>
          
          <p><strong>Datos recibidos:</strong></p>
          <ul>
            <li>Empresa: ${data.companyName}</li>
            <li>Ticket Promedio: ${data.averageTicket}</li>
            <li>Objetivo: ${data.mainGoal}</li>
          </ul>
          
          <p>Mientras tanto, conoce más sobre cómo el <strong>Biocoaching + IA</strong> puede transformar tu equipo de ventas:</p>
          
          <center>
            <a href="https://klelers.ai" class="cta">Conoce Más Sobre Nuestro Método</a>
          </center>
          
          <p style="margin-top: 30px; font-size: 14px; color: #666;">
            <em>Si tienes alguna pregunta urgente, responde a este email o escríbenos por WhatsApp.</em>
          </p>
        </div>
        
        <div class="footer">
          <p><strong>Klelers Sales AI</strong></p>
          <p>El primer ecosistema que fusiona Biocoaching con automatización IA</p>
          <p style="margin-top: 20px; font-size: 12px;">
            © 2026 Klelers Sales AI. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  await resend.emails.send({
    from: 'Klelers Sales AI <diagnostico@klelers.ai>',
    to: data.email,
    subject: '✅ Tu Diagnóstico Gratuito está en Camino - Klelers Sales AI',
    html: emailHtml,
  });

  console.log(`Email sent to ${data.email}`);
}

async function sendWhatsApp(data: FormData) {
  // Check if Twilio is configured
  if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
    console.warn('Twilio not configured. WhatsApp not sent.');
    return;
  }

  const twilio = await import('twilio');
  const client = twilio.default(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );

  const whatsappMessage = `✅ ¡Hola ${data.companyName}!

Recibimos tu solicitud de diagnóstico gratuito ($0 USD).

📊 *Próximos pasos:*
• Análisis de tu información (12 horas)
• Contacto personal
• Plan personalizado para: ${data.mainGoal}

🎯 *Ticket promedio actual:* ${data.averageTicket}

Gracias por confiar en Klelers Sales AI 🚀

_Biocoaching + Automatización IA_`;

  // Format phone number for WhatsApp
  const formattedPhone = data.whatsapp.startsWith('+')
    ? data.whatsapp
    : `+${data.whatsapp}`;

  await client.messages.create({
    from: process.env.TWILIO_WHATSAPP_FROM || 'whatsapp:+14155238886',
    to: `whatsapp:${formattedPhone}`,
    body: whatsappMessage,
  });

  console.log(`WhatsApp sent to ${formattedPhone}`);
}
