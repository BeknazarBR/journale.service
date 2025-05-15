import { ISSListResponseData, ISSResponseData } from '../models/mapper.models';
import { ISSResponse } from '../models/response.models';
import { IServiceEntity } from '../../../database/entities/service.entity';
import { ServiceMapper } from './service.mapper';

export class SpecialistServiceMapper {
  public static response({ service, ss }: ISSResponseData): ISSResponse {
    return {
      _id: ss._id.toString(),
      duration: ss.duration,
      service: ServiceMapper.response(service),
    };
  }

  public static listResponse({
    services,
    ss,
  }: ISSListResponseData): ISSResponse[] {
    const servicesMap = new Map<string, IServiceEntity>();

    for (const service of services) {
      servicesMap.set(service._id.toString(), service);
    }

    const result: ISSResponse[] = [];
    for (const item of ss) {
      const service = servicesMap.get(item.service_id.toString());
      if (service) {
        result.push(
          SpecialistServiceMapper.response({
            service,
            ss: item,
          }),
        );
      }
    }

    return result;
  }
}
