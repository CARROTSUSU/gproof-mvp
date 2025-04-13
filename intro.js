const introLines = [
  "In a world where centralized GPUs control the flow of digital creation...",
  "One protocol rises from the shadows...",
  "G-PROOF: The Decentralized Renderpocalypse",
  "A peer-powered, GPU-fueled revolution.",
  "Where every cycle counts, every hash matters.",
  "Earn. Compete. Evolve.",
  "Welcome to the future of decentralized computation."
];

let index = 0;
const tagline = document.getElementById("tagline");

function updateLine() {
  tagline.innerText = introLines[index];
  index = (index + 1) % introLines.length;
}
setInterval(updateLine, 25000);
updateLine();
