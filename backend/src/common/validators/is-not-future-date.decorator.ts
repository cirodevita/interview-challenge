import { registerDecorator, ValidationArguments, ValidationOptions, } from 'class-validator';
  
export function IsNotFutureDate(validationOptions?: ValidationOptions) {
return function (object: Object, propertyName: string) {
    registerDecorator({
    name: 'isNotFutureDate',
    target: object.constructor,
    propertyName: propertyName,
    options: validationOptions,
    validator: {
        validate(value: any): boolean {
        if (!value) return true;
        const input = new Date(value);
        const today = new Date();
        input.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
        return input <= today;
        },
        defaultMessage(args: ValidationArguments) {
        return `${args.property} cannot be in the future`;
        },
    },
    });
};
}
  