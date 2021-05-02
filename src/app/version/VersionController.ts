import 'reflect-metadata';
import { JsonController, Get } from 'routing-controllers';
import { Version } from './Version';

@JsonController('/version')
export class VersionController {
  @Get()
  public getVersion (): Version {
    return new Version('0.0.1');
  }
}
