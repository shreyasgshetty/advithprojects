/**
 * ─────────────────────────────────────────────────────────────────────────────
 * Advith Projects — Central Contact Configuration
 * ─────────────────────────────────────────────────────────────────────────────
 * Update ALL contact details here in one place.
 * These values are used across the Contact page for tel:, mailto:, and WhatsApp links.
 *
 * HOW TO UPDATE:
 *   1. Change PHONE_RAW to the actual number with country code, digits only (no spaces/dashes).
 *   2. Change WHATSAPP_NUMBER to the WhatsApp number (same format as PHONE_RAW).
 *   3. Change EMAIL to the actual contact email address.
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ── Raw phone number — digits and + only. Used for tel: link.
// PLACEHOLDER: Replace with actual phone number before going live.
export const PHONE_RAW = '+918277339115'

// ── Formatted display string shown to users.
export const PHONE_DISPLAY = '+91 82773 39115'

// ── WhatsApp number — same as phone if WhatsApp is on the same number.
// Must include country code without + (e.g. "918277339115")
// PLACEHOLDER: Replace with actual WhatsApp number.
export const WHATSAPP_NUMBER = '918277339115'

// ── Pre-filled WhatsApp message sent when user taps the WhatsApp button.
export const WHATSAPP_MESSAGE =
  'Hi Advith Projects, I would like to know more about your services.'

// ── Contact email address.
// PLACEHOLDER: Replace with actual email before going live.
export const EMAIL = 'projectsadvith@gmail.com'

// ── WhatsApp redirect URL (constructed automatically from above constants)
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

// ── mailto: link (constructed automatically)
export const MAILTO_URL = `mailto:${EMAIL}`

// ── tel: link (constructed automatically)
export const TEL_URL = `tel:${PHONE_RAW}`
