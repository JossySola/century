import {describe, expect, test} from '@jest/globals';
import Cache from './cache (unused)';

describe('Class Cache',() => {
    describe('Functionality', () => {
        test('Successfuly adds a new Node', () => {
            // Setup
            const newNode = new Cache();
            const id = '123';
            const data = 'testing';
    
            // Test
            const result = newNode.add(data, id);
            const expected = newNode.get(id);
    
            // Result
            expect(result?.data).toBe(expected);
        });
        test('Successfuly adds to tail', () => {
            // Setup
            const newNode = new Cache();
            const expected = 3;
            newNode.add('First', '1');
            newNode.add('Second', '2');
            newNode.add('Third', '3');
            
            // Test
            const result = newNode.length();
    
            // Result
            expect(result).toBe(expected)
        });
        test('Successfuly gets data by $id', () => {
            // Setup
            const newNode = new Cache();
            const expected = 'Second';
            newNode.add('First', '1');
            newNode.add('Second', '2');
            newNode.add('Third', '3');
    
            // Test
            const result = newNode.get('2');
    
            // Result
            expect(result).toBe(expected);
        });
        test('Successfuly resets', () => {
            // Setup
            const newNode = new Cache();
            const expected = 0;
            newNode.add('First', '1');
            newNode.add('Second', '2');
            newNode.add('Third', '3');
    
            // Test
            newNode.reset();
            const result = newNode.length();
    
            // Result
            expect(result).toBe(expected);
        });
        test('Successfuly removes Node by $id', () => {
            // Setup
            const newNode = new Cache();
            const expected = 2;
            newNode.add('First', '1');
            newNode.add('Second', '2');
            newNode.add('Third', '3');
    
            // Test
            newNode.remove('2');
            newNode.print();
            const result = newNode.length();
    
            // Result
            expect(result).toBe(expected);
        });
    });
    describe('Edge cases', () => {
        describe('Adding', () => {
            test('Does not add $id duplicates', () => {
                // Setup
                const newNode = new Cache();
                const expected = 3;
                newNode.add('First', '1');
                newNode.add('Second', '2');
                newNode.add('Third', '3');
        
                // Test
                newNode.add('Forth', '2');
                const result = newNode.length();
        
                // Result
                expect(result).toBe(expected);
            });
            test('Returns null if there are no arguments', () => {
                // Setup
                const newNode = new Cache();
                const expected = null;
        
                // Test
                const result = newNode.add();
        
                // Result
                expect(result).toBe(expected);
            });
            test('Returns null if first argument is falsey', () => {
                // Setup
                const newNode = new Cache();
                const expected = null;
        
                // Test
                const result = newNode.add(null, '1');
        
                // Result
                expect(result).toBe(expected);
            });
            test('Returns null if second argument is falsey', () => {
                // Setup
                const newNode = new Cache();
                const expected = null;
        
                // Test
                const result = newNode.add('First', null);
        
                // Result
                expect(result).toBe(expected);
            });
            test('Returns null if both arguments are falsey', () => {
                // Setup
                const newNode = new Cache();
                const expected = null;
        
                // Test
                const result = newNode.add(null, null);
        
                // Result
                expect(result).toBe(expected);
            });
        });
        describe('Removing', () => {
            test('Does not affect list if $id is not found', () => {
                // Setup
                const newNode = new Cache();
                const expected = 3;
                newNode.add('First', '1');
                newNode.add('Second', '2');
                newNode.add('Third', '3');
        
                // Test
                newNode.remove('4');
                const result = newNode.length();
        
                // Result
                expect(result).toBe(expected);
            });
        });
    });
});