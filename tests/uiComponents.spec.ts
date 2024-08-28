import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200');
})

/** working with UI components */
test.describe('form layouts page',  () => {
    test.beforeEach(async ({ page }) => {
        await page.getByText('Forms').click();
        await page.getByText('Form Layouts').click();
    });

    test('input fields', async ({ page }) => {
        const usingTheGridEmailInput = page.locator('nb-card', { hasText: "Using the Grid" }).getByRole('textbox', { name: "Email" })
        await usingTheGridEmailInput.fill('clausmeine2000@yopmail.com');
        await usingTheGridEmailInput.clear();
        await usingTheGridEmailInput.pressSequentially('clausmeine2001@yopmail.com', { delay: 500 });

        // generic assertion
        const inputValue = await usingTheGridEmailInput.inputValue();
        expect(inputValue).toEqual('clausmeine2001@yopmail.com');

        // locator assertion 
        await expect(usingTheGridEmailInput).toHaveValue('clausmeine2001@yopmail.com');
    })
});