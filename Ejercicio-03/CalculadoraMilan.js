class CalculadoraMilan{
    constructor(){
        this.pantalla = "";
        this.calculos ="";
        this.ultimoNumero = undefined;
        this.numero = "";
        this.op = ""
        this.memoria = new Number('0');
        this.memoriaClicks = 0;
        this.repetir = false;
        this.specialOps = ['sqrt'];
    }
    
    digitos(valor){
        if (this.pantalla.includes("M")){
            this.borrarPantalla();
            this.calculos= "";
        }
        this.pantalla += valor;
        this.numero += valor;
        this.actualizar();
    }

    punto(){
        if (!this.numero.includes(".")){
            this.pantalla += ".";
            this.numero += ".";
            this.actualizar();
        }
    } 

    operacion(valor){
        if (this.pantalla.includes("M")){
            this.borrarPantalla();
            this.calculos= this.memoria;
            this.pantalla = this.calculos;
            this.actualizar();
        }

        if (this.numero !== "" || !isNaN(this.pantalla.toString().charAt(this.pantalla.length-1)) ){
            
            if (this.specialOps.indexOf(valor) === -1){
                if(this.calculos.toString().charAt(this.calculos.length-1) === ')'){
                    this.calculos += '*';
                }
                this.calculos += "Math."+valor+"("+Number(this.numero.replace("(","").replace(")",""))+")";
                this.numero = "";
            }else{
                this.pushAndResetNumero();
                this.op = valor;
                this.calculos +=this.op;
            }

            this.enviarAPantalla(valor);
            this.repetir = false;
        }   
    }

    suma(){
        this.operacion("+");
    }

    resta(){
        this.operacion("-");
    } 

    multiplicacion(){
        this.operacion("*");
    } 

    division(){
        this.operacion("/");
    } 

    mrc(){
        if (!this.pantalla.includes("M "+ this.memoria)){
            if (this.memoriaClicks === 0){
                this.borrarPantalla();
                this.calculos += Number(this.numero.replace("(","").replace(")",""));
                this.calculos = Number(eval(this.calculos));
                this.memoria = Number(this.calculos);
                this.pantalla = "M "+ this.memoria;
                this.numero=""
                this.memoriaClicks++;
            }else if (this.memoriaClicks === 1){
                this.pantalla = "M "+ this.memoria;
                this.memoriaClicks--;
                this.numero=""
            }
            this.actualizar();
        }
    } 

    mMenos(){
        this.borrarPantalla();
        this.calculos +=  Number(this.numero.replace("(","").replace(")",""));
        this.calculos = Number(eval(this.calculos));
        this.memoria -= this.calculos;
        this.pantalla = "M "+ this.memoria;
        document.getElementsByTagName("input")[0].value = this.pantalla;
        this.numero = "";
        this.actualizar();
    } 

    mMas(){
        this.borrarPantalla();
        this.calculos += Number(this.numero.replace("(","").replace(")",""));
        this.calculos = Number(eval(this.calculos));
        this.memoria += this.calculos;
        this.pantalla = "M "+ this.memoria;
        document.getElementsByTagName("input")[0].value = this.pantalla;
        this.numero = "";
        this.actualizar();
    } 

    borrar(){
        this.pantalla = "";
        this.calculos ="";
        this.ultimoNumero = undefined;
        this.numero = "";
        this.op = ""
        this.repetir = false;
        this.actualizar();
    } 

    igual(){
        this.pushAndResetNumero();
        this.borrarPantalla();
        var calc;
        if (this.repetir){
            calc = eval(this.calculos + this.op + this.ultimoNumero);
        }else{
            this.casosEspeciales();
            calc = eval(this.calculos);
        }
        this.calculos = Number(calc);
        this.pantalla = this.calculos.toString();
        
        this.repetir = true;
        this.actualizar();

    }

    porcentaje(){
        var primer_numero = Number(this.calculos.substring(0,this.calculos.length-1));
        var segundo_numero = Number(this.numero.replace("(","").replace(")",""));
        if(this.calculos.includes("*")){
            this.pantalla = eval(primer_numero * segundo_numero/100);
        }else if (this.calculos.includes("/")){
            this.pantalla = eval(primer_numero/segundo_numero*100);
        }else if (this.calculos.includes("+")){
            this.pantalla = eval(primer_numero + primer_numero*(segundo_numero)/100);
        }else{
            this.pantalla = eval(primer_numero - primer_numero*(segundo_numero)/100);
        }
        this.numero = "";
        this.actualizar();
    } 

    raiz(){
        this.operacion("sqrt");
    } 

    mas_menos(){
        if( this.numero!== ""){
            var oldNumero = this.numero.toString();
            if(this.numero.toString().includes("-")){
                this.numero = this.numero.toString().substring(2,this.numero.length-1);
            }else{
                this.numero ="(-" + this.numero.toString() + ")";
            }

            this.pantalla = this.pantalla.substring(0,this.pantalla.length - oldNumero.length) + this.numero;
            
            this.actualizar();
        }
    }

    borrarUltimo(){
        this.pantalla = this.pantalla.substring(0,this.pantalla.length-this.numero.length);
        this.numero = "";
        this.actualizar();
    }

    actualizar(){
        document.getElementsByTagName("input")[0].value = this.pantalla;
    }

    enviarAPantalla(valor){
        this.pantalla += valor;
        this.actualizar();
    }

    borrarPantalla(){
        this.pantalla = "";
        this.actualizar();
    }

    pushAndResetNumero(){
        if(this.numero !== ""){
            if(this.calculos.toString().charAt(this.calculos.length-1) === ')'){
                this.calculos += '*';
            }
            this.calculos += Number(this.numero.replace("(","").replace(")",""));
            this.ultimoNumero = Number(this.numero.replace("(","").replace(")",""));
            this.numero = "";
        }
    }

    finalizarOperacion(valorPantalla){
        this.nums = new Array();
        this.nums.push(valorPantalla);
    }

    casosEspeciales(){
        if(this.calculos.toString().charAt(this.calculos.length-1) === "/" ){
            this.calculos = 1 / this.calculos.split("/")[0];
        }
        if(this.calculos.toString().charAt(this.calculos.length-1) === "*" ){
            this.calculos = this.calculos.split("*")[0] * this.calculos.split("*")[0];
        }
    }
}
var calculadora = new CalculadoraMilan(); 
