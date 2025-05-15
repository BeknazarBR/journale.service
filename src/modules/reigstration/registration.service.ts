import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  ICreateRegistrationProps,
  IFindRegistrationsProps,
  IUpdateRegistrationProps,
} from './models/service.models';
import { IRegistrationResponse } from './models/response.models';
import { RegistrationMapper } from './mappers/registration.mapper';
import { ObjectId } from 'mongodb';
import { IPaginatedResponse } from '../../shared/pagination/pagination.models';
import { RegistrationRepository } from '../../database/repositories/registration.repository';
import { IRegistrationFilter } from '../../database/filters/registration.filters';

@Injectable()
export class RegistrationService {
  private readonly registrationRepository: RegistrationRepository;

  constructor(organizationRepository: RegistrationRepository) {
    this.registrationRepository = organizationRepository;
  }

  public async createRegistration(
    props: ICreateRegistrationProps,
  ): Promise<IRegistrationResponse> {
    const reg = RegistrationMapper.create(props);

    await this.registrationRepository.create(reg);

    return RegistrationMapper.response(reg);
  }

  public async updateOrg(
    props: IUpdateRegistrationProps,
  ): Promise<IRegistrationResponse> {
    const existed = await this.registrationRepository.findById(props.id);

    if (!existed) {
      throw new NotFoundException(
        `Registration not found: ${props.id.toString()}`,
      );
    }

    if (!existed.user_id.equals(props.userId)) {
      throw new ForbiddenException('You are not an owner');
    }

    const updated = RegistrationMapper.update({
      existed,
      payload: props.payload,
    });

    await this.registrationRepository.update(updated);

    return RegistrationMapper.response(updated);
  }

  async findById(id: ObjectId): Promise<IRegistrationResponse> {
    const existed = await this.registrationRepository.findById(id);

    if (!existed) {
      throw new NotFoundException(`Registration not found: ${id.toString()}`);
    }

    return RegistrationMapper.response(existed);
  }

  async findPaginated(
    props: IFindRegistrationsProps,
  ): Promise<IPaginatedResponse<IRegistrationResponse>> {
    const filter: IRegistrationFilter = {
      user_id: props.userId,
    };

    if (props.request.title) {
      filter.title = props.request.title;
    }

    const orgs = await this.registrationRepository.findPaginated({
      filter,
      pages: {
        page: props.request.page,
        limit: props.request.limit,
      },
    });
    const total = await this.registrationRepository.count(filter);

    return {
      items: RegistrationMapper.listResponse(orgs),
      total,
    };
  }
}
