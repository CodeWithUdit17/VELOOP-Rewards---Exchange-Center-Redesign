import os
import time
import threading
from http.server import SimpleHTTPRequestHandler, HTTPServer
from playwright.sync_api import sync_playwright

os.makedirs('screenshots', exist_ok=True)

class DistHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory='dist', **kwargs)

server = HTTPServer(('127.0.0.1', 8092), DistHandler)
server_thread = threading.Thread(target=server.serve_forever, daemon=True)
server_thread.start()
time.sleep(1)

chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
base_url = "http://127.0.0.1:8092"

print("Capturing refined screenshots...")

with sync_playwright() as p:
    browser = p.chromium.launch(executable_path=chrome_path, headless=True)

    # 1. Desktop Full Page (1440x900)
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto(base_url)
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(1200)
    page.screenshot(path="screenshots/01_desktop.png", full_page=True)
    print("Saved 01_desktop.png")

    # 2. Tablet View (1024x768)
    page_tablet = browser.new_page(viewport={"width": 1024, "height": 768})
    page_tablet.goto(base_url)
    page_tablet.wait_for_load_state("networkidle")
    page_tablet.wait_for_timeout(1000)
    page_tablet.screenshot(path="screenshots/02_tablet.png", full_page=True)
    print("Saved 02_tablet.png")

    # 3. Mobile View (375x812)
    page_mobile = browser.new_page(viewport={"width": 375, "height": 812})
    page_mobile.goto(base_url)
    page_mobile.wait_for_load_state("networkidle")
    page_mobile.wait_for_timeout(1000)
    page_mobile.screenshot(path="screenshots/03_mobile.png", full_page=True)
    print("Saved 03_mobile.png")

    # 4. Exchange Cards section
    cards_elem = page.locator('section[aria-label="Available Conversions"]')
    if cards_elem.count() > 0:
        cards_elem.screenshot(path="screenshots/04_exchange_cards.png")
        print("Saved 04_exchange_cards.png")

    # 5. Confirmation Modal
    page.locator('button:has-text("Convert Rewards")').first.click()
    page.wait_for_timeout(600)
    page.screenshot(path="screenshots/05_confirmation_modal.png")
    print("Saved 05_confirmation_modal.png")

    # 6. Successful Conversion (click confirm)
    page.locator('button:has-text("Confirm Conversion")').click()
    page.wait_for_timeout(1600) # wait for confetti burst
    page.screenshot(path="screenshots/07_successful_conversion.png")
    print("Saved 07_successful_conversion.png")

    # Close success modal
    page.locator('button:has-text("Continue")').click()
    page.wait_for_timeout(500)

    # 7. Insufficient Gems State (simulate low balance)
    page.locator('button:has-text("Demo Tools")').click()
    page.wait_for_timeout(300)
    page.locator('button:has-text("Test Low Bal (12)")').click()
    page.wait_for_timeout(600)
    cards_elem.screenshot(path="screenshots/06_insufficient_gems_state.png")
    print("Saved 06_insufficient_gems_state.png")

    # Reset balance
    page.locator('button:has-text("Demo Tools")').click()
    page.wait_for_timeout(300)
    page.locator('button:has-text("Reset (420 Gems)")').click()
    page.wait_for_timeout(500)

    # 8. Loading State
    page.locator('button:has-text("Demo Tools")').click()
    page.wait_for_timeout(300)
    page.locator('button:has-text("Test Loader")').click()
    page.wait_for_timeout(500)
    cards_elem.screenshot(path="screenshots/08_loading_state.png")
    print("Saved 08_loading_state.png")

    # 9. Error State
    page.locator('button:has-text("Demo Tools")').click()
    page.wait_for_timeout(300)
    page.locator('button:has-text("Test Error State")').click()
    page.wait_for_timeout(500)
    cards_elem.screenshot(path="screenshots/10_error_state.png")
    print("Saved 10_error_state.png")

    # 10. Empty State
    page.locator('button:has-text("Demo Tools")').click()
    page.wait_for_timeout(300)
    page.locator('button:has-text("Test Empty State")').click()
    page.wait_for_timeout(500)
    cards_elem.screenshot(path="screenshots/09_empty_state.png")
    print("Saved 09_empty_state.png")

    browser.close()

server.shutdown()
print("All screenshots generated successfully in screenshots/ directory!")
