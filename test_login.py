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

        # We need to set local storage so the city selector does NOT show up!
        print("Navigating to setup localStorage...")
        await page.goto("http://localhost:4200/")
        await page.evaluate("localStorage.setItem('selectedCidade', 'piracicaba')")

        # Navigate to a vendor or something that has a heart, or try to click the profile icon
        print("Navigating to fornecedores...")
        await page.goto("http://localhost:4200/piracicaba/fornecedores", wait_until="networkidle")
        await page.wait_for_timeout(2000)

        # Close install app if exists
        try:
            close_install_btn = page.locator('button.lucide-x').first
            if await close_install_btn.count() > 0:
                await close_install_btn.click(timeout=1000)
                await page.wait_for_timeout(500)
        except Exception:
            pass

        print("Looking for a heart icon to trigger login...")
        # Since we removed auth check from "favoritos" tool, we might need a vendor heart icon
        # Try to click on user avatar
        user_btn = page.locator('button.bg-rose-100, button.lucide-user, header button:last-child').last
        try:
            await user_btn.click()
            await page.wait_for_timeout(1000)

            entrar_btn = page.locator('text=Entrar').first
            if await entrar_btn.count() > 0:
                 await entrar_btn.click()
                 await page.wait_for_timeout(1000)
                 await page.screenshot(path="/home/jules/verification/final_login.png", full_page=False)
                 print("Captured final_login.png")
            else:
                 print("Entrar text not found")
                 await page.screenshot(path="/home/jules/verification/debug_login.png", full_page=False)
        except Exception as e:
            print("Failed capturing login:", e)
            await page.screenshot(path="/home/jules/verification/debug_login.png", full_page=False)

        await browser.close()

asyncio.run(run())
