class Time 
{
    constructor(day, month, year)
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
        let month = TimeRef.monthList[tempTime.month];

        toReturn += (tempTime.day + 1) + " ";
        toReturn += month[0] + ", ";
        toReturn += tempTime.year;

        if (doesIncludeSeason)
        {
            toReturn += ": " + TimeRef.Seasons.SeasonFromValue(month[1]).name;
        }

        return toReturn;
    }

    Add(time2)
    {
        return Time.Add(this, time2);
    }

    Subtract(time2)
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

    static Add(time1, time2)
    {
        let toReturn = new Time();
        toReturn.day = time1.ToDays() + time2.ToDays();

        toReturn = toReturn.DistributeDays();

        return toReturn;
    }

    static Subtract(time1, time2)
    {
        let toReturn = new Time();
        toReturn.day = time1.ToDays() - time2.ToDays();

        toReturn = toReturn.DistributeDays();        

        return toReturn;
    }

    static ToDays(time)
    {
        let tempTime = Time.CleanTime(time);
        let toReturn = tempTime.day;

        toReturn += Time.YearsToDays(tempTime.year);
        toReturn += Time.MonthsToDays(tempTime.month);

        return toReturn;
    }

    static WeeksToDays(weeks)
    {
        return weeks * TimeRef.daysPerWeek;
    }

    static MonthsToDays(months)
    {
        return Time.WeeksToDays(months * TimeRef.weeksPerMonth);
    }

    static YearsToMonths(years)
    {
        return years * TimeRef.monthsPerYear;
    }

    static YearsToDays(years)
    {
        return Time.MonthsToDays(Time.YearsToMonths(years));
    }

    static CleanTime(time)
    {
        let toReturn = new Time();

        toReturn.day = Math.max(time.day, 0);
        toReturn.month = Math.max(time.month, 0);
        toReturn.year = Math.max(time.year, 0);

        return toReturn;
    }
}

const TimeRef = Object.freeze({
    daysPerWeek: 7,
    weeksPerMonth: 4,
    monthsPerYear: 9,
    Seasons: {
        Summer: {name: "summer", value: 1},
        Spring: {name: "spring", value: 2},
        Fall: {name: "fall", value: 3},
        Winter: {name: "winter", value: 4},

        SeasonFromValue: function(value)
        {
            switch(value)
            {
                case 1:
                return TimeRef.Seasons.Summer;

                case 2:
                return TimeRef.Seasons.Spring;

                case 3:
                return TimeRef.Seasons.Fall;

                case 4:
                return TimeRef.Seasons.Winter;
            }
        }
    },

    // [month name, season]
    monthList: [
        ["Kyrious", 4], // Winter
        ["Sith", 4], // Winter
        ["Fephun", 2], // Spring
        ["Orthia", 2], // Spring
        ["Kriotzous", 2], // Spring
        ["Durnio", 1], // Summer
        ["Zolter", 1], // Summer
        ["Hrefia", 3], // Fall
        ["Lagosa", 3] // Fall
    ]
});