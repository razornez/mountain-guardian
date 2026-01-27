from PIL import Image, ImageDraw
import io

# Create favicon (32x32)
favicon = Image.new('RGBA', (32, 32), (0, 0, 0, 0))
draw = ImageDraw.Draw(favicon)
draw.rounded_rectangle([2, 2, 30, 30], radius=6, fill=(16, 185, 129, 255))
draw.polygon([(10, 24, 16, 10, 22, 24)], fill=(255, 255, 255, 230))
draw.ellipse([14, 12, 18, 16], fill=(255, 255, 255, 255))
favicon.save('favicon.ico', format='ICO', sizes=[(32, 32)])

# Create app icon (512x512)
app_icon = Image.new('RGBA', (512, 512), (0, 0, 0, 0))
draw = ImageDraw.Draw(app_icon)
draw.rounded_rectangle([50, 50, 462, 462], radius=40, fill=(16, 185, 129, 255))
draw.polygon([(206, 362), (256, 150), (306, 362)], fill=(255, 255, 255, 230))
draw.ellipse([236, 180, 276, 220], fill=(255, 255, 255, 255))
app_icon.save('icon.png', format='PNG')

# Create placeholder (512x512)
placeholder = Image.new('RGB', (512, 512), (30, 41, 59))
draw = ImageDraw.Draw(placeholder)
draw.rectangle([100, 100, 412, 412], outline=(71, 85, 105), width=3)
draw.text((200, 240), 'Placeholder', fill=(148, 163, 184))
placeholder.save('placeholder.png', format='PNG')

print("Images created successfully!")
