// 配置
window.Config = {

  // 显示标题
  SiteName: '摘星辰(星辰工具箱) - 站点监测',

  // UptimeRobot Api Keys
  // 支持 Monitor-Specific 和 Read-Only
  ApiKeys: [
    'm797337935-a3be400c10b444a746d29176',
    'm798237639-f8b9c5f7c4587c79b52dd428',
    'm798773765-e94276fd0327abbb7c32fa3b',
  ],

    // 日志天数
  // 虽然免费版说仅保存60天日志，但测试好像API可以获取90天的
  // 不过时间不要设置太长，容易卡，接口请求也容易失败
  CountDays: 60,

  // 是否显示检测站点的链接
  ShowLink: true,

  // 导航栏菜单
  Navi: [
    {
      text: '主页',
      url: 'https://xinstudio.top'
    },
    {
      text: '关于我',
      url: 'https://github.com/PickStars308'
    },
    {
      text: 'GitHub',
      url: 'https://github.com/qikaile/uptime-status'
    },
  ],
};
