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

        print("Navigating to guests...")
        await page.goto("http://localhost:4200/meu-casamento/convidados", wait_until="networkidle")
        await page.wait_for_timeout(2000)

        # Close install app if exists
        try:
            close_install_btn = page.locator('button.lucide-x').first
            if await close_install_btn.count() > 0:
                await close_install_btn.click(timeout=1000)
                await page.wait_for_timeout(500)
        except Exception:
            pass

        print("Adding guests to trigger limit...")
        try:
            # We add multiple guests until the modal pops up
            for i in range(15): # The limit is usually 10
                add_btn = page.locator('button.lucide-plus, button:has-text("+"), button[title="Adicionar"]').first
                if await add_btn.count() == 0:
                    break
                await add_btn.click()
                await page.wait_for_timeout(500)

                # Check if modal popped up
                login_modal = page.locator('app-bride-login-modal')
                if await login_modal.count() > 0:
                    print("Modal popped up!")
                    break

                # Fill form and submit
                await page.fill('input[formControlName="nome"], input[name="nome"]', f'Convidado {i}')
                save_btn = page.locator('button:has-text("Adicionar convidado"), button:has-text("Salvar")').last
                await save_btn.click()
                await page.wait_for_timeout(500)

        except Exception as e:
            print("Failed adding guests:", e)

        await page.screenshot(path="/home/jules/verification/final_login_with_text.png", full_page=False)
        print("Captured final_login_with_text.png")

        await browser.close()

asyncio.run(run())
