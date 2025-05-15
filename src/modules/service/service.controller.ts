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
import { ServiceService } from './service.service';
import { CreateServiceRequestDto } from './dtos/create-service-request.dto';
import { ExtractUserId } from '../../shared/decorators/extract-user-id.decorator';
import { ObjectId } from 'mongodb';
import { IServiceResponse } from './models/response.models';
import { UpdateServiceRequestDto } from './dtos/update-service-request.dto';
import { FindPaginatedServiceRequestDto } from './dtos/find-paginated-service-request.dto';
import { IPaginatedResponse } from '../../shared/pagination/pagination.models';
import { AuthGuard } from '../../shared/guards/auth.guard';
import { ParseObjectIdPipe } from '../../shared/pipes/parse-object-id.pipe';
import { FindBySpecialistRequestDto } from './dtos/find-by-specialist-request.dto';

@Controller('services')
export class ServiceController {
  private readonly serviceService: ServiceService;

  constructor(serviceService: ServiceService) {
    this.serviceService = serviceService;
  }

  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  @Post()
  public async create(
    @Body() payload: CreateServiceRequestDto,
    @ExtractUserId() userId: ObjectId,
  ): Promise<IServiceResponse> {
    return this.serviceService.createService({
      payload,
      userId,
    });
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Put(':id')
  public async update(
    @Param('id', ParseObjectIdPipe) id: ObjectId,
    @Body() payload: UpdateServiceRequestDto,
    @ExtractUserId() userId: ObjectId,
  ): Promise<IServiceResponse> {
    return this.serviceService.updateService({
      id,
      payload,
      userId,
    });
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  public async findOneById(
    @Param('id', ParseObjectIdPipe) id: ObjectId,
  ): Promise<IServiceResponse> {
    return this.serviceService.findById(id);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  public async findPaginated(
    @Query() request: FindPaginatedServiceRequestDto,
  ): Promise<IPaginatedResponse<IServiceResponse>> {
    return this.serviceService.findPaginated(request);
  }

  @HttpCode(HttpStatus.OK)
  @Get('list/by-specialist')
  public async findBySpecialist(
    @Query() request: FindBySpecialistRequestDto,
  ): Promise<IPaginatedResponse<IServiceResponse>> {
    return this.serviceService.findBySpecialist(request);
  }
}
