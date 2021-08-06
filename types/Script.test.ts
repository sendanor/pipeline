import Script, { isScript, parseScript, stringifyScript } from "./Script";

describe('isScript', () => {

    test( 'can detect Scripts', () => {

        expect( isScript({
            name: 'get_date',
            command: 'date'
        }) ).toBe(true);

        expect( isScript({
            name: 'test_node',
            command: 'npm',
            args: ['test']
        }) ).toBe(true);

        expect( isScript({
            name: 'build_node',
            command: 'npm',
            args: ['run', 'build']
        }) ).toBe(true);

        expect( isScript({
            name: 'get_date',
            command: 'date',
            env: {
                NODE_ENV: 'production'
            }
        }) ).toBe(true);

        expect( isScript({
            name: 'test_node',
            command: 'npm',
            args: ['test'],
            env: {
                NODE_ENV: 'production'
            }
        }) ).toBe(true);

        expect( isScript({
            name: 'build_node',
            command: 'npm',
            args: ['run', 'build'],
            env: {
                NODE_ENV: 'production'
            }
        }) ).toBe(true);

    });

    test( 'can detect invalid values', () => {

        expect( isScript({
            name: 'get date',
            command: 'date'
        }) ).toBe(false);

        expect( isScript({
            name: 'test node',
            command: 'npm',
            args: ['test']
        }) ).toBe(false);

        expect( isScript({
            name: 'build node',
            command: 'npm',
            args: ['run', 'build']
        }) ).toBe(false);

        expect( isScript({
            name: 'build node',
            command: 'npm',
            args: []
        }) ).toBe(false);

        expect( isScript({
            name: 'build node',
            command: 'npm',
            env: []
        }) ).toBe(false);

        expect( isScript({
            name: 'build node',
            command: 'npm',
            env: [],
            foo: 'bar'
        }) ).toBe(false);

        expect( isScript({
            name: 'build node',
            command: 123,
            env: [],
            foo: 'bar'
        }) ).toBe(false);

        expect( isScript({
            name: 123,
            command: 'build_node',
            env: [],
            foo: 'bar'
        }) ).toBe(false);

        expect( isScript(undefined) ).toBe(false);
        expect( isScript(null) ).toBe(false);
        expect( isScript(false) ).toBe(false);
        expect( isScript(true) ).toBe(false);
        expect( isScript(NaN) ).toBe(false);
        expect( isScript(() => {}) ).toBe(false);
        expect( isScript(0) ).toBe(false);
        expect( isScript(Symbol()) ).toBe(false);
        expect( isScript(1628078651664) ).toBe(false);
        expect( isScript(new Date('2021-08-04T12:04:00.844Z')) ).toBe(false);
        expect( isScript(1) ).toBe(false);
        expect( isScript(12) ).toBe(false);
        expect( isScript(-12) ).toBe(false);
        expect( isScript(123) ).toBe(false);
        expect( isScript(123.99999) ).toBe(false);
        expect( isScript(-123.99999) ).toBe(false);
        expect( isScript("123") ).toBe(false);
        expect( isScript("hello") ).toBe(false);
        expect( isScript("") ).toBe(false);
        expect( isScript([]) ).toBe(false);
        expect( isScript([123]) ).toBe(false);
        expect( isScript(["123"]) ).toBe(false);
        expect( isScript(["Hello world", "foo"]) ).toBe(false);
        expect( isScript({}) ).toBe(false);
        expect( isScript({"foo":"bar"}) ).toBe(false);
        expect( isScript({"foo":1234}) ).toBe(false);

    });

});

describe('stringifyScript', () => {

    test( 'can stringify values', () => {

        expect( stringifyScript({
            name: 'get_date',
            command: 'date'
        }) ).toBe('Script#get_date');

    });

    test( 'throws TypeError on incorrect values', () => {

        // @ts-ignore
        expect( () => stringifyScript(undefined) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyScript(null) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyScript(false) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyScript(true) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyScript(NaN) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyScript(() => {}) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyScript(0) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyScript(Symbol()) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyScript(1628078651664) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyScript(new Date('2021-08-04T12:04:00.844Z')) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyScript(1) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyScript(12) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyScript(-12) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyScript(123) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyScript(123.99999) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyScript(-123.99999) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyScript("123") ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyScript("hello") ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyScript("") ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyScript([]) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyScript([123]) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyScript(["123"]) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyScript(["Hello world", "foo"]) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyScript({}) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyScript({"foo":"bar"}) ).toThrow(TypeError);
        // @ts-ignore
        expect( () => stringifyScript({"foo":1234}) ).toThrow(TypeError);

    });

});

describe('parseScript', () => {

    test( 'can parse Scripts', () => {

        expect( parseScript({
            name: 'get_date',
            command: 'date'
        }) ).toStrictEqual({
            name: 'get_date',
            command: 'date'
        });

    });

    test( 'returns undefined for invalid values', () => {

        expect( parseScript(undefined) ).toBeUndefined();
        expect( parseScript(null) ).toBeUndefined();
        expect( parseScript(false) ).toBeUndefined();
        expect( parseScript(true) ).toBeUndefined();
        expect( parseScript(NaN) ).toBeUndefined();
        expect( parseScript(() => {}) ).toBeUndefined();
        expect( parseScript(0) ).toBeUndefined();
        expect( parseScript(Symbol()) ).toBeUndefined();
        expect( parseScript(1628078651664) ).toBeUndefined();
        expect( parseScript(new Date('2021-08-04T12:04:00.844Z')) ).toBeUndefined();
        expect( parseScript(1) ).toBeUndefined();
        expect( parseScript(12) ).toBeUndefined();
        expect( parseScript(-12) ).toBeUndefined();
        expect( parseScript(123) ).toBeUndefined();
        expect( parseScript(123.99999) ).toBeUndefined();
        expect( parseScript(-123.99999) ).toBeUndefined();
        expect( parseScript("123") ).toBeUndefined();
        expect( parseScript("hello") ).toBeUndefined();
        expect( parseScript("") ).toBeUndefined();
        expect( parseScript([]) ).toBeUndefined();
        expect( parseScript([123]) ).toBeUndefined();
        expect( parseScript(["123"]) ).toBeUndefined();
        expect( parseScript(["Hello world", "foo"]) ).toBeUndefined();
        expect( parseScript({}) ).toBeUndefined();
        expect( parseScript({"foo":"bar"}) ).toBeUndefined();
        expect( parseScript({"foo":1234}) ).toBeUndefined();

    });

});

describe('Script', () => {

    describe('.test', () => {

        test( 'can detect Scripts', () => {

            expect( Script.test({
            name: 'get_date',
            command: 'date'
        }) ).toBe(true);

        });

        test( 'can detect invalid values', () => {

            expect( Script.test(undefined) ).toBe(false);
            expect( Script.test(null) ).toBe(false);
            expect( Script.test(false) ).toBe(false);
            expect( Script.test(true) ).toBe(false);
            expect( Script.test(NaN) ).toBe(false);
            expect( Script.test(() => {}) ).toBe(false);
            expect( Script.test(0) ).toBe(false);
            expect( Script.test(Symbol()) ).toBe(false);
            expect( Script.test(1628078651664) ).toBe(false);
            expect( Script.test(new Date('2021-08-04T12:04:00.844Z')) ).toBe(false);
            expect( Script.test(1) ).toBe(false);
            expect( Script.test(12) ).toBe(false);
            expect( Script.test(-12) ).toBe(false);
            expect( Script.test(123) ).toBe(false);
            expect( Script.test(123.99999) ).toBe(false);
            expect( Script.test(-123.99999) ).toBe(false);
            expect( Script.test("123") ).toBe(false);
            expect( Script.test("hello") ).toBe(false);
            expect( Script.test("") ).toBe(false);
            expect( Script.test([]) ).toBe(false);
            expect( Script.test([123]) ).toBe(false);
            expect( Script.test(["123"]) ).toBe(false);
            expect( Script.test(["Hello world", "foo"]) ).toBe(false);
            expect( Script.test({}) ).toBe(false);
            expect( Script.test({"foo":"bar"}) ).toBe(false);
            expect( Script.test({"foo":1234}) ).toBe(false);

        });

    });

    describe('.stringify', () => {

        test( 'can stringify values', () => {

            expect( Script.stringify({
                name: 'get_date',
                command: 'date'
            }) ).toBe('Script#get_date');

        });

        test( 'throws TypeError on incorrect values', () => {

            // @ts-ignore
            expect( () => Script.stringify(undefined) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => Script.stringify(null) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => Script.stringify(false) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => Script.stringify(true) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => Script.stringify(NaN) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => Script.stringify(() => {}) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => Script.stringify(0) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => Script.stringify(Symbol()) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => Script.stringify(1628078651664) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => Script.stringify(new Date('2021-08-04T12:04:00.844Z')) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => Script.stringify(1) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => Script.stringify(12) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => Script.stringify(-12) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => Script.stringify(123) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => Script.stringify(123.99999) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => Script.stringify(-123.99999) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => Script.stringify("123") ).toThrow(TypeError);
            // @ts-ignore
            expect( () => Script.stringify("hello") ).toThrow(TypeError);
            // @ts-ignore
            expect( () => Script.stringify("") ).toThrow(TypeError);
            // @ts-ignore
            expect( () => Script.stringify([]) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => Script.stringify([123]) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => Script.stringify(["123"]) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => Script.stringify(["Hello world", "foo"]) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => Script.stringify({}) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => Script.stringify({"foo":"bar"}) ).toThrow(TypeError);
            // @ts-ignore
            expect( () => Script.stringify({"foo":1234}) ).toThrow(TypeError);

        });

    });

    describe('.parse', () => {

        test( 'can parse Scripts', () => {

            expect( Script.parse({
                name: 'get_date',
                command: 'date'
            }) ).toStrictEqual({
                name: 'get_date',
                command: 'date'
            });

        });

        test( 'returns undefined for invalid values', () => {

            expect( Script.parse(undefined) ).toBeUndefined();
            expect( Script.parse(null) ).toBeUndefined();
            expect( Script.parse(false) ).toBeUndefined();
            expect( Script.parse(true) ).toBeUndefined();
            expect( Script.parse(NaN) ).toBeUndefined();
            expect( Script.parse(() => {}) ).toBeUndefined();
            expect( Script.parse(0) ).toBeUndefined();
            expect( Script.parse(Symbol()) ).toBeUndefined();
            expect( Script.parse(1628078651664) ).toBeUndefined();
            expect( Script.parse(new Date('2021-08-04T12:04:00.844Z')) ).toBeUndefined();
            expect( Script.parse(1) ).toBeUndefined();
            expect( Script.parse(12) ).toBeUndefined();
            expect( Script.parse(-12) ).toBeUndefined();
            expect( Script.parse(123) ).toBeUndefined();
            expect( Script.parse(123.99999) ).toBeUndefined();
            expect( Script.parse(-123.99999) ).toBeUndefined();
            expect( Script.parse("123") ).toBeUndefined();
            expect( Script.parse("hello") ).toBeUndefined();
            expect( Script.parse("") ).toBeUndefined();
            expect( Script.parse([]) ).toBeUndefined();
            expect( Script.parse([123]) ).toBeUndefined();
            expect( Script.parse(["123"]) ).toBeUndefined();
            expect( Script.parse(["Hello world", "foo"]) ).toBeUndefined();
            expect( Script.parse({}) ).toBeUndefined();
            expect( Script.parse({"foo":"bar"}) ).toBeUndefined();
            expect( Script.parse({"foo":1234}) ).toBeUndefined();

        });

    });

});
