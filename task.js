// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDIyyV9xfTFN-p4PGIgY8e3unoYj3iw4L8",
  authDomain: "adus-7117d.firebaseapp.com",
  projectId: "adus-7117d",
  storageBucket: "adus-7117d.appspot.com",
  messagingSenderId: "553329627547",
  appId: "1:553329627547:web:fa1a14b16c18678741513e",
  measurementId: "G-T3BTMTC51R"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

async function loadTasks() {
  const container = document.getElementById("task-container");
  container.innerHTML = "";

  try {
    const snapshot = await db.collection("tasks").get();

    if (snapshot.empty) {
      container.innerHTML = "<p>No tasks found.</p>";
      return;
    }

    snapshot.forEach(doc => {
      const task = doc.data();

      const card = document.createElement("div");
      card.className = "card";

      // --------- TOP FLIP ---------
      const top = document.createElement("div");
      top.className = "card-top";

      const inner = document.createElement("div");
      inner.className = "card-inner";

      const front = document.createElement("div");
      front.className = "card-front";
      front.innerHTML = `
        <h3>${task.name || "Untitled Task"}</h3>
        <p><b>ID:</b> ${task.id || "-"}</p>
        <p>${task.shortDescription || "Hover for details"}</p>
      `;

      const back = document.createElement("div");
      back.className = "card-back";
      back.innerHTML = `<p>${task.description || "No full description."}</p>`;

      inner.appendChild(front);
      inner.appendChild(back);
      top.appendChild(inner);

      // --------- BOTTOM FIXED ---------
      const bottom = document.createElement("div");
      bottom.className = "card-bottom";
      bottom.innerHTML = `
        <p class="deadline"><b>Deadline:</b> ${task.deadline || "No deadline"}</p>
        <p class="countdown"></p>
        <div>
          ${task.attachment ? `<a class="button" href="${task.attachment}" target="_blank">📎 Attachment</a>` : ""}
          ${task.submitLink ? `<a class="button" href="${task.submitLink}" target="_blank">✅ Submit</a>`
                            : `<span class="disabled-btn">No Submit</span>`}
        </div>
      `;

      // Build card
      card.appendChild(top);
      card.appendChild(bottom);
      container.appendChild(card);

      // Countdown
      const countdownEl = bottom.querySelector(".countdown");
      if (task.deadline) {
        const deadline = new Date(task.deadline).getTime();
        const timer = setInterval(() => {
          const now = new Date().getTime();
          const diff = deadline - now;

          if (diff <= 0) {
            clearInterval(timer);
            card.remove();
          } else {
            const d = Math.floor(diff / (1000 * 60 * 60 * 24));
            const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((diff % (1000 * 60)) / 1000);
            countdownEl.textContent = `⏳ ${d}d ${h}h ${m}m ${s}s`;
          }
        }, 1000);
      }
    });
  } catch (err) {
    console.error("Error fetching tasks:", err);
    container.innerHTML = "<p style='color:red'>Failed to load tasks.</p>";
  }
}

loadTasks();

// ---------- THEME TOGGLE ----------
document.getElementById("theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// ---------- SCROLL UP ----------
document.getElementById("scroll-up").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ---------- SCROLL DOWN ----------
document.getElementById("scroll-down").addEventListener("click", () => {
  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
});
