import { User } from '../../types/userState';


describe('getUsersData', () => {
    it('get users data success', async () => {
        // @ts-ignore
        global.fetch = jest.fn(() =>
            Promise.resolve({
                status: 200,
                json: () => Promise.resolve(payload),
            })
        );
        const dispatch = jest.fn();
        const action1: { type: string, payload: undefined } = {
            type: 'users/addUsersRequest',
            payload: undefined
        };
        const action2: { type: string, payload: User[] } = {
            type: 'users/addUsersSuccess',
            payload
        };
        await require('../get-users').getUsersData()(dispatch);
        expect(dispatch).toBeCalledTimes(2);
        expect(dispatch).toBeCalledWith(action1);
        expect(dispatch).toBeCalledWith(action2);
    });

    it('get users data failure', async () => {
        global.fetch = jest.fn(() =>
            Promise.reject(new Error('Error'))
        );
        const dispatch = jest.fn();
        const action1: { type: string, payload: undefined } = {
            type: 'users/addUsersRequest',
            payload: undefined
        };
        const action2: { type: string, payload: string } = {
            type: 'users/addUsersFailure',
            payload: 'Error'
        };
        await require('../get-users').getUsersData()(dispatch);
        expect(dispatch).toBeCalledTimes(2);
        expect(dispatch).toBeCalledWith(action1);
        expect(dispatch).toBeCalledWith(action2);
    });
});


const payload: User[] = [
    {
        'id': 1,
        'name': 'Leanne Graham',
        'username': 'Bret',
        'email': 'Sincere@april.biz',
        'address': {
            'street': 'Kulas Light',
            'suite': 'Apt. 556',
            'city': 'Gwenborough',
            'zipcode': '92998-3874',
            'geo': {
                'lat': '-37.3159',
                'lng': '81.1496'
            }
        },
        'phone': '1-770-736-8031 x56442',
        'website': 'hildegard.org',
        'company': {
            'name': 'Romaguera-Crona',
            'catchPhrase': 'Multi-layered client-server neural-net',
            'bs': 'harness real-time e-markets'
        }
    },
];
