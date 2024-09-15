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

    test('radio buttons', async ({ page }) => {
        const usingTheGridForm = page.locator('nb-card', { hasText: "Using the Grid"});
        
        // await usingTheGridForm.getByLabel('Option 1').check({force: true})
        await usingTheGridForm.getByRole('radio', { name: "Option 1"}).check({force: true})
        const radioStatus = await usingTheGridForm.getByRole('radio', { name: "Option 1" }).isChecked()
        expect(radioStatus).toBeTruthy()
        await expect(usingTheGridForm.getByRole('radio', { name: "Option 1" })).toBeChecked()
    })

    test('checkbox', async ({ page }) => {
        await page.getByText('Modal & Overlays').click()
        await page.getByText('Toastr').click()

        await page.getByRole('checkbox', { name: "Hide on click" }).check({ force: true }) // or can be used uncheck()

        const allBoxes = page.getByRole('checkbox')
        for(const box of await allBoxes.all()) {
            await box.check({ force: true })
            expect(await box.isChecked()).toBeTruthy() // or toBeFalsy()
        }
    })

    test('List of dropdowns', async ({ page }) => {
        const dropDownMenu = page.locator('ngx-header nb-select')
        await dropDownMenu.click()

        page.getByRole('list') // when the list has a UL tag
        page.getByRole('listitem') // when the list has listitem tag

        const optionList = page.locator('nb-option-list nb-option')
        await expect(optionList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"])
        await optionList.filter({ hasText: "Cosmic" }).click()
        const header = page.locator('nb-layout-header')
        await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')

        const colors = {
            "Light": "rgb(255, 255, 255)",
            "Dark": "rgb(34, 43, 69)",
            "Cosmic": "rgb(50, 50, 89)",
            "Corporate": "rgb(255, 255, 255)"
        }

        await dropDownMenu.click()
        
        for(const color in colors) {
            await optionList.filter({ hasText: color }).click()
            await expect(header).toHaveCSS('background-color', colors[color])

            if(color != "Corporate") {
                await dropDownMenu.click()
            }
        }
    })    
});