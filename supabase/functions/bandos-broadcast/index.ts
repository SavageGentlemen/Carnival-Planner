import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    const { bandId, userIds, message } = await req.json()

    if (!bandId || !userIds || !message) {
      return new Response(JSON.stringify({ error: 'Missing parameters' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      })
    }

    // Verify the caller is the band leader for the requested band
    const { data: { user } } = await supabaseClient.auth.getUser()
    if (!user || user.id !== bandId) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 403,
      })
    }

    // Note: To implement actual push notifications or emails, you would integrate OneSignal, FCM, or Resend here.
    // For this demonstration, we simulate the broadcast by logging it and potentially inserting into a notifications table if one existed.
    
    console.log(`[BandOS Broadcast] Band ${bandId} sending to ${userIds.length} users: ${message}`);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    return new Response(
      JSON.stringify({ success: true, count: userIds.length }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
