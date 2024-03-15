import { Inject, Injectable } from '@nestjs/common';
import { OptionType } from './type';
import mqtt from 'mqtt';

@Injectable()
export class MqttService {

    private mqttClient: null | mqtt.MqttClient;

    constructor(@Inject('CONFIG_OPTIONS') private options: OptionType) {
        const { auth: { password, username }, mqttUrl, profile } = options

        this.mqttClient = mqtt.connect(mqttUrl, {
            clientId: profile.clientId,
            username: username,
            password: password,
        })
    }

    public getMqttClient() {
        return this.mqttClient;
    }

    public onConnected(cb: () => void) {
        this.mqttClient.on("connect", cb);
    }

}
