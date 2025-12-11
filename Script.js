// --- BOOT SEQUENCE LOGIC ---
const bootLogContainer = document.getElementById("boot-log");
const bootScreen = document.getElementById("boot-screen");
let typingStarted = false;

const bootMessages = [
  "Initializing Deep Dhabal Portfolio v2.0...",
  "Loading Kernel Modules... [ <span class='log-ok'>OK</span> ]",
  "Mounting /dev/experience... [ <span class='log-ok'>OK</span> ]",
  "Checking dependency: Docker... [ <span class='log-ok'>FOUND</span> ]",
  "Checking dependency: Kubernetes... [ <span class='log-ok'>FOUND</span> ]",
  "Checking dependency: AWS... [ <span class='log-ok'>FOUND</span> ]",
  "Starting Network Services... [ <span class='log-ok'>OK</span> ]",
  "Loading Stylesheets (retro_theme.css)... [ <span class='log-ok'>OK</span> ]",
  "Allocating memory for Awesome Projects... [ <span class='log-info'>DONE</span> ]",
  "Establishing secure connection to Visitor... [ <span class='log-ok'>ESTABLISHED</span> ]",
  "Boot sequence complete. Launching Shell...",
];

let msgIndex = 0;

// Function to ensure typing effect only starts once
function startTyping() {
  if (typingStarted) return;
  typingStarted = true;
  if (typeof type === "function" && textArray.length) type();
}

function logMessage() {
  // If boot screen is hidden (e.g. skipped by click), stop logging
  if (bootScreen.style.display === "none") return;

  if (msgIndex < bootMessages.length) {
    const p = document.createElement("div");
    p.classList.add("log-line");
    p.innerHTML = `[${(performance.now() / 1000).toFixed(6)}] ${
      bootMessages[msgIndex]
    }`;
    bootLogContainer.appendChild(p);

    // Trigger reflow/animation
    setTimeout(() => p.classList.add("visible"), 50);

    msgIndex++;
    // Randomize typing speed for realism
    setTimeout(logMessage, Math.random() * 300 + 50);

    // Auto scroll to bottom
    bootScreen.scrollTop = bootScreen.scrollHeight;
  } else {
    // Finish Boot
    setTimeout(() => {
      bootScreen.style.transition = "opacity 0.5s ease";
      bootScreen.style.opacity = "0";
      setTimeout(() => {
        bootScreen.style.display = "none";
      }, 500);
      sessionStorage.setItem("booted", "true");
      startTyping();
    }, 800);
  }
}

// Check session storage to determine if we should run boot sequence
if (!sessionStorage.getItem("booted")) {
  // First time visit in this session: Run boot sequence
  window.addEventListener("load", () => {
    setTimeout(logMessage, 500);
  });
} else {
  // Already visited: Skip boot sequence
  bootScreen.style.display = "none";
  // Start typing effect immediately
  setTimeout(startTyping, 100);
}

// Skip boot on click (and mark as booted)
bootScreen.addEventListener("click", () => {
  bootScreen.style.display = "none";
  sessionStorage.setItem("booted", "true");
  startTyping();
});

// --- RETRO DOWNLOAD LOGIC ---
function initiateDownload() {
  const dlScreen = document.getElementById("download-screen");
  const dlTerm = document.getElementById("dl-terminal");
  dlScreen.style.display = "flex";
  dlTerm.innerHTML = "";

  const steps = [
    `root@dhabal:~$ wget ./assets/Resume.pdf`,
    `--${new Date().toLocaleTimeString()}--  https://dhabaldeep.github.io/assets/Resume.pdf`,
    `Resolving dhabaldeep.github.io... 10.126.12.4`,
    `Connecting to dhabaldeep.github.io|10.126.12.4|:443... connected.`,
    `HTTP request sent, awaiting response... 200 OK`,
    `Length: 2048 (2K) [application/pdf]`,
    `Saving to: 'Resume.pdf'`,
  ];

  let delay = 0;
  steps.forEach((step, i) => {
    delay += Math.random() * 300 + 200;
    setTimeout(() => {
      const line = document.createElement("div");
      line.className = "dl-line";
      line.innerText = step;
      dlTerm.appendChild(line);
    }, delay);
  });

  // Progress bar logic
  setTimeout(() => {
    const pBarLine = document.createElement("div");
    pBarLine.className = "dl-progress-bar";
    dlTerm.appendChild(pBarLine);

    let width = 0;
    const total = 30;
    const interval = setInterval(() => {
      width++;
      const pct = Math.round((width / total) * 100);
      const dots = "=".repeat(width);
      const spaces = " ".repeat(total - width);
      pBarLine.innerText = `${pct}% [${dots}>${spaces}]`;

      if (width >= total) {
        clearInterval(interval);
        // Final success msg
        setTimeout(() => {
          const success = document.createElement("div");
          success.className = "dl-line";
          success.innerHTML = `<span style="color:var(--primary)">${
            new Date().toISOString().split("T")[0]
          } ${new Date().toLocaleTimeString()} (5.0 MB/s) - 'Resume.pdf' saved [2048/2048]</span>`;
          dlTerm.appendChild(success);

          // Trigger actual download
          const link = document.createElement("a");
          link.href = "./assets/Resume.pdf"; // User specified path
          link.download = "Resume.pdf";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          // Close
          setTimeout(() => {
            dlScreen.style.display = "none";
          }, 1500);
        }, 500);
      }
    }, 50); // Speed of bar
  }, delay + 500);
}

// --- HAMBURGER MENU LOGIC ---
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Close menu when clicking a link
document.querySelectorAll(".menu-link").forEach((link) => {
  link.addEventListener("click", () => {
    setTimeout(() => {
      const menu = document.querySelector(".menu-links");
      const icon = document.querySelector(".hamburger-icon");
      if (menu.classList.contains("open")) {
        menu.classList.remove("open");
        icon.classList.remove("open");
      }
    }, 150);
  });
});

document.getElementById("hamburger-btn").addEventListener("click", toggleMenu);

// --- TYPING EFFECT (Main Title) ---
const typedTextSpan = document.querySelector(".typed-text");
const textArray = [
  "Linux Lover",
  "Aspiring Cloud Engineer",
  "DevOps Enthusiast",
  "AWS Certified",
  "Python Developer",
];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    typedTextSpan.textContent = textArray[textArrayIndex].substring(
      0,
      charIndex - 1
    );
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    textArrayIndex++;
    if (textArrayIndex >= textArray.length) textArrayIndex = 0;
    setTimeout(type, typingDelay + 1100);
  }
}
