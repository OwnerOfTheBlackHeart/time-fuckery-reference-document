class Inventory
{
    constructor(inv)
    {
        this.strength = inv.strength;
        this.multiplier = inv.multiplier;
        this.carryWeight = inv.carryWeight;
        this.contents = inv.contents;
        this.name = inv.name;

        this.coins = Coin.NewCoin();
        this.value = Coin.NewCoin();
        this.weight = 0;
        this.enc = undefined;

        this.ComputeInventory();
    }

    ComputeInventory()
    {
        this.weight = 0;

        // We have strength, so we have an encumbrance object
        if (this.strength != undefined)
        {
            this.enc = new Encumbrance(this.strength, this.multiplier);
        }

        // Check for coins on first row
        if(!Array.isArray(this.contents[0][2]))
        {
            this.coins = this.coins.Add(new Coin(this.contents[0]));
            this.contents.shift();
        }

        // Add the weight and value of the coins
        this.value = this.coins.Copy();
        this.weight += this.coins.weight;

        // Calculate weight and value
        let item;
        this.contents.forEach((data) =>
        {
            item = new EncItem(data);

            this.weight += item.weight * item.count;
            this.value = this.value.Add(item.value.Multiply(item.count));
        });
    }

    BuildTable(mainNode)
    {
        this.BuildTitle(mainNode);

        // Gold Table
        this.BuildGoldTable(mainNode, this.coins);

        // Encumbrance Table
        if (this.enc != undefined) { this.BuildEncTable(mainNode, this.strength, this.enc); }
        else if (this.carryWeight != undefined)
        {
            this.BuildCarryWeightTable(mainNode, this.carryWeight);
        }

        // Item Table
        this.BuildItemTable(mainNode, this.contents);

        return mainNode;
    }

    BuildTitle(node)
    {
        let title = document.createElement('h4');
        title.innerHTML = this.name;
        node.appendChild(title);
    }

    BuildItemRow(item)
    {
        let node = document.createElement('tr');

        node.appendChild(Utilities.CreateData(item.name));
        node.appendChild(Utilities.CreateData(item.count, "count-column"));
        node.appendChild(Utilities.CreateData(item.value.toString()));
        node.appendChild(Utilities.CreateData("" + item.weight + " lbs"));
        node.appendChild(Utilities.CreateData(item.value.Multiply(item.count).Condense().toString()));
        node.appendChild(Utilities.CreateData("" + (item.weight * item.count) + " lbs"));
        
        return node;
    }

    BuildItemTable(node, contents)
    {
        if (contents.length > 0)
        {
            let itemTable = document.createElement('table');
            itemTable.className = "item-table";
            let row = document.createElement('tr');
            let totalsRow = document.createElement('tr');
            itemTable.appendChild(totalsRow);
 
            // Table Start
            row.appendChild(Utilities.CreateHeader('Item'));
            row.appendChild(Utilities.CreateHeader('Count'));
            row.appendChild(Utilities.CreateHeader('Value'));
            row.appendChild(Utilities.CreateHeader('Weight'));
            row.appendChild(Utilities.CreateHeader('Row Value'));
            row.appendChild(Utilities.CreateHeader('Row Weight'));
            itemTable.appendChild(row);
            
            let item;
            contents.forEach((data) =>
            {
                item = new EncItem(data);
                itemTable.appendChild(this.BuildItemRow(item));
            });

            // Build totals row
            this.BuildTotalsRow(this.value, this.weight, totalsRow);

            node.appendChild(itemTable);
        }

        return node;
    }

    BuildGoldTable(node, coins)
    {
        if (coins != undefined)
        {
            let table = document.createElement('table');
            table.className = "gold-table";

            let subNode = document.createElement('tr');

            subNode.appendChild(Utilities.CreateHeader('PP'));
            subNode.appendChild(Utilities.CreateHeader('GP'));
            subNode.appendChild(Utilities.CreateHeader('SP'));
            subNode.appendChild(Utilities.CreateHeader('CP'));
            subNode.appendChild(Utilities.CreateHeader('Value'));
            subNode.appendChild(Utilities.CreateHeader('Weight'));
            table.appendChild(subNode);
            
            subNode = document.createElement('tr');
            subNode.appendChild(Utilities.CreateData(coins.pp, "coins-cell"));
            subNode.appendChild(Utilities.CreateData(coins.gp, "coins-cell"));
            subNode.appendChild(Utilities.CreateData(coins.sp, "coins-cell"));
            subNode.appendChild(Utilities.CreateData(coins.cp, "coins-cell"));

            subNode.appendChild(Utilities.CreateData(coins.Condense().toString()));
            subNode.appendChild(Utilities.CreateData(coins.weight + " lbs"));
            table.appendChild(subNode);
            node.appendChild(table);
        }

        return node;
    }

    BuildEncTable(node, strength, enc)
    {
        let encTable = document.createElement('table');
        encTable.className = "encumbrance-table";

        let row = document.createElement('tr');
        encTable.appendChild(row);
        
        row.appendChild(Utilities.CreateHeader('Strength'));
        row.appendChild(Utilities.CreateHeader('Light Load'));
        row.appendChild(Utilities.CreateHeader('Medium Load'));
        row.appendChild(Utilities.CreateHeader('Heavy Load'));
        row.appendChild(Utilities.CreateHeader('Lift Load'));
        row.appendChild(Utilities.CreateHeader('Drag Load'));

        row = document.createElement('tr');
        encTable.appendChild(row);

        row.appendChild(Utilities.CreateData(strength));
        row.appendChild(Utilities.CreateData(enc.light + " lbs"));
        row.appendChild(Utilities.CreateData(enc.medium + " lbs"));
        row.appendChild(Utilities.CreateData(enc.heavy + " lbs"));
        row.appendChild(Utilities.CreateData(enc.lift + " lbs"));
        row.appendChild(Utilities.CreateData(enc.drag + " lbs"));

        node.appendChild(encTable);
        return node;
    }

    BuildCarryWeightTable(node, carryWeight)
    {
        let cwTable = document.createElement('table');

        let row = document.createElement('tr');
        cwTable.appendChild(row);

        row.appendChild(Utilities.CreateHeader('Carry Weight'));
        row.appendChild(Utilities.CreateData(carryWeight + " lbs"));

        node.appendChild(cwTable);
        return node;
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