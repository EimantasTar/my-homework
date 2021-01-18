import { Camp } from '../../store/types/campState';


const data: Camp[] = [
    {
        'id': 11,
        'name': 'Divavu',
        'startDate': '9/19/2017',
        'endDate': '3/9/2018',
        'Budget': 88377,
        'userId': 3
    }
];

const data1 = [
    {
        'id': 11,
        'name': 'Divavu',
        'startDate': '9/19/2017',
        'endDate': '3/9/2018',
        'Budget': 88377,
    }
];

const data2 = [
    {
        'id': 11,
        'name': 'Divavu',
        'startDate': '9/19/2017',
        'endDate': '3/9/2018',
        'Budget': 88377,
        'userId': 3,
        'email': 'xxx'
    }
];

const data3 = [
    {
        'id': 11,
        'name': 'Divavu',
        'startDate': '9/19/2017',
        'endDate': '3/9/2018',
        'Budget': 88377,
        'userId': '',
    }
];

const data4 = [
    {
        'id': 12,
        'name': 'Jone',
        'startDate': '9/19/2017',
        'endDate': '3/9/2018',
        'Budget': 3333,
        'userId': 3
    },
    {
        'id': '',
        'name': 'Divavu',
        'startDate': '9/19/2017',
        'endDate': '3/9/2018',
        'Budget': 88377,
        'userId': 3,
    }
];

const data5 = [
    {
        'id': 12,
        'name': 'Jone',
        'startDate': '9/19/2017',
        'endDate': '3/9/2018',
        'Budget': 3333,
        'userId': 3
    },
    {
        'id': 11,
        'name': '',
        'startDate': '9/19/2017',
        'endDate': '3/9/2018',
        'Budget': 88377,
        'userId': 3,
    }
];

const data6 = [
    {
        'id': 11,
        'name': 'Divavu',
        'startDate': '9/19/2017',
        'endDate': '3/9/2018',
        'Budget': '88377',
        'userId': 3
    }
];

const data7 = [
    {
        'id': 11,
        'name': 'Divavu',
        'startDate': '19/19/2017',
        'endDate': '3/9/2018',
        'Budget': 88377,
        'userId': 3
    }
];

const data8 = [
    {
        'id': 11,
        'name': 'Divavu',
        'startDate': '1/19/2017',
        'endDate': '23/9/2018',
        'Budget': 88377,
        'userId': 3
    }
];

const data9 = [
    {
        'id': 11,
        'name': 'Divavu',
        'startDate': '1/19/2017',
        'endDate': '1/18/2017',
        'Budget': 88377,
        'userId': 3
    }
];

describe('functions', () => {
    it('checkDateRange', () => {
        const res: boolean = require('../functions').checkDateRange(new Date('11/01/2021'), new Date('11/01/2022'));
        expect(res).toBe(true);
    });

    it('validateDateFormat', () => {
        const res: boolean = require('../functions').validateDateFormat('11/30/2022');
        expect(res).toBe(true);
    });

    it('compareStartEndDates ', () => {
        const res: boolean = require('../functions').compareStartEndDates('10/30/2022', '10/31/2022');
        expect(res).toBe(true);
    });

    it('validate with correct data', () => {
        const res: boolean = require('../functions').validate(data);
        expect(res).toBe(true);
    });

    it('validate with wrong data1', () => {
        try {
            require('../functions').validate(data1);
        } catch (error) {
            expect(error.message).toBe('Please make sure all required fields are filled in object number 1');
        }
    });

    it('validate with wrong data2', () => {
        try {
            require('../functions').validate(data2);
        } catch (error) {
            expect(error.message).toBe('Please make sure only required fields are filled in object number 1');
        }
    });

    it('validate with wrong data3', () => {
        try {
            require('../functions').validate(data3);
        } catch (error) {
            expect(error.message).toBe('Please fill the required field "userId".\n');
        }
    });

    it('validate with wrong data4', () => {
        try {
            require('../functions').validate(data4);
        } catch (error) {
            expect(error.message).toBe('Please fill the required field "id" in object number 2.\n');
        }
    });

    it('validate with wrong data5', () => {
        try {
            require('../functions').validate(data5);
        } catch (error) {
            expect(error.message).toBe('Please fill the required field "name" in object that "id" = 11.\n');
        }
    });

    it('validate with wrong data6', () => {
        try {
            require('../functions').validate(data6);
        } catch (error) {
            expect(error.message).toBe('Please check the type of "88377" inserted in object that "id" = 11.\n');
        }
    });

    it('validate with wrong data7', () => {
        try {
            require('../functions').validate(data7);
        } catch (error) {
            expect(error.message).toBe('Please make sure the "startDate" is correctly filled in object that "id" = 11. Date format must be MM/DD/YYYY or MM/DD/YY.\n');
        }
    });

    it('validate with wrong data8', () => {
        try {
            require('../functions').validate(data8);
        } catch (error) {
            expect(error.message).toBe('Please make sure the "endDate" is correctly filled in object that "id" = 11. Date format must be MM/DD/YYYY or MM/DD/YY.\n');
        }
    });

    it('validate with wrong data9', () => {
        try {
            require('../functions').validate(data9);
        } catch (error) {
            expect(error.message).toBe('Please make sure the start-date is before the end-date in object that "id" = 11. Date format must be MM/DD/YYYY or MM/DD/YY');
        }
    });
});
