import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Edge function to sync carnival events from a standard source or JSON-LD
// Replaces the Python DOM scrapers

serve(async (req) => {
  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Example JSON-LD / standard feed source (mocked for this refactor)
    // In production, fetch from Eventbrite, TicketGateway, or an XML sitemap
    const externalEvents = [
      {
        id: "mock-1",
        name: "Tribe Ignite 2026",
        date: new Date().toISOString(),
        venue: "Hasely Crawford Stadium",
        source_url: "https://example.com/tribe-ignite",
        image_url: "https://example.com/tribe.jpg",
        carnival_id: "TTCarnival2026",
        raw_data: { source: "ticket-api" }
      },
      {
        id: "mock-2",
        name: "Soca Brainwash 2026",
        date: new Date(Date.now() + 86400000).toISOString(),
        venue: "St. Mary's College Grounds",
        source_url: "https://example.com/soca-brainwash",
        image_url: "https://example.com/brainwash.jpg",
        carnival_id: "TTCarnival2026",
        raw_data: { source: "ticket-api" }
      }
    ];

    console.log(`Syncing ${externalEvents.length} events...`);

    for (const event of externalEvents) {
      const { error } = await supabase
        .from('events')
        .upsert({
          name: event.name,
          date: event.date,
          venue: event.venue,
          source_url: event.source_url,
          image_url: event.image_url,
          carnival_id: event.carnival_id,
          raw_data: event.raw_data
        }, { onConflict: 'source_url' });

      if (error) {
        console.error("Error inserting event:", error.message);
      }
    }

    return new Response(
      JSON.stringify({ message: "Events synced successfully", count: externalEvents.length }),
      { headers: { "Content-Type": "application/json" } }
    )
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { "Content-Type": "application/json" } })
  }
})
