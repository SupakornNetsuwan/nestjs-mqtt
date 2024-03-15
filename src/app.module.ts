import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MqttModule } from './mqtt/mqtt.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    MqttModule.register({
      mqttUrl: "mqtts://2e1509f8750d48e093f57524a633c9c7.s1.eu.hivemq.cloud:8883",
      profile: { clientId: "nestjs-64070108" },
      auth: {
        password: process.env.MQTT_PASSWORD,
        username: process.env.MQTT_USERNAME
      },
    })
  ],
})
export class AppModule { }
