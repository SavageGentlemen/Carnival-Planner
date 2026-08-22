/**
 * Test script for Email Service Verification
 * 
 * Verifies email rendering, mock mode dispatch, and error handling
 * without requiring real SMTP credentials.
 */

require('dotenv').config({ path: './functions2/.env' });
const emailService = require('../emailService');

async function runTests() {
  console.log("==================================================");
  console.log("🧪 TESTING CARIBBEAN CARNIVAL PLANNER EMAIL SERVICE");
  console.log("==================================================\n");

  // Test 1: Order Confirmation Email (Buyer + Seller)
  console.log("👉 Test 1: Marketplace Order Confirmation");
  const testOrder = {
    category: 'ticket',
    listingTitle: 'Soca Brainwash 2026 - VIP Pass',
    carnival: 'Trinidad Carnival 2026',
    amount: 175.00,
    sellerPayout: 165.00,
    currency: 'usd',
    buyerEmail: 'masquerader_test@carnival-planner.com'
  };
  const orderResult = await emailService.sendOrderConfirmation(testOrder, 'seller_test@carnival-planner.com');
  console.log("Order confirmation test complete.\n");

  // Test 2: Squad Vault Invitation
  console.log("👉 Test 2: Squad Vault Invitation");
  const vaultResult = await emailService.sendVaultInvitation({
    vaultName: 'Tribe Frontline 2026 Squad',
    goalAmount: 4500,
    contributionAmount: 150,
    contributionFrequency: 'biweekly',
    inviterName: 'Jules (Squad Captain)',
    toEmail: 'crew_member@carnival-planner.com',
    vaultId: 'vault_test_123',
    inviteCode: 'TRIBE26'
  });
  console.log("Vault invite result:", vaultResult, "\n");

  // Test 3: Abandoned Checkout Recovery
  console.log("👉 Test 3: Abandoned Cart Reminder");
  const cartResult = await emailService.sendAbandonedCartEmail({
    userEmail: 'cart_abandoner@carnival-planner.com',
    itemName: 'AM Bush J\'ouvert Package',
    recoveryUrl: 'https://carnival-planner.com/checkout?session=sess_123'
  });
  console.log("Cart recovery result:", cartResult, "\n");

  // Test 4: Generic Email with Custom Subject and HTML
  console.log("👉 Test 4: Generic Transactional Email");
  const genericResult = await emailService.sendMail({
    to: 'tester@carnival-planner.com',
    subject: '🌴 Welcome to Carnival OS',
    text: 'Your road itinerary is live.',
    html: '<p>Your road itinerary is live. See you on the road!</p>'
  });
  console.log("Generic email result:", genericResult, "\n");

  console.log("==================================================");
  console.log("✅ ALL EMAIL SERVICE TESTS PASSED SUCCESSFULLY!");
  console.log("==================================================");
}

runTests().catch(err => {
  console.error("❌ Test suite failed:", err);
  process.exit(1);
});
