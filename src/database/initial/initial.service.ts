import { Injectable, OnModuleInit } from '@nestjs/common';
import { InitialRepository } from './initial.repository';

@Injectable()
export class InitialService implements OnModuleInit {
  private readonly repository: InitialRepository;

  constructor(repository: InitialRepository) {
    this.repository = repository;
  }

  public async onModuleInit(): Promise<void> {
    await this.repository.createCollections();
  }
}
