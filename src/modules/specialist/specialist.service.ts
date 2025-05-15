import { Injectable, NotFoundException } from '@nestjs/common';
import { ICreateOrgProps, IUpdateOrgProps } from './models/service.models';
import { ISpecialistResponse } from './models/response.models';
import { SpecialistMapper } from './mappers/specialist.mapper';
import { ObjectId } from 'mongodb';
import { IFindPaginatedRequest } from './models/request.models';
import { IPaginatedResponse } from '../../shared/pagination/pagination.models';
import { SpecialistRepository } from '../../database/repositories/specialist.repository';
import { OrganizationRepository } from '../../database/repositories/organization.repository';
import { ISpecialistFilter } from '../../database/filters/specialist.filters';

@Injectable()
export class SpecialistService {
  private readonly specialistRepository: SpecialistRepository;
  private readonly organizationRepository: OrganizationRepository;

  constructor(
    specialistRepository: SpecialistRepository,
    organizationRepository: OrganizationRepository,
  ) {
    this.specialistRepository = specialistRepository;
    this.organizationRepository = organizationRepository;
  }

  public async createSpecialist(
    props: ICreateOrgProps,
  ): Promise<ISpecialistResponse> {
    const org = await this.organizationRepository.findOne({
      _id: props.payload.organization_id,
      owner: props.userId,
    });

    if (!org) {
      throw new NotFoundException('Organization not found');
    }

    const specialist = SpecialistMapper.create(props);

    await this.specialistRepository.create(specialist);

    return SpecialistMapper.response(specialist);
  }

  public async updateSpecialist(
    props: IUpdateOrgProps,
  ): Promise<ISpecialistResponse> {
    const existed = await this.specialistRepository.findById(props.id);

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

    const updated = SpecialistMapper.update({
      existed,
      payload: props.payload,
    });

    await this.specialistRepository.update(updated);

    return SpecialistMapper.response(updated);
  }

  async findById(id: ObjectId): Promise<ISpecialistResponse> {
    const existed = await this.specialistRepository.findById(id);

    if (!existed) {
      throw new NotFoundException(`Specialist not found: ${id.toString()}`);
    }

    return SpecialistMapper.response(existed);
  }

  async findPaginated(
    request: IFindPaginatedRequest,
  ): Promise<IPaginatedResponse<ISpecialistResponse>> {
    const filter: ISpecialistFilter | undefined = request.organization_id
      ? {
          organization_id: request.organization_id,
        }
      : undefined;
    const orgs = await this.specialistRepository.findMany({
      filter,
      pages: {
        page: request.page,
        limit: request.limit,
      },
    });
    const total = await this.specialistRepository.count(filter);

    return {
      items: SpecialistMapper.listResponse(orgs),
      total,
    };
  }
}
