import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigOptions } from './interface/config-options.interface';
import { CONFIG_OPTIONS } from './constante';

@Global()
@Module({
  // providers: [ConfigService]
})
// export class ConfigModule {}
export class ConfigModule {
  // static register(options: ConfigOptions): DynamicModule {
  static forRoot(options: ConfigOptions): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        ConfigService,
        {
          provide: CONFIG_OPTIONS,
          useValue: options,
        },
      ],
      exports: [ConfigService],
    };
  }
}
