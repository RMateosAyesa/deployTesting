import { IocServerStatus } from "../../../../domain/entities/ioc-server-status.entity";
import { axiosInstance } from "../../../../../shared/instances/axios-instance-api";
import type { FindAllResponse } from "../../../../../shared/types/find-all-response.type";
import type { IocRepository } from "../../../../domain/contracts/ioc.repository";
import { Ioc } from "../../../../domain/entities/ioc.entity";

import type {
  GetIocServersResponseDto,
  IocDto,
} from "../dtos/get-ioc-servers.dto";

const IOCS_ENDPOINT = "/iocs";

export class AxiosIocRepository implements IocRepository {
  async findAll(
    page?: number,
    pageSize?: number,
  ): Promise<FindAllResponse<Ioc>> {
    const { data } = await axiosInstance.get<GetIocServersResponseDto>(
      IOCS_ENDPOINT,
      {
        params: { page, pageSize },
      },
    );

    return {
      total: data.total,
      page: data.page,
      pages: data.pages,
      items: data.items.map((item) => this.toDomain(item)),
    };
  }

  private toDomain(item: IocDto): Ioc {
    return Ioc.create({
      name: item.name,
      origin: item.origin,
      location: item.location,
      server: item.server,
    });
  }

  findStatus(_iocName: string): Promise<IocServerStatus> {
    return Promise.resolve(
      IocServerStatus.create({
        restartCounter: 0,
        recordCounter: 0,
        startTod: '',
        totalCAConnections: 0,
        activeCAClients: 0,
        epicsBaseVersion: '',
        linuxKernelVersion: '',
      }),
    )
  }
}
