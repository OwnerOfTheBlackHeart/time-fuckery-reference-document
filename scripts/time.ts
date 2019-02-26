class Time 
{
    day: number;
    month: number;
    year: number;

    constructor(day?: number, month?: number, year?: number)
    {
        if (day != undefined) { this.day = day; }
        else { this.day = 0; }

        if (month != undefined) { this.month = month; }
        else { this.month = 0; }

        if (year != undefined) { this.year = year; }
        else { this.year = 0; }
    }

    toString(doesIncludeSeason = false)
    {
        let toReturn = "";
        let tempTime = this.DistributeDays();
        let month = TimeRef.months[tempTime.month];

        toReturn += (tempTime.day + 1) + " ";
        toReturn += month.name + ", ";
        toReturn += tempTime.year;

        if (doesIncludeSeason)
        {
            toReturn += ": " + month.season;
        }

        return toReturn;
    }

    Add(time2: Time)
    {
        return Time.Add(this, time2);
    }

    Subtract(time2: Time)
    {
        return Time.Subtract(this, time2);
    }

    ToDays()
    {
        return Time.ToDays(this);
    }

    DistributeDays()
    {
        let tempTime = new Time();
        let days = this.ToDays();
        let multiplier = 0;

        // Years
        multiplier = Time.YearsToDays(1);
        tempTime.year = Math.floor(days / multiplier);
        days -= multiplier * tempTime.year;

        // Months
        multiplier = Time.MonthsToDays(1);
        tempTime.month = Math.floor(days / multiplier);
        days -= multiplier * tempTime.month;
        tempTime.day = days;

        return tempTime;
    }

    static Add(time1: Time, time2: Time)
    {
        let toReturn = new Time();
        toReturn.day = time1.ToDays() + time2.ToDays();

        toReturn = toReturn.DistributeDays();

        return toReturn;
    }

    static Subtract(time1: Time, time2: Time)
    {
        let toReturn = new Time();
        toReturn.day = time1.ToDays() - time2.ToDays();

        toReturn = toReturn.DistributeDays();        

        return toReturn;
    }

    static ToDays(time: Time)
    {
        let tempTime = Time.CleanTime(time);
        let toReturn = tempTime.day;

        toReturn += Time.YearsToDays(tempTime.year);
        toReturn += Time.MonthsToDays(tempTime.month);

        return toReturn;
    }

    static WeeksToDays(weeks: number)
    {
        return weeks * TimeRef.daysPerWeek;
    }

    static MonthsToDays(months: number)
    {
        return Time.WeeksToDays(months * TimeRef.weeksPerMonth);
    }

    static YearsToMonths(years: number)
    {
        return years * TimeRef.monthsPerYear;
    }

    static YearsToDays(years: number)
    {
        return Time.MonthsToDays(Time.YearsToMonths(years));
    }

    static CleanTime(time: Time)
    {
        let toReturn = new Time();

        toReturn.day = Math.max(time.day, 0);
        toReturn.month = Math.max(time.month, 0);
        toReturn.year = Math.max(time.year, 0);

        return toReturn;
    }
}

enum Season
{
    Summer = "summer",
    Spring = "spring",
    Fall = "fall",
    Winter = "winter"
}

class Month
{
    name: string;
    position: number;
    season: Season;

    constructor(name: string, position: number, season: Season)
    {
        this.name = name;
        this.position = position;
        this.season = season;
    }

    static readonly Kyrious = new Month('Kyrious', 0, Season.Winter);
    static readonly Sith = new Month('Sith', 1, Season.Winter);
    static readonly Fephun = new Month('Fephun', 2, Season.Spring);
    static readonly Orthia = new Month('Orthia', 3, Season.Spring);
    static readonly Kriotzous = new Month('Kriotzous', 4, Season.Spring);
    static readonly Durnio = new Month('Durnio', 5, Season.Summer);
    static readonly Zolter = new Month('Zolter', 6, Season.Summer);
    static readonly Hrefia = new Month('Hrefia', 7, Season.Fall);
    static readonly Lagosa = new Month('Lagosa', 8, Season.Fall);
}

class TimeRef 
{
    static readonly daysPerWeek = 7;
    static readonly weeksPerMonth = 4;
    static readonly monthsPerYear = 9;

    static readonly months = [
        Month.Kyrious, Month.Sith, Month.Fephun,
        Month.Orthia, Month.Kriotzous, Month.Durnio,
        Month.Zolter, Month.Hrefia, Month.Lagosa
    ]; 
}