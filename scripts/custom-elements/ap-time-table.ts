class TimeTable extends HTMLElement 
{
    get showSeason()
    {
        return this.hasAttribute('show-season');
    }

    set showSeason(val)
    {
        if (val) 
        {
            this.setAttribute('show-season', '');
        }
        else
        {
            this.removeAttribute('show-season');
        }
    }

    get showAllMonths()
    {
        return this.hasAttribute('show-all-months');
    }

    set showAllMonths(val)
    {
        if (val) 
        {
            this.setAttribute('show-all-months', '');
        }
        else
        {
            this.removeAttribute('show-all-months');
        }
    }

    constructor()
    {
        // Always call super first in constructor
        super();

        this.rows = [];
        this.table;
        this.mainNode = this;

        if (Utilities.IsGoodString(this.innerHTML))
        {
            this.rows = Utilities.StringToObject(this.innerHTML);
        }
    }

    connectedCallback()
    {
        this.Render();
    }

    Render()
    {
        this.innerHTML = "";

        if (this.rows.length > 0)
        {
            this.table = document.createElement('table');
            this.mainNode.appendChild(this.table);

            for (let row of this.rows)
            {
                switch (row[0])
                {
                    case "header":
                        this.table.appendChild(this.BuildHeaderRow(row));
                        break;
                    default:
                        this.table.appendChild(this.BuildNormalRow(row));
                }
            }
        }
        else if (this.showAllMonths)
        {
            this.table = document.createElement('table');
            this.mainNode.appendChild(this.table);

            this.BuildAllMonths(this.table);
        }
    }

    BuildHeaderRow(row)
    {
        let node = document.createElement("tr");
        let data = Utilities.CreateHeader(row[1]);
        
        node.appendChild(data);
        data.setAttribute("colspan", "2");

        return node;
    }

    BuildNormalRow(row)
    {
        let date = new Time(row[0], row[1], row[2]);
        let node = document.createElement("tr");
        node.appendChild(Utilities.CreateData(date.toString(this.showSeason)));

        if (row[3] != undefined)
        {
            node.appendChild(Utilities.CreateData(row[3]));
        }

        return node;
    }

    BuildAllMonths(table)
    {
        // The header
        let node = document.createElement('tr');
        let data = Utilities.CreateHeader('List of Months');

        table.appendChild(node);
        node.appendChild(data);
        data.setAttribute("colspan", "3");

        node = document.createElement('tr');
        data = Utilities.CreateHeader('#');
        table.appendChild(node);
        node.appendChild(data);

        data = Utilities.CreateHeader('Month Name');
        table.appendChild(node);
        node.appendChild(data);

        data = Utilities.CreateHeader('Season');
        table.appendChild(node);
        node.appendChild(data);

        // The months
        for (let i = 0; i < TimeRef.monthList.length; i++)
        {
            node = document.createElement('tr');
            table.appendChild(node);

            // Month Number
            data = Utilities.CreateData(i+1);
            node.appendChild(data);

            // Month Name
            data = Utilities.CreateData(TimeRef.monthList[i][0]);
            node.appendChild(data);

            // Month Season
            data = Utilities.CreateData(TimeRef.Seasons.SeasonFromValue(TimeRef.monthList[i][1]).name);
            node.appendChild(data);
        }
    }
};

customElements.define('ap-time-table', TimeTable);