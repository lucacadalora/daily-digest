import express from "express";
import { db } from "../../db";
import { subscribers, insertSubscriberSchema } from "../../db/schema";
import { eq } from "drizzle-orm";
import sgMail from "@sendgrid/mail";
import { log } from "../vite";

const router = express.Router();

// Initialize SendGrid
if (!process.env.SENDGRID_API_KEY) {
  throw new Error("SENDGRID_API_KEY must be set");
}
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Subscribe to newsletter
router.post("/subscribe", async (req, res) => {
  try {
    const { email, name, categories } = req.body;

    // Validate request using Zod schema
    const parsed = insertSubscriberSchema.parse({
      email,
      name,
      categories: categories || [],
      subscribed: true,
    });

    // Check if already subscribed
    const existing = await db.query.subscribers.findFirst({
      where: eq(subscribers.email, email),
    });

    if (existing) {
      if (existing.subscribed) {
        return res.status(400).json({
          status: "error",
          message: "This email is already subscribed to the newsletter",
        });
      }
      // Reactivate subscription
      await db
        .update(subscribers)
        .set({ subscribed: true })
        .where(eq(subscribers.email, email));

      return res.json({
        status: "success",
        message: "Your subscription has been reactivated",
      });
    }

    // Add new subscriber
    await db.insert(subscribers).values(parsed);

    // Send welcome email with enhanced formatting
    const welcomeEmail = {
      to: email,
      from: {
        email: 'newsletter@dailydigest.com',
        name: 'Daily Digest Market Intelligence'
      },
      subject: 'Welcome to Daily Digest Newsletter',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb; margin-bottom: 20px;">Welcome to Daily Digest!</h1>
          <p>Hi ${name || "there"},</p>
          <p>Thank you for subscribing to Daily Digest. You'll now receive updates about:</p>
          <ul style="list-style-type: none; padding: 0;">
            ${(categories || []).map((cat: string) => 
              `<li style="margin: 10px 0; padding: 10px; background: #f8fafc; border-left: 4px solid #2563eb; border-radius: 4px;">
                ${cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}
              </li>`
            ).join("")}
          </ul>
          <p>Stay tuned for the latest market insights and analysis!</p>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
            <p style="color: #64748b; font-size: 0.875rem;">
              Daily Digest - Your Source for Financial Intelligence
            </p>
          </div>
        </div>
      `
    };

    await sgMail.send(welcomeEmail);
    log('Welcome email sent successfully');

    res.json({
      status: "success",
      message: "Successfully subscribed to the newsletter",
    });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    res.status(500).json({
      status: "error",
      message: error instanceof Error ? error.message : "Failed to subscribe",
    });
  }
});

// Send article notifications to subscribers
router.post("/notify", async (req, res) => {
  try {
    const { articleTitle, articleUrl, articleDescription, category, previewMetrics } = req.body;

    // Get all active subscribers
    const activeSubscribers = await db.query.subscribers.findMany({
      where: eq(subscribers.subscribed, true),
    });

    // Enhanced email template with metrics
    const emailTemplate = (subscriber: typeof activeSubscribers[0]) => ({
      to: subscriber.email,
      from: {
        email: 'newsletter@dailydigest.com',
        name: 'Daily Digest Market Intelligence'
      },
      subject: `Market Alert: ${articleTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb; margin-bottom: 20px;">${articleTitle}</h1>

          ${previewMetrics ? `
            <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
              ${previewMetrics.map((metric: {label: string, value: string}) => `
                <div style="display: inline-block; margin-right: 20px;">
                  <strong style="color: #2563eb;">${metric.label}:</strong>
                  <span>${metric.value}</span>
                </div>
              `).join('')}
            </div>
          ` : ''}

          <p style="line-height: 1.6;">${articleDescription}</p>

          <a href="${articleUrl}" 
             style="display: inline-block; background: #2563eb; color: white; padding: 12px 24px; 
                    text-decoration: none; border-radius: 6px; margin-top: 20px;">
            Read Full Analysis
          </a>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
            <p style="color: #64748b; font-size: 0.875rem;">
              You received this email because you're subscribed to Daily Digest Market Intelligence.
              <br>
              <a href="[Unsubscribe URL]" style="color: #2563eb;">Unsubscribe</a>
            </p>
          </div>
        </div>
      `,
      trackingSettings: {
        clickTracking: { enable: true },
        openTracking: { enable: true }
      }
    });

    // Send emails to all subscribers
    await Promise.all(
      activeSubscribers.map(subscriber => 
        sgMail.send(emailTemplate(subscriber))
      )
    );

    log(`Notification sent to ${activeSubscribers.length} subscribers`);

    res.json({
      status: "success",
      message: `Notification sent to ${activeSubscribers.length} subscribers`,
    });
  } catch (error) {
    console.error("Newsletter notification error:", error);
    res.status(500).json({
      status: "error",
      message: error instanceof Error ? error.message : "Failed to send notifications",
    });
  }
});

// Test endpoint for SendGrid integration
router.post("/test-email", async (req, res) => {
  try {
    const testEmail = {
      to: req.body.email || "test@example.com", // Allow test email to be specified
      from: {
        email: 'newsletter@dailydigest.com',
        name: 'Daily Digest Market Intelligence'
      },
      subject: 'Test Email - Daily Digest Integration',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb; margin-bottom: 20px;">SendGrid Integration Test</h1>
          <p>This is a test email to verify the SendGrid integration with Daily Digest.</p>
          <p>If you're receiving this, the integration is working correctly!</p>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
            <p style="color: #64748b; font-size: 0.875rem;">
              Daily Digest - Your Source for Financial Intelligence
            </p>
          </div>
        </div>
      `
    };

    await sgMail.send(testEmail);
    log('Test email sent successfully');

    res.json({
      status: "success",
      message: "Test email sent successfully",
    });
  } catch (error) {
    console.error("Test email error:", error);
    res.status(500).json({
      status: "error",
      message: error instanceof Error ? error.message : "Failed to send test email",
    });
  }
});

export default router;