import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// runs a clean after each test case (e.g. clearing jsdom) `important for test isolation`
afterEach( () => {
	cleanup();
} );

// Mock WordPress modules
vi.mock( '@wordpress/i18n', () => ( {
	__: ( text, namespace = '' ) => text,
} ) );

vi.mock( '@wordpress/element', async () => ( {
	useState: ( state ) => {
		return [ state, vi.fn() ];
	},
	useEffect: vi.fn(),
} ) );
 