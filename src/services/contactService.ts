export async function sendInquiry(payload) {
  // For MVP this uses Formspree adapter in production. Here we mimic success.
  return { success: true, message: 'Inquiry sent (demo). Configure Formspree to enable.' }
}
