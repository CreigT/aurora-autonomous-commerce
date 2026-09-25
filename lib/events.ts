/**
 * Lightweight event bus for agent-to-agent communication.
 * In production this becomes a queue (QStash / SQS / Postgres outbox).
 * Today it is an in-process ring buffer so every action is still logged.
 */

export type CommerceEvent = {
  id: string;
  type: string;
  source: string;
  payload: Record<string, unknown>;
  at: string;
};

const MAX = 200;
const ring: CommerceEvent[] = [];

export function emit(type: string, source: string, payload: Record<string, unknown>) {
  const event: CommerceEvent = {
    id: `evt_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    type,
    source,
    payload,
    at: new Date().toISOString()
  };
  ring.unshift(event);
  if (ring.length > MAX) ring.pop();
  return event;
}

export function recent(limit = 50) {
  return ring.slice(0, limit);
}
