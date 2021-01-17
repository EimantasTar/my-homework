import { Camp } from '../store/types/campState';

export const checkDateRange = (start: Date, end: Date): boolean => {
    const startString: string = start.toLocaleDateString();
    const endString: string = end.toLocaleDateString();
    const unixStart: number = Date.parse(startString);
    const unixEnd: number = Date.parse(endString);
    return unixStart <= unixEnd;
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

const compareStartEndDates = (startDate: string, endDate: string): boolean => {
    const startUnix: number = Date.parse(startDate);
    const endUnix: number = Date.parse(endDate);
    return startUnix <= endUnix;
};

export const validate = (array: Camp[]): boolean => {
    const requiredKey: string[] = ['id', 'name', 'startDate', 'endDate', 'Budget', 'userId'];
    const requiredValueType: string[] = ['number', 'string', 'string', 'string', 'number', 'number'];
    let inputIsValid = false;

    array.map((camp: Camp, index: number) => {
        inputIsValid = false;
        const errors: string[] = [];
        const number: number = index + 1;
        const length: number = Object.keys(camp).length;
        let startDate = '';
        let endDate = '';

        if (length && length < 6) {
            throw new Error(`Please make sure all required fields are filled in object number ${number}`);
        } else if (length && length > 6) {
            throw new Error(`Please make sure only required fields are filled in object number  ${number}`);
        }

        requiredKey.forEach((w: string, index: number) => {
            // @ts-ignore
            const value = camp[w];
            if (!value) {
                if (array.length === 1) {
                    errors.push(`Please fill the required field "${w}"`);
                } else if (w === 'id') {
                    errors.push(`Please fill the required field "${w}" in object number ${number}`);
                } else {
                    errors.push(`Please fill the required field "${w}" in object that "id" = ${camp.id}`);
                }
            } else if (typeof value !== requiredValueType[index]) {
                errors.push(`Please check the type of "${value}" inserted in object that "id" = ${camp.id}`);
            } else if (w === 'startDate') {
                const res: boolean = validateDateFormat(value);
                if (res) {
                    startDate = value;
                } else {
                    errors.push(`Please make sure the "${w}" is correctly filled in object that "id" = ${camp.id}. Date format must be MM/DD/YYYY or MM/DD/YY`);
                }
            } else if (w === 'endDate') {
                const res: boolean = validateDateFormat(value);
                if (res) {
                    endDate = value;
                } else {
                    errors.push(`Please make sure the "${w}" is correctly filled in object that "id" = ${camp.id}. Date format must be MM/DD/YYYY or MM/DD/YY`);
                }
            }
        });
        if (errors.length) {
            let message = '';
            errors.map(item => {
                message = message + item + '.\n';
            });
            throw new Error(message);
        } else if (startDate && endDate) {
            const valid: boolean = compareStartEndDates(startDate, endDate);
            if (!valid) {
                throw new Error(`Please make sure the start-date is before the end-date in object that "id" = ${camp.id}. Date format must be MM/DD/YYYY or MM/DD/YY`);
            }
        }
        inputIsValid = true;
    });
    return inputIsValid;
};
