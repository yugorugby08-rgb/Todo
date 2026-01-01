#!/usr/bin/env python3
"""
Creates minimal PNG icons for PWA support
These are basic solid blue icons with white text
"""

import struct
import zlib

def create_simple_png(width, height, color_rgb):
    """Create a simple solid-color PNG without PIL"""

    def png_chunk(chunk_type, data):
        chunk_data = chunk_type + data
        crc = zlib.crc32(chunk_data) & 0xffffffff
        return struct.pack('>I', len(data)) + chunk_data + struct.pack('>I', crc)

    # PNG signature
    png_signature = b'\x89PNG\r\n\x1a\n'

    # IHDR chunk (image header)
    ihdr_data = struct.pack('>IIBBBBB', width, height, 8, 2, 0, 0, 0)
    ihdr_chunk = png_chunk(b'IHDR', ihdr_data)

    # Create image data (RGB)
    r, g, b = color_rgb
    scanlines = []
    for y in range(height):
        # Filter type 0 (None)
        scanline = b'\x00'
        for x in range(width):
            scanline += bytes([r, g, b])
        scanlines.append(scanline)

    raw_data = b''.join(scanlines)
    compressed_data = zlib.compress(raw_data, 9)

    # IDAT chunk (image data)
    idat_chunk = png_chunk(b'IDAT', compressed_data)

    # IEND chunk (image end)
    iend_chunk = png_chunk(b'IEND', b'')

    # Combine all chunks
    png_data = png_signature + ihdr_chunk + idat_chunk + iend_chunk

    return png_data

def main():
    print('Creating simple PNG icons...')

    # Blue color (matching the app theme)
    blue = (59, 130, 246)  # #3b82f6

    # Create 192x192 icon
    icon_192 = create_simple_png(192, 192, blue)
    with open('icon-192.png', 'wb') as f:
        f.write(icon_192)
    print('✓ icon-192.png created (192x192, solid blue)')

    # Create 512x512 icon
    icon_512 = create_simple_png(512, 512, blue)
    with open('icon-512.png', 'wb') as f:
        f.write(icon_512)
    print('✓ icon-512.png created (512x512, solid blue)')

    print('\nBasic icons generated successfully!')
    print('Note: These are simple placeholder icons.')
    print('For better icons, open generate-icons.html in your browser.')

if __name__ == '__main__':
    main()
