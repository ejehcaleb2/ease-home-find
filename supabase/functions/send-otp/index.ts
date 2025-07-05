
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { Resend } from "https://esm.sh/resend@2.0.0"

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

    console.log('Generated OTP:', otpCode, 'for email:', email)

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

    console.log('OTP stored successfully in database')

    // Check if Resend API key is available
    const resendApiKey = Deno.env.get('RESEND_API_KEY')
    
    if (!resendApiKey) {
      console.error('RESEND_API_KEY not found in environment variables')
      return new Response(
        JSON.stringify({ error: 'Email service not configured. Please contact support.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log('Resend API key found, attempting to send email...')

    try {
      const resend = new Resend(resendApiKey)
      
      // For testing purposes, if the email is not the verified domain owner's email,
      // we'll show the OTP in the console and return a special message
      const isTestEmail = email !== 'princefocus008@gmail.com'
      
      if (isTestEmail) {
        console.log(`TEST MODE: OTP for ${email} is: ${otpCode}`)
        return new Response(
          JSON.stringify({ 
            message: 'OTP generated successfully',
            test_mode: true,
            test_otp: otpCode,
            note: 'In production, this would be sent via email. For testing, the OTP is shown here.'
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
      
      const emailResponse = await resend.emails.send({
        from: "HomeEase <noreply@resend.dev>",
        to: [email],
        subject: "Your HomeEase Verification Code",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #2563eb; margin: 0;">HomeEase</h1>
              <p style="color: #64748b; margin: 5px 0;">Find your perfect home</p>
            </div>
            
            <div style="background: #f8fafc; border-radius: 10px; padding: 30px; text-align: center;">
              <h2 style="color: #1e293b; margin-bottom: 20px;">Email Verification</h2>
              <p style="color: #475569; margin-bottom: 30px;">Enter this verification code to complete your registration:</p>
              
              <div style="background: white; border: 2px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 20px 0; display: inline-block;">
                <span style="font-size: 32px; font-weight: bold; color: #2563eb; letter-spacing: 8px;">${otpCode}</span>
              </div>
              
              <p style="color: #64748b; font-size: 14px; margin-top: 20px;">
                This code will expire in 10 minutes for security reasons.
              </p>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
              <p style="color: #64748b; font-size: 12px;">
                If you didn't request this code, please ignore this email.
              </p>
            </div>
          </div>
        `,
      })

      console.log('Email sent successfully:', emailResponse)

      if (emailResponse.error) {
        throw new Error(emailResponse.error.message || 'Failed to send email')
      }

      return new Response(
        JSON.stringify({ 
          message: 'OTP sent successfully',
          email_id: emailResponse.data?.id
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )

    } catch (emailError) {
      console.error('Error sending email:', emailError)
      
      // If it's a Resend domain verification error, provide helpful guidance
      if (emailError.message.includes('verify a domain') || emailError.message.includes('testing emails')) {
        return new Response(
          JSON.stringify({ 
            error: 'Email service is in test mode. Please use princefocus008@gmail.com for testing, or verify your domain at resend.com/domains to send to other addresses.',
            test_mode: true,
            test_otp: otpCode,
            note: 'For testing purposes, here is your OTP code.'
          }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
      
      return new Response(
        JSON.stringify({ 
          error: 'Failed to send verification email. Please try again or contact support.',
          details: emailError.message 
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

  } catch (error) {
    console.error('Error in send-otp function:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
