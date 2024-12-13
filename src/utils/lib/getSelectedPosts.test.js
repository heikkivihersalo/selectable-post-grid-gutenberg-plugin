import { afterEach, describe, expect, it, vi } from 'vitest';

import { getSelectedPosts } from './getSelectedPosts';

const selectCallbackFn = vi.fn().mockImplementation( ( namespace ) => {
    return {
        getEntityRecords: vi.fn().mockReturnValue( [1, 2, 3] ),
        hasFinishedResolution: vi.fn().mockReturnValue( true ),
    };
});

describe('#getSelectedPosts', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should return selected posts', () => {
        const result = getSelectedPosts({ selectCallbackFn, selectedPosts: [1, 2, 3] });
        expect(result).toEqual({ data: [1, 2, 3], hasResolved: true });
    });
});
