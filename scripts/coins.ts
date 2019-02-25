const singleCoinWeight = 0.02;

class Coin
{
	pp: number;
	gp: number;
	sp: number;
	cp: number;

    get weight()
    {
        return (this.pp + this.gp + this.sp + this.cp) * singleCoinWeight;
    }

    static NewCoin()
    {
        return new Coin([0,0,0,0]);
    }

    constructor(coins: number[])
    {
        this.pp = coins[0];
        this.gp = coins[1];
        this.sp = coins[2];
        this.cp = coins[3];
    }

    toString()
    {
        let toReturn = "";

        if (this.pp > 0) { toReturn += this.pp + "pp, "; }
        if (this.gp > 0) { toReturn += this.gp + "gp, "; }
        if (this.sp > 0) { toReturn += this.sp + "sp, "; }
        if (this.cp > 0) { toReturn += this.cp + "cp, "; }

        return toReturn.trim().slice(0, -1);
    }

    Condense()
    {
        let toReturn = this.Copy();
        let nextUp = 0;
        
        nextUp = Math.floor(toReturn.cp / 10);
        if (nextUp >= 0)
        {
            toReturn.cp -= nextUp * 10;
            toReturn.sp += nextUp;
        }

        nextUp = Math.floor(toReturn.sp / 10);
        if (nextUp >= 0)
        {
            toReturn.sp -= nextUp * 10;
            toReturn.gp += nextUp;
        }

        if (toReturn.pp > 0)
        {
            toReturn.gp += toReturn.pp * 10;
            toReturn.pp = 0;
        }

        return toReturn;
    }

    CondenseToPlat()
    {
        let toReturn = this.Condense();
        let nextUp = 0;
        
        nextUp = Math.floor(toReturn.gp / 10);
        if (nextUp >= 0)
        {
            toReturn.gp -= nextUp * 10;
            toReturn.pp += nextUp;
        }

        return toReturn;
    }

    Copy()
    {
        let toReturn = Coin.NewCoin();

        toReturn.pp = this.pp;
        toReturn.gp = this.gp;
        toReturn.sp = this.sp;
        toReturn.cp = this.cp;

        return toReturn;
    }

    Multiply(multBy)
    {
        let toReturn = Coin.NewCoin();
        
        toReturn.pp = this.pp * multBy;
        toReturn.gp = this.gp * multBy;
        toReturn.sp = this.sp * multBy;
        toReturn.cp = this.cp * multBy;

        return toReturn;
    }

    Divide(divideBy)
    {
        let toReturn = Coin.NewCoin();
        
        toReturn.pp = this.pp / divideBy;
        toReturn.gp = this.gp / divideBy;
        toReturn.sp = this.sp / divideBy;
        toReturn.cp = this.cp / divideBy;

        return toReturn;
    }

    Add(otherCoin)
    {
        let toReturn = Coin.NewCoin();

        toReturn.pp = this.pp + otherCoin.pp;
        toReturn.gp = this.gp + otherCoin.gp;
        toReturn.sp = this.sp + otherCoin.sp;
        toReturn.cp = this.cp + otherCoin.cp;

        return toReturn;
    }

    Subtract(otherCoin)
    {
        let toReturn = Coin.NewCoin();

        toReturn.pp = this.pp - otherCoin.pp;
        toReturn.gp = this.gp - otherCoin.gp;
        toReturn.sp = this.sp - otherCoin.sp;
        toReturn.cp = this.cp - otherCoin.cp;

        return toReturn;
    }
}