#!/usr/bin/env python3
"""
Simple icon generator for Todo Manager PWA
Creates 192x192 and 512x512 PNG icons
"""

from PIL import Image, ImageDraw
import sys

def create_icon(size):
    """Create an icon of the specified size"""
    # Create image with blue background
    img = Image.new('RGB', (size, size), color='#3b82f6')
    draw = ImageDraw.Draw(img)

    # Scale factor
    scale = size / 512

    # Background with rounded corners (using ellipses to approximate)
    # We'll draw a solid rounded rectangle by using the image as is

    # Decorative circle
    circle_radius = int(80 * scale)
    circle_center = (size // 2, int(size * 0.39))
    draw.ellipse(
        [circle_center[0] - circle_radius, circle_center[1] - circle_radius,
         circle_center[0] + circle_radius, circle_center[1] + circle_radius],
        fill=(255, 255, 255, 76)  # Semi-transparent white
    )

    # Main checklist elements
    base_x = int(size * 0.3125)
    base_y = int(size * 0.234)

    # Function to draw checkbox
    def draw_checkbox(x, y, checked=True):
        opacity = 255 if checked else 127
        radius = int(16 * scale)
        center_x = int(x + 20 * scale)
        center_y = int(y + 20 * scale)

        # Circle
        draw.ellipse(
            [center_x - radius, center_y - radius,
             center_x + radius, center_y + radius],
            fill=(255, 255, 255, opacity)
        )

        # Checkmark
        if checked:
            line_width = max(2, int(3 * scale))
            # Simplified checkmark as lines
            draw.line(
                [(int(x + 14 * scale), int(y + 20 * scale)),
                 (int(x + 18 * scale), int(y + 24 * scale))],
                fill='#3b82f6', width=line_width
            )
            draw.line(
                [(int(x + 18 * scale), int(y + 24 * scale)),
                 (int(x + 26 * scale), int(y + 14 * scale))],
                fill='#3b82f6', width=line_width
            )

    # Function to draw line
    def draw_line(x, y, width, opacity=255):
        height = int(16 * scale)
        draw.rectangle(
            [x, y, x + width, y + height],
            fill=(255, 255, 255, opacity)
        )

    # Checkbox 1 (checked)
    draw_checkbox(base_x, base_y, True)
    draw_line(int(base_x + 50 * scale), int(base_y + 12 * scale), int(120 * scale))

    # Checkbox 2 (checked)
    draw_checkbox(base_x, int(base_y + 60 * scale), True)
    draw_line(int(base_x + 50 * scale), int(base_y + 72 * scale), int(120 * scale))

    # Checkbox 3 (unchecked)
    draw_checkbox(base_x, int(base_y + 120 * scale), False)
    draw_line(int(base_x + 50 * scale), int(base_y + 132 * scale), int(120 * scale), 127)

    # Bottom accent
    accent_x = int(size * 0.25)
    accent_y = int(size * 0.742)
    accent_width = int(size * 0.5)
    accent_height = int(8 * scale)
    draw.rectangle(
        [accent_x, accent_y, accent_x + accent_width, accent_y + accent_height],
        fill=(255, 255, 255, 76)
    )

    return img

def main():
    try:
        print('Generating icons...')

        # Generate 192x192 icon
        icon_192 = create_icon(192)
        icon_192.save('icon-192.png', 'PNG')
        print('✓ icon-192.png created')

        # Generate 512x512 icon
        icon_512 = create_icon(512)
        icon_512.save('icon-512.png', 'PNG')
        print('✓ icon-512.png created')

        print('\nIcons generated successfully!')
        return 0

    except ImportError:
        print('Error: Pillow (PIL) package not found')
        print('\nPlease install Pillow:')
        print('  pip install Pillow')
        print('\nOr use generate-icons.html in your browser to create icons manually.')
        return 1
    except Exception as e:
        print(f'Error generating icons: {e}')
        return 1

if __name__ == '__main__':
    sys.exit(main())
