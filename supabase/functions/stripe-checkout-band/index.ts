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

    const { bandId, sectionId, variants, totalAmount } = await req.json()
    if (!bandId || !sectionId || !totalAmount) throw new Error('Missing parameters')

    // Get the band profile to ensure they have a Stripe connected account
    const { data: bandProfile, error: profileError } = await supabaseClient
      .from('band_profiles')
      .select('stripe_account_id, business_name')
      .eq('id', bandId)
      .single()

    if (profileError || !bandProfile?.stripe_account_id) {
      throw new Error('Band cannot accept payments yet.')
    }

    // Get section details for the line item
    const { data: section, error: sectionError } = await supabaseClient
      .from('band_costume_sections')
      .select('title')
      .eq('id', sectionId)
      .single()

    if (sectionError) throw new Error('Section not found')

    // Calculate platform fee (e.g. 5% + 0.30)
    // We do this by creating a PaymentIntent with application_fee_amount
    // OR by creating a Checkout Session
    const platformFee = Math.round(totalAmount * 0.05 * 100); // 5% fee in cents

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${bandProfile.business_name} - ${section.title}`,
              description: Object.entries(variants).map(([k,v]) => `${k}: ${v}`).join(', '),
            },
            unit_amount: Math.round(totalAmount * 100), // amount in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      payment_intent_data: {
        application_fee_amount: platformFee,
        transfer_data: {
          destination: bandProfile.stripe_account_id,
        },
        metadata: {
          bandId,
          sectionId,
          buyerId: user.id,
          variants: JSON.stringify(variants)
        }
      },
      success_url: `${req.headers.get('origin')}/profile?checkout=success`,
      cancel_url: `${req.headers.get('origin')}/profile?checkout=cancel`,
    })

    return new Response(
      JSON.stringify({ id: session.id, url: session.url }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
