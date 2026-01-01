#!/usr/bin/env node

/**
 * Simple icon generator for Todo Manager PWA
 * Creates 192x192 and 512x512 PNG icons
 */

const fs = require('fs');
const { createCanvas } = require('canvas');

function roundRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
}

function drawCheckbox(ctx, x, y, scale, checked) {
    const opacity = checked ? 1 : 0.5;

    // Circle
    ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
    ctx.beginPath();
    ctx.arc(x + 20 * scale, y + 20 * scale, 16 * scale, 0, Math.PI * 2);
    ctx.fill();

    // Checkmark
    if (checked) {
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 3 * scale;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(x + 14 * scale, y + 20 * scale);
        ctx.lineTo(x + 18 * scale, y + 24 * scale);
        ctx.lineTo(x + 26 * scale, y + 14 * scale);
        ctx.stroke();
    }
}

function drawLine(ctx, x, y, width, scale, opacity = 1) {
    ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
    roundRect(ctx, x, y, width, 16 * scale, 8 * scale);
    ctx.fill();
}

function generateIcon(size) {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');

    // Background with rounded corners
    const cornerRadius = size / 8;
    ctx.fillStyle = '#3b82f6';
    roundRect(ctx, 0, 0, size, size, cornerRadius);
    ctx.fill();

    // Scale factor
    const scale = size / 512;

    // Checkmark circle (decorative)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.beginPath();
    ctx.arc(size / 2, size * 0.39, 80 * scale, 0, Math.PI * 2);
    ctx.fill();

    // Main checklist
    const baseX = size * 0.3125;
    const baseY = size * 0.234;

    // Checkmark 1
    drawCheckbox(ctx, baseX, baseY, scale, true);
    drawLine(ctx, baseX + 50 * scale, baseY + 12 * scale, 120 * scale, scale);

    // Checkmark 2
    drawCheckbox(ctx, baseX, baseY + 60 * scale, scale, true);
    drawLine(ctx, baseX + 50 * scale, baseY + 72 * scale, 120 * scale, scale);

    // Checkmark 3 (unchecked)
    drawCheckbox(ctx, baseX, baseY + 120 * scale, scale, false);
    drawLine(ctx, baseX + 50 * scale, baseY + 132 * scale, 120 * scale, scale, 0.5);

    // Bottom accent
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    roundRect(ctx, size * 0.25, size * 0.742, size * 0.5, 8 * scale, 4 * scale);
    ctx.fill();

    return canvas;
}

// Generate icons
try {
    console.log('Generating icons...');

    const icon192 = generateIcon(192);
    const icon512 = generateIcon(512);

    fs.writeFileSync('icon-192.png', icon192.toBuffer('image/png'));
    fs.writeFileSync('icon-512.png', icon512.toBuffer('image/png'));

    console.log('✓ icon-192.png created');
    console.log('✓ icon-512.png created');
    console.log('\nIcons generated successfully!');
} catch (error) {
    console.error('Error generating icons:', error.message);
    console.log('\nPlease install canvas package:');
    console.log('  npm install canvas');
    console.log('\nOr use generate-icons.html in your browser to create icons manually.');
    process.exit(1);
}
