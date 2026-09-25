import Stripe from "stripe";
import { config, isLivePayments } from "./config";

export function getStripe() {
  if (!isLivePayments()) return null;
  return new Stripe(config.stripeSecret, { typescript: true });
}
