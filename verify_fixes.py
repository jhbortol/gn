import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        # Use mobile viewport for verification
        context = await browser.new_context(
            viewport={'width': 375, 'height': 812},
            is_mobile=True,
            user_agent='Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1'
        )
        page = await context.new_page()

        print("Navigating to home page...")
        await page.goto("http://localhost:4200/", wait_until="networkidle")

        print("Waiting for city selector and clicking Piracicaba...")
        try:
            piracicaba_btn = page.locator('button:has-text("Piracicaba")')
            await piracicaba_btn.wait_for(timeout=5000)
            await piracicaba_btn.click()
            await page.wait_for_timeout(1000)
        except Exception as e:
            print("City selector not found or click failed:", e)

        print("Closing install prompt if present...")
        try:
            close_install_btn = page.locator('button.lucide-x')
            await close_install_btn.click(timeout=2000)
            await page.wait_for_timeout(500)
        except Exception:
            print("No install prompt found.")

        # Test Task 3 & Task 2 (Orçamento)
        print("Clicking Orçamento tool...")
        try:
            orcamento_tool = page.locator('app-tool-card:has-text("Orçamento")')
            await orcamento_tool.click()
            await page.wait_for_timeout(2000)

            # If it navigated to /meu-casamento/orcamento, Task 3 is successful
            print("Current URL:", page.url)

            print("Opening Orçamento modal...")
            # Click the "+" button (add expense/category)
            # Find a button to add/edit. There usually is an "Adicionar" or "+" button
            add_btn = page.locator('button.lucide-plus, button:has-text("Adicionar"), button:has-text("Nova")').first
            if await add_btn.count() > 0:
                await add_btn.click()
                await page.wait_for_timeout(1000)

            await page.screenshot(path="/home/jules/verification/orcamento_modal.png", full_page=False)
            print("Orçamento modal screenshot saved.")
        except Exception as e:
            print("Failed to open orcamento modal:", e)

        # Test Task 2 (Convidados)
        print("Navigating to Convidados...")
        await page.goto("http://localhost:4200/piracicaba/meu-casamento/convidados", wait_until="networkidle")
        await page.wait_for_timeout(1000)

        print("Opening Convidados modal...")
        try:
            add_convidado_btn = page.locator('button:has-text("Adicionar"), button:has-text("Novo Convidado")').first
            if await add_convidado_btn.count() > 0:
                await add_convidado_btn.click()
                await page.wait_for_timeout(1000)

            await page.screenshot(path="/home/jules/verification/convidados_modal.png", full_page=False)
            print("Convidados modal screenshot saved.")
        except Exception as e:
            print("Failed to open convidados modal:", e)

        # Test Task 1 (Mobile Login Popup)
        print("Triggering Login modal...")
        # Since we removed login from tools, let's click the user menu or "Entrar"
        try:
            entrar_btn = page.locator('button:has-text("Entrar")').first
            if await entrar_btn.count() > 0:
                await entrar_btn.click()
            else:
                # Top right corner usually has a profile/menu icon
                menu_btn = page.locator('button.lucide-user, button.lucide-menu').first
                if await menu_btn.count() > 0:
                    await menu_btn.click()
                    await page.wait_for_timeout(500)
                    login_item = page.locator('text=Entrar').first
                    if await login_item.count() > 0:
                        await login_item.click()

            await page.wait_for_timeout(1500)
            await page.screenshot(path="/home/jules/verification/mobile_login_modal.png", full_page=False)
            print("Login modal screenshot saved.")
        except Exception as e:
            print("Failed to open login modal:", e)

        await browser.close()

asyncio.run(main())
