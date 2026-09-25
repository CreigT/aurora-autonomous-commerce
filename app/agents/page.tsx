import agents from "@/data/agents.json";
import { config } from "@/lib/config";

type Agent = { id: string; name: string; state: string; note: string };
type Layer = { name: string; agents: Agent[] };

export default function AgentsPage() {
  const layers = agents.layers as Layer[];

  return (
    <main className="section" style={{ borderTop: "none", paddingTop: 40 }}>
      <div className="kicker">Control tower · read only</div>
      <h2>{config.storeName} agent mesh</h2>
      <p className="sub">
        Company status: <strong className="ok">{agents.status}</strong>. The
        owner does not click these buttons. This page is the public pulse so
        you can see which functions are live after each daily module.
      </p>
      <div className="tower">
        {layers.map((layer) => (
          <section className="layer" key={layer.name}>
            <h3>{layer.name}</h3>
            {layer.agents.map((agent) => (
              <div className="agent" key={agent.id}>
                <div>
                  <span className={`dot ${agent.state}`} />
                  {agent.name}
                  <div className="note">{agent.note}</div>
                </div>
                <div className="muted">{agent.state}</div>
              </div>
            ))}
          </section>
        ))}
      </div>
    </main>
  );
}
