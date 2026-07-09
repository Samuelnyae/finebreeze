Deno.serve(async (req) => {
  try {
    const origin = "https://finebreezevoi.info";

    const body = `User-agent: *
Allow: /
Disallow: /Admin
Disallow: /Login
Disallow: /Register

# Allow image crawling
User-agent: Googlebot-Image
Allow: /

User-agent: Bingbot
Allow: /

Sitemap: ${origin}/api/functions/sitemap
`;

    return new Response(body, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});