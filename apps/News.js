import plugin from "../../../lib/plugins/plugin.js";
import Waves from "../components/Code.js";
import Config from "../components/Config.js";

export class News extends plugin {
  constructor() {
    super({
      name: "鸣潮-新闻推送",
      event: "message",
      priority: 1009,
      rule: [
        {
          reg: "^(～|~|鸣潮)(活动|新闻|公告)$",
          fnc: "queryNews",
        },
      ],
    });
    this.task = {
      name: "[Waves-Plugin] 新闻推送",
      fnc: () => this.autoNews(),
      cron: Config.getConfig().news_push_time,
      log: false,
    };
  }

  async queryNews(e) {
    const waves = new Waves();
    const newsData = await waves.getEventList();

    const data = [];

    if (!newsData.status) {
  data.push({ message: newsData.msg });
} else {
  newsData.data.list.slice(0, 20).forEach((item) => {
    data.push({
      message: [
        segment.image(item.coverUrl),
        `[鸣潮·公告]\n${item.postTitle}\n \n链接: https://www.kurobbs.com/mc/post/${item.postId}\n发布时间:\n${new Date(item.publishTime).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai', hour12: false, hour: '2-digit', minute: '2-digit', year: 'numeric', month: '2-digit', day: '2-digit' })}`,
      ],
    });
  });
}
await e.reply(Bot.makeForwardMsg(data));
return true;
}

  async autoNews() {
    const { waves_auto_news_list: autoPushList } = Config.getConfig();

    if (!autoPushList.length) {
      return true;
    }

    const waves = new Waves();
    const newsData = await waves.getEventList();

    if (!newsData.status) {
      logger.info(newsData.msg);
      return true;
    }

    const postId = newsData.data.list[0].postId;
    if (postId != (await redis.get(`Yunzai:waves:news`))) {
      await Promise.all(
        autoPushList.map(async (user) => {
          const [botId, groupId, userId] = user.split(":");

          let isGroup = groupId != "undefined";
          let id = isGroup ? groupId : userId;

          if (isGroup) {
            await Bot[botId]
              ?.pickGroup(id)
              .sendMsg([
                segment.image(newsData.data.list[0].coverUrl),
                `${
                  newsData.data.list[0].postTitle
                }\nhttps://www.kurobbs.com/mc/post/${
                  newsData.data.list[0].postId
                }\n\n${new Date(
                  newsData.data.list[0].publishTime
                ).toLocaleString()}`,
              ]);
          } else {
            await Bot[botId]
              ?.pickUser(id)
              .sendMsg([
                segment.image(newsData.data.list[0].coverUrl),
                `${
                  newsData.data.list[0].postTitle
                }\nhttps://www.kurobbs.com/mc/post/${
                  newsData.data.list[0].postId
                }\n\n${new Date(
                  newsData.data.list[0].publishTime
                ).toLocaleString()}`,
              ]);
          }

          redis.set(`Yunzai:waves:news`, postId);
          logger.info(`[Waves-Plugin] 新闻推送: 已推送最新公告`);
          return true;
        })
      );
    } else {
      logger.info(`[Waves-Plugin] 新闻推送: 未获取到新公告`);
      return true;
    }
  }
}
