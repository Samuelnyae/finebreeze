import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();
    const { page, source } = body;

    if (!page) {
      return Response.json({ error: 'Page is required' }, { status: 400 });
    }

    const today = new Date().toISOString().split('T')[0];

    const existing = await base44.asServiceRole.entities.SiteVisit.filter({ date: today, page });
    const visitSource = source || 'direct';

    if (existing && existing.length > 0) {
      const record = existing[0];
      await base44.asServiceRole.entities.SiteVisit.update(record.id, {
        count: (record.count || 0) + 1,
        source: visitSource
      });
      return Response.json({ success: true, page, date: today, count: (record.count || 0) + 1 });
    }

    const created = await base44.asServiceRole.entities.SiteVisit.create({
      date: today,
      page,
      source: visitSource,
      count: 1
    });

    return Response.json({ success: true, page, date: today, count: 1, id: created.id });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});