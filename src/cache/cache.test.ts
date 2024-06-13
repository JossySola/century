import {describe, expect, test} from '@jest/globals';
import Cache from './cache';

describe('Class Cache',() => {
    test('Successfuly adds a new Node', () => {
        // Setup
        const newNode = new Cache();
        const id = '123';
        const data = 'testing';

        // Test
        const result = newNode.add(data, id);
        const expected = newNode.get(id);
        
        // Result
        expect(result.data).toBe(expected);
    })
})