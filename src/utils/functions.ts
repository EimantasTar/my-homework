import { Camp } from '../store/types/campState';

export const addZero = (n: number): string => {
    return n < 10 ? '0' + n.toLocaleString() : n.toLocaleString();
};

export const validateDateFormat = (value: string): boolean => {
    const unix: number = Date.parse(value);
    return !!unix;
};

export const formatter = new Intl.NumberFormat('lt-LT', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
});

export const validate = (array: Camp[]): boolean => {
    const requiredKey: string[] = ['id', 'name', 'startDate', 'endDate', 'Budget', 'userId'];
    const requiredValueType: string[] = ['number', 'string', 'string', 'string', 'number', 'number'];
    const errors: string[] = [];
    let inputIsValid = false;

    array.map((camp: Camp, index: number) => {
        const number: number = index + 1;
        const length: number = Object.keys(camp).length;
        let message = '';
        if (length && length < 6) {
            message = 'Please make sure all required fields are filled in objects';
        } else if (length && length > 6) {
            message = 'Please make sure only required fields are filled in objects';
        }
        if (message) {
            throw new Error(message);
        }

        requiredKey.forEach((w: string, index: number) => {
            // @ts-ignore
            const value = camp[w];
            if (!value) {
                if (array.length === 1) {
                    errors.push('Please fill the required field "' + w + '"');
                } else if (w === 'id') {
                    errors.push('Please fill the required field "' + w + '" in object number ' + number);
                } else {
                    errors.push('Please fill the required field "' + w + '" in object that "id" = ' + camp.id);
                }
            } else if (typeof value !== requiredValueType[index]) {
                errors.push('Please check the type of values inserted');
            } else if ((w === 'startDate' || w === 'endDate') && camp.id) {
                const res: boolean = validateDateFormat(value);
                if (!res) {
                    errors.push('Please make sure the "' + w + '" is correct in object that "id" = ' + camp.id);
                }
            }
        });
    });
    if (errors.length) {
        let message = '';
        errors.map(item => {
            message = message + item + '.\n';
        });
        throw new Error(message);
    } else {
        inputIsValid = true;
    }

    return inputIsValid;
};
