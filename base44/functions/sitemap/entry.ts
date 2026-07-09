Deno.serve(async (req) => {
  try {
    const origin = "https://finebreezevoi.info";

    const pages = [
      {
        path: "/", priority: "1.0", changefreq: "weekly",
        images: [
          "https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/dbd4a4e59_u.png",
          "https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/8061288ba_9.png",
          "https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/fef98d97e_7.png",
          "https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/02cdb469c_8.png",
          "https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/c653ddfeb_generated_b1c83de0.png",
          "https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/fa1737901_generated_a9007a29.png",
        ],
      },
      {
        path: "/Rooms", priority: "0.9", changefreq: "weekly",
        images: [
          "https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/20788029e_generated_88f01059.png",
          "https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/8bc1a552c_generated_968f02a0.png",
          "https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/c07c2f68b_generated_4aaae307.png",
        ],
      },
      {
        path: "/Restaurant", priority: "0.9", changefreq: "weekly",
        images: [
          "https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/db37a39df_generated_image.png",
          "https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/0c40aa756_generated_454c8724.png",
          "https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/709942548_generated_71a76177.png",
          "https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/c653ddfeb_generated_b1c83de0.png",
        ],
      },
      {
        path: "/Gallery", priority: "0.7", changefreq: "monthly",
        images: [
          "https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/fa1737901_generated_a9007a29.png",
          "https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/c653ddfeb_generated_b1c83de0.png",
          "https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/4ba5a5b13_generated_dc80709f.png",
          "https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/20788029e_generated_88f01059.png",
          "https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/8bc1a552c_generated_968f02a0.png",
          "https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/c07c2f68b_generated_4aaae307.png",
          "https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/0c40aa756_generated_454c8724.png",
          "https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/709942548_generated_71a76177.png",
        ],
      },
      {
        path: "/About", priority: "0.6", changefreq: "monthly",
        images: [
          "https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/fa1737901_generated_a9007a29.png",
          "https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/dbd4a4e59_u.png",
        ],
      },
      {
        path: "/Booking", priority: "0.8", changefreq: "monthly",
        images: [
          "https://media.base44.com/images/public/6a3fb7584615cfecc7584e35/8df5bf0be_generated_image.png",
        ],
      },
      { path: "/Contact", priority: "0.6", changefreq: "monthly", images: [] },
    ];

    const today = new Date().toISOString().split("T")[0];

    const urls = pages
      .map((p) => {
        const imageTags = (p.images || [])
          .map(
            (img) => `    <image:image>
      <image:loc>${img}</image:loc>
    </image:image>`
          )
          .join("\n");
        return `  <url>
    <loc>${origin}${p.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
${imageTags}
  </url>`;
      })
      .join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
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