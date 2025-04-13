import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// runs a clean after each test case (e.g. clearing jsdom) `important for test isolation`
afterEach( () => {
	cleanup();
} );
