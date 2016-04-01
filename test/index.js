import {expect} from 'chai';

describe('index.js', () => {
    let Slider;

    before(() => {
        global.window = {
            document: {
                documentElement: {
                    addEventListener() {},
                    removeEventListener() {}
                }
            },
            navigator: {
                userAgent: 'Safari'
            }
        };

        Slider = require('../src/index');
    });

    it('export default', () => {
        expect(Slider.default).to.be.an.instanceof(Function);
        expect(Slider.getTransformOffset).to.be.an.instanceof(Function);
        expect(Slider.getTranslate).to.be.an.instanceof(Function);
        expect(Slider.Items).to.be.an.instanceof(Function);
    });
});