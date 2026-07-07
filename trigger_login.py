import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(
            viewport={'width': 375, 'height': 812},
            is_mobile=True,
            user_agent='Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1'
        )

        page = await context.new_page()

        print("Navigating to setup localStorage...")
        await page.goto("http://localhost:4200/")
        await page.evaluate("localStorage.setItem('selectedCidade', 'piracicaba')")

        print("Navigating to home...")
        await page.goto("http://localhost:4200/piracicaba", wait_until="networkidle")
        await page.wait_for_timeout(2000)

        # Close install app if exists
        try:
            close_install_btn = page.locator('button.lucide-x').first
            if await close_install_btn.count() > 0:
                await close_install_btn.click(timeout=1000)
                await page.wait_for_timeout(500)
        except Exception:
            pass

        print("Clicking hamburger menu...")
        # Since it's mobile, we have a hamburger menu. The navbar.ts has openLogin() bounded to "Entrar" button.
        try:
             # Find hamburger menu - in mobile it's often a button with lucide-menu
             menu_btn = page.locator('button.lucide-menu, button:has(svg.lucide-menu), header button').first
             await menu_btn.click()
             await page.wait_for_timeout(1000)

             # Find Entrar button inside menu
             entrar_btn = page.locator('button:has-text("Entrar"), a:has-text("Entrar")').first
             if await entrar_btn.count() > 0:
                 await entrar_btn.click()
                 await page.wait_for_timeout(1000)
                 await page.screenshot(path="/home/jules/verification/final_login.png", full_page=False)
                 print("Captured final_login.png")
             else:
                 print("Entrar not found in mobile menu")
                 await page.screenshot(path="/home/jules/verification/debug_menu.png")
        except Exception as e:
            print("Failed to click menu:", e)

        await browser.close()

asyncio.run(run())
