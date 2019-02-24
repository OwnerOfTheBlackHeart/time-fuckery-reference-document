class BasicTable extends HTMLElement 
{
    get characterTable()
    {
        return this.hasAttribute('character-table');
    }

    set characterTable(val)
    {
        if (val) 
        {
            this.setAttribute('character-table', '');
        }
        else
        {
            this.removeAttribute('character-table');
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

            if (this.characterTable)
            {
                this.table.setAttribute('class', 'statBlock');
                this.table.setAttribute('cellspacing', '0');
            }

            for (let row of this.rows)
            {
                switch (row[0])
                {
                    default:
                        this.table.appendChild(this.BuildNormalRow(row));
                }
            }
        }
    }

    BuildNormalRow(row)
    {
        let node = document.createElement('tr');

        this.CleanRow(row);
        node.appendChild(Utilities.CreateHeader(row[0]));
        node.appendChild(Utilities.CreateData(row[1]));

        return node;
    }

    CleanRow(row)
    {
        for (let i = 2; i < row.length; i++)
        {
            row[1] = row[1].concat(' ', row[i]);
        }
    }
}

customElements.define('ap-basic-table', BasicTable);