// scripts/create-placeholders.js
const fs = require('fs');
const path = require('path');

// Create necessary directories
const createDirectories = () => {
  const dirs = [
    'public/assets',
    'public/assets/images',
    'public/assets/icons',
  ];

  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`Created directory: ${dir}`);
    }
  });
};

// Create SVG placeholder images
const createSvgPlaceholder = (filename, color, width, height, icon) => {
  const folderPath = path.join(process.cwd(), 'public/assets/images');
  const filePath = path.join(folderPath, filename);
  
  let svgContent = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="${color}" />
    <text x="50%" y="50%" font-family="Arial" font-size="20" fill="white" text-anchor="middle" dominant-baseline="middle">${icon}</text>
  </svg>`;
  
  fs.writeFileSync(filePath, svgContent);
  console.log(`Created placeholder: ${filename}`);
};

// Create SVG social media icons
const createSocialIcon = (filename, color) => {
  const folderPath = path.join(process.cwd(), 'public/assets/icons');
  const filePath = path.join(folderPath, filename);
  
  let svgContent = `<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="11" fill="${color}" />
    <text x="50%" y="50%" font-family="Arial" font-size="14" fill="white" text-anchor="middle" dominant-baseline="middle">${filename.charAt(0).toUpperCase()}</text>
  </svg>`;
  
  fs.writeFileSync(filePath, svgContent);
  console.log(`Created icon: ${filename}`);
};

// Create app store badges
const createAppBadge = (filename, text, color) => {
  const folderPath = path.join(process.cwd(), 'public/assets/images');
  const filePath = path.join(folderPath, filename);
  
  let svgContent = `<svg width="140" height="42" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" rx="6" fill="${color}" />
    <text x="50%" y="50%" font-family="Arial" font-size="12" fill="white" text-anchor="middle" dominant-baseline="middle">${text}</text>
  </svg>`;
  
  fs.writeFileSync(filePath, svgContent);
  console.log(`Created badge: ${filename}`);
};

// Main function
const main = () => {
  createDirectories();
  
  // Create feature illustrations
  createSvgPlaceholder('chat-illustration.png', '#4dabf5', 200, 150, '💬');
  createSvgPlaceholder('collaborate-illustration.png', '#4361ee', 200, 150, '👥');
  createSvgPlaceholder('progress-tracking-illustration.png', '#42b3a2', 200, 150, '📊');
  createSvgPlaceholder('posts-news-illustration.png', '#8844d5', 200, 150, '📰');
  createSvgPlaceholder('learning-management-illustration.png', '#a56ef4', 200, 150, '🎓');
  createSvgPlaceholder('file-management-illustration.png', '#4dabf5', 200, 150, '📁');
  
  // Create hero image
  createSvgPlaceholder('hero-illustration.png', '#e6f0ff', 400, 300, '🚀');
  
  // Create social media icons
  createSocialIcon('linkedin.svg', '#0077B5');
  createSocialIcon('twitter.svg', '#1DA1F2');
  createSocialIcon('facebook.svg', '#4267B2');
  
  // Create app store badges
  createAppBadge('app-store-badge.png', 'App Store', '#000000');
  createAppBadge('google-play-badge.png', 'Google Play', '#414141');
};

main();