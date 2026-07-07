import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        # Using a mobile context
        context = await browser.new_context(
            viewport={'width': 375, 'height': 812},
            is_mobile=True,
            user_agent='Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1'
        )

        page = await context.new_page()

        print("Navigating to setup localStorage...")
        await page.goto("http://localhost:4200/")
        await page.evaluate("localStorage.setItem('selectedCidade', 'piracicaba')")

        # Test 1: Orçamento at the correct URL (/meu-casamento/orcamento)
        print("Navigating to Orçamento...")
        await page.goto("http://localhost:4200/meu-casamento/orcamento", wait_until="networkidle")
        await page.wait_for_timeout(2000)

        try:
            # Click add btn
            add_btn = page.locator('button:has-text("Adicionar"), button:has-text("Novo"), button.lucide-plus, button:has-text("+"), button[title="Adicionar"]').first
            if await add_btn.count() > 0:
                await add_btn.click()
                await page.wait_for_timeout(1000)
                await page.screenshot(path="/home/jules/verification/final_orcamento.png", full_page=False)
                print("Captured final_orcamento.png")
            else:
                print("Adicionar button not found on orcamento page")
                await page.screenshot(path="/home/jules/verification/final_orcamento_error.png")
        except Exception as e:
            print("Failed capturing orcamento:", e)

        # Test 2: Convidados at the correct URL (/meu-casamento/convidados)
        print("Navigating to Convidados...")
        await page.goto("http://localhost:4200/meu-casamento/convidados", wait_until="networkidle")
        await page.wait_for_timeout(2000)

        try:
            # Click add btn
            add_btn = page.locator('button:has-text("Adicionar"), button:has-text("Novo Convidado"), button.lucide-plus, button:has-text("+"), button[title="Adicionar"]').first
            if await add_btn.count() > 0:
                await add_btn.click()
                await page.wait_for_timeout(1000)
                await page.screenshot(path="/home/jules/verification/final_convidados.png", full_page=False)
                print("Captured final_convidados.png")
            else:
                print("Adicionar button not found on convidados page")
                await page.screenshot(path="/home/jules/verification/final_convidados_error.png")
        except Exception as e:
            print("Failed capturing convidados:", e)

        # Test 3: Login Modal
        print("Navigating to Home...")
        await page.goto("http://localhost:4200/piracicaba", wait_until="networkidle")
        await page.wait_for_timeout(2000)

        try:
            # Trigger Login modal using button in bottom navigation
            menu_btn = page.locator('button:has-text("Menu"), app-bottom-nav button').last
            if await menu_btn.count() > 0:
                 await menu_btn.click()
                 await page.wait_for_timeout(1000)

                 login_btn = page.locator('button:has-text("Entrar")').first
                 if await login_btn.count() > 0:
                     await login_btn.click()
                     await page.wait_for_timeout(1000)
                     await page.screenshot(path="/home/jules/verification/final_login.png", full_page=False)
                     print("Captured final_login.png")
                 else:
                     print("Entrar not found in menu")
            else:
                print("Menu button not found")
        except Exception as e:
            print("Failed capturing login:", e)

        await browser.close()

asyncio.run(run())
