import { ObjectId } from 'mongodb';

export const ObjectIdTransform = ({ value }) => {
  if (typeof value !== 'string' || value === '' || !ObjectId.isValid(value)) {
    return null;
  }
  return new ObjectId(value);
};
