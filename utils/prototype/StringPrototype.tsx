declare global {
    interface String {
        upperFirstCharacter(): string;

        shortName(maxLength?: number): string
    }
}

String.prototype.upperFirstCharacter = function (): string {
    return (this.charAt(0).toUpperCase() + this.slice(1))
};

String.prototype.shortName = function (maxLength = 15): string {
    let tmp = this;
    if (tmp.length > maxLength) {
        return tmp.substring(0, maxLength) + "...";
    }
    return tmp.toString();
};

export {}
