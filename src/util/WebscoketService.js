export default class WebsocketService {
  /**
   *  Websocket
   * @param {
   *  url: '',
   *  handleMessage: (e) => {}
   * } param
   */
  constructor(param) {
    this.websocket = null;
    this.connected = false;
    this.timeoutTimer = null;
    this.isManualClose = false;
    this.param = param;
  }

  connect() {
    this.websocket = new WebSocket(this.param.url);
    this.initSocket();
  }

  initSocket() {
    this.isManualClose = false;
    this.websocket.onclose = (e) => {
      this.connected = false;
      if (!this.isManualClose) {
        this.reconnect();
      }
    };

    this.websocket.onerror = (e) => {
      this.connected = false;
      this.reconnect();
    };

    this.websocket.onopen = (e) => {
      this.connected = true;
      console.log('Websocket已连接');
    };

    this.websocket.onmessage = (e) => {
      let msg = '';
      try {
        msg = JSON.parse(e.data);
      } catch (error) {
        console.log(error);
      }
      this.param.handleMessage(msg);
    };
  }

  reconnect() {
    if (this.connected) {
      return;
    }
    this.connected = true;
    this.timeoutTimer && clearTimeout(this.timeoutTimer);
    this.timeoutTimer = setTimeout(() => {
      this.connect();
      this.connected = false;
    }, 1000);
  }

  send(msg) {
    if (this.connected) {
      this.websocket.send(JSON.stringify(msg));
    }
  }

  close() {
    this.isManualClose = true;
    if (this.websocket && this.connected) {
      this.websocket.close();
    }
  }
}
