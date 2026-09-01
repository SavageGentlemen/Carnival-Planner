const { onSchedule } = require("firebase-functions/v2/scheduler");
const { createClient } = require("@supabase/supabase-js");
const { sendBandPaymentReminderEmail } = require("./emailService");

function getSupabase() {
  const url = process.env.SUPABASE_URL || "https://placeholder.supabase.co";
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || "placeholder_key";
  return createClient(url, key);
}

exports.sendPaymentReminders = onSchedule(
  {
    schedule: "every day 09:00",
    timeZone: "UTC",
    secrets: ["GMAIL_USER", "GMAIL_APP_PASSWORD"]
  },
  async (event) => {
    try {
      const supabase = getSupabase();
      const now = new Date();
      
      // Calculate date 3 days from now
      const threeDaysFromNow = new Date();
      threeDaysFromNow.setDate(now.getDate() + 3);
      
      // 1. Send reminders
      const { data: upcomingPayments, error: upcomingError } = await supabase
        .from("band_payment_schedule")
        .select(`
          id,
          installment_label,
          amount_due,
          due_date,
          order_id,
          band_orders (
            id,
            buyer_email,
            buyer_name,
            band_costume_sections (
              title
            ),
            band_profiles (
              business_name,
              slug
            )
          )
        `)
        .eq("status", "pending")
        .lte("due_date", threeDaysFromNow.toISOString())
        .is("reminder_sent_at", null);

      if (upcomingError) {
        console.error("Error fetching upcoming payments:", upcomingError);
      } else if (upcomingPayments && upcomingPayments.length > 0) {
        for (const payment of upcomingPayments) {
          const email = payment.band_orders?.buyer_email;
          const name = payment.band_orders?.buyer_name;
          const bandName = payment.band_orders?.band_profiles?.business_name || "Carnival Band";
          const sectionTitle = payment.band_orders?.band_costume_sections?.title || "Costume";
          const slug = payment.band_orders?.band_profiles?.slug || "band";
          const orderId = payment.order_id || payment.band_orders?.id;
          const amountDue = payment.amount_due || payment.amount || 0;

          if (email) {
            const SITE_URL = process.env.SITE_URL || "https://carnival-planner.web.app";
            const portalUrl = `${SITE_URL}/band/${slug}/order/${orderId}`;

            console.log(`[Payment Reminder] Sending email to ${email} for $${amountDue} due on ${payment.due_date} (Band: ${bandName})`);
            
            try {
              await sendBandPaymentReminderEmail({
                to: email,
                bandName: bandName,
                sectionTitle: sectionTitle,
                buyerName: name,
                installmentLabel: payment.installment_label || "Scheduled Installment",
                amountDue: amountDue,
                dueDate: payment.due_date,
                portalUrl: portalUrl,
                isOverdue: false
              });
            } catch (emailErr) {
              console.warn("[Payment Reminder] Email send failed:", emailErr.message);
            }
            
            // Update reminder_sent_at
            await supabase
              .from("band_payment_schedule")
              .update({ reminder_sent_at: new Date().toISOString() })
              .eq("id", payment.id);
          }
        }
      }

      // 2. Mark overdue payments
      const { error: overdueError } = await supabase
        .from("band_payment_schedule")
        .update({ status: "overdue" })
        .eq("status", "pending")
        .lt("due_date", now.toISOString());

      if (overdueError) {
        console.error("Error marking overdue payments:", overdueError);
      }

      console.log("Payment reminders job completed successfully.");
    } catch (err) {
      console.error("Error in sendPaymentReminders:", err);
    }
  }
);
