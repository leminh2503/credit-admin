declare global {
    interface Number {
        getMoneyFormat(fractional: number, separator: number): string;
    }
}

Number.prototype.getMoneyFormat = function (fractional, separator) {
    let re = '\\d(?=(\\d{' + (separator || 3) + '})+' + (fractional > 0 ? '\\.' : '$') + ')';
    return (this.toFixed(Math.max(0, ~~fractional)).replace(new RegExp(re, 'g'), '$&.'));
};

export {}