// scripts/create-course-placeholders.js
const fs = require('fs');
const path = require('path');

// Create necessary directories
const createDirectories = () => {
  const coursesDir = path.join(process.cwd(), 'public/assets/images/courses');
  
  if (!fs.existsSync(coursesDir)) {
    fs.mkdirSync(coursesDir, { recursive: true });
    console.log(`Created directory: ${coursesDir}`);
  }
};

// Create SVG placeholder for courses
const createCoursePlaceholder = (filename, title, color, textColor = '#ffffff') => {
  const folderPath = path.join(process.cwd(), 'public/assets/images/courses');
  const filePath = path.join(folderPath, filename);
  
  // Create initials from title
  const initials = title
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
  
  const svgContent = `<svg width="400" height="225" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="${color}" />
    <text x="50%" y="50%" font-family="Arial" font-size="80" font-weight="bold" fill="${textColor}" text-anchor="middle" dominant-baseline="middle">${initials}</text>
  </svg>`;
  
  fs.writeFileSync(filePath, svgContent);
  console.log(`Created course placeholder: ${filename}`);
};

// Main function
const main = () => {
  createDirectories();
  
  // Create course image placeholders
  createCoursePlaceholder('machine-language-c.jpg', 'Machine Language C', '#3b82f6');
  createCoursePlaceholder('machine-learning.jpg', 'Machine Learning', '#6366f1');
  createCoursePlaceholder('data-structures.jpg', 'Advanced Data Structures', '#8b5cf6');
  createCoursePlaceholder('ui-ux-design.jpg', 'UI/UX Design', '#ec4899');
  createCoursePlaceholder('calculus.jpg', 'Calculus for Engineers', '#14b8a6');
  createCoursePlaceholder('music-theory.jpg', 'Music Theory', '#f97316');
  
  // Create thumbnails
  createCoursePlaceholder('course-1-thumbnail.jpg', 'Machine Language C', '#3b82f6');
  createCoursePlaceholder('course-2-thumbnail.jpg', 'Machine Learning', '#6366f1');
  createCoursePlaceholder('course-3-thumbnail.jpg', 'Advanced Data Structures', '#8b5cf6');
  createCoursePlaceholder('course-4-thumbnail.jpg', 'UI/UX Design', '#ec4899');
  createCoursePlaceholder('course-5-thumbnail.jpg', 'Calculus for Engineers', '#14b8a6');
  createCoursePlaceholder('course-6-thumbnail.jpg', 'Music Theory', '#f97316');
};

main();