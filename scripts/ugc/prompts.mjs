export const firstPreviewPrompt = `Create a photorealistic vertical UGC-style reel, 15 seconds. The reference image is a character sheet of ONE man, Alex: use his portrait and full-body image ONLY as identity references. Show ONE Alex in his same brown suit, never the character-sheet layout. Set the scene in an independent restaurant before opening, warm daylight, tables visible, authentic handheld camera at eye level, clear natural voices, no music. Alex speaks with a fictional adult restaurant owner wearing a neutral apron. This is an illustrative conversation, not a real client testimonial. First 5 seconds, the owner says: "Busy restaurant, but my MCA payments keep coming." Cut to Alex who replies: "Start with every agreement, payment amount, and schedule. Find MCA guides at Business Debt Insider." Keep Alex's facial appearance consistent with the supplied reference. No invented success claims, no extra dialogue, no logos, no generated website screens, no on-screen lettering. Frame both faces clearly and finish on Alex's friendly, confident expression.`;

export const correctedPreview = {
  id: "restaurant-owner-v2",
  spoken: "MCA payments every day? Start with your agreements and payment schedule. Learn more at Business Debt Insider.",
  prompt: `Photorealistic vertical 15-second UGC video. Use the attached character sheet ONLY as an identity reference for ONE man, Alex in the brown suit. Never show the sheet. Medium two-person shot in a small restaurant before opening, natural daylight, handheld phone-camera realism. Alex is seated with an adult restaurant owner wearing an apron. The owner listens silently and nods. Only Alex speaks, clearly and slowly, with a natural American accent. Exact dialogue, said ONCE: "MCA payments every day? Start with your agreements and payment schedule. Learn more at Business Debt Insider." Finish all dialogue by second 12, then hold a friendly silent expression. The business owner never speaks. No additional words, no repeated words, no music, no voiceover. Both people are fictional. No claims of customer results, no logos, no text or website imagery. Keep Alex's identity and brown suit identical to the reference.`,
  caption: "MCA payments every day? Start by gathering your agreements and payment schedule. Explore MCA guides at businessdebtinsider.com.\n\nAI-generated presenter and fictional business-owner scene. Educational content.\n\n#MCA #MerchantCashAdvance #BusinessOwners #BusinessDebtInsider",
};

export const finalPreview = {
  ...correctedPreview,
  id: "restaurant-owner-v3",
  spoken: "MCA payments every day? Start with your agreements and payment schedule. Visit our website to learn more.",
  prompt: correctedPreview.prompt.replace("Learn more at Business Debt Insider.", "Visit our website to learn more."),
};
