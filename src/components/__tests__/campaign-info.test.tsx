import React from 'react';
import { shallow } from 'enzyme';
import { CampaignInfo } from '../campaign-info';

const camp = {
    'id': 11,
    'name': 'Divavu',
    'startDate': '9/19/2017',
    'endDate': '3/9/2018',
    'Budget': 88377,
    'userId': 3
};

const camp2 = {
    'id': 11,
    'name': 'Divavu',
    'startDate': '1/18/2017',
    'endDate': '1/18/2021',
    'Budget': 88377,
    'userId': 2
};

const usersData = {
    isFetching: false,
    data: [
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
    ],
    error: null,
};

// eslint-disable-next-line prefer-const
let useEffect: { mockImplementationOnce: (arg0: (f: any) => any) => void; };
const mockUseEffect = () => {
    useEffect.mockImplementationOnce(f => f());
};
useEffect = jest.spyOn(React, 'useEffect').mockImplementationOnce(mockUseEffect);

describe('CampaignInfo', () => {
    it('renders with camp & usersData', () => {
        mockUseEffect();
        mockUseEffect();
        mockUseEffect();
        const wrapper = shallow(<CampaignInfo
            users={usersData}
            item={camp}
            searchText={''}
            selectedEndDate={null}
            selectedStartDate={null}
        />);
        expect(wrapper).toBeTruthy();
    });

    it('renders with camp & usersData & searchText', () => {
        mockUseEffect();
        mockUseEffect();
        mockUseEffect();
        const wrapper = shallow(<CampaignInfo
            users={usersData}
            item={camp}
            searchText={'divavu'}
            selectedEndDate={null}
            selectedStartDate={null}
        />);
        expect(wrapper).toBeTruthy();
    });

    it('renders with camp2 & usersData & searchText', () => {
        mockUseEffect();
        mockUseEffect();
        mockUseEffect();
        const wrapper = shallow(<CampaignInfo
            users={usersData}
            item={camp2}
            searchText={'divavu'}
            selectedEndDate={null}
            selectedStartDate={null}
        />);
        expect(wrapper).toBeTruthy();
    });

    it('renders with camp2 & usersData & searchText & selectedStartDate & selectedEndDate (4)', () => {
        mockUseEffect();
        mockUseEffect();
        mockUseEffect();
        const wrapper = shallow(<CampaignInfo
            users={usersData}
            item={camp2}
            searchText={'divavu'}
            selectedStartDate={new Date('1/17/2015')}
            selectedEndDate={new Date('1/18/2015')}
        />);
        const target = wrapper.find('WithStyles(ForwardRef(TableRow))');
        expect(target).toHaveLength(0);
    });

    it('renders with camp2 & usersData & searchText & selectedStartDate & selectedEndDate (1)', () => {
        mockUseEffect();
        mockUseEffect();
        mockUseEffect();
        const wrapper = shallow(<CampaignInfo
            users={usersData}
            item={camp2}
            searchText={'divavu'}
            selectedStartDate={new Date('1/17/2015')}
            selectedEndDate={new Date('1/18/2017')}
        />);
        const target = wrapper.find('WithStyles(ForwardRef(TableRow))');
        expect(target).toHaveLength(1);
    });

    it('renders with camp2 & usersData & searchText & selectedStartDate & selectedEndDate (2)', () => {
        mockUseEffect();
        mockUseEffect();
        mockUseEffect();
        const wrapper = shallow(<CampaignInfo
            users={usersData}
            item={camp2}
            searchText={'divavu'}
            selectedStartDate={new Date('1/17/2015')}
            selectedEndDate={new Date('1/18/2018')}
        />);
        const target = wrapper.find('WithStyles(ForwardRef(TableRow))');
        expect(target).toHaveLength(1);
    });

    it('renders with camp2 & usersData & searchText & selectedStartDate & selectedEndDate (3)', () => {
        mockUseEffect();
        mockUseEffect();
        mockUseEffect();
        const wrapper = shallow(<CampaignInfo
            users={usersData}
            item={camp2}
            searchText={'divavu'}
            selectedStartDate={new Date('1/18/2017')}
            selectedEndDate={new Date('1/18/2018')}
        />);
        const target = wrapper.find('WithStyles(ForwardRef(TableRow))');
        expect(target).toHaveLength(1);
    });

    it('renders with camp2 & usersData & searchText & selectedStartDate & selectedEndDate (5)', () => {
        mockUseEffect();
        mockUseEffect();
        mockUseEffect();
        const wrapper = shallow(<CampaignInfo
            users={usersData}
            item={camp2}
            searchText={''}
            selectedStartDate={new Date('1/18/2018')}
            selectedEndDate={new Date('1/18/2018')}
        />);
        const target = wrapper.find('WithStyles(ForwardRef(TableRow))');
        expect(target).toHaveLength(0);
    });

    it('renders with camp2 & usersData & searchText & selectedStartDate & selectedEndDate (6)', () => {
        mockUseEffect();
        mockUseEffect();
        mockUseEffect();
        const wrapper = shallow(<CampaignInfo
            users={usersData}
            item={camp2}
            searchText={''}
            selectedStartDate={new Date('1/18/2021')}
            selectedEndDate={new Date('1/18/2022')}
        />);
        const target = wrapper.find('WithStyles(ForwardRef(TableRow))');
        expect(target).toHaveLength(1);
    });

    it('renders with camp2 & usersData & searchText & selectedStartDate & selectedEndDate (7)', () => {
        mockUseEffect();
        mockUseEffect();
        mockUseEffect();
        const wrapper = shallow(<CampaignInfo
            users={usersData}
            item={camp2}
            searchText={''}
            selectedStartDate={new Date('1/18/2020')}
            selectedEndDate={new Date('1/18/2023')}
        />);
        const target = wrapper.find('WithStyles(ForwardRef(TableRow))');
        expect(target).toHaveLength(1);
    });

    it('renders with camp2 & usersData & searchText & selectedStartDate & selectedEndDate (8)', () => {
        mockUseEffect();
        mockUseEffect();
        mockUseEffect();
        const wrapper = shallow(<CampaignInfo
            users={usersData}
            item={camp2}
            searchText={''}
            selectedStartDate={new Date('1/18/2016')}
            selectedEndDate={new Date('1/18/2023')}
        />);
        const target = wrapper.find('WithStyles(ForwardRef(TableRow))');
        expect(target).toHaveLength(1);
    });
});
