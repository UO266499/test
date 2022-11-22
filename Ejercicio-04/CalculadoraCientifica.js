class CalculadoraMilan{
    constructor(){
        this.pantalla = "";
        this.calc ="";
        this.ultimoNumero = undefined;
        this.numero = "";
        this.op = ""
        this.memoria = new Number('0');
        this.memoriaClicks = 0;
        this.repetir = false;
        this.specialOps = ['sqrt'];
    }
    
    digitos(valor){
        if (this.pantalla.includes("M ")){
            this.borrarPantalla();
            this.calc= "";
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
        if (this.pantalla.includes("M ")){
            this.borrarPantalla();
            this.calc= this.memoria;
            this.pantalla = this.calc;
            this.actualizar();
        }

        if (this.numero !== "" || !isNaN(this.pantalla.toString().charAt(this.pantalla.length-1)) ){
            
            if (this.specialOps.indexOf(valor) !== -1){
                if(this.calc.toString().charAt(this.calc.length-1) === ')'){
                    this.calc += '*';
                }
                this.calc += "Math."+valor+"("+Number(this.numero.replace("(","").replace(")",""))+")";
                this.numero = "";
            }else{
                this.pushAndResetNumero();
                this.op = valor;
                this.calc +=this.op;

                console.log(this.calc)
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
                this.calc += Number(this.numero.replace("(","").replace(")",""));
                this.calc = Number(eval(this.calc));
                this.memoria = Number(this.calc);
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
        this.calc +=  Number(this.numero.replace("(","").replace(")",""));
        this.calc = Number(eval(this.calc));
        this.memoria -= this.calc;
        this.pantalla = "M "+ this.memoria;
        document.getElementsByTagName("input")[0].value = this.pantalla;
        this.numero = "";
        this.actualizar();
    } 

    mMas(){
        this.borrarPantalla();
        this.calc += Number(this.numero.replace("(","").replace(")",""));
        this.calc = Number(eval(this.calc));
        this.memoria += this.calc;
        this.pantalla = "M "+ this.memoria;
        document.getElementsByTagName("input")[0].value = this.pantalla;
        this.numero = "";
        this.actualizar();
    } 

    borrar(){
        this.pantalla = "";
        this.calc ="";
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
        console.log(this.calc)
        if (this.repetir){
            calc = eval(this.calc + this.op + this.ultimoNumero);
        }else{
            this.casosEspeciales();
            calc = eval(this.calc);
        }
        this.calc = Number(calc);
        this.pantalla = this.calc.toString();
        
        this.repetir = true;
        this.actualizar();

    }

    porcentaje(){
        var primer_numero = Number(this.calc.substring(0,this.calc.length-1));
        var segundo_numero = Number(this.numero.replace("(","").replace(")",""));
        if(this.calc.includes("*")){
            this.pantalla = eval(primer_numero * segundo_numero/100);
        }else if (this.calc.includes("/")){
            this.pantalla = eval(primer_numero/segundo_numero*100);
        }else if (this.calc.includes("+")){
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
        if(this.numero !== "" && this.numero !== " "){
            if(this.calc.toString().charAt(this.calc.length-1) === ')'){
                this.calc += '*';
            }
            this.calc += Number(this.numero.replace("(","").replace(")",""));
            this.ultimoNumero = Number(this.numero.replace("(","").replace(")",""));
            this.numero = "";
        }
    }

    finalizarOperacion(valorPantalla){
        this.nums = new Array();
        this.nums.push(valorPantalla);
    }

    casosEspeciales(){
        if(this.calc.toString().charAt(this.calc.length-1) === "/" ){
            this.calc = 1 / this.calc.split("/")[0];
        }
        if(this.calc.toString().charAt(this.calc.length-1) === "*" ){
            this.calc = this.calc.split("*")[0] * this.calc.split("*")[0];
        }
    }
}
class CalculadoraCientifica extends CalculadoraMilan{

    CalculadoraCientifica(){
        this.a = false;
        this.forceExp = false;
        this.hyp = false;
        this.degr = true;
    }
    deg(){
        if (this.degr){
            document.getElementsByTagName('button')[0].innerHTML = "DEG";
        }else{
            document.getElementsByTagName('button')[0].innerHTML = "RAD";
        }
        this.degr = !this.degr;
    }


    hyper(){
        this.hyp = !this.hyp;
        if(this.hyp){
            document.getElementsByTagName('button')[10].innerHTML = "sinh";
            document.getElementsByTagName('button')[11].innerHTML ="cosh";
            document.getElementsByTagName('button')[12].innerHTML ="tanh";
        }else{
            document.getElementsByTagName('button')[10].innerHTML = "sin";
            document.getElementsByTagName('button')[11].innerHTML ="cos";
            document.getElementsByTagName('button')[12].innerHTML ="tan";
        }
    }

    raiz(){
        if (this.a){
            this.pantalla += "∛";
            this.calc += "Math.cbrt("+Number(this.numero)+")";
            this.numero="";
        }else{
            this.operacion("sqrt");
        }
        this.actualizar();
    }

    inverse(){
        this.a = !this.a;
        if(this.a){
            document.getElementsByTagName('button')[8].innerHTML = "x^3";
            document.getElementsByTagName('button')[10].innerHTML = "asin";
            document.getElementsByTagName('button')[11].innerHTML ="acos";
            document.getElementsByTagName('button')[12].innerHTML ="atan";
            document.getElementsByTagName('button')[13].innerHTML ="&#x221B;";
        }else{
            document.getElementsByTagName('button')[8].innerHTML = "x^2";
            document.getElementsByTagName('button')[10].innerHTML ="sin";
            document.getElementsByTagName('button')[11].innerHTML ="cos";
            document.getElementsByTagName('button')[12].innerHTML ="tan";
            document.getElementsByTagName('button')[13].innerHTML ="&#8730;";
        }
        
    }

    mc(){
        this.memoria = new Number('0');
        this.memoriaClicks = 0;
    }

    mr(){
        this.memoriaClicks = 1;
        this.mrc();
    }

    ms(){
        this.mrc();
        this.memoriaClicks = 0;
    }

    pi(){
        this.pantalla += "π";
        this.numero += Math.PI;
        this.actualizar();
    }

    sin(){
        if (this.a){
            this.pantalla += "asin(";
            this.calc += "Math.asin(";
        }else if(this.hyp){
            this.pantalla += "sinh(";
            this.calc += "Math.sinh(";
        }else{
            this.pantalla += "sin(";
            this.calc += "Math.sin(";
        }
        if(!this.degr){
            this.calc += Number(Math.PI / 180) + "*";
        }
        this.actualizar();
    }

    cos(){
        if (this.a){
            this.pantalla += "acos(";
            this.calc += "Math.acos(";
        }else if(this.hyp){
            this.pantalla += "cosh(";
            this.calc += "Math.cosh(";
        }else{
            this.pantalla += "cos(";
            this.calc += "Math.cos(";
        }
        if(!this.degr){
            this.calc += Number(Math.PI / 180) + "*";
        }
        this.actualizar();
    }

    tan(){
        if (this.a){
            this.pantalla += "atan(";
            this.calc += "Math.atan(";
        }else if(this.hyp){
            this.pantalla += "tanh(";
            this.calc += "Math.tanh(";
        }else{
            this.pantalla += "tan(";
            this.calc += "Math.tan(";
        }
        if(!this.degr){
            this.calc += Number(Math.PI / 180) + "*";
        }
        this.actualizar();
    }

    log(){
        this.pantalla += "log(";
        this.calc += "Math.log(";
        this.actualizar();
    }


    factorial(){
        if (this.numero !== ""){
            this.pantalla += "!";
            this.calc = this.calc.toString().substring(0,this.calc.length-this.numero.length+2);
            this.calc += this.getFactorial(Number(this.numero));
            this.numero=" ";
            this.actualizar();
        }
    }

    getFactorial(numero){
        if (numero < 0) 
            return -1;
        else if (numero == 0) 
            return 1;
        else
            return (numero *  this.getFactorial(numero - 1));
    }

    fe(){
        this.forceExp = !this.forceExp;
    }

    elevado2(){
        if (this.numero !== ""){
            this.pushAndResetNumero();
            if (this.a){
                this.pantalla += "^(3)";
                this.calc +="**(3)";
            }else{
                this.pantalla += "^(2)";
                this.calc +="**(2)";
            }
            this.actualizar();
        }
    }

    exp(){
        this.pushAndResetNumero();
        this.pantalla += ",e+";
        this.calc +="*10**";
        this.actualizar();
    }

    elevadoY(){
        if (this.numero !== ""){
            this.pushAndResetNumero();
            this.pantalla += "^";
            this.calc +="**";
            this.actualizar();
        }
    }

    mod(){
        if (this.numero !== ""){
            this.pushAndResetNumero();
            this.pantalla += "Mod";
            this.calc +="%";
            this.actualizar();
        }
    }

    diezAX(){
        this.pantalla += "10^";
        this.calc +=("10**");
        this.actualizar();
    }

    abreParentesis(){
        this.pantalla+= "(";
        this.calc+= "(";
        this.actualizar();
    }

    cierraParentesis(){
        this.pantalla+= ")";
        this.pushAndResetNumero();
        this.calc+= ")";
        this.actualizar();
    }

    del(){
        if (this.numero === "")
            this.calc = this.calc.slice(0,-1);
        this.pantalla =this.pantalla.slice(0,-1);
        this.numero = this.numero.slice(0,-1);
        this.actualizar();
    }

    operacion(valor){
        if (this.pantalla.includes("M ")){
            this.borrarPantalla();
            this.calc= this.memoria;
            this.pantalla = this.calc;
            this.actualizar();
        }

        if (this.numero !== "" || !isNaN(this.pantalla.toString().charAt(this.pantalla.length-1)) ){
            
            if (this.specialOps.indexOf(valor) !== -1){
                if(this.calc.toString().charAt(this.calc.length-1) === ')'){
                    this.calc += '*';
                }
                this.calc += "Math."+valor+"("+Number(this.numero.replace("(","").replace(")",""))+")";
                this.numero = "";
            }else{
                var elnum = this.numero;
                this.pushAndResetNumero();
                this.op = valor;
                this.calc +=this.op;

                console.log(this.calc)
            }

            if(this.forceExp){
                this.numero = elnum;
                this.borrarUltimo();
                this.enviarAPantalla(elnum.charAt(0)+"."+ elnum.substring(1,elnum.length) + "e+" + elnum.substring(1,elnum.length).length  )
            }else{
                this.enviarAPantalla(valor);
            }
            this.repetir = false;
        }   
    }

    igual(){
        console.log(this.calc)
        this.pushAndResetNumero();
        this.borrarPantalla();
        var calc;
        console.log(this.calc)
        if (this.repetir){
            calc = eval(this.calc + this.op + this.ultimoNumero);
        }else{
            this.casosEspeciales();
            calc = eval(this.calc);
        }
        this.calc = Number(calc);

        if(this.forceExp){
            this.borrarPantalla();
            this.pantalla = this.calc.toString().charAt(0)+"."+this.calc.toString().substring(1,this.calc.toString().length) + "e+" + this.calc.toString().substring(1,this.calc.toString().length).length  ;
        }else{
            this.pantalla = this.calc.toString();
        }
        
        this.repetir = true;
        this.actualizar();

    }
}
var calculadora = new CalculadoraCientifica();