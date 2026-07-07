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

        # We can expose a function to window to trigger the modal
        await page.evaluate("""
            const evt = new CustomEvent('open-login-modal', {
                detail: { title: 'Limite de convidados', message: 'Para adicionar mais convidados e salvar tudo na nuvem com segurança, crie sua conta gratuita.' }
            });
            window.dispatchEvent(evt);
        """)

        await page.wait_for_timeout(1000)
        await page.screenshot(path="/home/jules/verification/final_login_with_text.png", full_page=False)
        print("Captured final_login_with_text.png")

        await browser.close()

asyncio.run(run())
