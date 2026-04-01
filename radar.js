document.addEventListener("DOMContentLoaded", () => {
  const trackingRadar = document.getElementById("tracking-radar");
  const radarNodes = document.getElementById("radar-nodes-container");
  const trackSweep = document.getElementById("track-sweep");

  if (!trackingRadar || !radarNodes || !trackSweep) return;

  const radarRadius = 175;
  const playerPos = { x: 0, y: 0 };

  let targets = [
    { x: 50, y: -80, dist: 12 },
    { x: -100, y: 40, dist: 25 },
    { x: 120, y: 150, dist: 35 }
  ];

  let sweepAngle = 0;
  const SWEEP_OFFSET = -90;
  let currentHeading = 0;

  const manualHeadingInput = document.getElementById("manualHeading");
  const headingVal = document.getElementById("headingVal");

  if (manualHeadingInput && headingVal) {
    manualHeadingInput.addEventListener("input", (e) => {
      currentHeading = parseInt(e.target.value, 10);
      headingVal.innerText = currentHeading;
      radarNodes.style.transform = `rotate(${-currentHeading}deg)`;
    });
  }

  if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientationabsolute", handleOrientation, true);
    window.addEventListener("deviceorientation", handleOrientation, true);
  }

  function handleOrientation(event) {
    let heading = null;
    if (event.webkitCompassHeading !== undefined) {
      heading = event.webkitCompassHeading;
    } else if (event.alpha !== null) {
      heading = 360 - event.alpha;
    }

    if (heading !== null) {
      currentHeading = Math.round(heading);
      if (manualHeadingInput && headingVal) {
        manualHeadingInput.value = currentHeading;
        headingVal.innerText = currentHeading;
      }
      radarNodes.style.transform = `rotate(${-currentHeading}deg)`;
    }
  }

  function updateTrackingRadar() {
    sweepAngle = (sweepAngle + 1.2) % 360;
    trackSweep.style.transform = `rotate(${sweepAngle}deg)`;

    document.querySelectorAll(".track-dot").forEach(d => d.remove());
    document.querySelectorAll(".track-dist-label").forEach(d => d.remove());

    let closestTarget = null;
    targets.forEach(t => {
      if (!closestTarget || t.dist < closestTarget.dist) {
        closestTarget = t;
      }
    });

    targets.forEach(t => {
      const dx = t.x - playerPos.x;
      const dy = t.y - playerPos.y;

      const distance = Math.min(Math.sqrt(dx * dx + dy * dy), radarRadius);
      const angle = Math.atan2(dy, dx);
      const angleDeg = (angle * 180 / Math.PI + 360) % 360;

      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;

      const dot = document.createElement("div");
      dot.className = "track-dot";
      dot.style.left = (radarRadius + x) + "px";
      dot.style.top = (radarRadius + y) + "px";

      if (t === closestTarget && t.dist !== undefined) {
        const label = document.createElement("div");
        label.className = "track-dist-label";
        label.innerText = Math.round(t.dist) + "m";
        label.style.position = "absolute";
        label.style.transform = `translate(-50%, -50%) rotate(${currentHeading}deg)`;
        label.style.left = (radarRadius + x + 25) + "px";
        label.style.top = (radarRadius + y - 10) + "px";
        label.style.color = "lime";
        label.style.fontFamily = "Arial, sans-serif";
        label.style.fontSize = "13px";
        label.style.fontWeight = "bold";
        label.style.textShadow = "0px 0px 5px black, 0px 0px 5px black";
        label.style.pointerEvents = "none";
        radarNodes.appendChild(label);
      }

      const visualSweep = (sweepAngle + SWEEP_OFFSET + 360) % 360;
      const dotVisualAngle = (angleDeg - currentHeading + 360) % 360;

      let diff = Math.abs(visualSweep - dotVisualAngle);
      if (diff > 180) diff = 360 - diff;

      if (diff < 10) {
        const pulse = document.createElement("div");
        pulse.className = "track-targetPulse";
        pulse.style.left = dot.style.left;
        pulse.style.top = dot.style.top;
        radarNodes.appendChild(pulse);
        setTimeout(() => pulse.remove(), 800);
      }

      radarNodes.appendChild(dot);
    });

    requestAnimationFrame(updateTrackingRadar);
  }

  updateTrackingRadar();
});
