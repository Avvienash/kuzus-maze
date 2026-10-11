// Tap the logo tile to flip it, like a reveal in the game (GDD §8.1: lift 0.12 s, turn 0.22 s,
// drop 0.14 s; flip back 0.25 s). Each flip shows a random tile face, never the same one twice
// in a row. The next face is preloaded so the flip never waits on the network.
(() => {
  const FACES = [
    ["flower_1", "Flower 1"],
    ["flower_2", "Flower 2"],
    ["flower_3", "Flower 3"],
    ["flower_4", "Flower 4"],
    ["flower_5", "Flower 5"],
    ["flower_power", "Flower Power"],
    ["grappling_hook", "Grappling Hook"],
    ["portal", "Portal"],
    ["shears", "Shears"],
    ["spray", "Spray"],
    ["stepping_stone", "Stepping Stone"],
    ["vine_monster", "Vine Monster"],
  ];
  const BACK_LABEL = "Kuzu's Maze tile. Tap to flip it.";
  const LIFT = "translateY(-14px) scale(1.06)";
  const REVEAL = [
    { transform: "rotateY(0deg)", easing: "cubic-bezier(0.2, 0.7, 0.3, 1)" },
    { offset: 0.25, transform: `${LIFT} rotateY(0deg)`, easing: "cubic-bezier(0.65, 0, 0.35, 1)" },
    { offset: 0.71, transform: `${LIFT} rotateY(180deg)`, easing: "cubic-bezier(0.5, 0, 0.75, 0)" },
    { offset: 0.9, transform: "translateY(2px) scale(0.99) rotateY(180deg)", easing: "ease-out" },
    { transform: "rotateY(180deg)" },
  ];
  const HIDE = [
    { transform: "rotateY(180deg)", easing: "cubic-bezier(0.65, 0, 0.35, 1)" },
    { transform: "rotateY(360deg)" },
  ];

  const tile = document.querySelector(".tile");
  if (!tile) return;
  const inner = tile.querySelector(".tile-inner");
  const face = tile.querySelector(".tile-face");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let faceUp = false;
  let busy = false;
  let shown = -1;
  let next = pick();

  function pick() {
    let i;
    do i = Math.floor(Math.random() * FACES.length); while (i === shown);
    return i;
  }

  function url(i) {
    return `assets/faces/${FACES[i][0]}.webp`;
  }

  function preload(i) {
    const img = new Image();
    img.src = url(i);
  }

  async function turn(frames, duration, end) {
    if (!reducedMotion.matches && inner.animate) {
      const anim = inner.animate(frames, { duration, fill: "forwards" });
      await anim.finished;
      anim.cancel();
    }
    inner.style.transform = end;
  }

  tile.addEventListener("click", async () => {
    if (busy) return;
    busy = true;
    if (faceUp) {
      await turn(HIDE, 250, "rotateY(0deg)");
      tile.setAttribute("aria-label", BACK_LABEL);
      next = pick();
      preload(next);
    } else {
      shown = next;
      face.src = url(shown);
      // Wait for the image, but never let a slow or failed load lock the tile.
      await Promise.race([face.decode().catch(() => {}), new Promise((r) => setTimeout(r, 1000))]);
      await turn(REVEAL, 480, "rotateY(180deg)");
      tile.setAttribute("aria-label", `${FACES[shown][1]} tile. Tap to flip it back.`);
    }
    faceUp = !faceUp;
    busy = false;
  });

  window.addEventListener("load", () => preload(next));
})();
