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
import { SpecialistService } from './specialist.service';
import { CreateSpecialistRequestDto } from './dtos/create-specialist-request.dto';
import { ExtractUserId } from '../../shared/decorators/extract-user-id.decorator';
import { ObjectId } from 'mongodb';
import { ISpecialistResponse } from './models/response.models';
import { UpdateSpecialistRequestDto } from './dtos/update-specialist-request.dto';
import { FindPaginatedSpecialistRequestDto } from './dtos/find-paginated-specialist-request.dto';
import { IPaginatedResponse } from '../../shared/pagination/pagination.models';
import { AuthGuard } from '../../shared/guards/auth.guard';
import { ParseObjectIdPipe } from '../../shared/pipes/parse-object-id.pipe';
import { AssignServiceRequestDto } from './dtos/assign-service-request.dto';

@Controller('specialists')
export class SpecialistController {
  private readonly organizationService: SpecialistService;

  constructor(organizationService: SpecialistService) {
    this.organizationService = organizationService;
  }

  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  @Post()
  public async create(
    @Body() payload: CreateSpecialistRequestDto,
    @ExtractUserId() userId: ObjectId,
  ): Promise<ISpecialistResponse> {
    return this.organizationService.createSpecialist({
      payload,
      userId,
    });
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard)
  @Post('assign-service')
  public async assignService(
    @Body() payload: AssignServiceRequestDto,
    @ExtractUserId() userId: ObjectId,
  ): Promise<void> {
    return this.organizationService.assignService({
      payload,
      userId,
    });
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Put(':id')
  public async update(
    @Param('id', ParseObjectIdPipe) id: ObjectId,
    @Body() payload: UpdateSpecialistRequestDto,
    @ExtractUserId() userId: ObjectId,
  ): Promise<ISpecialistResponse> {
    return this.organizationService.updateSpecialist({
      id,
      payload,
      userId,
    });
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  public async findOneById(
    @Param('id', ParseObjectIdPipe) id: ObjectId,
  ): Promise<ISpecialistResponse> {
    return this.organizationService.findById(id);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  public async findPaginated(
    @Query() request: FindPaginatedSpecialistRequestDto,
  ): Promise<IPaginatedResponse<ISpecialistResponse>> {
    return this.organizationService.findPaginated(request);
  }
}
