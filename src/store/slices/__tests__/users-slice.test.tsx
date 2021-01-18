import { User, UsersState } from '../../types/userState';
import { usersSlice, addUsersRequestAction, addUsersSuccessAction, addUsersFailureAction } from '../users-slice';
import INITIAL_STATE from '../../initialState';

const users: User[] = [
    {
        id: 3,
        name: 'name',
        username: 'username',
        email: 'email',
        address: {
            street: 'street',
            suite: 'suite',
            city: 'city',
            zipcode: 'zipcode',
            geo: {
                lat: 'lat',
                lng: 'lng',
            }
        },
        phone: 'phone',
        website: 'website',
        company: {
            name: 'name',
            catchPhrase: 'catchPhrase',
            bs: 'bs'
        }
    }
];

describe('usersSlice', () => {
    it('addUsersRequest reducer returns a new state "expectedAddUsersRequest', () => {
        const expectedAddUsersRequest: UsersState = {
            isFetching: true,
            data: [],
            error: null,
        };

        const actual: UsersState = usersSlice.reducer(INITIAL_STATE.users, addUsersRequestAction());
        expect(actual).toEqual(expectedAddUsersRequest);
    });

    it('addUsersSuccess reducer returns a new state "expectedAddUsersSuccess', () => {
        const expectedAddUsersRequest: UsersState = {
            isFetching: false,
            data: users,
            error: null,
        };

        const actual: UsersState = usersSlice.reducer(INITIAL_STATE.users, addUsersSuccessAction(users));
        expect(actual).toEqual(expectedAddUsersRequest);
    });

    it('addUsersFailure reducer returns a new state "expectedAddUsersFailure', () => {
        const expectedAddUsersRequest: UsersState = {
            isFetching: false,
            data: [],
            error: 'Error',
        };

        const actual: UsersState = usersSlice.reducer(INITIAL_STATE.users, addUsersFailureAction('Error'));
        expect(actual).toEqual(expectedAddUsersRequest);
    });
});
