
const checkoutNodeJssdk = require("@paypal/checkout-server-sdk");

function environment() {
  let clientId = process.env.CLIENT_ID_PAYPAL;
  let clientSecret = process.env.SECRET_PAYPAL;

  return new checkoutNodeJssdk.core.SandboxEnvironment(clientId, clientSecret); // ✅ غيّر إلى LiveEnvironment إذا كنت جاهز للإطلاق الحقيقي
}

function client() {
  return new checkoutNodeJssdk.core.PayPalHttpClient(environment());
}

module.exports = { client };
