import mqtt from 'mqtt';

export default class MQTT {
  constructor() {
    this.connected = false;
    this.subscribeTopicList = [];
  }

  initClient(config) {
    const { url, deviceId, username, password } = config;
    return new Promise((resolve, reject) => {
      this.client = mqtt.connect(url, { clientId: deviceId, username });
      this.client.on('connect', () => {
        this.connected = true;
        resolve(this);
      });
      this.client.on('error', (error) => {
        this.connected = false;
        reject(error);
      });
    });
  }

  subscribeTopic(topic, config) {
    if (this.connected) {
      this.subscribeTopicList.push(topic);
      this.client.subscribe(topic, config);
    }
    return this;
  }

  unsubscribeTopic(topic) {
    if (this.connected) {
      this.client.unsubscribe(topic);
    }
  }

  unsubscribeTopicAll() {
    if (this.connected) {
      this.subscribeTopicList.forEach((item) => {
        this.client.unsubscribe(item);
      });
      this.subscribeTopicList = [];
    }
  }

  publishMessage(topic, message) {
    if (this.connected) {
      this.client.publish(topic, message, { qos: 1 });
    }
  }

  handleMessage(callback) {
    if (!this.client._events.message) {
      this.client.on('message', callback);
    }
  }

  end(cb) {
    if (this.connected) {
      this.client.end(false, {}, cb);
    }
  }
}
