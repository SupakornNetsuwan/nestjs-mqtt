import { DynamicModule, Module } from '@nestjs/common';
import { MqttController } from './mqtt.controller';
import { MqttService } from './mqtt.service';
import { OptionType } from './type';

@Module({
  providers: [MqttService]
})
export class MqttModule {
  static register(options: OptionType): DynamicModule {
    return {
      module: MqttModule,
      controllers: [MqttController],
      providers: [
        {
          provide: 'CONFIG_OPTIONS',
          useValue: options,
        },
        MqttService,
      ],

    };
  }
}