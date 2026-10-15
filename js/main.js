/* UB Detailing — site behavior. Content comes from js/config.js. */
(function () {
  "use strict";
  const S = window.SITE;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const get = (path) => path.split(".").reduce((o, k) => (o ? o[k] : undefined), S);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const store = {
    get(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} },
  };
  const B = S.business;
  const waLink = (text) => `https://wa.me/${B.whatsapp}${text ? "?text=" + encodeURIComponent(text) : ""}`;

  /* ---------- Icons ---------- */
  const ICONS = {
    interior: '<path d="M6 20v-6a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v6M8 11V6a4 4 0 0 1 8 0v5M4 20h16"/>',
    exterior: '<path d="M3 15l2-5a3 3 0 0 1 2.8-2h8.4A3 3 0 0 1 19 10l2 5v3H3z"/><circle cx="7.5" cy="15.5" r="1.5"/><circle cx="16.5" cy="15.5" r="1.5"/><path d="M8 3v2M12 2v3M16 3v2"/>',
    full: '<path d="M3 15l2-5a3 3 0 0 1 2.8-2h8.4A3 3 0 0 1 19 10l2 5v3H3z"/><path d="m9 13 2 2 4-4"/>',
    deep: '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/><path d="M9.5 14.5a2.5 2.5 0 0 0 2.5 2.5"/>',
    paint: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 4v2M12 18v2M4 12h2M18 12h2"/>',
    ceramic: '<path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5z"/><path d="M9 10.5c1.5-1.5 4.5-1.5 6 0"/>',
    engine: '<path d="M4 9h3l2-2h5l2 2h2v3h2v4h-2v2h-4l-2 2H9l-2-2H4z"/><path d="M11 11l-1.5 3h3L11 17"/>',
    headlight: '<path d="M14 5a7 7 0 0 1 0 14c-2 0-3-3-3-7s1-7 3-7z"/><path d="M3 8h5M2 12h6M3 16h5"/>',
  };
  const icon = (name) => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ICONS.full}</svg>`;
  const CHECK = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 5 5 9-10"/></svg>';
  const CROSS = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7l10 10M17 7 7 17"/></svg>';
  const G_ICON = '<svg class="review__g" viewBox="0 0 48 48" aria-label="Google review"><path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.6-.4-3.9z"/><path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2A11.9 11.9 0 0 1 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3a12 12 0 0 1-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.6-.4-3.9z"/></svg>';
  const SOCIAL = {
    googleBusiness: ["Google Business Profile", '<path d="M21.8 10.2H12v3.9h5.6c-.5 2.5-2.7 4.3-5.6 4.3a6.4 6.4 0 1 1 4.2-11.2l2.9-2.8A10.4 10.4 0 1 0 12 22.4c6 0 10-4.2 10-10.2 0-.7 0-1.3-.2-2z"/>'],
    instagram: ["Instagram", '<path d="M12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8C2.4 3.9 3.9 2.4 7.2 2.3 8.4 2.2 8.8 2.2 12 2.2zm0 4.7a5.1 5.1 0 1 0 0 10.2 5.1 5.1 0 0 0 0-10.2zm0 8.4a3.3 3.3 0 1 1 0-6.6 3.3 3.3 0 0 1 0 6.6zm5.3-9.8a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4z"/>'],
    facebook: ["Facebook", '<path d="M14 8.5V6.6c0-.9.6-1.1 1-1.1h2.7V1.6L14 1.6c-4 0-4.9 3-4.9 4.9v2H6.7v4h2.4V22.4H14V12.5h3.3l.4-4z"/>'],
    tiktok: ["TikTok", '<path d="M16.6 2h-3.4v13.4a2.9 2.9 0 1 1-2-2.8V9.1a6.4 6.4 0 1 0 5.4 6.3V8.6a8 8 0 0 0 4.7 1.5V6.7a4.8 4.8 0 0 1-4.7-4.7z"/>'],
  };

  /* ---------- Bind simple values & links ---------- */
  $$("[data-cfg]").forEach((el) => { const v = get(el.dataset.cfg); if (v != null) el.textContent = v; });
  $$("[data-tel]").forEach((a) => (a.href = "tel:" + B.phoneRaw));
  $$("[data-whatsapp]").forEach((a) => (a.href = waLink(`Hi ${B.name}! I'd like to ask about detailing.`)));
  $$("[data-email]").forEach((a) => (a.href = "mailto:" + B.email));
  $$("[data-link]").forEach((a) => { const v = S.links[a.dataset.link]; if (v) a.href = v; });
  $$("[data-socials]").forEach((box) => {
    box.innerHTML = Object.entries(SOCIAL).map(([k, [label, path]]) =>
      S.links[k] ? `<a href="${esc(S.links[k])}" target="_blank" rel="noopener" aria-label="${label}"><svg viewBox="0 0 24 24">${path}</svg></a>` : ""
    ).join("");
  });
  if (!B.mobileService) $$(".js-mobile-only").forEach((el) => el.remove());
  $("#year").textContent = new Date().getFullYear();

  /* ---------- Promo ---------- */
  if (S.promo && S.promo.enabled && store.get("promoClosed") !== S.promo.text) {
    const p = $("#promo");
    $("#promoText").textContent = S.promo.text;
    const cta = $("#promoCta");
    cta.textContent = S.promo.cta; cta.href = S.promo.href;
    p.hidden = false;
    $("#promoClose").addEventListener("click", () => { p.hidden = true; store.set("promoClosed", S.promo.text); });
  }

  /* ---------- Services ---------- */
  const services = S.services.filter((s) => s.available);
  $("#servicesGrid").innerHTML = services.map((s, i) => `
    <a class="service reveal" style="--d:${(i % 4) * 0.08}s" href="#booking" data-pick="${esc(s.id)}">
      <img src="${esc(s.image)}" alt="${esc(s.name)}" loading="lazy" width="600" height="800" />
      <div class="service__body">
        <span class="service__icon">${icon(s.icon)}</span>
        <h3>${esc(s.name)}</h3>
        <p>${esc(s.desc)}</p>
        <div class="service__meta"><span class="service__price">${esc(s.price)}</span><span class="service__dur">${esc(s.duration)}</span></div>
        <span class="service__book">Book this service →</span>
      </div>
    </a>`).join("");
  $("#footerServices").innerHTML = services.map((s) => `<li><a href="#services">${esc(s.name)}</a></li>`).join("");

  /* ---------- Packages ---------- */
  const P = S.packages;
  let size = "sedan";
  const renderPackages = () => {
    $("#packagesGrid").innerHTML = P.tiers.map((t, i) => `
      <article class="pkg reveal is-in ${t.popular ? "pkg--popular" : ""}" style="--d:${i * 0.1}s">
        ${t.popular ? '<span class="pkg__badge">Most Popular</span>' : ""}
        <h3>${esc(t.name)}</h3>
        <p class="pkg__blurb">${esc(t.blurb)}</p>
        <div class="pkg__price"><small>from</small><strong>${esc(t.prices[size])}</strong></div>
        <p class="pkg__dur">${esc(t.duration)} · ${size === "sedan" ? "Sedan / Coupe" : "SUV / Truck"}</p>
        <ul>${P.features.map((f, j) => {
          const v = t.includes[j];
          return `<li class="${v ? "" : "is-off"}">${v ? CHECK : CROSS}<span>${esc(f)}</span>${typeof v === "string" ? `<em>${esc(v)}</em>` : ""}</li>`;
        }).join("")}</ul>
        <a class="btn ${t.popular ? "btn--primary" : "btn--ghost"} btn--block" href="#booking" data-pick="pkg-${esc(t.id)}">Book ${esc(t.name)}</a>
      </article>`).join("");
  };
  renderPackages();
  $("#compareTable").innerHTML = `
    <thead><tr><th>Feature</th>${P.tiers.map((t) => `<th class="${t.popular ? "is-pop" : ""}">${esc(t.name)}</th>`).join("")}</tr></thead>
    <tbody>${P.features.map((f, j) => `<tr><td>${esc(f)}</td>${P.tiers.map((t) => {
      const v = t.includes[j];
      return `<td class="${t.popular ? "is-pop" : ""}">${v === true ? '<span class="yes">✓</span>' : v ? `<span class="yes">${esc(v)}</span>` : '<span class="no">—</span>'}</td>`;
    }).join("")}</tr>`).join("")}</tbody>`;

  const toggleBtns = $$(".toggle__btn");
  const pill = $(".toggle__pill");
  const movePill = () => {
    const active = $(".toggle__btn.is-active");
    pill.style.width = active.offsetWidth + "px";
    pill.style.transform = `translateX(${active.offsetLeft - 5}px)`;
  };
  toggleBtns.forEach((b) => b.addEventListener("click", () => {
    toggleBtns.forEach((x) => { x.classList.toggle("is-active", x === b); x.setAttribute("aria-selected", x === b); });
    size = b.dataset.size;
    movePill(); renderPackages();
  }));
  movePill();
  window.addEventListener("resize", movePill);
  document.fonts && document.fonts.ready.then(movePill);

  /* ---------- Before / After ---------- */
  $("#galleryGrid").innerHTML = S.gallery.map((g, i) => `
    <figure class="ba reveal" style="--d:${i * 0.1}s">
      <div class="ba__frame">
        <img src="${esc(g.after)}" alt="${esc(g.title)} after detailing" loading="lazy" />
        <img class="ba__before ${g.sample ? "is-sample" : ""}" src="${esc(g.before)}" alt="${esc(g.title)} before detailing" loading="lazy" />
        <span class="ba__handle" aria-hidden="true"></span>
        <span class="ba__tag ba__tag--before">Before</span>
        <span class="ba__tag ba__tag--after">After</span>
        <input class="ba__range" type="range" min="0" max="100" value="50" aria-label="Compare before and after: ${esc(g.title)}" />
      </div>
      <figcaption>${esc(g.title)}${g.sample ? '<span class="sample-tag">Sample photo, replace with yours</span>' : ""}</figcaption>
    </figure>`).join("");
  $$(".ba__range").forEach((r) => r.addEventListener("input", () => r.parentElement.style.setProperty("--pos", r.value + "%")));

  /* ---------- Reviews ---------- */
  $("#reviewsGrid").innerHTML = S.reviews.map((r, i) => `
    <article class="review reveal" style="--d:${i * 0.1}s">
      <span class="stars" aria-label="${r.rating} out of 5 stars">${"★".repeat(r.rating)}${"☆".repeat(5 - r.rating)}</span>
      <p class="review__text">${esc(r.text)}</p>
      <div class="review__who">
        <span class="review__avatar" aria-hidden="true">${esc((r.name.replace(/[^A-Za-z]/g, "")[0] || "C").toUpperCase())}</span>
        <div><strong>${esc(r.name)}</strong><small>${esc(r.when)}${r.sample ? ' · <span class="sample-tag">Sample</span>' : ""}</small></div>
        ${G_ICON}
      </div>
    </article>`).join("");

  /* ---------- FAQ (+ structured data for Google) ---------- */
  $("#faqList").innerHTML = S.faq.map((f, i) => `
    <details class="faq__item reveal" ${i === 0 ? "open" : ""}><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join("");
  const ld = document.createElement("script");
  ld.type = "application/ld+json";
  ld.textContent = JSON.stringify({
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: S.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  });
  document.head.appendChild(ld);

  /* ---------- Hours / open now (Texas time) ---------- */
  const fmt = (t) => { const [h, m] = t.split(":").map(Number); return `${((h + 11) % 12) + 1}${m ? ":" + String(m).padStart(2, "0") : ""} ${h < 12 ? "AM" : "PM"}`; };
  const tx = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Chicago" }));
  const todayIdx = (tx.getDay() + 6) % 7; // Monday = 0
  $("#hoursList").innerHTML = S.hours.map((h, i) => `
    <li class="${i === todayIdx ? "is-today" : ""}"><span>${h.day}</span><span>${h.open ? `${fmt(h.open)} – ${fmt(h.close)}` : "Closed"}</span></li>`).join("");
  const today = S.hours[todayIdx];
  const mins = tx.getHours() * 60 + tx.getMinutes();
  const toMin = (t) => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };
  const open = today.open && mins >= toMin(today.open) && mins < toMin(today.close);
  const badge = $("#openBadge");
  badge.textContent = open ? "Open now" : "Closed now";
  badge.className = "open-badge " + (open ? "is-open" : "is-closed");

  $("#areasList").innerHTML = S.serviceAreas.map((a) => `<li>${esc(a)}</li>`).join("");

  /* Map loads only when scrolled near, to keep the page fast */
  const mapFrame = $("#mapFrame");
  new IntersectionObserver((entries, obs) => {
    if (entries[0].isIntersecting) {
      mapFrame.src = `https://www.google.com/maps?q=${encodeURIComponent(B.mapQuery)}&output=embed`;
      obs.disconnect();
    }
  }, { rootMargin: "400px" }).observe(mapFrame);

  /* ---------- Booking form ---------- */
  const form = $("#bookingForm");
  const choices = [
    ...P.tiers.map((t) => ({ id: "pkg-" + t.id, name: t.name + " Package", sub: `${t.prices.sedan}+ · ${t.duration}`, pop: t.popular, group: "Packages", tier: t })),
    ...services.map((s) => ({ id: s.id, name: s.name, sub: `${s.price} · ${s.duration}`, group: "Individual services", svc: s })),
  ];
  let lastGroup = "";
  $("#serviceChoices").innerHTML = choices.map((c, i) => {
    const head = c.group !== lastGroup ? `<p class="choice-group-label">${c.group}</p>` : "";
    lastGroup = c.group;
    return `${head}<label class="choice"><input type="radio" name="service" value="${esc(c.id)}" ${i === 1 ? "checked" : ""} />
      <span class="choice__box"><strong>${esc(c.name)}${c.pop ? '<span class="pop">Popular</span>' : ""}</strong><small>${esc(c.sub)}</small></span></label>`;
  }).join("");

  const ADDONS = ["Engine Bay Cleaning", "Headlight Restoration", "Pet Hair Removal", "Odor Elimination", "Clay Bar Treatment"]
    .filter((a) => !/Engine|Headlight/.test(a) || services.some((s) => s.name === a));
  $("#addonChoices").innerHTML = ADDONS.map((a) => `<label class="chip"><input type="checkbox" name="addons" value="${esc(a)}" /><span>+ ${esc(a)}</span></label>`).join("");

  $("#timeSelect").innerHTML = '<option value="">Select a time</option>' + S.timeSlots.map((t) => `<option>${esc(t)}</option>`).join("");
  const dateInput = form.elements.date;
  const pad = (n) => String(n).padStart(2, "0");
  const ymd = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  dateInput.min = ymd(new Date());
  const maxD = new Date(); maxD.setDate(maxD.getDate() + 90); dateInput.max = ymd(maxD);

  // Pre-select a service when a "Book" button elsewhere is clicked
  document.addEventListener("click", (e) => {
    const a = e.target.closest("[data-pick]");
    if (!a) return;
    const radio = form.querySelector(`input[name="service"][value="${a.dataset.pick}"]`);
    if (radio) { radio.checked = true; goTo(1); updateSummary(); }
  });

  // Location field
  const addressField = $("#addressField");
  form.addEventListener("change", (e) => {
    if (e.target.name === "location" && addressField) addressField.hidden = !/Mobile/.test(e.target.value);
    updateSummary();
  });

  let step = 1;
  const steps = $$(".step[data-step]", form).filter((s) => s.dataset.step !== "done");
  const err = $("#formError");
  const goTo = (n) => {
    step = n;
    steps.forEach((s) => s.classList.toggle("is-active", +s.dataset.step === n));
    $("#progressBar").style.width = (n / 3) * 100 + "%";
    $("#stepCount").textContent = `Step ${n} of 3`;
    $("#prevBtn").hidden = n === 1;
    $("#nextBtn").hidden = n === 3;
    $("#submitBtn").hidden = n !== 3;
    err.textContent = "";
  };
  const validate = (root) => {
    let ok = true;
    $$("[required]", root).forEach((f) => {
      if (f.type === "radio") return;
      const bad = !f.value.trim() || (f.type === "tel" && f.value.replace(/\D/g, "").length < 10);
      f.classList.toggle("is-invalid", bad);
      if (bad && ok) { f.focus(); ok = false; }
    });
    const email = $("input[type=email]", root);
    if (email && email.value && !/^\S+@\S+\.\S+$/.test(email.value)) { email.classList.add("is-invalid"); ok = false; }
    return ok;
  };
  form.addEventListener("input", (e) => e.target.classList.remove("is-invalid"));
  $("#nextBtn").addEventListener("click", () => {
    if (!validate(steps[step - 1])) { err.textContent = "Please fill in the highlighted fields."; return; }
    goTo(step + 1);
    form.scrollIntoView({ behavior: "smooth", block: "start" });
  });
  $("#prevBtn").addEventListener("click", () => goTo(step - 1));

  const selected = () => choices.find((c) => c.id === (form.elements.service.value || ""));
  function updateSummary() {
    const c = selected();
    if (!c) return ($("#bookingSummary").innerHTML = "");
    const big = /SUV|Truck|Van/.test(form.elements.vehicleType.value);
    const price = c.tier ? c.tier.prices[big ? "suv" : "sedan"] : c.svc.price.replace(/^From\s*/i, "");
    const addons = $$('input[name="addons"]:checked', form).length;
    $("#bookingSummary").innerHTML = `<div class="summary__inner"><span>${esc(c.name)}${addons ? ` + ${addons} add-on${addons > 1 ? "s" : ""}` : ""}</span><span>Starting at <strong>${esc(price)}</strong></span></div>`;
  }
  updateSummary();

  const collect = (f) => {
    const data = {};
    new FormData(f).forEach((v, k) => { data[k] = data[k] ? data[k] + ", " + v : v; });
    return data;
  };
  const send = async (payload) => {
    if (!S.forms.endpoint) return false;
    const res = await fetch(S.forms.endpoint, {
      method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Request failed");
    return true;
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!validate(steps[2])) { err.textContent = "Please fill in the highlighted fields."; return; }
    const d = collect(form);
    const c = selected();
    d.service = c ? c.name : d.service;
    const msg = [
      `New booking request: ${B.name}`,
      `Service: ${d.service}${d.addons ? " + " + d.addons : ""}`,
      `Vehicle: ${[d.year, d.make, d.model].filter(Boolean).join(" ")} (${d.vehicleType})`,
      `Condition: ${d.condition}`,
      `When: ${d.date} at ${d.time}`,
      d.location ? `Location: ${d.location}${d.address ? " (" + d.address + ")" : ""}` : "",
      `Name: ${d.name}`, `Phone: ${d.phone}`, d.email ? `Email: ${d.email}` : "",
      d.notes ? `Notes: ${d.notes}` : "",
    ].filter(Boolean).join("\n");

    const btn = $("#submitBtn");
    btn.disabled = true; btn.textContent = "Sending…";
    let sent = false;
    try { sent = await send({ _subject: `Booking request: ${d.service}`, ...d }); }
    catch (x) { sent = false; }
    btn.disabled = false; btn.textContent = "Request Booking";

    steps.forEach((s) => s.classList.remove("is-active"));
    $("#bookingNav").hidden = true;
    $("#bookingSummary").hidden = true;
    $("#stepCount").textContent = "Done";
    $("#progressBar").style.width = "100%";
    const done = $('[data-step="done"]', form);
    done.hidden = false;
    const wa = $("#doneWhatsapp");
    wa.href = waLink(msg);
    if (sent) {
      $("#doneMsg").textContent = `Thanks, ${d.name.split(" ")[0]}! We've received your request for ${d.date} at ${d.time} and will contact you shortly to confirm.`;
      wa.hidden = false;
    } else {
      $("#doneMsg").textContent = `Almost done, ${d.name.split(" ")[0]}! Tap below to send your booking details to us on WhatsApp, or call ${B.phone}.`;
      wa.hidden = false;
      wa.textContent = "Send booking via WhatsApp";
      $("#doneTitle").textContent = "One last step";
    }
  });

  /* ---------- Contact form ---------- */
  const cf = $("#contactForm");
  $("#contactService").innerHTML = '<option value="">Not sure yet</option>' + choices.map((c) => `<option>${esc(c.name)}</option>`).join("");
  cf.addEventListener("input", (e) => e.target.classList.remove("is-invalid"));
  cf.addEventListener("submit", async (e) => {
    e.preventDefault();
    const cerr = $(".form__error", cf);
    if (!validate(cf)) { cerr.textContent = "Please fill in the highlighted fields."; return; }
    cerr.textContent = "";
    const d = collect(cf);
    const btn = $("button[type=submit]", cf);
    btn.disabled = true;
    let sent = false;
    try { sent = await send({ _subject: "Quote request", ...d }); } catch (x) {}
    btn.disabled = false;
    if (sent) {
      $(".form__ok", cf).hidden = false;
      cf.reset();
    } else {
      const text = `Hi ${B.name}! Quote request.\nName: ${d.name}\nPhone: ${d.phone}${d.email ? "\nEmail: " + d.email : ""}${d.vehicle ? "\nVehicle: " + d.vehicle : ""}${d.service ? "\nService: " + d.service : ""}\n${d.message}`;
      window.open(waLink(text), "_blank", "noopener");
    }
  });

  /* ---------- Header, menu, active links ---------- */
  const header = $("#header");
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 20);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const burger = $("#burger"), nav = $("#nav");
  const closeMenu = () => { nav.classList.remove("is-open"); burger.setAttribute("aria-expanded", "false"); document.body.style.overflow = ""; };
  burger.addEventListener("click", () => {
    const open = !nav.classList.contains("is-open");
    nav.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
  });
  $$("a", nav).forEach((a) => a.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (e) => e.key === "Escape" && closeMenu());

  const navLinks = $$(".nav > a");
  const sectionObs = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) navLinks.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === "#" + en.target.id));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  navLinks.forEach((a) => { const s = $(a.getAttribute("href")); if (s) sectionObs.observe(s); });

  /* ---------- Reveal & counters ---------- */
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      en.target.classList.add("is-in");
      revealObs.unobserve(en.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  $$(".reveal").forEach((el) => revealObs.observe(el));

  const countObs = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const el = en.target, end = +el.dataset.count, suf = el.dataset.suffix || "";
      const t0 = performance.now(), dur = 1600;
      const tick = (t) => {
        const p = Math.min(1, (t - t0) / dur), v = Math.round(end * (1 - Math.pow(1 - p, 3)));
        el.textContent = v.toLocaleString() + suf;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      countObs.unobserve(el);
    });
  }, { threshold: 0.5 });
  $$("[data-count]").forEach((el) => countObs.observe(el));
})();
