import { Controller, Logger, Scope } from '@nestjs/common';
import { OnModuleInit } from '@nestjs/common';
import { MqttService } from './mqtt.service';


@Controller({ scope: Scope.DEFAULT })
export class MqttController implements OnModuleInit {
    private readonly logger = new Logger(MqttController.name);

    constructor(private readonly mqttService: MqttService) {
        const mqttClient = this.mqttService.getMqttClient()
        mqttClient.subscribe("iot-topic")
    }

    onModuleInit() {
        const mqttClient = this.mqttService.getMqttClient()

        this.mqttService.onConnected(() => {
            console.log("Connected to CloudMQTT")
        })

        mqttClient.on("message", (topic, message) => {
            this.logger.log(`[${topic}]: ${message}`)
        });


        mqttClient.on("reconnect", () => {
            this.logger.fatal("Reconnecting to CloudMQTT")
        });

        mqttClient.on("error", (err) => {
            this.logger.error(`Error: ${err.message}`)
        });
    }
}
