import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';


@ValidatorConstraint({ name: 'isFutureDate', async: false })
export class IsFutureDateConstraint implements ValidatorConstraintInterface {
  validate(value: Date, args: ValidationArguments) {
    const currentDate = new Date();
    return value > currentDate;
  }

  defaultMessage(args: ValidationArguments) {
    return 'The date must be in the future.';
  }
}