import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'
import Stripe from 'https://esm.sh/stripe@12.18.0?target=deno'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', {
  apiVersion: '2022-11-15',
  httpClient: Stripe.createFetchHttpClient(),
})

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

    const { data: { user } } = await supabaseClient.auth.getUser()
    if (!user) throw new Error('Unauthorized')

    const { bandId } = await req.json()
    if (user.id !== bandId) throw new Error('Unauthorized')

    // Get the band profile
    const { data: bandProfile, error: profileError } = await supabaseClient
      .from('band_profiles')
      .select('*')
      .eq('id', bandId)
      .single()

    if (profileError || !bandProfile) throw new Error('Band profile not found')

    let stripeAccountId = bandProfile.stripe_account_id

    // If no Stripe account exists for this band, create an Express connected account
    if (!stripeAccountId) {
      const account = await stripe.accounts.create({
        type: 'express',
        country: 'US', // Adjust default country based on platform needs
        email: bandProfile.support_email,
        business_type: 'company',
        company: {
          name: bandProfile.business_name,
        },
        capabilities: {
          card_payments: { requested: true },
          transfers: { requested: true },
        },
      })
      
      stripeAccountId = account.id

      // Save the account ID to the band profile
      await supabaseClient
        .from('band_profiles')
        .update({ stripe_account_id: stripeAccountId })
        .eq('id', bandId)
    }

    // Generate an account link for onboarding or dashboard access
    const returnUrl = `${req.headers.get('origin')}/profile`
    
    const accountLink = await stripe.accountLinks.create({
      account: stripeAccountId,
      refresh_url: returnUrl,
      return_url: returnUrl,
      type: 'account_onboarding',
    })

    return new Response(
      JSON.stringify({ url: accountLink.url }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
