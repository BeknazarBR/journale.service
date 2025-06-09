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
import { RegistrationService } from './registration.service';
import { CreateRegistrationRequestDto } from './dtos/create-registration-request.dto';
import { ExtractUserId } from '../../shared/decorators/extract-user-id.decorator';
import { ObjectId } from 'mongodb';
import { IRegistrationResponse } from './models/response.models';
import { UpdateRegistrationRequestDto } from './dtos/update-registration-request.dto';
import { FindPaginatedRegistrationsRequestDto } from './dtos/find-paginated-registrations-request.dto';
import { IPaginatedResponse } from '../../shared/pagination/pagination.models';
import { AuthGuard } from '../../shared/guards/auth.guard';
import { ParseObjectIdPipe } from '../../shared/pipes/parse-object-id.pipe';

@Controller('registrations')
export class RegistrationController {
  private readonly registrationService: RegistrationService;

  constructor(organizationService: RegistrationService) {
    this.registrationService = organizationService;
  }

  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  @Post()
  public async create(
    @Body() payload: CreateRegistrationRequestDto,
    @ExtractUserId() userId: ObjectId,
  ): Promise<IRegistrationResponse> {
    return this.registrationService.createRegistration({
      payload,
      userId,
    });
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Put(':id')
  public async update(
    @Param('id', ParseObjectIdPipe) id: ObjectId,
    @Body() payload: UpdateRegistrationRequestDto,
    @ExtractUserId() userId: ObjectId,
  ): Promise<IRegistrationResponse> {
    return this.registrationService.updateOrg({
      id,
      payload,
      userId,
    });
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  public async findOneById(
    @Param('id', ParseObjectIdPipe) id: ObjectId,
  ): Promise<IRegistrationResponse> {
    return this.registrationService.findById(id);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get()
  public async findPaginated(
    @Query() request: FindPaginatedRegistrationsRequestDto,
    @ExtractUserId() userId: ObjectId,
  ): Promise<IPaginatedResponse<IRegistrationResponse>> {
    return this.registrationService.findPaginated({
      request,
      userId,
    });
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get('org/appointments')
  public async findMyPaginated(
    @Query() request: FindPaginatedRegistrationsRequestDto,
    @ExtractUserId() userId: ObjectId,
  ): Promise<IPaginatedResponse<IRegistrationResponse>> {
    return this.registrationService.findMyPaginated({
      request,
      userId,
    });
  }
}
