import INITIAL_STATE from '../../initialState';
import { campsSlice, addCampsRequestAction, addCampsSuccessAction, addCampsFailureAction } from '../camps-slice';
import { Camp, CampsState } from '../../types/campState';

const camps: Camp[] = [
    {
        'id': 11,
        'name': 'Divavu',
        'startDate': '9/19/2017',
        'endDate': '3/9/2018',
        'Budget': 88377,
        'userId': 3
    },
    {
        'id': 12,
        'name': 'Jaxspan',
        'startDate': '11/21/2017',
        'endDate': '2/21/2018',
        'Budget': 608715,
        'userId': 6
    }
];

const existingCamps: CampsState = {
    isFetching: false,
    data: [
        {
            'id': 1,
            'name': 'Jone',
            'startDate': '9/19/2017',
            'endDate': '3/9/2018',
            'Budget': 33333,
            'userId': 2
        }
    ],
    error: null,
};

const duplicateCamp: Camp[] = [
    {
        'id': 1,
        'name': 'Jone',
        'startDate': '9/19/2017',
        'endDate': '3/9/2018',
        'Budget': 33333,
        'userId': 2
    },
];

const finalCamps: Camp[] = [
    {
        'id': 1,
        'name': 'Jone',
        'startDate': '9/19/2017',
        'endDate': '3/9/2018',
        'Budget': 33333,
        'userId': 2
    },
    {
        'id': 11,
        'name': 'Divavu',
        'startDate': '9/19/2017',
        'endDate': '3/9/2018',
        'Budget': 88377,
        'userId': 3
    },
    {
        'id': 12,
        'name': 'Jaxspan',
        'startDate': '11/21/2017',
        'endDate': '2/21/2018',
        'Budget': 608715,
        'userId': 6
    },
];


describe('campsSlice', () => {
    it('addCampsRequest reducer returns a new state "expectedAddCampsRequest', () => {
        const expectedAddCampsRequest: CampsState = {
            isFetching: true,
            data: [],
            error: null,
        };

        const actual: CampsState = campsSlice.reducer(INITIAL_STATE.camps, addCampsRequestAction());
        expect(actual).toEqual(expectedAddCampsRequest);
    });

    it('addCampsSuccess reducer returns a new state "expectedAddCampsSuccess"', () => {
        const expectedAddCampsSuccess: CampsState = {
            isFetching: false,
            data: camps,
            error: null,
        };

        const actual: CampsState = campsSlice.reducer(INITIAL_STATE.camps, addCampsSuccessAction(camps));
        expect(actual).toEqual(expectedAddCampsSuccess);
    });

    it('addCampsSuccess reducer returns a new state "expectedAddCampsSuccess" with existing state', () => {
        const expectedAddCampsSuccess: CampsState = {
            isFetching: false,
            data: finalCamps,
            error: null,
        };

        const actual: CampsState = campsSlice.reducer(existingCamps, addCampsSuccessAction(camps));
        expect(actual).toEqual(expectedAddCampsSuccess);
    });

    it('addCampsSuccess reducer returns a new state "expectedAddCampsSuccess" (with existing duplicated state)', () => {
        const expectedAddCampsSuccess: CampsState = existingCamps;

        const actual: CampsState = campsSlice.reducer(existingCamps, addCampsSuccessAction(duplicateCamp));
        expect(actual).toEqual(expectedAddCampsSuccess);
    });

    it('addCampsFailure reducer returns a new state "expectedAddCampsFailure"', () => {
        const expectedAddCampsFailure: CampsState = {
            isFetching: false,
            data: [],
            error: 'Error',
        };

        const actual: CampsState = campsSlice.reducer(INITIAL_STATE.camps, addCampsFailureAction('Error'));
        expect(actual).toEqual(expectedAddCampsFailure);
    });
});
