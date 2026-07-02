Deno.serve(async (req) => {
  try {
    const url = new URL(req.url);
    const origin = `${url.protocol}//${url.host}`;

    const body = `User-agent: *
Allow: /
Disallow: /Admin
Disallow: /Login
Disallow: /Register

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