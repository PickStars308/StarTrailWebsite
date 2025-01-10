import axios from "axios";
import { ElNotification } from "element-plus"; // 确保根据您使用的 UI 库进行适当的调整

export async function FetchDownload(Version: string) {
  try {
    const response = await axios.get("/Assets/Data/Json/Version.json");
    const jxresponse = response.data;

    // 检查主开关
    if (jxresponse.MainSwitch) {
      if (Version === "Release" && jxresponse.Release) {
        if (jxresponse.Release.Use.IsUse) {
          ElNotification({
            dangerouslyUseHTMLString: true,
            title: "成功",
            message: "下载链接是：？？？？？？？？？" /* + data.Release.DownloadUrl */,
            type: "success",
          });
        } else {
          ElNotification({
            dangerouslyUseHTMLString: true,
            title: "Warning",
            message: jxresponse.Release.Use.NoUseTip,
            type: "warning",
          });
        }
      } else if (Version === "Beta" && jxresponse.Beta) {
        if (jxresponse.Beta.Use.IsUse) {
          ElNotification({
            dangerouslyUseHTMLString: true,
            title: "成功",
            message: "下载链接是：？？？？？？？？？" /* + data.Beta.DownloadUrl */,
            type: "success",
          });
        } else {
          ElNotification({
            dangerouslyUseHTMLString: true,
            title: "Warning",
            message: jxresponse.Beta.Use.NoUseTip,
            type: "warning",
          });
        }
      } else {
        ElNotification({
          dangerouslyUseHTMLString: true,
          title: "Warning",
          message: "指定的版本不存在或数据无效",
          type: "warning",
        });
      }
    } else {
      ElNotification({
        dangerouslyUseHTMLString: true,
        title: "Warning",
        message: jxresponse.NoTip,
        type: "warning",
      });
    }
  } catch (error) {
    ElNotification({
      dangerouslyUseHTMLString: true,
      title: "Error",
      message: `数据加载失败 Σヽ(ﾟД ﾟ; )ﾉ <br/>${error}`,
      type: "error",
    });
  }
}
