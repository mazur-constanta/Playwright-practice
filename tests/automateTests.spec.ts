import { test, expect } from '@playwright/test'

/** in the same way can be used beforeAll */
test.beforeEach(async ({ page }) => {
    await page.goto('https://www.google.com/');
    await page.getByRole('link', { name: 'English' }).click()
})

/** adding tests into test suite */
test.describe('automate tests', () => {
    test('open google website', async ({ page }) => {
        await page.getByLabel('Search', { exact: true }).click()
        await page.getByLabel('Search', { exact: true }).fill('point.md')
        await page.getByLabel('Search', { exact: true }).press('Enter')
    })
    
    test('navigate to another page', async ({ page }) => {
        await page.goto('https://www.point.md/ru/', ({ timeout: 100000 }))
        await page.getByRole('link', { name: 'logo' }).click()
        await page.getByRole('link', { name: 'Леди' }).click()
    })  
})

/** in the same way can be used afterAll */
test.afterEach(async ({ page }) => {
    await page.close();
})

/** multiple options how to use locators */
test('log in page actions', async ({ page }) => {
    await page.goto('https://999.md/ru/', ({ timeout: 100000 }));
    await page.waitForSelector('//*[@id="m__user_panel"]/ul/li[2]/a', ({ timeout: 10000 }));
    await page.locator('//*[@id="m__user_panel"]/ul/li[2]/a').click();
    await page.waitForSelector('//*[@name="login"]', ({ timeout: 10000 }));
    await page.locator('//*[@name="login"]').fill('ConstanceG');
    await page.locator('//*[@name="login"]').click();
    await page.locator('//*[@name="password"]').fill('079902802');
    await page.locator('//*[@name="password"]').click();
    await page.getByRole('button', { name: 'Войти' }).click();
    // await page.waitForSelector('#cookiesPolicy', ({ timeout: 10000 }));
    // await page.locator('//*[@id="cookiesPolicy"]//button[1]').click();
    await page.waitForSelector('[data-autotest="cabinet"]', ({ timeout: 10000 }));
    await page.locator('[data-autotest="cabinet"]').click();
    await page.waitForSelector(':text("Объя")', ({ timeout: 10000 }));
    await page.waitForSelector(':text-is("Объявления")', ({ timeout: 10000 }));
    await page.frameLocator('#topbar-panel').getByRole('button', { name: 'ConstanceG' }).click();
    await page.frameLocator('#topbar-panel').getByRole('button', { name: 'выход' }).click();
    await page.close();
})

/** multiple options how to interact with facing locators */
test('verify user facing locators', async ({ page }) => {
    await page.goto('https://999.md/ru/', ({ timeout: 100000 }));
    await page.getByRole('link', { name: 'Транспорт' }).click();
    await page.getByRole('button', { name: 'Категории' }).click();
    await page.getByPlaceholder('Найти в объявлениях').fill('BMW 330i');
    await page.getByText('Молдова').first().click();
    await page.locator('#js-region-close').click();
    await page.getByTitle('Наверх').click();
})

/** working with child elements */
test('locating child elements', async ({ page }) => {
    await page.goto('https://github.com/', ({ timeout: 100000 }));
    page.locator('div').getByRole('link', { name: "Sign in" });
    await page.getByLabel('Homepage').first().click();
    await page.getByRole('list').nth(2).click();
})

/** reusing existing locators */
test('reusing existing locators', async ({ page }) => {
    const loginPath = page.getByPlaceholder('Имя пользователя или email');
    const passwordPath = page.getByPlaceholder('Пароль');
    const framePath = page.frameLocator('#topbar-panel');
    const frameLogoutPath = framePath.getByRole('button', { name: 'выход' });

    await page.goto('https://999.md/ru/', ({ timeout: 100000 }));
    await page.locator('//*[@id="m__user_panel"]/ul/li[2]/a').click();
    await loginPath.fill('ConstanceG');
    await loginPath.click();
    await passwordPath.fill('079902802');
    await passwordPath.click();
    await page.getByRole('button', { name: 'Войти' }).click();

    await framePath.getByRole('button', { name: 'ConstanceG' }).click();
    await frameLogoutPath.click();
})

/** extracting values examples */
test('extracting values', async ({ page }) => {
    const loginPath = page.getByPlaceholder('Имя пользователя или email');

    await page.goto('https://999.md/ru/', ({ timeout: 100000 }));
    await page.locator('//*[@id="m__user_panel"]/ul/li[2]/a').click();
    await loginPath.fill('ConstanceG');

    const buttonText = await page.locator('button').textContent();
    expect(buttonText).toEqual('Войти');

    // const allButtonsLables = await page.locator('.login__wrapper').allTextContents();
    // expect(allButtonsLables).toContain("Забыли пароль?");
})

/** assertions examples */
test('assertions examples', async ({ page }) => {
    const loginPath = page.getByPlaceholder('Имя пользователя или email');

    await page.goto('https://999.md/ru/', ({ timeout: 100000 }));
    await page.locator('//*[@id="m__user_panel"]/ul/li[2]/a').click();
    await loginPath.fill('ConstanceG');

    // check the general assetions
    const testValue = 5;
    expect(testValue).toEqual(5);

    const buttonText = await page.locator('button').textContent();
    expect(buttonText).toEqual('Войти');

    const buttonPath = page.locator('button');

    // locator assertion
    await expect(buttonPath).toHaveText('Войти');

    // soft assertion
    await expect.soft(buttonPath).toHaveText('Войти5');
    await buttonPath.click();
})


