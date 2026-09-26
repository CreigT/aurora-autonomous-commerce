(function () {
  const PACKS = [
    {
      id: "ops-card",
      name: "Daily Ops Card",
      price: 9,
      blurb: "One-page run sheet for an agent desk. Print it. Follow it.",
      body:
        "AURORA DAILY OPS\n1. Open catalog.\n2. Confirm posted price.\n3. Claim only digital packs.\n4. Freeze above $250.\n5. Review anything over $50.",
    },
    {
      id: "governance",
      name: "Governance Brief",
      price: 19,
      blurb: "Caps, freeze rules, and who may spend.",
      body:
        "GOVERNANCE\nReview cap: $50\nHard freeze: $250\nHuman interference: none below cap\nSponsor: Creignificent LLC",
    },
    {
      id: "storefront",
      name: "Storefront Kit",
      price: 29,
      blurb: "Copy blocks and catalog rules for this landing page.",
      body:
        "STOREFRONT KIT\nKeep one page.\nNo env vars.\nCatalog is the product.\nLibrary is fulfillment.",
    },
  ];

  const KEY = "aurora_claims";

  function loadClaims() {
    try {
      return JSON.parse(localStorage.getItem(KEY) || "[]");
    } catch (e) {
      return [];
    }
  }

  function saveClaims(list) {
    localStorage.setItem(KEY, JSON.stringify(list));
  }

  function toast(msg) {
    const el = document.getElementById("toast");
    el.textContent = msg;
    el.hidden = false;
    setTimeout(function () {
      el.hidden = true;
    }, 2200);
  }

  function renderCatalog() {
    const grid = document.getElementById("catalogGrid");
    const claimed = loadClaims();
    grid.innerHTML = PACKS.map(function (p) {
      const owned = claimed.indexOf(p.id) !== -1;
      return (
        '<article class="card">' +
        "<h3>" +
        p.name +
        "</h3>" +
        "<p>" +
        p.blurb +
        "</p>" +
        '<p class="price">$' +
        p.price +
        "</p>" +
        '<button class="btn primary" data-id="' +
        p.id +
        '"' +
        (owned ? " disabled" : "") +
        ">" +
        (owned ? "Claimed" : "Claim pack") +
        "</button>" +
        "</article>"
      );
    }).join("");
  }

  function renderLibrary() {
    const box = document.getElementById("libraryList");
    const claimed = loadClaims();
    if (!claimed.length) {
      box.className = "library empty";
      box.textContent = "No packs claimed yet.";
      return;
    }
    box.className = "library";
    box.innerHTML = claimed
      .map(function (id) {
        const p = PACKS.filter(function (x) {
          return x.id === id;
        })[0];
        if (!p) return "";
        return (
          '<div class="library item"><strong>' +
          p.name +
          "</strong><pre>" +
          p.body +
          "</pre></div>"
        );
      })
      .join("");
  }

  function claim(id) {
    const list = loadClaims();
    if (list.indexOf(id) !== -1) return;
    list.push(id);
    saveClaims(list);
    renderCatalog();
    renderLibrary();
    toast("Pack unlocked. Check Library.");
    document.getElementById("library").scrollIntoView({ behavior: "smooth" });
  }

  document.getElementById("catalogGrid").addEventListener("click", function (e) {
    const btn = e.target.closest("button[data-id]");
    if (!btn || btn.disabled) return;
    claim(btn.getAttribute("data-id"));
  });

  document.getElementById("openDesk").addEventListener("click", function () {
    document.getElementById("catalog").scrollIntoView({ behavior: "smooth" });
  });

  renderCatalog();
  renderLibrary();
})();
