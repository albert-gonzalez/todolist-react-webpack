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
                browser.fill('text', 'Example Todo');
                return browser.pressButton('Save');
            });

            it('should see new Example Todo in list page', function () {
                browser.assert.elements('#app li', 1);
                browser.assert.text('#app li', 'Example Todo');
            });
        });
    });

    describe('clicks on created Todo link', function () {
        before(function () {
            return browser.clickLink('Example Todo');
        });

        it('should see edit todo form header', function () {
            browser.assert.text('h3', 'Edit of Todo 1');
        });

        describe('submits edit form', function () {
            before(function () {
                browser.fill('text', 'Example Todo Edited');
                return browser.pressButton('Save');
            });

            it('should see edited Example Todo in list page', function () {
                browser.assert.elements('#app li', 1);
                browser.assert.text('#app li', /Example Todo Edited/);
            });
        });
    });

    describe('marks todo as done', function () {
        before(function () {
            return browser.check('#app li input[type="checkbox"]');
        });

        it('should see todo as marked', function () {
            return browser.assert.hasClass('#app li span', 'done-true');
        });
    });

    describe('archives done todos', function () {
        before(function () {
            return browser.clickLink('archive');
        });

        it('should not see the created todo', function () {
            browser.assert.elements('#app li', 0);
        });
    });
});