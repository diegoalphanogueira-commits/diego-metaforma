(() => {
  "use strict";
  const phoneNumber = "5511958689822";
  const form = document.querySelector("#interest-form");
  const status = document.querySelector("#form-status");
  const tabs = Array.from(document.querySelectorAll(".tab"));
  const panels = Array.from(document.querySelectorAll(".tab-panel"));
  const year = document.querySelector("#year");

  if (year) year.textContent = String(new Date().getFullYear());

  tabs.forEach(tab => tab.addEventListener("click", () => {
    const key = tab.dataset.tab;
    tabs.forEach(item => {
      const selected = item.dataset.tab === key;
      item.setAttribute("aria-selected", String(selected));
      item.tabIndex = selected ? 0 : -1;
    });
    panels.forEach(panel => { panel.hidden = panel.dataset.panel !== key; });
  }));

  const nameInput = document.querySelector("#lead-name");
  const phoneInput = document.querySelector("#lead-phone");
  if (phoneInput) phoneInput.addEventListener("input", () => {
    const digits = phoneInput.value.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 2) phoneInput.value = digits;
    else if (digits.length <= 7) phoneInput.value = "(" + digits.slice(0, 2) + ") " + digits.slice(2);
    else phoneInput.value = "(" + digits.slice(0, 2) + ") " + digits.slice(2, 7) + "-" + digits.slice(7);
  });

  if (!form) return;
  form.addEventListener("submit", event => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const name = (nameInput?.value || "").trim();
    const whatsapp = (phoneInput?.value || "").replace(/\D/g, "");
    const email = (document.querySelector("#lead-email")?.value || "").trim();
    const interest = (document.querySelector("#lead-interest")?.value || "").trim();
    const consent = document.querySelector("#lead-consent")?.checked;

    if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !/^[1-9]{2}9?\d{8}$/.test(whatsapp) || !consent) {
      status.textContent = "Confira seu nome, WhatsApp com DDD, e-mail e consentimento.";
      status.style.color = "#a43232";
      return;
    }

    const message = [
      "Olá! Quero demonstrar interesse no acesso antecipado do De Olho em Brasília.",
      "",
      "Nome: " + name,
      "WhatsApp: +55 " + whatsapp,
      "E-mail: " + email,
      "Maior interesse: " + interest,
      "",
      "Sei que o projeto está em desenvolvimento e que não há cobrança neste cadastro."
    ].join("\n");
    const url = "https://wa.me/" + phoneNumber + "?text=" + encodeURIComponent(message);
    status.style.color = "#147450";
    status.textContent = "Abrindo o WhatsApp. Para concluir seu interesse, envie a mensagem preparada.";
    window.location.assign(url);
  });
})();
