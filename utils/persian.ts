
export const toPersianDigits = (n: number | string): string => {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return n
        .toString()
        .replace(/\d/g, (x) => farsiDigits[parseInt(x)]);
};

export const formatStatValue = (value: number): string => {
    const sign = value > 0 ? '+' : '';
    // For negative numbers, we want the sign to appear correctly.
    // In RTL, -5 might render as 5-.
    // We can use LTR embedding or just rely on the font/browser.
    // A common trick is to format it as string.
    return toPersianDigits(`${sign}${value}`);
};
