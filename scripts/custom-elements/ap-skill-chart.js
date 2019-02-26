class SkillChart extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.skills = Utilities.StringToObject(this.innerHTML);
        this.innerHTML = "";
        this.Render();
    }
    Render() {
        let baseNode = this;
        let table = document.createElement('table');
        baseNode.appendChild(table);
        this.BuildHeaders(table);
        if (this.skills.length > 0) {
            this.skills.forEach(element => {
                this.BuildRow(table, element);
            });
        }
    }
    BuildHeaders(node) {
        let tableRow = document.createElement('tr');
        node.appendChild(tableRow);
        tableRow.appendChild(Utilities.CreateHeader("Skill"));
        tableRow.appendChild(Utilities.CreateHeader("Ranks"));
        tableRow.appendChild(Utilities.CreateHeader("Bonus"));
        return node;
    }
    BuildRow(node, row) {
        let tableRow = document.createElement('tr');
        node.appendChild(tableRow);
        tableRow.appendChild(Utilities.CreateData(row[0]));
        tableRow.appendChild(Utilities.CreateData(row[1]));
        tableRow.appendChild(Utilities.CreateData(row[2]));
        return node;
    }
}
;
customElements.define('ap-skill-chart', SkillChart);
//# sourceMappingURL=ap-skill-chart.js.map