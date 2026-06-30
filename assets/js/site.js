/* ============================================================
   AwtyBots 5829 — site interactions
   ============================================================ */
(function () {
  "use strict";
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  /* ---------- hero load reveal ---------- */
  window.addEventListener("load", () => {
    requestAnimationFrame(() => $("#hero")?.classList.add("loaded"));
  });
  // safety: if load already fired
  if (document.readyState === "complete") $("#hero")?.classList.add("loaded");

  /* ---------- nav: scrolled state + mobile toggle ---------- */
  const nav = $("#nav");
  const onScroll = () => nav && nav.classList.toggle("scrolled", window.scrollY > 24);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const toggle = $("#navtoggle"), links = $("#navlinks");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    $$("a", links).forEach(a =>
      a.addEventListener("click", () => {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      })
    );
  }

  /* ---------- scroll reveals ---------- */
  const reveals = $$(".reveal");
  if (reduce || !("IntersectionObserver" in window)) {
    reveals.forEach(el => el.classList.add("in"));
  } else {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); }
      });
    }, { threshold: 0.16, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(el => io.observe(el));
  }

  /* ---------- count-up stats ---------- */
  const counters = $$("[data-count]");
  const runCount = (el) => {
    const target = parseInt(el.dataset.count, 10) || 0;
    if (reduce) { el.textContent = target; return; }
    const dur = 1500, start = performance.now();
    const ease = t => 1 - Math.pow(1 - t, 3);
    const step = (now) => {
      const t = Math.min(1, (now - start) / dur);
      el.textContent = Math.round(ease(t) * target);
      if (t < 1) requestAnimationFrame(step);
      else el.textContent = target;
    };
    requestAnimationFrame(step);
  };
  if (counters.length) {
    if (!("IntersectionObserver" in window)) counters.forEach(runCount);
    else {
      const cio = new IntersectionObserver((entries, obs) => {
        entries.forEach(e => { if (e.isIntersecting) { runCount(e.target); obs.unobserve(e.target); } });
      }, { threshold: 0.6 });
      counters.forEach(c => cio.observe(c));
    }
  }

  /* ---------- autonomous path draw ---------- */
  const route = $("#route");
  if (route) {
    const len = route.getTotalLength();
    route.style.strokeDasharray = len;
    route.style.strokeDashoffset = reduce ? 0 : len;
    if (!reduce && "IntersectionObserver" in window) {
      const pio = new IntersectionObserver((entries, obs) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            route.style.transition = "stroke-dashoffset 2.2s cubic-bezier(.22,.61,.36,1)";
            requestAnimationFrame(() => { route.style.strokeDashoffset = 0; });
            obs.unobserve(e.target);
          }
        });
      }, { threshold: 0.4 });
      pio.observe($("#autofield"));
    }
  }

  /* ---------- robot card tilt ---------- */
  const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (fine && !reduce) {
    $$("[data-tilt]").forEach(card => {
      const max = 6;
      card.addEventListener("pointermove", (ev) => {
        const r = card.getBoundingClientRect();
        const px = (ev.clientX - r.left) / r.width - 0.5;
        const py = (ev.clientY - r.top) / r.height - 0.5;
        card.style.transform =
          `translateY(-6px) perspective(800px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg)`;
      });
      card.addEventListener("pointerleave", () => { card.style.transform = ""; });
    });
  }

  /* ---------- countdown to Texas Robotics Invitational ---------- */
  const clock = $("#clock");
  if (clock) {
    const target = new Date("2026-06-25T09:00:00-05:00").getTime();
    const end    = new Date("2026-06-27T18:00:00-05:00").getTime();
    const d = $("#cd-d"), h = $("#cd-h"), m = $("#cd-m"), s = $("#cd-s");
    const pad = n => String(n).padStart(2, "0");
    const tick = () => {
      const now = Date.now(), diff = target - now;
      if (diff <= 0) {
        const sub = $("#count-sub");
        if (now <= end) {
          clock.innerHTML = '<div style="min-width:auto;padding:.7rem 1.2rem"><b style="font-size:1.4rem">LIVE</b><span>Happening now</span></div>';
        } else {
          clock.innerHTML = '<div style="min-width:auto;padding:.7rem 1.2rem"><b style="font-size:1.4rem">✓</b><span>See you next season</span></div>';
        }
        return; // stop interval
      }
      const days = Math.floor(diff / 864e5);
      const hrs  = Math.floor((diff % 864e5) / 36e5);
      const mins = Math.floor((diff % 36e5) / 6e4);
      const secs = Math.floor((diff % 6e4) / 1e3);
      d.textContent = days; h.textContent = pad(hrs); m.textContent = pad(mins); s.textContent = pad(secs);
      return true;
    };
    if (tick() !== false) { const iv = setInterval(() => { if (tick() === undefined) clearInterval(iv); }, 1000); }
  }

  /* ---------- flag marquee ---------- */
  const flags = $("#flags");
  if (flags) {
    const list = [
      "usa.jpg","india.avif","poland.png","uk.jpg","syria.webp","thailand.jpg","canada.avif",
      "armenia.png","china.png","venezuela.avif","spain.avif","nether.png","malaysia.jpg",
      "pakistan.png","russia.png","singapore.avif","australia.png","andorra.png","southkorea.avif",
      "austria.png","germany.avif","colombia.png","panama.webp","argentina.png","phillipines.png",
      "vietnam.webp","switzerland.avif","italy.avif","iran.jpg","pride.png"
    ];
    const row = document.createElement("div");
    row.className = "marquee__row";
    const make = (hidden) => list.forEach(f => {
      const img = document.createElement("img");
      img.src = "assets/images/flags/" + f;
      img.loading = "lazy";
      img.alt = hidden ? "" : f.split(".")[0];
      if (hidden) img.setAttribute("aria-hidden", "true");
      row.appendChild(img);
    });
    make(false); make(true); // duplicate set for seamless loop
    flags.appendChild(row);
  }
})();
