import os
from PIL import Image

os.makedirs('public/assets', exist_ok=True)
img = Image.open(r'C:\Users\codei\.gemini\antigravity\brain\661719b1-db46-4cbe-bda2-9848613fb29c\.user_uploaded\media_1793439493512_319606c1.jpg')

# 1. Clean Logo Mark (Only the icon + clean text)
logo = img.crop((20, 16, 135, 46))
logo.save('public/assets/veloop_logo.png', 'PNG')

# 2. Hero 3D Illustration - crop the upper region so it doesn't include the 'Available VEs' box
# The portal and gem and coin are in (440, 18, 730, 150) or with pedestal (470, 18, 730, 210)
# Let's crop (440, 18, 730, 205)
hero_3d = img.crop((445, 18, 732, 208))
hero_3d.save('public/assets/hero_portal_full.png', 'PNG')

# 3. Card 1 Visual (Purple Gem -> VE Coin)
c1 = img.crop((182, 268, 295, 310))
c1.save('public/assets/card1_purple.png', 'PNG')

# 4. Card 2 Visual (Blue Gem -> VE Coin)
c2 = img.crop((326, 268, 438, 310))
c2.save('public/assets/card2_blue.png', 'PNG')

# 5. Card 3 Visual (Green Gem -> VE Coin)
c3 = img.crop((468, 268, 582, 310))
c3.save('public/assets/card3_green.png', 'PNG')

# 6. Card 4 Visual (Gold Gem -> VE Coin)
c4 = img.crop((612, 268, 725, 310))
c4.save('public/assets/card4_gold.png', 'PNG')

# 7. Chest in Mid-banner
chest = img.crop((566, 414, 715, 458))
chest.save('public/assets/chest_rewards.png', 'PNG')

# 8. Clean 3D Shield (Exchange rules) - crop precisely to shield
shield = img.crop((925, 448, 1008, 545))
shield.save('public/assets/shield_rules.png', 'PNG')

# 9. Crystals in Earn More Gems sidebar
crystals = img.crop((20, 465, 140, 520))
crystals.save('public/assets/earn_crystals.png', 'PNG')

# 10. Isolated 3D Purple Gem
gem_purp = img.crop((799, 124, 831, 156))
gem_purp.save('public/assets/gem_purple.png', 'PNG')

# 11. Isolated 3D Gold VE Coin
coin_ve = img.crop((796, 209, 830, 243))
coin_ve.save('public/assets/coin_ve.png', 'PNG')

print("All precision assets re-extracted!")
