import Stripe from 'stripe';

export default defineEventHandler(async (event) => {
  try {
    console.log('Creating checkout session...');
    
    const body = await readBody(event);
    const { items } = body;

    console.log('Request body:', { items });

    if (!items || !Array.isArray(items) || items.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'No items provided for checkout',
      });
    }

    const config = useRuntimeConfig();
    console.log('Runtime config loaded:', {
      hasStripeKey: !!config.stripeSecretKey,
      domain: config.public.domain,
    });

    if (!config.stripeSecretKey) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Stripe secret key not configured',
      });
    }

    const stripe = new Stripe(config.stripeSecretKey, {
      apiVersion: '2025-06-30.basil',
    });

    // Transform cart items to Stripe line items
    const lineItems = items.map((item: any) => {
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.title,
            // Don't include images to avoid URL validation issues
            metadata: {
              size: item.imageSize || '',
              image_reference: item.imageUrl || '',
            },
          },
          unit_amount: Math.round(item.price * 100), // Stripe expects amount in cents
        },
        quantity: item.quantity,
      };
    });

    // Add shipping if applicable
    const subtotal = items.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0
    );

    console.log('Subtotal calculation:', {
      subtotal,
      shouldAddShipping: subtotal < 100,
      items: items.map(item => ({ title: item.title, price: item.price, quantity: item.quantity }))
    });

    if (subtotal < 100) {
      const shippingAmount = items.reduce(
        (sum: number, item: any) => sum + 5 * item.quantity,
        0
      );

      console.log('Adding shipping:', shippingAmount);

      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Shipping',
            metadata: {
              size: '',
              image_reference: '',
            },
          },
          unit_amount: Math.round(shippingAmount * 100),
        },
        quantity: 1,
      });
    } else {
      console.log('Free shipping applied - subtotal is >= $100');
    }

    console.log('Creating Stripe session with:', {
      lineItemsCount: lineItems.length,
      successUrl: `${config.public.domain}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${config.public.domain}/cart`,
    });

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${config.public.domain}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${config.public.domain}/cart`,
      automatic_tax: {
        enabled: true,
      },
      shipping_address_collection: {
        allowed_countries: ['US'],
      },
      metadata: {
        order_type: 'photography_prints',
      },
    });

    console.log('Stripe session created successfully:', session.id);

    return {
      sessionId: session.id,
      url: session.url,
    };
  } catch (error: any) {
    console.error('Stripe checkout error details:', {
      message: error?.message || 'Unknown error',
      type: error?.type,
      code: error?.code,
      decline_code: error?.decline_code,
      stack: error?.stack,
    });
    
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to create checkout session: ${error?.message || 'Unknown error'}`,
    });
  }
});
