// データを取得する関数
export const toPassedHours = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMilliseconds = Math.abs(now.getTime() - date.getTime());
    const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
  
    if (diffInHours < 24) {
      if (diffInHours > 0) {
        return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
      }
      if (diffInMinutes > 0) {
        return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
      }
      return `${diffInSeconds} second${diffInSeconds > 1 ? 's' : ''} ago`;
    } else {
      // 1日以上経過した場合は日付を返す
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      return formatDate(date)
    }
  }

  function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}/${month}/${day}`;
  }