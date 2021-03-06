"use strict";
var controller = require("../controllers/controller"),
  mq = require("../../core/controllers/rabbitmq"),
  policy = require("../policy/policy");
module.exports = function (app) {
  var url = "/api/involvedpartys";
  var urlWithParam = "/api/involvedpartys/:involvedpartyId";
  app
    .route(url) //.all(policy.isAllowed)
    .get(controller.getList)
    .post(controller.create);

  app
    .route(urlWithParam) //.all(policy.isAllowed)
    .get(controller.read)
    .put(controller.update)
    .delete(controller.delete);

  // https://tvds-service.herokuapp.com/api/chatbot/channel/1654060178
  app
    .route("/api/chatbot/channel/1654060178")
    .post(
      controller.getUserProfile,
      controller.messageTypeText,
      controller.messageTypeLocations,
      controller.getOrder,
      controller.confirmAndReject,
      controller.fallbackToDialogFlow,
      controller.replyMessage
    );

  // https://tvds-service.herokuapp.com/api/chatbot/sendmessage
  app.route("/api/chatbot/sendmessage").post(controller.sendMessage);

  app.route("/api/involvedpartys/query").post(controller.query);

  app.param("involvedpartyId", controller.getByID);

  /**
   * Message Queue
   * exchange : ชื่อเครือข่ายไปรษณีย์  เช่น casan
   * qname : ชื่อสถานีย่อย สาขา
   * keymsg : ชื่อผู้รับ
   */
  // mq.consume('exchange', 'qname', 'keymsg', (msg)=>{
  //     console.log(JSON.parse(msg.content));

  // });
};
