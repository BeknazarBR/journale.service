import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { OrganizationRepository } from '../../database/repositories/organization.repository';
import { ICreateOrgProps, IUpdateOrgProps } from './models/service.models';
import { IOrgResponse } from './models/response.models';
import { OrgMapper } from './mappers/org.mapper';
import { ObjectId } from 'mongodb';
import { IFindPaginatedRequest } from './models/request.models';
import { IPaginatedResponse } from '../../shared/pagination/pagination.models';

@Injectable()
export class OrganizationService {
  private readonly organizationRepository: OrganizationRepository;

  constructor(organizationRepository: OrganizationRepository) {
    this.organizationRepository = organizationRepository;
  }

  public async createOrg(props: ICreateOrgProps): Promise<IOrgResponse> {
    const org = OrgMapper.create(props);

    await this.organizationRepository.create(org);

    return OrgMapper.response(org);
  }

  public async updateOrg(props: IUpdateOrgProps): Promise<IOrgResponse> {
    const existed = await this.organizationRepository.findById(props.id);

    if (!existed) {
      throw new NotFoundException(
        `Organization not found: ${props.id.toString()}`,
      );
    }

    if (!existed.owner.equals(props.userId)) {
      throw new ForbiddenException('You are not an owner');
    }

    const updated = OrgMapper.update({
      existed,
      payload: props.payload,
    });

    await this.organizationRepository.update(updated);

    return OrgMapper.response(updated);
  }

  async findById(id: ObjectId): Promise<IOrgResponse> {
    const existed = await this.organizationRepository.findById(id);

    if (!existed) {
      throw new NotFoundException(`Organization not found: ${id.toString()}`);
    }

    return OrgMapper.response(existed);
  }

  async findPaginated(
    request: IFindPaginatedRequest,
  ): Promise<IPaginatedResponse<IOrgResponse>> {
    const filter = request.name
      ? {
          name: request.name,
        }
      : undefined;
    const orgs = await this.organizationRepository.findMany({
      filter,
      pages: {
        page: request.page,
        limit: request.limit,
      },
    });
    const total = await this.organizationRepository.count(filter);

    return {
      items: OrgMapper.listResponse(orgs),
      total,
    };
  }
}
