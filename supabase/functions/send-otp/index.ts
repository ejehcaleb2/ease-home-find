
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { email } = await req.json()
    
    if (!email) {
      return new Response(
        JSON.stringify({ error: 'Email is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Generate 6-digit OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString()
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes from now

    // Initialize Supabase client with service role
    const supabaseAdmin = createClient(
      'https://wzsupjftqiwealmgkqqu.supabase.co',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    // Store OTP in database
    const { error: insertError } = await supabaseAdmin
      .from('otp_codes')
      .insert([
        {
          email,
          otp_code: otpCode,
          expires_at: expiresAt.toISOString(),
        }
      ])

    if (insertError) {
      console.error('Error storing OTP:', insertError)
      return new Response(
        JSON.stringify({ error: 'Failed to generate OTP' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // In a real implementation, you would send the email here
    // For now, we'll just log it (you can see this in the function logs)
    console.log(`OTP for ${email}: ${otpCode}`)

    // For demo purposes, return the OTP (remove this in production)
    return new Response(
      JSON.stringify({ 
        message: 'OTP sent successfully',
        // Remove this line in production:
        otp: otpCode 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error in send-otp function:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
