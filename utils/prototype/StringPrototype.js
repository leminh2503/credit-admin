String.prototype.upperFirstCharacter = function () {
    return (this.charAt(0).toUpperCase() + this.slice(1))
};

String.prototype.shortName = function (maxLength = 15) {
    let tmp = this;
    if(tmp.length > maxLength) {
        return tmp.substring(0, maxLength) + "...";
    }
    return tmp.toString();
};
