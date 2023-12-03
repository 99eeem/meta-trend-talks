export const formatDateTime =function (dateTimeString: string): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    };
  
    const formattedDateTime = new Date(dateTimeString).toLocaleString('ja-JP', options);
    return formattedDateTime.replace(/\//g, '-').replace(',', ''); // スラッシュをハイフンに変換し、カンマを削除
  }
  