// Script de prueba para verificar el envío de emails con Resend
// Ejecutar con: node test-email.js

import { Resend } from 'resend';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config({ path: '.env' });

const resend = new Resend(process.env.RESEND_API_KEY);

async function testEmail() {
    console.log('🧪 Probando envío de email con Resend...\n');

    // Datos de prueba
    const testData = {
        companyName: 'Empresa de Prueba',
        averageTicket: '$5,000',
        email: 'tu-email@ejemplo.com', // CAMBIA ESTO POR TU EMAIL REAL
        whatsapp: '+52 123 456 7890',
        mainGoal: 'Quiero más ventas (Growth)',
        teamDescription: 'Equipo talentoso pero desorganizado'
    };

    console.log('📋 Datos de prueba:');
    console.log(JSON.stringify(testData, null, 2));
    console.log('\n📧 Enviando email...\n');

    try {
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
            <h1>¡Gracias ${testData.companyName}! 🎉</h1>
            
            <p>Hemos recibido tu solicitud de <strong>diagnóstico gratuito ($0 USD)</strong>.</p>
            
            <div class="steps">
              <h3 style="margin-top: 0; color: #FF4B00;">📊 ¿Qué sigue?</h3>
              <ul>
                <li><strong>Análisis personalizado:</strong> Revisaremos tu información en las próximas 12 horas</li>
                <li><strong>Contacto directo:</strong> Te llamaremos al ${testData.whatsapp}</li>
                <li><strong>Plan a medida:</strong> Diseñaremos una estrategia para: <em>${testData.mainGoal}</em></li>
              </ul>
            </div>
            
            <p><strong>Datos recibidos:</strong></p>
            <ul>
              <li>Empresa: ${testData.companyName}</li>
              <li>Ticket Promedio: ${testData.averageTicket}</li>
              <li>Objetivo: ${testData.mainGoal}</li>
            </ul>
            
            <p>Mientras tanto, conoce más sobre cómo el <strong>Biocoaching + IA</strong> puede transformar tu equipo de ventas:</p>
            
            <center>
              <a href="https://klelers.ai" class="cta">Conoce Más Sobre Nuestro Método</a>
            </center>
            
            <p style="margin-top: 30px; font-size: 14px; color: #666;">
              <em>Si tienes alguna pregunta urgente, responde a este email.</em>
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

        const result = await resend.emails.send({
            from: 'Klelers Sales AI <onboarding@resend.dev>', // Usando dominio temporal de Resend
            to: testData.email,
            subject: '✅ Tu Diagnóstico Gratuito está en Camino - Klelers Sales AI',
            html: emailHtml,
        });

        console.log('✅ ¡Email enviado exitosamente!');
        console.log('\n📬 Detalles:');
        console.log(`   ID: ${result.data.id}`);
        console.log(`   Para: ${testData.email}`);
        console.log('\n🎉 Revisa tu bandeja de entrada!\n');

    } catch (error) {
        console.error('❌ Error al enviar email:');
        console.error(error.message);

        if (error.message.includes('API key')) {
            console.log('\n💡 Verifica que RESEND_API_KEY esté configurada en .env');
        }
    }
}

// Ejecutar prueba
testEmail();
