export type OptionType = {
    mqttUrl: string;
    auth: {
        username: string;
        password: string;
    },
    profile: {
        clientId: string;
    }
}