import { describe, expect, it } from 'vitest';

import save from '../save';

describe( '#save', () => {
	it( 'should render the save component with null', () => {
		const result = save();
		expect( result ).toBeNull();
	} );
} );
