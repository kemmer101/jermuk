(function () {
  "use strict";
  var C = window.KEMMER || {}, B = window.BRANDS || {}, P = window.KEMMER_PHOTOS || {};
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var uid = 0;

  /* ---------------- illustrated bottles ---------------- */
  var SHAPES = {
    water: { d: "M47,20 h26 v8 c0,6 -2,8 -2,14 v28 C71,108 104,118 104,158 V334 q0,16 -16,16 H32 q-16,0 -16,-16 V158 C16,118 49,108 49,70 v-28 c0,-6 -2,-8 -2,-14 z", cap: [45, 4, 30, 22, 4], label: [16, 196, 88, 96], fill: 96 },
    longneck: { d: "M50,24 h20 v6 c0,4 -1,6 -1,10 v62 C69,140 100,150 100,190 V338 q0,12 -12,12 H32 q-12,0 -12,-12 V190 C20,150 51,140 51,102 v-62 c0,-4 -1,-6 -1,-10 z", cap: [47, 12, 26, 16, 2], label: [20, 226, 80, 84], fill: 120 },
    euro: { d: "M49,24 h22 v6 c0,4 -1,6 -1,10 v36 C70,110 104,120 104,160 V336 q0,14 -14,14 H30 q-14,0 -14,-14 V160 C16,120 50,110 50,76 v-36 c0,-4 -1,-6 -1,-10 z", cap: [46, 12, 28, 16, 2], label: [16, 200, 88, 92], fill: 100 },
    can: { d: "M30,40 h60 q10,0 12,10 l4,12 V330 q0,20 -20,20 H34 q-20,0 -20,-20 V62 l4,-12 q2,-10 12,-10 z", cap: [30, 32, 60, 12, 6], label: [14, 110, 92, 190], fill: 0 }
  };
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  function bottleSVG(b, sub) {
    var s = SHAPES[b.shape] || SHAPES.euro, id = "k" + (++uid), L = s.label, out = [];
    var name = b.name, fs = Math.min(20, Math.max(7, (L[2] - 12) / (name.length * .6)));
    out.push('<svg viewBox="0 0 120 360" aria-hidden="true" focusable="false"><defs>');
    out.push('<clipPath id="c' + id + '"><path d="' + s.d + '"/></clipPath>');
    out.push('<linearGradient id="g' + id + '" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".28"/><stop offset=".16" stop-color="#fff" stop-opacity=".42"/><stop offset=".26" stop-color="#fff" stop-opacity="0"/><stop offset=".78" stop-color="#fff" stop-opacity="0"/><stop offset=".86" stop-color="#fff" stop-opacity=".18"/><stop offset="1" stop-color="#000" stop-opacity=".35"/></linearGradient>');
    out.push("</defs>");
    out.push('<ellipse cx="60" cy="354" rx="46" ry="5" fill="#000" opacity=".18"/>');
    out.push('<g clip-path="url(#c' + id + ')">');
    if (b.shape === "can") {
      out.push('<rect width="120" height="360" fill="' + b.label + '"/>');
      out.push('<g opacity=".9"><circle cx="60" cy="210" r="34" fill="none" stroke="' + b.ink + '" stroke-width="1.5"/><circle cx="60" cy="210" r="26" fill="none" stroke="' + b.ink + '" stroke-width=".8" stroke-dasharray="2 3"/></g>');
      out.push('<text x="60" y="' + (L[1] + 22) + '" text-anchor="middle" font-size="' + fs + '" font-weight="800" fill="' + b.ink + '" letter-spacing="-.5">' + esc(name) + "</text>");
      out.push('<text x="60" y="' + (L[1] + L[3] - 12) + '" text-anchor="middle" font-size="7" font-weight="600" fill="' + b.ink + '" opacity=".85">' + esc(sub || b.style) + "</text>");
    } else {
      out.push('<rect width="120" height="360" fill="' + b.glass + '" opacity="' + b.glassOp + '"/>');
      out.push('<g class="b-liquid">');
      out.push('<rect x="0" y="' + (s.fill + 4) + '" width="120" height="' + (360 - s.fill) + '" fill="' + b.liquid + '"/>');
      out.push('<path class="b-wave" fill="' + b.liquid + '" d="M-60,' + (s.fill + 6) + ' q15,-6 30,0 t30,0 t30,0 t30,0 t30,0 t30,0 t30,0 t30,0 v12 H-60z"/>');
      for (var i = 0; i < 14; i++) {
        var cx = 26 + Math.random() * 68, cy = s.fill + 90 + Math.random() * (340 - s.fill - 90), r = .7 + Math.random() * 1.8;
        out.push('<circle class="b-bub" cx="' + cx.toFixed(1) + '" cy="' + cy.toFixed(1) + '" r="' + r.toFixed(1) + '" fill="#fff" style="animation-delay:' + (Math.random() * 3).toFixed(2) + "s;animation-duration:" + (2 + Math.random() * 2.5).toFixed(2) + 's"/>');
      }
      out.push("</g>");
      if (b.tint) out.push('<rect width="120" height="360" fill="' + b.glass + '" opacity="' + b.tint + '"/>');
      out.push('<rect x="' + L[0] + '" y="' + L[1] + '" width="' + L[2] + '" height="' + L[3] + '" fill="' + b.label + '"/>');
      out.push('<line x1="' + (L[0] + 10) + '" x2="' + (L[0] + L[2] - 10) + '" y1="' + (L[1] + 8) + '" y2="' + (L[1] + 8) + '" stroke="' + b.ink + '" stroke-width=".6" opacity=".6"/>');
      out.push('<text x="60" y="' + (L[1] + L[3] * .52) + '" text-anchor="middle" font-size="' + fs + '" font-weight="800" fill="' + b.ink + '" letter-spacing="-.5">' + esc(name) + "</text>");
      out.push('<text x="60" y="' + (L[1] + L[3] * .52 + 14) + '" text-anchor="middle" font-size="6.5" font-weight="600" fill="' + b.ink + '" opacity=".85">' + esc(sub || b.style) + "</text>");
      out.push('<line x1="' + (L[0] + 10) + '" x2="' + (L[0] + L[2] - 10) + '" y1="' + (L[1] + L[3] - 8) + '" y2="' + (L[1] + L[3] - 8) + '" stroke="' + b.ink + '" stroke-width=".6" opacity=".6"/>');
    }
    out.push('<rect width="120" height="360" fill="url(#g' + id + ')"/>');
    out.push("</g>");
    out.push('<path d="' + s.d + '" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="1.2"/>');
    var c = s.cap;
    out.push('<rect x="' + c[0] + '" y="' + c[1] + '" width="' + c[2] + '" height="' + c[3] + '" rx="' + c[4] + '" fill="' + b.cap + '"/>');
    if (b.shape !== "can") out.push('<rect x="' + (c[0] + 3) + '" y="' + (c[1] + 3) + '" width="3" height="' + (c[3] - 6) + '" rx="1.5" fill="#fff" opacity=".35"/>');
    out.push("</svg>");
    return out.join("");
  }

  function renderBottles(root) {
    (root || document).querySelectorAll(".bottle[data-brand]:not([data-done])").forEach(function (el) {
      var b = B[el.dataset.brand]; if (!b) return;
      el.setAttribute("data-done", "");
      var photo = P[el.dataset.brand];
      if (photo) { el.innerHTML = '<img class="photo" alt="' + esc(b.name) + '" src="' + esc(photo) + '">'; }
      else { el.innerHTML = bottleSVG(b, el.dataset.sub); el.setAttribute("role", "img"); el.setAttribute("aria-label", b.name + (el.dataset.sub ? ", " + el.dataset.sub : "")); }
      if (reduce) el.classList.add("is-in"); else bottleIO.observe(el);
    });
  }
  var bottleIO = "IntersectionObserver" in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-in"); bottleIO.unobserve(e.target); } });
  }, { threshold: .2 }) : { observe: function (el) { el.classList.add("is-in"); }, unobserve: function () {} };

  /* ---------------- config fill ---------------- */
  function fillConfig() {
    document.querySelectorAll("[data-config]").forEach(function (el) { var k = el.dataset.config; if (C[k]) el.textContent = C[k]; });
    document.querySelectorAll("[data-href]").forEach(function (el) {
      var t = el.dataset.href;
      if (t === "email") el.href = "mailto:" + C.email;
      if (t === "phone") el.href = "tel:" + C.phoneHref;
      if (t === "whatsapp") el.href = "https://wa.me/" + C.whatsapp;
      if (t === "telegram") el.href = "https://t.me/" + C.telegram;
    });
    document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
  }

  /* ---------------- header + nav ---------------- */
  function header() {
    var h = document.querySelector(".site-header"); if (!h) return;
    var onScroll = function () { h.classList.toggle("is-solid", window.scrollY > 40 && !document.body.classList.contains("nav-open")); };
    window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
    var btn = document.querySelector(".menu-btn");
    if (btn) btn.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      btn.setAttribute("aria-expanded", open); btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      document.body.style.overflow = open ? "hidden" : ""; onScroll();
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && document.body.classList.contains("nav-open")) btn.click(); });
    var page = document.body.dataset.page;
    document.querySelectorAll(".nav a[data-nav]").forEach(function (a) { if (a.dataset.nav === page) a.setAttribute("aria-current", "page"); });
  }

  /* ---------------- page transitions ---------------- */
  function transitions() {
    requestAnimationFrame(function () { setTimeout(function () { document.body.classList.add("is-loaded"); }, 80); });
    window.addEventListener("pageshow", function (e) { if (e.persisted) { document.body.classList.remove("is-leaving"); document.body.classList.add("is-loaded"); } });
    document.addEventListener("click", function (e) {
      var a = e.target.closest("a"); if (!a || reduce) return;
      var href = a.getAttribute("href") || "";
      if (a.target === "_blank" || e.metaKey || e.ctrlKey || e.shiftKey || /^(mailto:|tel:|https?:|#)/.test(href) || a.hasAttribute("download")) return;
      var url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      if (url.pathname === location.pathname && url.hash) return;
      e.preventDefault();
      document.body.classList.remove("nav-open"); document.body.classList.add("is-leaving");
      setTimeout(function () { location.href = a.href; }, 480);
    });
  }

  /* ---------------- reveal ---------------- */
  function reveal() {
    var els = document.querySelectorAll("[data-reveal], .steps");
    if (reduce || !("IntersectionObserver" in window)) { els.forEach(function (el) { el.classList.add("is-in"); }); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
    }, { threshold: .15, rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------------- bubble canvas (motion graphic) ---------------- */
  function bubbles(canvas) {
    var ctx = canvas.getContext("2d"), dpr = Math.min(window.devicePixelRatio || 1, 2), W, H, parts = [], run = true;
    var color = canvas.dataset.color || "143,211,222", density = +canvas.dataset.density || 1;
    function size() {
      var r = canvas.getBoundingClientRect(); W = r.width; H = r.height;
      canvas.width = W * dpr; canvas.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.round(Math.min(140, W * H / 9000) * density);
      parts = []; for (var i = 0; i < n; i++) parts.push(make(true));
    }
    function make(any) {
      return { x: Math.random() * W, y: any ? Math.random() * H : H + 10, r: .8 + Math.pow(Math.random(), 3) * 7, v: .25 + Math.random() * 1.1, w: Math.random() * 6.28, ws: .01 + Math.random() * .03, a: .15 + Math.random() * .5 };
    }
    var mx = -999, my = -999;
    canvas.parentElement.addEventListener("pointermove", function (e) { var r = canvas.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; });
    canvas.parentElement.addEventListener("pointerleave", function () { mx = my = -999; });
    function tick() {
      if (!run) return;
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < parts.length; i++) {
        var p = parts[i]; p.y -= p.v * (1 + p.r * .08); p.w += p.ws; p.x += Math.sin(p.w) * .4;
        var dx = p.x - mx, dy = p.y - my, d = dx * dx + dy * dy;
        if (d < 9000) { var f = (9000 - d) / 9000; p.x += dx * f * .06; p.y += dy * f * .06; }
        if (p.y < -12) parts[i] = make(false);
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283);
        ctx.strokeStyle = "rgba(" + color + "," + p.a + ")"; ctx.lineWidth = 1; ctx.stroke();
        if (p.r > 3) { ctx.beginPath(); ctx.arc(p.x - p.r * .35, p.y - p.r * .35, p.r * .25, 0, 6.283); ctx.fillStyle = "rgba(255,255,255," + p.a * .8 + ")"; ctx.fill(); }
      }
      requestAnimationFrame(tick);
    }
    size(); window.addEventListener("resize", size);
    if (reduce) { run = true; tick(); run = false; return; }
    new IntersectionObserver(function (es) { var was = run; run = es[0].isIntersecting; if (run && !was) tick(); }).observe(canvas);
    tick();
  }

  /* ---------------- parallax ridges ---------------- */
  function parallax() {
    var layers = document.querySelectorAll("[data-depth]"); if (!layers.length || reduce) return;
    var ticking = false;
    window.addEventListener("scroll", function () {
      if (ticking) return; ticking = true;
      requestAnimationFrame(function () {
        var y = window.scrollY;
        layers.forEach(function (l) { l.style.transform = "translate3d(0," + (y * +l.dataset.depth) + "px,0)"; });
        ticking = false;
      });
    }, { passive: true });
  }

  /* ---------------- marquee ---------------- */
  function marquee() {
    document.querySelectorAll(".marquee-track").forEach(function (t) { t.innerHTML += t.innerHTML; });
  }

  /* ---------------- beer catalogue ---------------- */
  function catalogue() {
    var grid = document.getElementById("beerGrid"); if (!grid) return;
    var ids = Object.keys(B).filter(function (k) { return B[k].group !== "water"; });
    grid.innerHTML = ids.map(function (k) {
      var b = B[k], glow = b.group === "armenian" ? "rgba(217,147,126,.45)" : "rgba(240,168,48,.4)";
      return '<button class="beer-card" data-id="' + k + '" data-group="' + b.group + '" style="--glow:' + glow + '" aria-haspopup="dialog">' +
        '<div class="beer-art"><div class="bottle" data-brand="' + k + '"></div></div>' +
        '<div class="beer-meta"><div><h3>' + esc(b.name) + "</h3><p>" + esc(b.style) + "<br>" + esc(b.origin) + "</p></div>" +
        '<span class="flag">' + (b.style.indexOf("Craft") === 0 ? "Craft" : "Lager") + "</span></div></button>";
    }).join("");
    renderBottles(grid);

    var filters = document.querySelectorAll(".filter");
    function apply(g) {
      filters.forEach(function (f) { f.setAttribute("aria-pressed", f.dataset.filter === g); });
      grid.querySelectorAll(".beer-card").forEach(function (c, i) {
        var show = g === "all" || c.dataset.group === g;
        c.classList.toggle("is-hidden", !show);
        if (show && !reduce) { c.classList.remove("pop"); void c.offsetWidth; c.style.animationDelay = (i % 8) * 40 + "ms"; c.classList.add("pop"); }
      });
    }
    filters.forEach(function (f) { f.addEventListener("click", function () { apply(f.dataset.filter); history.replaceState(null, "", f.dataset.filter === "all" ? location.pathname : "#" + f.dataset.filter); }); });
    var h = location.hash.slice(1); apply(h === "armenian" ? h : "all");
    if (h === "armenian") setTimeout(function () { document.getElementById("catalogue").scrollIntoView(); }, 300);

    // tilt
    if (!reduce && window.matchMedia("(hover:hover)").matches) grid.addEventListener("pointermove", function (e) {
      var c = e.target.closest(".beer-card"); if (!c) return;
      var r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      c.style.setProperty("--ry", x * 8 + "deg"); c.style.setProperty("--rx", -y * 8 + "deg");
    });
    grid.addEventListener("pointerout", function (e) { var c = e.target.closest(".beer-card"); if (c && !c.contains(e.relatedTarget)) { c.style.setProperty("--rx", "0deg"); c.style.setProperty("--ry", "0deg"); } });

    // modal
    var dlg = document.getElementById("beerModal");
    grid.addEventListener("click", function (e) {
      var c = e.target.closest(".beer-card"); if (!c) return;
      var k = c.dataset.id, b = B[k];
      dlg.querySelector(".modal-art").innerHTML = '<div class="bottle" data-brand="' + k + '"></div>';
      dlg.querySelector(".modal-art").style.background = b.group === "armenian" ? "#5E2A26" : "var(--malt)";
      dlg.querySelector("[data-m=name]").textContent = b.name;
      dlg.querySelector("[data-m=desc]").textContent = b.desc;
      dlg.querySelector("[data-m=style]").textContent = b.style;
      dlg.querySelector("[data-m=origin]").textContent = b.origin;
      dlg.querySelector("[data-m=cta]").href = "contact.html?product=" + encodeURIComponent(b.name);
      if (dlg.showModal) dlg.showModal(); else dlg.setAttribute("open", "");
      renderBottles(dlg);
    });
    dlg.querySelector(".modal-close").addEventListener("click", function () { dlg.close ? dlg.close() : dlg.removeAttribute("open"); });
    dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
  }

  /* ---------------- contact form ---------------- */
  function contact() {
    var form = document.getElementById("enquiry"); if (!form) return;
    var q = new URLSearchParams(location.search), msg = form.elements.message;
    if (q.get("topic") === "pricelist") { msg.value = "Hello, please send me your current wholesale price list."; }
    var prod = q.get("product");
    if (prod) {
      var isWater = /jermuk/i.test(prod), b = null;
      Object.keys(B).forEach(function (k) { if (B[k].name === prod) b = B[k]; });
      var box = form.querySelector('input[name=products][value="' + (isWater ? "Jermuk" : "Armenian beer") + '"]');
      if (box) box.checked = true;
      msg.value = "Hello, I'd like prices and availability for " + prod + ".";
    }
    function body() {
      var f = form.elements, p = [].slice.call(form.querySelectorAll("input[name=products]:checked")).map(function (i) { return i.value; });
      return "Name: " + f.name.value + "\nCompany: " + (f.company.value || "-") + "\nBusiness type: " + f.type.value + "\nPhone: " + (f.phone.value || "-") +
        "\nEmail: " + f.email.value + "\nInterested in: " + (p.join(", ") || "-") + "\n\n" + f.message.value;
    }
    function check() {
      var ok = true;
      ["name", "email", "message"].forEach(function (n) {
        var el = form.elements[n], wrap = el.closest(".field"), err = wrap.querySelector(".err"), m = "";
        if (!el.value.trim()) m = n === "name" ? "Enter your name." : n === "email" ? "Enter your email so we can reply." : "Tell us what you need.";
        else if (n === "email" && !/^\S+@\S+\.\S+$/.test(el.value)) m = "Enter an email like name@company.am.";
        wrap.classList.toggle("invalid", !!m); err.textContent = m; if (m && ok) { el.focus(); ok = false; }
      });
      return ok;
    }
    form.addEventListener("submit", function (e) {
      e.preventDefault(); if (!check()) return;
      var subj = "Enquiry from " + form.elements.name.value + (form.elements.company.value ? " (" + form.elements.company.value + ")" : "");
      location.href = "mailto:" + C.email + "?subject=" + encodeURIComponent(subj) + "&body=" + encodeURIComponent(body());
      form.classList.add("is-sent");
    });
    var wa = document.getElementById("sendWhatsapp");
    if (wa) wa.addEventListener("click", function () {
      if (!check()) return;
      window.open("https://wa.me/" + C.whatsapp + "?text=" + encodeURIComponent(body()), "_blank", "noopener");
      form.classList.add("is-sent");
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    fillConfig(); header(); transitions(); marquee(); renderBottles(); reveal(); parallax(); catalogue(); contact();
    document.querySelectorAll("canvas.bubbles").forEach(bubbles);
  });
})();
