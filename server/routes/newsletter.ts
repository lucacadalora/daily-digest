import express from "express";
import { db } from "../../db";
import { subscribers, insertSubscriberSchema } from "../../db/schema";
import { eq } from "drizzle-orm";
import sgMail from "@sendgrid/mail";

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

    // Send welcome email
    await sgMail.send({
      to: email,
      from: "newsletter@dailydigest.com", // Update with your verified sender
      subject: "Welcome to Daily Digest Newsletter",
      html: `
        <h1>Welcome to Daily Digest!</h1>
        <p>Hi ${name || "there"},</p>
        <p>Thank you for subscribing to Daily Digest. You'll now receive updates about:</p>
        <ul>
          ${(categories || []).map(cat => `<li>${cat}</li>`).join("")}
        </ul>
        <p>Stay tuned for the latest market insights and analysis!</p>
      `,
    });

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

// Helper endpoint to send article notifications
router.post("/notify", async (req, res) => {
  try {
    const { articleTitle, articleUrl, articleDescription } = req.body;

    // Get all active subscribers
    const activeSubscribers = await db.query.subscribers.findMany({
      where: eq(subscribers.subscribed, true),
    });

    // Send email to each subscriber
    const emailPromises = activeSubscribers.map(subscriber => 
      sgMail.send({
        to: subscriber.email,
        from: "newsletter@dailydigest.com", // Update with your verified sender
        subject: `New Article: ${articleTitle}`,
        html: `
          <h1>${articleTitle}</h1>
          <p>${articleDescription}</p>
          <p><a href="${articleUrl}">Read the full article</a></p>
          <hr>
          <p><small>You received this email because you're subscribed to Daily Digest. 
          <a href="[Unsubscribe URL]">Unsubscribe</a></small></p>
        `,
      })
    );

    await Promise.all(emailPromises);

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

export default router;
