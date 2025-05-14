import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ObjectId } from 'mongodb';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform {
  transform(value: string) {
    if (!ObjectId.isValid(value)) {
      throw new BadRequestException(`${value} is not a valid ObjectId`);
    }
    return new ObjectId(value);
  }
}
