import Stripe from "stripe";
import { config, isLivePayments } from "./config";

export function getStripe() {
  if (!isLivePayments() || !config.stripeSecret) return null;
  return new Stripe(config.stripeSecret, {
    apiVersion: "2024-06-20"
  });
}
