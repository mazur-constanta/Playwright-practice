import { test, expect } from '@playwright/test'
import exp from 'constants';

test.beforeEach(async ({ page }) => {
    await page.goto('http://uitestingplayground.com/ajax');
    await page.getByText('Button Triggering AJAX Request').click();
})

/** auto waiting examples */
test('auto-waiting examples', async ({ page }) => {
    const successButton = page.locator('.bg-success');
    await successButton.click();

    const text = await successButton.textContent();
    const textAllContents = await successButton.allTextContents();

    await successButton.waitFor({ state: 'attached' });

    expect(text).toEqual('Data loaded with AJAX get request.');
    expect(textAllContents).toContain('Data loaded with AJAX get request.');

    await expect(successButton).toHaveText('Data loaded with AJAX get request.', ({ timeout: 20000 }));
});

/** alternative auto waitings */
test('alternative auto waitings', async ({ page }) => {
    const successButton = page.locator('.bg-success');
    
    //___ wait for element
    // await page.waitForSelector('.bg-success');

    //___ wait for particular response
    await page.waitForResponse('http://uitestingplayground.com/ajaxdata');


    //___ wait for network calls to be completed, but not recommended
    // await page.waitForLoadState('networkidle');

    // hardcoded time - not recommended also
    await page.waitForTimeout(5000);

    const textAllContents = await successButton.allTextContents();
    expect(textAllContents).toContain('Data loaded with AJAX get request.');
    
});