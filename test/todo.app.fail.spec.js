const Browser = require('zombie');
var assert = require('assert');

Browser.localhost('localhost', 3000);

describe('When user visits the app page', function () {
    const browser = new Browser();
    this.timeout(10000);

    before(function () {
        return browser.visit('/');
    });

    it('should see the app header', function () {
        browser.assert.text('#title', 'Todo App');
    });

    describe('clicks New Button', function () {
        before(function () {
            return browser.clickLink('New Todo');
        });

        it('should see new todo form header', function () {
            browser.assert.text('h3', 'New Todo');
        });

        describe('submits create form', function () {
            before(function () {
                return browser.pressButton('Save');
            });

            it('should do nothing', function () {
                browser.assert.text('h3', 'New Todo');
            });
        });
    });
});