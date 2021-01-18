import React from 'react';
import { App } from '../App';
import { shallow } from 'enzyme';

const campsInit = {
    isFetching: false,
    data: [],
    error: null,
};

const campsData = {
    isFetching: false,
    data: [{
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
        }],
    error: null,
};

const campsError = {
    isFetching: false,
    data: [],
    error: 'Error. Error2',
};

const getUsersData = jest.fn();
const getCampsData = jest.fn();

describe('App', () => {
    test('renders with initial data', () => {
        const wrapper = shallow(<App
            camps={campsInit}
            getCampsData={getCampsData}
            getUsersData={getUsersData}
        />);
        expect(wrapper).toBeTruthy();
    });

    test('render with camps data', () => {
        const wrapper = shallow(<App
            camps={campsData}
            getCampsData={getCampsData}
            getUsersData={getUsersData}
        />);
        expect(wrapper).toBeTruthy();
    });

    describe('useEffect', () => {

        // eslint-disable-next-line prefer-const
        let useEffect: { mockImplementationOnce: (arg0: (f: any) => any) => void; };
        const mockUseEffect = () => {
            useEffect.mockImplementationOnce(f => f());
        };
        useEffect = jest.spyOn(React, 'useEffect').mockImplementationOnce(mockUseEffect);

        test('render with campsError', () => {
            mockUseEffect();
            const wrapper = shallow(<App
                camps={campsError}
                getCampsData={getCampsData}
                getUsersData={getUsersData}
            />);
            expect(wrapper).toBeTruthy();
        });
    });
});
