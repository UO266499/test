class CalculadoraRPN{
    constructor(){
        this.stack = new Array();
        this.numero="";
        this.preguntas = [
            "¿Cuántas personas para el cálculo?",
            "¿Cuántas duchas por semana?",
            "¿Duración media de las duchas?",
            "Insertar valor 9",
            "Hacer clic en multiplicar",
            "Hacer clic en multiplicar",
            "Insertar valor 4.35",
            "Hacer clic en multiplicar",
            "¿Cuántos baños por semana?",
            "Insertar valor 200",
            "Hacer clic en multiplicar",
            "Insertar valor 4.35",
            "Hacer clic en multiplicar",
            "¿Cuántas veces te lavas los dientes por día?",
            "Insertar valor 2",
            "Hacer clic en multiplicar",
            "Insertar valor 30.5",
            "Hacer clic en multiplicar",
            "¿Cuántas veces das a la cisterna por día?",
            "Insertar valor 6",
            "Hacer clic en multiplicar",
            "Insertar valor 30.5",
            "Hacer clic en multiplicar",
            "¿Cuántas veces te lavas las manos por día?",
            "Insertar valor 2",
            "Hacer clic en multiplicar",
            "Insertar valor 30.5",
            "Hacer clic en multiplicar",
            "¿Cuántas veces te lavas la cara por día?",
            "Insertar valor 2",
            "Hacer clic en multiplicar",
            "Insertar valor 30.5",
            "Hacer clic en multiplicar",
            "¿Cuánta agua de grifo bebes por día?",
            "Insertar valor 30.5",
            "Hacer clic en multiplicar",
            "¿Cuántos litros de agua utilizas para cocinar por día?",
            "Insertar valor 30.5",
            "Hacer clic en multiplicar",
            "¿Cuántas lavadoras pones a la semana?",
            "Insertar valor 50",
            "Hacer clic en multiplicar",
            "Insertar valor 4.35",
            "Hacer clic en multiplicar",
            "¿Cuántas veces pones el lavavajillas por semana?",
            "Insertar valor 9",
            "Hacer clic en multiplicar",
            "Insertar valor 4.35",
            "Hacer clic en multiplicar",
            "¿Cuántas veces al día lavas los platos a mano?",
            "Insertar valor 8",
            "Hacer clic en multiplicar",
            "Insertar valor 30.5",
            "Hacer clic en multiplicar",
            "¿Cuántas veces friegas la casa por semana?",
            "Insertar valor 16",
            "Hacer clic en multiplicar",
            "Insertar valor 4.35",
            "Hacer clic en multiplicar",
            "Hacer clic en sumar",
            "Hacer clic en sumar",
            "Hacer clic en sumar",
            "Hacer clic en sumar",
            "Hacer clic en sumar",
            "Hacer clic en sumar",
            "Hacer clic en sumar",
            "Hacer clic en sumar",
            "Hacer clic en sumar",
            "Hacer clic en sumar",
            "Hacer clic en sumar",
            "Hacer clic en multiplicar",
            "Insertar valor 30.5",
            "Hacer clic en dividir",
            "Todo Listo!: Tu consumo litros/dia se muestra en la posición 1"
        ]
        this.preguntaActual = 0;
        this.modo="sin seleccionar";
    }

    auto(){
        this.modo="auto";
        document.getElementsByTagName('h2')[0].innerHTML = "Consumos de agua (Auto)";
        document.getElementsByTagName('p')[0].innerHTML = this.preguntas[0];
        this.preguntaActual++;
    }
    manual(){
        this.modo="manual";
        document.getElementsByTagName('h2')[0].innerHTML = "Consumos de agua(Manual)";
        document.getElementsByTagName('p')[0].innerHTML = this.preguntas[0];
        this.preguntaActual++ ;   
    }
    sin(){
        this.stack.push(Math.sin(this.stack.pop()));
        this.actualizar();
    }
    cos(){
        this.stack.push(Math.cos(this.stack.pop()));
        this.actualizar();
    }
    tan(){
        this.stack.push(Math.tan(this.stack.pop()));
        this.actualizar();
    }
    arcSin(){
        this.stack.push(Math.asin(this.stack.pop()));
        this.actualizar();
    }
    arcCos(){
        this.stack.push(Math.acos(this.stack.pop()));
        this.actualizar();
    }
    arcTan(){
        this.stack.push(Math.atan(this.stack.pop()));
        this.actualizar();
    }

    digitos(valor){
        this.numero += valor;
        document.getElementsByTagName('input')[4].value =  this.numero;
    }

    multiplicacion(){
        if(this.puedeBinario()){
            var primero = this.stack.pop();
            var segundo = this.stack.pop();
            var mul =  primero * segundo ;
            this.stack.push(mul);
            this.actualizar();
        }
    }

    raiz(){
        this.stack.push(Math.sqrt(this.stack.pop()));
        this.actualizar();
    }

    division(){
        if(this.puedeBinario()){
        var primero = this.stack.pop();
        var segundo = this.stack.pop();
        var div = segundo / primero;
        this.stack.push(div);
        this.actualizar();
        }
    }
    igual(){
        if (this.numero !== "" && this.modo !=="sin seleccionar"){
            this.stack.push(new Number(this.numero));
            this.numero = "";
            this.actualizar();
        }
    }
    borrar(){
        this.stack = new Array();
        this.numero = "";
        this.preguntaActual= 0;
        document.getElementsByTagName('p')[0].innerHTML =  "Seleccionar modo: auto o manual";
        this.modo = "sin seleccionar";
        document.getElementsByTagName('h2')[0].innerHTML = "Consumos de agua";
        this.actualizar();
    }
    suma(){
        if(this.puedeBinario()){
        var sum = this.stack.pop() + this.stack.pop();
        this.stack.push(sum);
        this.actualizar();
        }
    }
    resta(){
        if(this.puedeBinario()){
        var res = this.stack.pop() - this.stack.pop();
        this.stack.push(res);
        this.actualizar();
        }
    }
    punto(){
        this.digitos(".");
    }

    puedeBinario(){
        return (this.stack[this.stack.length-1] !== undefined && this.stack[this.stack.length-2]!==undefined)
    }

    repaint(){
        var inputs = document.getElementsByTagName('input');
        for(let index = 4; index >= 0; index--){
            inputs[index].value = "";
        }
        var counter = 3;
        for (let index = this.stack.length; index > 0; index--) {
            if (counter >= 0)
                inputs[counter--].value = index + ": "+this.stack[index-1];
        }
    }

    actualizar(){
        this.repaint();

        if (this.modo === "manual"){
            document.getElementsByTagName('p')[0].innerHTML = this.preguntas[this.preguntaActual++];
        }else if (this.modo === "auto"){
            for (let index =this.preguntaActual; index < this.preguntas.length; index++) {
                if (this.preguntas[index].includes("?")){
                    document.getElementsByTagName('p')[0].innerHTML = this.preguntas[index];
                    this.preguntaActual = ++index;
                    return;
                }
                if(this.preguntas[index].includes("Insertar valor 16")){
                    this.calcular();
                }
            }
        }
    }
    
    calcular(){
        document.getElementsByTagName('p')[0].innerHTML = this.preguntas[this.preguntas.length-1];
        var mes = 30.5;
        var semana = 4.35; 
        var dia = (
            this.stack.pop()*semana*16+
            8*mes*this.stack.pop()+
            semana*9*this.stack.pop()+
            semana*50*this.stack.pop()+
            mes*this.stack.pop()+
            mes*this.stack.pop()+
            mes*2*this.stack.pop()+
            mes*2*this.stack.pop()+
            mes*6*this.stack.pop()+
            mes*2*this.stack.pop()+
            semana*200*this.stack.pop()+
            semana*9*this.stack.pop()*this.stack.pop())
            *this.stack.pop()/mes;
        this.stack = new Array();
        this.stack.push(dia);
        this.repaint();
    }
}
var calculadora = new CalculadoraRPN();