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
import { SpecialistServiceRepository } from '../../database/repositories/specialist_service.repository';
import { ServiceRepository } from '../../database/repositories/service.repository';
import { SpecialistRepository } from '../../database/repositories/specialist.repository';
import { UserRepository } from '../../database/repositories/user.repository';

@Injectable()
export class RegistrationService {
  private readonly registrationRepository: RegistrationRepository;
  private readonly ssRepository: SpecialistServiceRepository;
  private readonly serviceRepository: ServiceRepository;
  private readonly specialistRepository: SpecialistRepository;
  private readonly userRepository: UserRepository;
  constructor(
    organizationRepository: RegistrationRepository,
    ssRepository: SpecialistServiceRepository,
    serviceRepository: ServiceRepository,
    specialistRepository: SpecialistRepository,
    userRepository: UserRepository,
  ) {
    this.registrationRepository = organizationRepository;
    this.ssRepository = ssRepository;
    this.serviceRepository = serviceRepository;
    this.specialistRepository = specialistRepository;
    this.userRepository = userRepository;
  }

  public async createRegistration(
    props: ICreateRegistrationProps,
  ): Promise<IRegistrationResponse> {
    const ss = await this.ssRepository.findById(
      props.payload.specialist_service_id,
    );

    if (!ss) {
      throw new NotFoundException('No specialist service found');
    }

    const service = await this.serviceRepository.findById(ss.service_id);
    const specialist = await this.specialistRepository.findById(
      ss.specialist_id,
    );

    if (!service || !specialist) {
      throw new NotFoundException('No specialist service found');
    }
    const user = await this.userRepository.findById(props.userId);
    if (!user) {
      throw new NotFoundException()
    }
    const reg = RegistrationMapper.create({
      service,
      specialist,
      ss,
      user,
      userId: props.userId,
      payload: props.payload,
    });

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

    if (props.request.org_id) {
      filter['service.organization_id'] = props.request.org_id;
    }

    const registrations = await this.registrationRepository.findPaginated({
      filter,
      pages: {
        page: props.request.page,
        limit: props.request.limit,
      },
    });

    const total = await this.registrationRepository.count(filter);

    return {
      items: RegistrationMapper.listResponse(registrations),
      total,
    };
  }

  async findMyPaginated(
    props: IFindRegistrationsProps,
  ): Promise<IPaginatedResponse<IRegistrationResponse>> {
    const filter: IRegistrationFilter = {};

    if (props.request.title) {
      filter.title = props.request.title;
    }

    if (props.request.org_id) {
      filter['service.organization_id'] = props.request.org_id;
    }

    const registrations = await this.registrationRepository.findPaginated({
      filter,
      pages: {
        page: props.request.page,
        limit: props.request.limit,
      },
    });

    const total = await this.registrationRepository.count(filter);

    return {
      items: RegistrationMapper.listResponse(registrations),
      total,
    };
  }
}
