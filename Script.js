document.addEventListener("DOMContentLoaded", function () {

  var modal = document.getElementById("projectModal");
  if (modal) {
    modal.addEventListener("show.bs.modal", function (event) {
      var b = event.relatedTarget;
      document.getElementById("modalTitle").textContent = b.dataset.title;
      document.getElementById("modalDesc").textContent = b.dataset.desc;
      document.getElementById("modalTools").textContent = b.dataset.tools;
      document.getElementById("modalLink").href = b.dataset.link;

      var list = document.getElementById("modalFeatures");
      list.innerHTML = "";
      b.dataset.features.split("|").forEach(function (text) {
        var li = document.createElement("li");
        li.textContent = text;
        list.appendChild(li);
      });
    });
  }

  var certModal = document.getElementById("certModal");
  if (certModal) {
    certModal.addEventListener("show.bs.modal", function (event) {
      var b = event.relatedTarget;
      document.getElementById("certTitle").textContent = b.dataset.title;
      document.getElementById("certImg").src = b.dataset.img;
      document.getElementById("certImg").alt = b.dataset.title + " certificate";
      document.getElementById("certDownload").href = b.dataset.pdf;
    });
    document.querySelectorAll(".cert-thumb").forEach(function (img) {
      img.addEventListener("keydown", function (e) {
        if (e.key === "Enter") img.click();
      });
    });
  }

  var bars = document.querySelectorAll(".progress-bar");
  if (bars.length) {
    var barObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var bar = entry.target;
          bar.style.width = bar.dataset.level + "%";
          barObserver.unobserve(bar);
        }
      });
    }, { threshold: 0.3 });
    bars.forEach(function (bar) { barObserver.observe(bar); });
  }

  var counters = document.querySelectorAll(".count");
  if (counters.length) {
    var countObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var target = Number(el.dataset.target);
        var current = 0;
        var timer = setInterval(function () {
          current++;
          el.textContent = current;
          if (current >= target) clearInterval(timer);
        }, 150);
        countObserver.unobserve(el);
      });
    });
    counters.forEach(function (c) { countObserver.observe(c); });
  }

  var form = document.getElementById("contactForm");
  if (form) {
    var nameInput = document.getElementById("name");
    var emailInput = document.getElementById("email");
    var messageInput = document.getElementById("message");
    var counter = document.getElementById("charCount");
    var success = document.getElementById("successMsg");

    function setState(input, ok) {
      input.classList.toggle("is-valid", ok);
      input.classList.toggle("is-invalid", !ok);
      return ok;
    }

    function checkName() { return setState(nameInput, nameInput.value.trim().length >= 2); }
    function checkEmail() { return setState(emailInput, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())); }
    function checkMessage() { return setState(messageInput, messageInput.value.trim().length >= 10); }

    messageInput.addEventListener("input", function () {
      counter.textContent = messageInput.value.length + " / 300";
      if (messageInput.classList.contains("is-invalid") || messageInput.classList.contains("is-valid")) checkMessage();
    });
    nameInput.addEventListener("input", checkName);
    emailInput.addEventListener("input", checkEmail);

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = checkName() & checkEmail() & checkMessage();
      if (!ok) { success.classList.add("d-none"); return; }

      success.classList.remove("d-none");
      success.textContent = "Thank you, " + nameInput.value.trim() + "! Your message has been sent.";
      form.reset();
      counter.textContent = "0 / 300";
      [nameInput, emailInput, messageInput].forEach(function (i) { i.classList.remove("is-valid", "is-invalid"); });
    });
  }

  var topBtn = document.createElement("button");
  topBtn.id = "backToTop";
  topBtn.setAttribute("aria-label", "Back to top");
  topBtn.innerHTML = "&uarr;";
  document.body.appendChild(topBtn);

  window.addEventListener("scroll", function () {
    topBtn.style.display = window.scrollY > 300 ? "block" : "none";
  });
  topBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});