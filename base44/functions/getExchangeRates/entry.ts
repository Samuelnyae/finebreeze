import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    const response = await fetch('https://open.er-api.com/v6/latest/KES');
    const data = await response.json();

    if (!data || !data.rates) {
      return Response.json({ error: 'Failed to fetch exchange rates' }, { status: 500 });
    }

    return Response.json({
      base: 'KES',
      rates: {
        KES: 1,
        USD: data.rates.USD,
        EUR: data.rates.EUR,
        GBP: data.rates.GBP
      }
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});