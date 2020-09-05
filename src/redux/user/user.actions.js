import { UserActionTypes } from './user.types';

export const setUserProfile = user => ({
	type: UserActionTypes.SET_USER,
	payload: user
});

export const updateUserEntries = user => ({
	type: UserActionTypes.UPDATE_ENTRIES,
	payload: { ...user, entries: user.entries + 1 }
});
