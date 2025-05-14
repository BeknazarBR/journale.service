import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { CreateOrgRequestDto } from './dtos/create-org-request.dto';
import { ExtractUserId } from '../../shared/decorators/extract-user-id.decorator';
import { ObjectId } from 'mongodb';
import { IOrgResponse } from './models/response.models';
import { UpdateOrgRequestDto } from './dtos/update-org-request.dto';
import { FindPaginatedOrgsRequestDto } from './dtos/find-paginated-orgs-request.dto';
import { IPaginatedResponse } from '../../shared/pagination/pagination.models';
import { AuthGuard } from '../../shared/guards/auth.guard';
import { ParseObjectIdPipe } from '../../shared/pipes/parse-object-id.pipe';

@Controller('organizations')
export class OrganizationController {
  private readonly organizationService: OrganizationService;

  constructor(organizationService: OrganizationService) {
    this.organizationService = organizationService;
  }

  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  @Post()
  public async create(
    @Body() payload: CreateOrgRequestDto,
    @ExtractUserId() userId: ObjectId,
  ): Promise<IOrgResponse> {
    return this.organizationService.createOrg({
      payload,
      userId,
    });
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Put(':id')
  public async update(
    @Param('id', ParseObjectIdPipe) id: ObjectId,
    @Body() payload: UpdateOrgRequestDto,
    @ExtractUserId() userId: ObjectId,
  ): Promise<IOrgResponse> {
    return this.organizationService.updateOrg({
      id,
      payload,
      userId,
    });
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  public async findOneById(
    @Param('id', ParseObjectIdPipe) id: ObjectId,
  ): Promise<IOrgResponse> {
    return this.organizationService.findById(id);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  public async findPaginated(
    @Query() request: FindPaginatedOrgsRequestDto,
  ): Promise<IPaginatedResponse<IOrgResponse>> {
    return this.organizationService.findPaginated(request);
  }
}
