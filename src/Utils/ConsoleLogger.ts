/**
 * 自定义控制台日志工具类
 */
export class ConsoleLogger {
  // 默认样式
  private static DEFAULT_STYLE = "font-size:12px;color: #50b16e;";

  /**
   * 输出个性化日志
   * @param title 标题
   * @param content 内容
   * @param titleStyle 标题样式
   * @param contentStyle 内容样式
   */
  static log(
    title: string,
    content: string,
    titleStyle: string = this.DEFAULT_STYLE,
    contentStyle: string = this.DEFAULT_STYLE,
  ): void {
    console.log(`%c${title}\n%c${content}`, titleStyle, contentStyle);
  }

  /**
   * 输出带图标的个性化日志
   * @param icon ASCII 图标
   * @param title 标题
   * @param content 内容
   * @param iconStyle 图标样式
   * @param titleStyle 标题样式
   * @param contentStyle 内容样式
   */
  static logWithIcon(
    icon: string,
    title: string,
    content: string,
    iconStyle: string = this.DEFAULT_STYLE,
    titleStyle: string = this.DEFAULT_STYLE,
    contentStyle: string = this.DEFAULT_STYLE,
  ): void {
    console.log(`%c${icon}\n%c${title}\n%c${content}`, iconStyle, titleStyle, contentStyle);
  }

  /**
   * 输出结构化日志
   * @param data 结构化数据
   * @param label 标签
   * @param labelStyle 标签样式
   */
  static logStructured(
    data: Record<string, any>,
    label: string = "Data",
    labelStyle: string = this.DEFAULT_STYLE,
  ): void {
    console.groupCollapsed(`%c${label}`, labelStyle);
    Object.entries(data).forEach(([key, value]) => {
      console.log(`%c${key}:`, "font-weight: bold;", value);
    });
    console.groupEnd();
  }

  /**
   * 输出彩色日志
   * @param messages 消息数组
   * @param styles 样式数组
   */
  static logColored(messages: string[], styles: string[]): void {
    const formattedMessages = messages.map((msg, index) => `%c${msg}`).join("");
    console.log(formattedMessages, ...styles);
  }
}
