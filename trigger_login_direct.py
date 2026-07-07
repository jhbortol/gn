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

        # We know that the route /meus-dados/remover uses brideAuthGuard
        # brideAuthGuard checks if logged in, if not it calls loginModalService.open() and returns false
        # So navigating to /meus-dados/remover will directly trigger the modal!

        print("Navigating to protected route...")
        await page.goto("http://localhost:4200/meus-dados/remover", wait_until="networkidle")
        await page.wait_for_timeout(2000)

        # Close install app if exists
        try:
            close_install_btn = page.locator('button.lucide-x').first
            if await close_install_btn.count() > 0:
                await close_install_btn.click(timeout=1000)
                await page.wait_for_timeout(500)
        except Exception:
            pass

        print("Taking screenshot of login modal...")
        await page.screenshot(path="/home/jules/verification/final_login.png", full_page=False)
        print("Captured final_login.png")

        await browser.close()

asyncio.run(run())
