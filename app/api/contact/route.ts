import { NextResponse } from 'next/server';
import type { ContactFormPayload } from '@/types';

/**
 * Contact form handler (build spec §7). Validates the payload and forwards the
 * submission to Web3Forms, which delivers it to the inbox registered against
 * the access key.
 *
 * The access key may be overridden with `WEB3FORMS_ACCESS_KEY`; it falls back to
 * the project key so the form works out of the box. Web3Forms access keys are
 * public by design (they are normally embedded directly in client-side forms),
 * so keeping a default here is safe.
 */

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const ACCESS_KEY =
  process.env.WEB3FORMS_ACCESS_KEY ?? '833eab08-7ec5-4243-904f-46376547f118';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request): Promise<NextResponse> {
  let payload: ContactFormPayload;
  try {
    payload = (await request.json()) as ContactFormPayload;
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const name = payload.name?.trim();
  const email = payload.email?.trim();
  const phone = payload.phone?.trim();
  const message = payload.message?.trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: 'Name, email, and message are required.' },
      { status: 400 },
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }

  try {
    const res = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: ACCESS_KEY,
        subject: `New project enquiry from ${name}`,
        from_name: 'WesDev Website',
        name,
        email,
        ...(phone ? { phone } : {}),
        message,
        replyto: email,
      }),
    });

    const data = (await res.json().catch(() => null)) as
      | { success?: boolean; message?: string }
      | null;

    if (!res.ok || !data?.success) {
      console.error('Web3Forms error:', data);
      return NextResponse.json({ error: 'Failed to send message.' }, { status: 502 });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error('Contact route error:', err);
    return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 });
  }
}
