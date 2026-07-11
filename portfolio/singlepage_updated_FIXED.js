// Generate floating shapes randomly
const container = document.getElementById("floatingShapes");

function createShape() {
  if (!container) return;
  const shape = document.createElement("div");
  shape.style.left = Math.random() * 100 + "vw";
  shape.style.bottom = "-10px";
  shape.style.width = shape.style.height = `${Math.random() * 6 + 4}px`;
  shape.style.background = `rgba(221, 160, 221, ${Math.random() * 0.3 + 0.2})`;
  shape.style.animationDuration = `${Math.random() * 10 + 5}s`;
  container.appendChild(shape);

  setTimeout(() => {
    shape.remove();
  }, 15000);
}

if (container) {
  setInterval(createShape, 300);
}

// Fade-in project grid when scrolled into view
const projectGrid = document.getElementById("projectCards");

function handleProjectScroll() {
  if (!projectGrid) return;
  const rect = projectGrid.getBoundingClientRect();
  const inView = rect.top < window.innerHeight - 100;

  if (inView) {
    projectGrid.classList.add("visible");
    window.removeEventListener("scroll", handleProjectScroll); // only once
  }
}

window.addEventListener("scroll", handleProjectScroll);
// Trigger immediately if already in view
handleProjectScroll();

// Navigation toggle
const toggleBtn = document.getElementById("toggleBtn");
if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    window.location.href = "AJ_updated.html";
  });
}

// Firebase Firestore form submission
const contactForm = document.getElementById("contactForm");
const statusMessage = document.getElementById("status-message");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !phone || !subject || !message) {
      statusMessage.textContent = "Please fill in all fields.";
      statusMessage.style.color = "#ff3333";
      return;
    }

    statusMessage.textContent = "Sending signal...";
    statusMessage.style.color = "#6a0dad";

    // db is defined globally in the HTML where Firebase is initialized
    if (typeof db !== "undefined") {
      db.collection("contacts").add({
        name: name,
        phone: phone,
        subject: subject,
        message: message,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        statusMessage.textContent = "Signal sent successfully!";
        statusMessage.style.color = "#28a745";
        contactForm.reset();
      })
      .catch((error) => {
        console.error("Error writing document to Firestore: ", error);
        statusMessage.textContent = "Submission failed. Please try again.";
        statusMessage.style.color = "#ff3333";
      });
    } else {
      console.warn("Firestore database (db) is not initialized.");
      statusMessage.textContent = "Firebase is not configured correctly.";
      statusMessage.style.color = "#ff3333";
    }
  });
}
