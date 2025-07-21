import Stripe from 'stripe';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { sessionId } = body;

    if (!sessionId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Session ID is required',
      });
    }

    const config = useRuntimeConfig();
    const stripe = new Stripe(config.stripeSecretKey, {
      apiVersion: '2025-06-30.basil',
    });

    // Retrieve the checkout session
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return {
      data: session,
    };
  } catch (error) {
    console.error('Error retrieving checkout session:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to retrieve checkout session',
    });
  }
});
