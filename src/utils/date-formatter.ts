import _dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

_dayjs.extend(utc);
_dayjs.extend(timezone);
_dayjs.extend(relativeTime);

export default _dayjs;
