class EventEmitter {
  constructor() {
    // 用来存储事件和监听函数之间的关系
    this.eventMap = {};
  }

  /**
   * @description 订阅
   * @param {*} type 事件名称
   * @param {*} handler 事件的监听函数
   */
  on(type, handler) {
    // handler 必须是一个函数
    if (Object.prototype.toString.call(handler) !== '[object Function]') {
      throw new Error('handler 必须是一个函数');
    }
    // 判断 type 事件对应的队列是否存在
    if (!this.eventMap[type]) {
      // 若不存在，新建队列
      this.eventMap[type] = [];
    }
    // 若存在，直接往队列里推入 handler
    this.eventMap[type].push(handler);
  }

  /**
   * @description 发布
   * @param {*} type 事件名称
   * @param params 携带的数据
   */
  emit(type, params) {
    if (this.eventMap[type]) {
      this.eventMap[type].forEach((handler) => {
        handler(params);
      });
    }
  }

  off(type, handler) {
    if (this.eventMap[type]) {
      const idx = this.eventMap[type].indexOf(handler);
      if (idx > -1) {
        this.eventMap[type].splice(idx, 1);
      }
    }
  }
}

export default EventEmitter;
