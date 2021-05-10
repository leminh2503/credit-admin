import _ from "lodash"

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

Array.prototype.cloneDeep = function () {
    return _.cloneDeep(this);
};
