// Create a placeholder avatar image
const fs = require('fs');
const path = require('path');

const assetsDir = path.join(process.cwd(), 'public/assets/images');

// Ensure the directory exists
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// Create a simple SVG avatar
const avatarSvg = `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <circle cx="100" cy="100" r="100" fill="#e6f0ff" />
  <circle cx="100" cy="85" r="35" fill="#4361ee" />
  <path d="M100 130 C60 130, 40 170, 40 200 L160 200 C160 170, 140 130, 100 130 Z" fill="#4361ee" />
</svg>`;

fs.writeFileSync(path.join(assetsDir, 'avatar.png'), avatarSvg);
console.log('Created avatar placeholder at public/assets/images/avatar.png');