class CalculadoraRPN{
    constructor(){
        this.stack = new Array();
        this.numero="";
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
        if (this.numero !== ""){
            this.stack.push(new Number(this.numero));
            this.numero = "";
            this.actualizar();
        }
    }
    borrar(){
        this.stack = new Array();
        this.numero = "";
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

    actualizar(){
        var inputs = document.getElementsByTagName('input');
        for(let index = 4; index >= 0; index--){
            inputs[index].value = "";
        }
        var counter = 3;
        for (let index = this.stack.length; index > 0; index--) {
            inputs[counter--].value = index + ": "+this.stack[index-1];
        }
    }
}
var calculadora = new CalculadoraRPN();