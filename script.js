// Isi modal detail proyek dari data-* milik kartu yang diklik
const projectModal = document.getElementById("projectModal");

projectModal.addEventListener("show.bs.modal", (event) => {
  const card = event.relatedTarget;
  if (!card) return;

  const title = card.dataset.title;
  const img = document.getElementById("projectModalImg");

  document.getElementById("projectModalTitle").textContent = title;
  document.getElementById("projectModalDesc").textContent = card.dataset.desc;
  document.getElementById("projectModalRole").textContent = card.dataset.role;
  img.src = card.dataset.img;
  img.alt = `Tampilan proyek ${title}`;

  const tags = document.getElementById("projectModalTags");
  tags.replaceChildren(
    ...card.dataset.tags.split(",").map((name) => {
      const tag = document.createElement("span");
      tag.className = "badge tag";
      tag.textContent = name;
      return tag;
    })
  );

  projectModal.dataset.currentProject = title;
});

// Isi pesan otomatis bila kontak dibuka dari modal proyek
const contactModal = document.getElementById("contactModal");
const contactForm = document.getElementById("contactForm");
const messageField = document.getElementById("contactMessage");
const successAlert = document.getElementById("contactSuccess");

contactModal.addEventListener("show.bs.modal", (event) => {
  successAlert.classList.add("d-none");
  contactForm.classList.remove("was-validated");

  const fromProject = event.relatedTarget?.closest("#projectModal");
  if (fromProject && !messageField.value) {
    messageField.value = `Halo Lewi, saya ingin bertanya tentang proyek "${projectModal.dataset.currentProject}".`;
  }
});

// Validasi bawaan Bootstrap, lalu buka aplikasi email
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!contactForm.checkValidity()) {
    contactForm.classList.add("was-validated");
    return;
  }

  const name = document.getElementById("contactName").value.trim();
  const email = document.getElementById("contactEmail").value.trim();
  const subject = encodeURIComponent(`Pesan dari ${name}`);
  const body = encodeURIComponent(`${messageField.value.trim()}\n\n${name} (${email})`);

  successAlert.classList.remove("d-none");
  window.location.href = `mailto:borosilewi@gmail.com?subject=${subject}&body=${body}`;
  contactForm.reset();
  contactForm.classList.remove("was-validated");
});

// Carousel tidak berputar otomatis bila pengguna memilih kurangi gerakan
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  bootstrap.Carousel.getOrCreateInstance(document.getElementById("projectCarousel")).pause();
}

// Tutup menu mobile setelah memilih tautan
const navCollapse = document.getElementById("mainNav");
navCollapse.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    bootstrap.Collapse.getOrCreateInstance(navCollapse, { toggle: false }).hide();
  });
});
