import _ from "lodash"

declare global {
    interface Array<T> {
        indexOfObject(obj: any, key: string | null): number;

        deepClone(): Array<T>;
    }
}

Array.prototype.indexOfObject = function (obj, key) {
    for (const [index, item] of this.entries()) {
        if (key) {
            if (item[key] === obj[key]) {
                return index
            }
        } else {
            if (_.isEqual(item, obj)) {
                return index
            }
        }
    }
    return -1;
};

Array.prototype.deepClone = function () {
    return _.cloneDeep(this);
};

export {}