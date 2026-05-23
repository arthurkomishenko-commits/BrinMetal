import { NextResponse } from "next/server";

// Rate limiting: max 5 requests per IP per hour
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export async function POST(request: Request) {
  try {
    // Rate limiting
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    const now = Date.now();
    const rateLimit = rateLimitMap.get(ip);

    if (rateLimit) {
      if (now < rateLimit.resetTime) {
        if (rateLimit.count >= 5) {
          return NextResponse.json({ error: "Too many requests" }, { status: 429 });
        }
        rateLimit.count++;
      } else {
        rateLimitMap.set(ip, { count: 1, resetTime: now + 3600000 });
      }
    } else {
      rateLimitMap.set(ip, { count: 1, resetTime: now + 3600000 });
    }

    const body = await request.json();
    const { name, phone, email, message } = body;

    // Validation
    if (!name || !phone || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (typeof name !== "string" || name.length > 200) {
      return NextResponse.json({ error: "Invalid name" }, { status: 400 });
    }

    if (typeof phone !== "string" || phone.length > 20) {
      return NextResponse.json({ error: "Invalid phone" }, { status: 400 });
    }

    if (typeof message !== "string" || message.length > 5000) {
      return NextResponse.json({ error: "Invalid message" }, { status: 400 });
    }

    if (email && (typeof email !== "string" || email.length > 200)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // For now: log to console (replace with Resend/email service later)
    console.log("=== NEW CONTACT FORM SUBMISSION ===");
    console.log(`Name: ${name}`);
    console.log(`Phone: ${phone}`);
    console.log(`Email: ${email || "not provided"}`);
    console.log(`Message: ${message}`);
    console.log(`IP: ${ip}`);
    console.log(`Time: ${new Date().toISOString()}`);
    console.log("===================================");

    // TODO: Add Resend integration
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'BrinMetall Website <noreply@brinmetall.co.il>',
    //   to: 'info@brinmetall.co.il',
    //   subject: `New inquiry from ${name}`,
    //   html: `<p><strong>Name:</strong> ${name}</p>
    //          <p><strong>Phone:</strong> ${phone}</p>
    //          <p><strong>Email:</strong> ${email || 'N/A'}</p>
    //          <p><strong>Message:</strong> ${message}</p>`,
    // });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
