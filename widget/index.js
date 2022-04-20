class FlagWidget {
    container;
    countryCodesMap = {};
    countryCodes = [];

    image;
    title;

    constructor(container) {
        this.container = container;
        container.classList.add("widget");
    }

    init() {
        const insertWidget = () => {
            this.appendFlag();
            this.appendUpdateButton();
        }
        
        this.fetchCodeCountries(insertWidget);
    }

    async fetchCodeCountries(insertWidget) {
        try {
            const res = await fetch("https://flagcdn.com/en/codes.json");
            const data = await res.text();
            
            this.countryCodesMap = JSON.parse(data);
            this.countryCodes = Object.keys(this.countryCodesMap);

            insertWidget();
        } catch(error) {
            console.log(error);
        }
    }

    appendFlag() {
        this.image = document.createElement("img");
        this.image.alt = "Flag image";
        this.image.height = 240;

        this.title = document.createElement("p");
        this.title.classList.add("widget-title");

        this.container.appendChild(this.image);
        this.container.appendChild(this.title);

        this.setFlag();
    }

    setFlag() {
        const { countryCode, countryName } = this.getRandomCountry();

        this.image.src = `https://flagcdn.com/h240/${countryCode}.png`;
        this.title.innerText = countryName;
    }
    
    appendUpdateButton() {
        const button = document.createElement('button');
        button.innerText = "Update";
        button.classList.add("widget-update-button");
        button.onclick = () => this.setFlag();

        this.container.appendChild(button);
    }

    getRandomCountry() {
        // [0, 1)
        // [0, countryCodes.length]
        const number = Math.floor(Math.random() * this.countryCodes.length);
        const countryCode = this.countryCodes[number];
        const countryName = this.countryCodesMap[countryCode];

        return { countryCode, countryName };
    }
}