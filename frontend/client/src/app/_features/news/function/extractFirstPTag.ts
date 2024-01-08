export function extractFirstPTag(text: string): string {
    const endMark = '。';
    const endIndex = text.indexOf(endMark, 0);

    if (endIndex !== -1) {
        let content = text.substring(0, endIndex + 1);
        const regexP = /^<p>/i;
        if (regexP.test(content)) {
            const regexBr = /<br\s*\/?>/gi;
            content = content.replace(regexBr, ''); // <br>タグを削除する
            return content;
        }
        return '';
    } else {
        return '';
    }
}

