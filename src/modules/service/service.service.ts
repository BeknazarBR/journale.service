import { Injectable, NotFoundException } from '@nestjs/common';
import {
  ICreateServiceProps,
  IUpdateServiceProps,
} from './models/service.models';
import { IServiceResponse } from './models/response.models';
import { ServiceMapper } from './mappers/service.mapper';
import { ObjectId } from 'mongodb';
import { IFindPaginatedRequest } from './models/request.models';
import { IPaginatedResponse } from '../../shared/pagination/pagination.models';
import { OrganizationRepository } from '../../database/repositories/organization.repository';
import { ISpecialistFilter } from '../../database/filters/specialist.filters';
import { ServiceRepository } from '../../database/repositories/service.repository';

@Injectable()
export class ServiceService {
  private readonly serviceRepository: ServiceRepository;
  private readonly organizationRepository: OrganizationRepository;

  constructor(
    serviceRepository: ServiceRepository,
    organizationRepository: OrganizationRepository,
  ) {
    this.serviceRepository = serviceRepository;
    this.organizationRepository = organizationRepository;
  }

  public async createService(
    props: ICreateServiceProps,
  ): Promise<IServiceResponse> {
    const org = await this.organizationRepository.findOne({
      _id: props.payload.organization_id,
      owner: props.userId,
    });

    if (!org) {
      throw new NotFoundException('Organization not found');
    }

    const specialist = ServiceMapper.create(props);

    await this.serviceRepository.create(specialist);

    return ServiceMapper.response(specialist);
  }

  public async updateService(
    props: IUpdateServiceProps,
  ): Promise<IServiceResponse> {
    const existed = await this.serviceRepository.findById(props.id);

    if (!existed) {
      throw new NotFoundException(
        `Specialist not found: ${props.id.toString()}`,
      );
    }
    const org = await this.organizationRepository.findOne({
      _id: existed.organization_id,
      owner: props.userId,
    });

    if (!org) {
      throw new NotFoundException('Organization not found');
    }

    const updated = ServiceMapper.update({
      existed,
      payload: props.payload,
    });

    await this.serviceRepository.update(updated);

    return ServiceMapper.response(updated);
  }

  async findById(id: ObjectId): Promise<IServiceResponse> {
    const existed = await this.serviceRepository.findById(id);

    if (!existed) {
      throw new NotFoundException(`Specialist not found: ${id.toString()}`);
    }

    return ServiceMapper.response(existed);
  }

  async findPaginated(
    request: IFindPaginatedRequest,
  ): Promise<IPaginatedResponse<IServiceResponse>> {
    const filter: ISpecialistFilter | undefined = request.organization_id
      ? {
          organization_id: request.organization_id,
        }
      : undefined;
    const orgs = await this.serviceRepository.findMany({
      filter,
      pages: {
        page: request.page,
        limit: request.limit,
      },
    });
    const total = await this.serviceRepository.count(filter);

    return {
      items: ServiceMapper.listResponse(orgs),
      total,
    };
  }
}
