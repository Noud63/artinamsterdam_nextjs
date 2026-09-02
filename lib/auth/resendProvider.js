import { Resend as ResendClient } from "resend";

const escapeHtml = (value) =>
  value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character]);

export default function ResendProvider(config) {
  return {
    id: "resend",
    type: "email",
    name: "Resend",
    from: "Auth.js <no-reply@authjs.dev>",
    maxAge: 24 * 60 * 60,
    async sendVerificationRequest({ identifier: to, provider, url }) {
      const host = new URL(url).host;
      const verificationPageUrl = new URL("/auth/verify", url);
      verificationPageUrl.searchParams.set("url", url);
      const safeVerificationPageUrl = escapeHtml(verificationPageUrl.toString());

      const resend = new ResendClient(provider.apiKey);
      const result = await resend.emails.send({
        from: provider.from,
        to,
        subject: `Sign in to ${host}`,
        html: `<p>Click the button below to sign in to ${host}.</p><p><a href="${safeVerificationPageUrl}">Continue signing in</a></p><p>This link expires in 24 hours.</p>`,
        text: `Continue signing in to ${host}: ${verificationPageUrl.toString()}\n\nThis link expires in 24 hours.`,
      });

      if (result.error) {
        throw new Error(`Resend error: ${result.error.message}`);
      }
    },
    options: config,
  };
}