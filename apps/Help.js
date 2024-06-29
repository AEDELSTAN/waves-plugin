import plugin from '../../../lib/plugins/plugin.js';
import Render from '../components/Render.js';
import { style } from '../resources/help/imgs/config.js';
import _ from 'lodash';

export class Help extends plugin {
   constructor() {
    super({
      name: "鸣潮-帮助",
      event: "message",
      priority: 1008,
      rule: [
        {
          reg: "^(～|~)?(鸣潮|mc)?帮助$",
          fnc: "help",
        },
        {
          reg: "^(～|~)?(鸣潮|mc)?(登录|登陆|绑定)帮助$",
          fnc: "bindHelp",
        },
        {
          reg: "^(～|~)?(鸣潮|mc)?(抽卡统计|抽卡|统计)帮助$",
          fnc: "gachaHelp",
        },
        {
          reg: "^(～|~)?(鸣潮|mc)?(tap|TAP|Tap)帮助$",
          fnc: "tapHelp"
                }
            ]
        })
    }

    async help(e) {
        const helpCfg = {
            "themeSet": false,
            "title": "WAVES-PLUGIN 帮助",
            // "subTitle": "Yunzai-Bot & waves-plugin",
            "subTitle": "WAVES-PLUGIN HELP",
            "colWidth": 265,
            "theme": "all",
            "themeExclude": [
                "default"
            ],
            "colCount": 2,
            "bgBlur": true
        }
        const helpList = [
            {
                "group": "功能列表",
                "list": [
                    {
                        "icon": 1,
                        "title": "~登录",
                        "desc": "绑定账户Token"
                    },
                    {
                        "icon": 2,
                        "title": "~登录帮助",
                        "desc": "绑定账户Token教程"
                    },
                    {
                        "icon": 3,
                        "title": "~绑定tap",
                        "desc": "绑定TapTap账号"
                    },
                    {
                        "icon": 4,
                        "title": "~解绑",
                        "desc": "解绑账户Token"
                    },
                    {
                        "icon": 5,
                        "title": "~库街区Token",
                        "desc": "查看自己已绑定的Token"
                    },
                    {
                        "icon": 6,
                        "title": "~签到",
                        "desc": "社区签到"
                    },
                    {
                        "icon": 7,
                        "title": "~体力",
                        "desc": "查看日常数据"
                    },
                    {
                        "icon": 8,
                        "title": "~卡片",
                        "desc": "查看账号卡片"
                    },
                    {
                        "icon": 9,
                        "title": "~数据坞",
                        "desc": "查看数据坞信息"
                    },
                    {
                        "icon": 10,
                        "title": "~全息战略",
                        "desc": "查看全息战略挑战信息信息"
                    },
                    {
                        "icon": 11,
                        "title": "~探索度",
                        "desc": "查看地图探索度"
                    },
                    {
                        "icon": 12,
                        "title": "~开启自动签到",
                        "desc": "每天四点自动执行所有账号签到"
                    },
                    {
                        "icon": 13,
                        "title": "~开启体力推送",
                        "desc": "结晶波片回满提醒"
                    },
                    {
                        "icon": 14,
                        "title": "~抽卡记录",
                        "desc": "抽卡记录"
                    },
                    {
                        "icon": 15,
                        "title": "~安可面板",
                        "desc": "角色面板"
                    },
                    {
                        "icon": 16,
                        "title": "~抽卡帮助",
                        "desc": "获取抽卡记录教程"
                    },
                    {
                        "icon": 17,
                        "title": "~吟霖图鉴",
                        "desc": "万物图鉴"
                    },
                    {
                        "icon": 18,
                        "title": "~今汐攻略",
                        "desc": "角色攻略"
                    },
                    {
                        "icon": 19,
                        "title": "~开启公告推送",
                        "desc": "推送官方公告"
                    },
                    {
                        "icon": 20,
                        "title": "~十连",
                        "desc": "抽卡模拟器"
                    },
                    {
                        "icon": 21,
                        "title": "~帮助",
                        "desc": "查看帮助面板"
                    },
                    {
                        "icon": 22,
                        "title": "~更新",
                        "desc": "更新插件"
                    }
                ],
            },
        ]
        let helpGroup = []
        _.forEach(helpList, (group) => {
            _.forEach(group.list, (help) => {
                let icon = help.icon * 1
                if (!icon) {
                    help.css = 'display:none'
                } else {
                    let x = (icon - 1) % 10
                    let y = (icon - x - 1) / 10
                    help.css = `background-position:-${x * 50}px -${y * 50}px`
                }
            })
            helpGroup.push(group)
        })

        let themeData = await this.getThemeData(helpCfg, helpCfg)
        return await Render.render('help/index', {
            helpCfg,
            helpGroup,
            ...themeData,
            element: 'default'
        }, { e, scale: 1.6 })
    }

  async bindHelp(e) {
    const helpStep = [
      {
        message:
          "1.手机下载库街区APP（下载地址：https://www.kurobbs.com/download.html）",
      },
      {
        message:
          "2.首次使用请先登录库街区APP，并检查数据终端中各项数据是否开启对外展示开关",
      },
      { message: "3.退出库街区登录，再次获取验证码（此时不要登录库街区APP）" },
      {
        message:
          "4.发送 ~登录<手机号>:<验证码> 即可完成登录(例：~登录17041039503:1865)，注意：手机号验证码之间有冒号间隔",
      },
      {
        message:
          "机器人登录后再次在网页或APP登录库街区账号会导致机器人Token失效，目前库街区只支持一端登录",
      },
      {
        message:
          "如果需要与库街区APP共用请自行抓包库街区APP获取Token，发送 ~登录Token 即可完成登录(例：~登录eyJhbGc...)，注意：网页中的Token不可用，只能抓包APP",
      },
    ];
    await e.reply(Bot.makeForwardMsg(helpStep));
    return true;
  }

    async gachaHelp(e) {
        const helpStep = [
            { message: '一、Android 手机方法\n\n1.进入游戏，打开唤取界面\n\n2.关闭网络\n\n3.点击唤取记录\n\n4.长按左上角空白处，全选，复制\n\n5.向机器人发送[~抽卡统计 + 你复制的内容]，即可开始分析' },
            { message: '二、IOS 手机方法\n\n1.在 AppStore 搜索 Stream 并下载安装\n\n2.打开 Stream，按照提示配置好权限并开启 HTTPS 抓包。在 Stream 中点击 开始抓包 > 安装证书 > 在弹出的窗口中选择允许 > 证书已经下载到了你的设备中，然后打开系统设置 > 通用 > VPN与设备管理 > 选择 Stream Generated CA 并安装。打开系统设置 > 通用 > 关于本机 > (最下方)证书信任设置 > 打开 Stream Generated CA 开关即可\n\n3.在 Stream 中点击开始抓包，回到游戏中点击唤取记录\n\n4.回到 Stream 并点击停止抓包，点击抓包历史 > 选择最新的记录 > 找到链接为 https://gmserver-api.aki-game2.com/gacha/record/query 的POST请求点进去 > 点击位于总览右侧的请求标签页 > 点击最下方查看JSON > 全选复制\n\n5.向机器人发送[~抽卡统计 + 你复制的内容]，即可开始分析' },
            { message: '三、PC端方法\n\n1.进入游戏，打开唤取界面，点击唤取记录\n\n2.右键鸣潮图标，选择打开文件所在位置\n\n2.依次打开目录 Wuthering Waves Game\/Client\/Saved\/Logs 找到 Client.log 文件\n\n3.使用文本编辑器打开，搜索 https://aki-gm-resources.aki-game.com/aki/gacha/index.html 找到位置\n\n4.复制链接以及跟随后面的参数（有换行请仔细查看不要漏掉）\n\n5.向机器人发送[~抽卡统计 + 你复制的内容]，即可开始分析' },
        ]
        await e.reply(Bot.makeForwardMsg(helpStep))
        return true
    }

    async tapHelp(e) {
        const helpStep = [
            { message: '一、下载 TapTap APP，登录 TapTap 账号' },
            { message: '二、搜索框搜索 鸣潮 进入游戏主页，点击底部 在线玩 按钮开启云玩（如果排队需要很久，可以点击右下角 抢先云试玩 即可立即进入）' },
            { message: '三、进入游戏后，登陆界面选择 TapTap 登录，登录 Taptap 账号后，会需要你绑定 原账号手机号 ，绑定成功后即可' },
            { message: '四、退出云玩，打开 鸣潮 游戏主页，点击顶部 攻略 选项，点击 数据查询 功能，点击 确认绑定 即可' },
            { message: '五、打开自己 TapTap 个人主页，找到ID，向机器人发送[~绑定tap + 账号ID]即可完成绑定' }
        ]
        await e.reply(Bot.makeForwardMsg(helpStep))
        return true
    }

  async getThemeData(diyStyle, sysStyle) {
    let resPath = "{{_res_path}}/help/imgs/";
    let helpConfig = _.extend({}, sysStyle, diyStyle);
    let colCount = Math.min(
      5,
      Math.max(parseInt(helpConfig?.colCount) || 3, 2)
    );
    let colWidth = Math.min(
      500,
      Math.max(100, parseInt(helpConfig?.colWidth) || 265)
    );
    let width = Math.min(2500, Math.max(800, colCount * colWidth + 30));
    let theme = {
      main: `${resPath}/main.png`,
      bg: `${resPath}/bg.jpg`,
      style: style,
    };
    let themeStyle = theme.style || {};
    let ret = [
      `
          body{background-image:url(${theme.bg}) no-repeat;width:${width}px;}
          .container{background-image:url(${theme.main});width:${width}px;}
          .help-table .td,.help-table .th{width:${100 / colCount}%}
          `,
    ];
    let css = function (sel, css, key, def, fn) {
      let val = (function () {
        for (let idx in arguments) {
          if (!_.isUndefined(arguments[idx])) {
            return arguments[idx];
          }
        }
      })(themeStyle[key], diyStyle[key], sysStyle[key], def);
      if (fn) {
        val = fn(val);
      }
      ret.push(`${sel}{${css}:${val}}`);
    };
    css(".help-title,.help-group", "color", "fontColor", "#ceb78b");
    css(".help-title,.help-group", "text-shadow", "fontShadow", "none");
    css(".help-desc", "color", "descColor", "#eee");
    css(".cont-box", "background", "contBgColor", "rgba(43, 52, 61, 0.8)");
    css(".cont-box", "backdrop-filter", "contBgBlur", 3, (n) =>
      diyStyle.bgBlur === false ? "none" : `blur(${n}px)`
    );
    css(".help-group", "background", "headerBgColor", "rgba(34, 41, 51, .4)");
    css(
      ".help-table .tr:nth-child(odd)",
      "background",
      "rowBgColor1",
      "rgba(34, 41, 51, .2)"
    );
    css(
      ".help-table .tr:nth-child(even)",
      "background",
      "rowBgColor2",
      "rgba(34, 41, 51, .4)"
    );
    return {
      style: `<style>${ret.join("\n")}</style>`,
      colCount,
    };
  }
}
