class EncItem
{
    constructor(data)
    {
        this.name = data[0];
        this.count = data[1];
        this.value = new Coin(data[2]);
        this.weight = data[3];
    }
}

class EncumbranceChart extends HTMLElement 
{
    get strength()
    {
        return this.getAttribute('strength');
    }

    set strength(val)
    {
        this.setAttribute('strength', val);
    }

    get multiplier()
    {
        return this.getAttribute('multiplier');
    }

    set multiplier(val)
    {
        this.setAttribute('multiplier', val);
    }

    constructor() 
    {
        // Always call super first in constructor
        super();

        if (!this.hasAttribute('strength'))
        {
            this.strength = 10;
        }

        if (!this.hasAttribute('multiplier'))
        {
            this.multiplier = 1;
        }

        this.enc = new Encumbrance(this.strength, this.multiplier);
        this.inventory = [];
        this.mainNode;
        this.freeGold;

        if ((this.innerHTML != undefined) && (this.innerHTML != ""))
        {
            this.inventory = Utilities.StringToObject(this.innerHTML);
        }
        else
        {
            this.inventory = [];
        }

        this.innerHTML = "";
    }

    connectedCallback()
    {
        this.Render();        
    }

    Render()
    {
        this.mainNode = this;
        let inventories = [];
        let items = [];
        let totalWeight = 0;
        let totalValue = Coin.NewCoin();
        let totalCoins = Coin.NewCoin();

        let totalsTable = document.createElement('table');
        this.mainNode.appendChild(totalsTable);

        // Pull out inventories and items
        for (let row of this.inventory)
        {
            if (Array.isArray(row)) { items.push(row); }
            else 
            {
                inventories.push(new Inventory(row)); 
            }
        }

        // Make an inventory out of items
        if (items.length > 0)
        {
            inventories.unshift(new Inventory({
                name: "Main Inventory",
                strength: this.strength,
                multiplier: this.multiplier,
                contents: items
            }));
        }

        // Build Inventories
        for (let inv of inventories)
        {
            inv.BuildTable(this.mainNode);
            totalWeight += inv.weight;
            totalValue = totalValue.Add(inv.value);
            totalCoins = totalCoins.Add(inv.coins);
        }

        this.BuildTotalsTable(totalsTable, totalValue, totalWeight, totalCoins);
    }

    BuildTotalsTable(table, totalValue, totalWeight, totalCoins)
    {
        let row = document.createElement('tr');
        table.appendChild(row);

        row.appendChild(Utilities.CreateHeader('Total Value'));
        row.appendChild(Utilities.CreateData(totalValue.Condense().toString()));
        
        row.appendChild(Utilities.CreateHeader('Total Weight'));
        row.appendChild(Utilities.CreateData("" + totalWeight + " lbs"));

        row = document.createElement('tr');
        table.appendChild(row);

        let data = Utilities.CreateHeader('Total Coins');
        data.setAttribute('colspan', '2');
        row.appendChild(data);

        data = Utilities.CreateData(totalCoins.toString());
        data.setAttribute('colspan', '2');
        row.appendChild(data);
    }

    BuildTotalsRow(totalValue, totalWeight, row)
    {
        let node;
        let data;

        if (row != undefined) { node = row; }
        else { node = document.createElement('tr'); }

        node.appendChild(Utilities.CreateHeader('Total Value'));
        data = Utilities.CreateData(totalValue.Condense().toString());
        data.setAttribute('colspan', '2');
        node.appendChild(data);

        node.appendChild(Utilities.CreateHeader('Total Weight'));
        data = Utilities.CreateData("" + totalWeight + " lbs");
        data.setAttribute('colspan', '2');
        node.appendChild(data);

        return node;
    }
}

customElements.define('ap-enc-chart', EncumbranceChart);