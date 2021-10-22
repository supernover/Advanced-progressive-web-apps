if ('serviceWorker' in navigator) {
    // Installs service worker for offline PWA access
    navigator.serviceWorker.register("sw.js");
}

var Calculator = {
    current: 0,
    operation: null,
    previous: null,
    decimal: false,
    history: [],
    equals: function () {
        if (this.previous) {
            document.querySelector("#memory ul").innerHTML += "<li>" + this.current + "</li>"
            switch (this.operation) {
                case '+':
                    this.current = this.previous + this.current;
                    break;
                case '-':
                    this.current = this.previous - this.current;
                    break;
                case '𝗑':
                    this.current = this.previous * this.current;
                    break;
                case '÷':
                    this.current = this.previous / this.current;
                    break;
            }
            // Remove too many possible decimal digits
            this.current = parseInt(this.current*100000)/100000;

            if (!this.isInvalid()) {            
                document.querySelector("#memory ul").innerHTML += "<li class='result'>" + this.current + "</li>"
                // Position the scroll at the bottom of the memory list
                document.querySelector("#memory").scrollTop = 
                    document.querySelector("#memory").scrollHeight;
                this.update();
                this.previous = null;
                this.operation = null;

                localStorage.setItem("memory", document.querySelector("#memory ul").innerHTML);            

            } else {
                // ERROR
                this.processError();
            }
    
        }
    },
    clear: function () {
        this.current = 0;
        this.operation = null;
        this.previous = null;
        this.update();
        document.title = "Calculator";
        

    },
    parseNumber: function (number) {
        if (this.current.toString().length >= 10) return; // Maximum digits
        if (this.decimal) {
            this.current = parseFloat(this.current.toString() + "." + number.toString());
            this.decimal = false;
        } else {
            this.current = parseFloat(this.current.toString() + number.toString());
        }
        this.update();
    },
    parseOperation: function (operation) {        
        this.operation = operation;
        this.previous = this.current;
        this.history.push({
            number: this.current,
            operation: operation
        });
        document.querySelector("#memory ul").innerHTML += "<li>" + 
            this.current + "<strong>" + operation + "</strong></li>"
                
        this.current = 0;
    },
    parseDecimal: function () {
        if (parseInt(this.current) == parseFloat(this.current)) {
            this.decimal = true;
        }
        this.update();
    },
    isInvalid: function() {
        return isNaN(this.current) || this.current==Infinity;
    },
    update: function () {
        if (this.isInvalid()) {
            this.processError();
        } else {
            document.querySelector("#display output").innerHTML = this.current +
            (this.decimal ? "." : "");
        }
    },
    processError: function() {
        document.querySelector("#display output").innerHTML = "ERROR";
        this.operation = null;
        this.current = null;
    },
    clearMemory: function() {
        document.querySelector("#memory ul").innerHTML = "";
        localStorage.removeItem("memory");

    }

}

document.addEventListener("DOMContentLoaded", function () {
    // Buttons event handlers
    var buttons = document.querySelectorAll("#buttons button");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function (event) {
            var action = event.target.innerText;
            switch (action) {
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                    Calculator.parseNumber(action);
                    break;
                case '÷':
                case '𝗑':
                case '+':
                case '-':
                    Calculator.parseOperation(action);
                    break;
                case '.':
                    Calculator.parseDecimal();
                    break;
                case 'C':
                    Calculator.clear();
                    break;
                case '=':
                    Calculator.equals();
                    break;
            }
        });
    }

    // Recovers memory from localStorage
    if (localStorage.getItem("memory")!=null) {
        document.querySelector("#memory ul").innerHTML = 
            localStorage.getItem("memory"); 
        // Position the scroll at the bottom of the memory list
        document.querySelector("#memory").scrollTop = 
            document.querySelector("#memory").scrollHeight;

    }
    Calculator.update();
});

