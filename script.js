const characters = [
  { name: "Naruto Uzumaki", rarity: "Common", color: "#ffa500", power: 85 },
  { name: "Monkey D. Luffy", rarity: "Common", color: "#e74c3c", power: 88 },
  { name: "Goku", rarity: "Rare", color: "#f1c40f", power: 95 },
  { name: "Saitama", rarity: "Ultra Rare", color: "#9b59b6", power: 99 },
  { name: "Zoro", rarity: "Common", color: "#2ecc71", power: 84 },
  { name: "Gojo Satoru", rarity: "Ultra Rare", color: "#3498db", power: 98 }
];

const canvas = document.getElementById('wheel');
const ctx = canvas.getContext('2d');
const spinBtn = document.getElementById('spin-btn');

const numSegments = characters.length;
const arcSize = (2 * Math.PI) / numSegments;
let startAngle = 0;
let spinTimeout = null;
let spinAngleStart = 0;
let spinTime = 0;
let spinTimeTotal = 0;

function drawWheel() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = canvas.width / 2 - 10;

  for (let i = 0; i < numSegments; i++) {
    const angle = startAngle + i * arcSize;
    ctx.beginPath();
    ctx.fillStyle = characters[i].color;
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, angle, angle + arcSize);
    ctx.lineTo(centerX, centerY);
    ctx.fill();
    ctx.stroke();

    ctx.save();
    ctx.fillStyle = "#ffffff";
    ctx.translate(centerX + Math.cos(angle + arcSize / 2) * (radius / 1.5), 
                  centerY + Math.sin(angle + arcSize / 2) * (radius / 1.5));
    ctx.rotate(angle + arcSize / 2 + Math.PI / 2);
    ctx.font = "bold 14px Arial";
    ctx.fillText(characters[i].name, -ctx.measureText(characters[i].name).width / 2, 0);
    ctx.restore();
  }
}

function rotateWheel() {
  spinTime += 30;
  if (spinTime >= spinTimeTotal) {
    stopRotateWheel();
    return;
  }
  const spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
  startAngle += (spinAngle * Math.PI / 180);
  drawWheel();
  spinTimeout = setTimeout(rotateWheel, 30);
}

function stopRotateWheel() {
  clearTimeout(spinTimeout);
  const degrees = startAngle * 180 / Math.PI + 90;
  const arcd = arcSize * 180 / Math.PI;
  const index = Math.floor((360 - (degrees % 360)) / arcd);
  
  const selected = characters[(index + numSegments) % numSegments];
  
  document.getElementById('character-name').innerText = selected.name;
  document.getElementById('character-rarity').innerText = `Zeldzaamheid: ${selected.rarity}`;
  document.getElementById('stat-power').innerText = selected.power;
  document.getElementById('result').classList.remove('hidden');
  
  spinBtn.disabled = false;
}

function easeOut(t, b, c, d) {
  const ts = (t /= d) * t;
  const tc = ts * t;
  return b + c * (tc + -3 * ts + 3 * t);
}

spinBtn.addEventListener('click', () => {
  spinBtn.disabled = true;
  document.getElementById('result').classList.add('hidden');
  spinAngleStart = Math.random() * 10 + 10;
  spinTime = 0;
  spinTimeTotal = Math.random() * 3000 + 4000;
  rotateWheel();
});

drawWheel();
