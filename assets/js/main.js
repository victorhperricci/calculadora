const displayCalc = document.querySelector("input");

const Controls = {
  existPoint: false,
  isStart: true,
};

const Display = {
  getValueFromClick(value) {
    this.writeValues(value);
  },

  getValueFromKeyUp(event) {
    Format.formatValues(event.key);
  },

  writeValues(value) {
    Format.formatValues(value);
  },

  clearAll() {
    Controls.existPoint = false;
    displayCalc.value = "";
  },

  animationOnClick({ target }) {
    document
      .querySelectorAll(".digit-number")
      .forEach((item) => item.classList.remove("click"));
    target.classList.add("click");
  },
};

const Calcs = {
  resultAccount() {
    const account = displayCalc.value.trim();
    const condition =
      account.match(/^[+*/]/g) !== null || account.match(/[-+*./]$/g) !== null;
    const existSignal = account.match(/[-+/*]/g);
    const elementR = document.querySelector('[data-account="result"]');

    this.verifyClick(condition, account, existSignal, elementR);
  },

  verifyClick(condition, account, existSignal, target) {
    if (condition || displayCalc.value == "") {
      displayCalc.value = displayCalc.value;
    } else {
      const conta = String(eval(account));
      const condition = conta.indexOf(".") === -1;

      if (existSignal !== null) {
        target.classList.add("result");
        condition
          ? (displayCalc.value = eval(account))
          : (displayCalc.value = eval(account).toFixed(1));
      }
    }
  },
};

const Format = {
  elementResult: document.querySelector('[data-account="result"]'),
  formatValues(key) {
    switch (key) {
      case "+":
        this.formatSignal(key, this.elementResult);
        break;
      case "-":
        this.formatSignal(key, this.elementResult);
        break;
      case "/":
        this.formatSignal(key, this.elementResult);
        break;
      case "*":
        this.formatSignal(key, this.elementResult);
        break;
      case ".":
        Format.formatPoint(key, this.elementResult);
        break;
      case "Enter":
        Calcs.resultAccount();
        break;
      case "Backspace":
        Display.clearAll();
        break;
      default:
        this.formatDefault(key);
        break;
    }
  },

  formatSignal(signal) {
    Controls.existPoint = false;
    const value = displayCalc.value.trim().slice(-1);
    this.elementResult.classList.remove("result");

    if (value == "+" || value == "-" || value == "/" || value == "*") {
      displayCalc.value = `${displayCalc.value.slice(0, -3)} ${signal} `;
    } else {
      displayCalc.value += ` ${signal} `;
    }
  },

  formatPoint(key) {
    if (!Controls.existPoint) {
      if (this.elementResult.classList.contains("result")) {
        displayCalc.value = key;
        this.elementResult.classList.remove("result");
      } else {
        displayCalc.value += key;
      }
      Controls.existPoint = true;
    }
  },

  formatDefault(key) {
    if (this.elementResult.classList.contains("result")) {
      if (key.match(/\d/g)) displayCalc.value = key;
      this.elementResult.classList.remove("result");
    } else {
      if (key.match(/\d/g)) displayCalc.value += key;
    }
  },
};

const Menu = {
  themas: document.querySelector(".themas"),
  rows: document.querySelectorAll("[data-hamb]"),
  start() {
    this.themas.classList.toggle("ativo");
    this.rows.forEach((row) => row.classList.toggle("ativo"));
  },
  chooseThema({ target }) {
    const thema = target.dataset.thema;
    Themas.pickUpThema(thema);
    StorageLocal.set(thema);
  },
};

const Themas = {
  styleELement: document.createElement("style"),

  pickUpThema(thema) {
    switch (thema) {
      case "thema1":
        Themas.setThema(
          "linear-gradient(to right, #de8536, #cd5d49, #be3a59)",
          "rgb(208, 109, 130)",
          "rgb(103, 55, 63)",
          "#fff",
          thema
        );
        break;
      case "thema2":
        Themas.setThema(
          "linear-gradient(to right, #7ed6df, #4834d4, #130f40)",
          "#22a6b3",
          "#130f40",
          "#fff",
          thema
        );
        break;
      case "thema3":
        Themas.setThema(
          "linear-gradient(to right, #b8e994, #78e08f, #079992)",
          "#000",
          "#32ff7e",
          "#fff",
          thema
        );
        break;
    }
  },

  setThema(
    linearGradient,
    colorCalc,
    colorHoverAndConta,
    colorFontAndBorder,
    thema
  ) {
    const head = document.querySelector("head");

    this.styleELement.innerHTML = "";

    let text;

    if (thema == "thema3") {
      text = `
            body {
                background: ${linearGradient} !important;
            }

            [data-hamb] {
                background-color: ${colorHoverAndConta};
            }

            .calculadora {
                background-color: ${colorCalc} ;
            }

            div.conta {
                background-color: ${colorHoverAndConta} !important;
                color: ${colorFontAndBorder} !important;
            }
            
            .row .digit-number {
                color: ${colorFontAndBorder};
                border: 1px solid ${colorFontAndBorder};
            }

            .display {
                border: 1px solid #fff;
            }

            .digit-number:hover {
                background-color: ${colorHoverAndConta};
                border: none;
            }

            .themas {  
                background-color: ${colorCalc};
              }

            ul li {
                background-color: ${colorHoverAndConta};
            }

            `;
    } else {
      text = `
                body {
                    background: ${linearGradient} !important;
                }
    
                [data-hamb] {
                    background-color: ${colorHoverAndConta};
                }
    
                .calculadora {
                    background-color: ${colorCalc} ;
                }
    
                div.conta {
                    background-color: ${colorHoverAndConta} !important;
                    color: ${colorFontAndBorder} !important;
                }
                
                .row .digit-number {
                    color: ${colorFontAndBorder};
                    border: 1px solid ${colorFontAndBorder};
                }
                
                .digit-number:hover {
                    background-color: ${colorHoverAndConta};
                    border: none;
                }

                .themas {  
                    background-color: ${colorCalc};
                  }
    
                ul li {
                    background-color: ${colorHoverAndConta};
                }
                `;
    }

    this.styleELement.append(text);
    head.append(this.styleELement);
  },
};

const StorageLocal = {
  set(thema) {
    localStorage.setItem("thema", thema);
  },

  get() {
    const thema = localStorage.getItem("thema");
    Themas.pickUpThema(thema);
  },
};

const App = {
  init() {
    StorageLocal.get();

    document.addEventListener("keyup", Display.getValueFromKeyUp);

    document
      .querySelectorAll(".theme")
      .forEach((thema) => thema.addEventListener("click", Menu.chooseThema));

    document
      .querySelectorAll(".digit-number")
      .forEach((item) =>
        item.addEventListener("click", Display.animationOnClick)
      );
  },
};

App.init();
