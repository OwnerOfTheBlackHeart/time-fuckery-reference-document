class EncSet {
    constructor(str, light, medium, heavy) {
        this.str = str;
        this.light = light;
        this.medium = medium;
        this.heavy = heavy;
    }
    copy(toCopy) {
        const toReturn = new EncSet();
        if (toCopy != undefined) {
            toReturn.str = toCopy.str;
            toReturn.light = toCopy.light;
            toReturn.medium = toCopy.medium;
            toReturn.heavy = toCopy.heavy;
        }
        else {
            toReturn.str = this.str;
            toReturn.light = this.light;
            toReturn.medium = this.medium;
            toReturn.heavy = this.heavy;
        }
        return toReturn;
    }
}
const EncChart = Object.freeze([
    new EncSet(1, 3, 6, 10),
    new EncSet(2, 6, 13, 20),
    new EncSet(3, 10, 20, 30),
    new EncSet(4, 13, 26, 40),
    new EncSet(5, 16, 33, 50),
    new EncSet(6, 20, 40, 60),
    new EncSet(7, 23, 46, 70),
    new EncSet(8, 26, 53, 80),
    new EncSet(9, 30, 60, 90),
    new EncSet(10, 33, 66, 100),
    new EncSet(11, 38, 76, 115),
    new EncSet(12, 43, 86, 130),
    new EncSet(13, 50, 100, 150),
    new EncSet(14, 58, 116, 175),
    new EncSet(15, 66, 133, 200),
    new EncSet(16, 76, 153, 230),
    new EncSet(17, 86, 173, 260),
    new EncSet(18, 100, 200, 300),
    new EncSet(19, 116, 233, 350),
    new EncSet(20, 133, 266, 400),
    new EncSet(21, 153, 306, 460),
    new EncSet(22, 173, 346, 520),
    new EncSet(23, 200, 400, 600),
    new EncSet(24, 233, 466, 700),
    new EncSet(25, 266, 533, 800),
    new EncSet(26, 306, 613, 920),
    new EncSet(27, 346, 693, 1040),
    new EncSet(28, 400, 800, 1200),
    new EncSet(29, 466, 933, 1400),
]);
class Encumbrance {
    get strength() { return this._strength; }
    get multiplier() { return this._multiplier; }
    get light() { return this.set.light * this._multiplier; }
    get medium() { return this.set.medium * this._multiplier; }
    get heavy() { return this.set.heavy * this._multiplier; }
    get lift() { return this.heavy * 2; }
    get drag() { return this.heavy * 5; }
    constructor(strength, multiplier) {
        this.set;
        if (strength == undefined) {
            this._strength = 10;
        }
        else {
            this._strength = strength;
        }
        if (multiplier == undefined) {
            this._multiplier = 1;
        }
        else {
            this._multiplier = multiplier;
        }
        this.Update();
    }
    Update(strength, multiplier) {
        if (strength != undefined) {
            this._strength = strength;
        }
        if (multiplier != undefined) {
            this._multiplier = multiplier;
        }
        if (this.strength <= 29) {
            this.set = EncChart[this.strength - 1].copy();
        }
        else {
            let str = this.strength;
            let setMult = 1;
            while (str > 29) {
                setMult *= 4;
                str -= 10;
            }
            this.set = EncChart[str - 1].copy();
            this.set.light *= setMult;
            this.set.medium *= setMult;
            this.set.heavy *= setMult;
        }
    }
}
;
//# sourceMappingURL=encumbrance.js.map