import { formatDateString } from '../../utils/lib/formatDateString';
import { describe, expect, it } from 'vitest';

describe( '#formatDateString', () => {
    it( 'should return a formatted date string', () => {
        const result = formatDateString( '2021-01-01T00:00:00' );
        expect( result ).toBe( '1.1.2021' );
    } );

    it( 'should return a formatted date string with leading zeros', () => {
        const result = formatDateString( '2021-01-10T00:00:00' );
        expect( result ).toBe( '10.1.2021' );
    } );

    it( 'should return a formatted date string with leading zeros for month and day', () => {
        const result = formatDateString( '2021-10-10T00:00:00' );
        expect( result ).toBe( '10.10.2021' );
    } );
} );