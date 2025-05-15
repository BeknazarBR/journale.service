import { DateTime } from 'luxon';

export const DateTransform = ({ value }) => {
  if (typeof value !== 'string' || value === '') {
    return null;
  }
  const date = DateTime.fromISO(value);

  if (!date.isValid) {
    return null;
  }
  return date.toJSDate();
};
