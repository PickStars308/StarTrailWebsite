import dayjs from "dayjs";

import { ElNotification } from "element-plus";

// 定义类型
interface CurrentTime {
  year: number;
  month: string;
  day: string;
  hour: string;
  minute: string;
  second: string;
  weekday: string;
}

interface TimeDifference {
  name: string;
  total: number;
  passed: number;
  remaining: number;
  percentage: string;
}

interface TimeCapsule {
  day: TimeDifference;
  week: TimeDifference;
  month: TimeDifference;
  year: TimeDifference;
}

// 时钟
export function getCurrentTime(): CurrentTime {
  const time = new Date();
  const year = time.getFullYear();
  const month =
    time.getMonth() + 1 < 10 ? `0${time.getMonth() + 1}` : (time.getMonth() + 1).toString();
  const day = time.getDate() < 10 ? `0${time.getDate()}` : time.getDate().toString();
  const hour = time.getHours() < 10 ? `0${time.getHours()}` : time.getHours().toString();
  const minute = time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes().toString();
  const second = time.getSeconds() < 10 ? `0${time.getSeconds()}` : time.getSeconds().toString();
  const weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];

  return {
    year,
    month,
    day,
    hour,
    minute,
    second,
    weekday: weekday[time.getDay()],
  };
}

// 时光胶囊
export function getTimeCapsule(): TimeCapsule {
  const now = dayjs();
  const dayText = {
    day: "今日",
    week: "本周",
    month: "本月",
    year: "本年",
  };

  const getDifference = (unit: "day" | "week" | "month" | "year"): TimeDifference => {
    const start = now.startOf(unit);
    const end = now.endOf(unit);
    const total = end.diff(start, unit === "day" ? "hour" : "day") + 1;
    let passed = now.diff(start, unit === "day" ? "hour" : "day");

    if (unit === "week") {
      passed = (passed + 6) % 7;
    }

    const remaining = total - passed;
    const percentage = ((passed / total) * 100).toFixed(2);

    return {
      name: dayText[unit],
      total,
      passed,
      remaining,
      percentage,
    };
  };

  return {
    day: getDifference("day"),
    week: getDifference("week"),
    month: getDifference("month"),
    year: getDifference("year"),
  };
}

// 欢迎提示
export function helloInit(): void {
  const hour = new Date().getHours();
  let hello: string;

  if (hour < 6) {
    hello = "凌晨好";
  } else if (hour < 9) {
    hello = "早上好";
  } else if (hour < 12) {
    hello = "上午好";
  } else if (hour < 14) {
    hello = "中午好";
  } else if (hour < 17) {
    hello = "下午好";
  } else if (hour < 19) {
    hello = "傍晚好";
  } else if (hour < 22) {
    hello = "晚上好";
  } else {
    hello = "夜深了";
  }

  ElNotification({
    dangerouslyUseHTMLString: true,
    title: "Hi, 旅行者~",
    message: `<strong>${hello}</strong> 欢迎来到我的主页<br>
        <div style="color:rgb(255, 0, 0);">
            主页还在<b>开发中</b>敬请期待...
        </div>`,
    type: "info",
  });
}

// 默哀模式
const anniversaries: Record<string, { name: string; message: string }> = {
  4.4: { name: "清明节", message: "祭奠先烈，铭记历史" },
  5.12: { name: "汶川大地震纪念日", message: "怀念逝者，感恩生者" },
  7.7: { name: "中国人民抗日战争纪念日", message: "勿忘国耻，振兴中华" },
  9.18: { name: "九·一八事变纪念日", message: "铭记历史，警钟长鸣" },
  12.13: {
    name: "南京大屠杀死难者国家公祭日",
    message: "勿忘历史，珍爱和平",
  },
};

export function checkDays(): void {
  const myDate = new Date();
  const mon = myDate.getMonth() + 1;
  const date = myDate.getDate();
  const key = `${mon}.${date}`;

  if (Object.prototype.hasOwnProperty.call(anniversaries, key)) {
    const anniversary = anniversaries[key];

    // 设置页面灰度效果
    const gray = document.createElement("style");
    gray.innerHTML = "body { filter: grayscale(100%); }";
    document.head.appendChild(gray);

    // 弹出通知，标题为寄语，消息为纪念日名称
    ElNotification({
      title: anniversary.message, // 设置标题为寄语
      message: `今天是 ${anniversary.name}`, // 显示纪念日名称
      type: "info",
    });
  }
}

// 建站日期统计
export function siteDateStatistics(startDate: Date): string {
  const currentDate = new Date();
  let years = currentDate.getFullYear() - startDate.getFullYear();
  let months = currentDate.getMonth() - startDate.getMonth();
  let days = currentDate.getDate() - startDate.getDate();

  if (days < 0) {
    months--;
    const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
    days += lastMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return `本站已经苟活了 ${years} 年 ${months} 月 ${days} 天`;
}
