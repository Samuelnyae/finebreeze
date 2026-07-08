Deno.serve(async (req) => {
  try {
    const origin = "https://finebreezevoi.info";

    const pages = [
      { path: "/", priority: "1.0", changefreq: "weekly" },
      { path: "/Rooms", priority: "0.9", changefreq: "weekly" },
      { path: "/Restaurant", priority: "0.9", changefreq: "weekly" },
      { path: "/Gallery", priority: "0.7", changefreq: "monthly" },
      { path: "/About", priority: "0.6", changefreq: "monthly" },
      { path: "/Booking", priority: "0.8", changefreq: "monthly" },
      { path: "/Contact", priority: "0.6", changefreq: "monthly" },
    ];

    const today = new Date().toISOString().split("T")[0];

    const urls = pages
      .map(
        (p) => `  <url>
    <loc>${origin}${p.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
      )
      .join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

    return new Response(xml, {
      status: 200,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});