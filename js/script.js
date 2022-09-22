const inputCPF = document.querySelector('#textcpf');
const btnsub = document.querySelector('.btnsub');
const textname = document.querySelector('#textname');
const resp = document.querySelector('.resp');
const img = document.querySelector('.img')

// Travamento de teclas input CPF
let goodKey = '0123456789-.';

var checkInputCPF = function(e) {
  var key = (typeof e.which == "number") ? e.which : e.keyCode;
  var start = this.selectionStart,
    end = this.selectionEnd;

  var filtered = this.value.split('').filter(filterInput);
  this.value = filtered.join("");

  var move = (filterInput(String.fromCharCode(key)) || (key == 0 || key == 8)) ? 0 : 1;
  this.setSelectionRange(start - move, end - move);
}

var filterInput = function(val) {
  return (goodKey.indexOf(val) > -1);
}

inputCPF.addEventListener('input', checkInputCPF);

// InputCPF

inputCPF.addEventListener('keyup', function(e) {
    let point = '.';
    let dash = '-';
    if (inputCPF.value.length === 3 && e.keyCode !== 8 && e.keyCode !== 46) {
        inputCPF.value +=  point.valueOf();
    } else if(inputCPF.value.length === 7 && e.keyCode !== 8 && e.keyCode !== 46)  {
        inputCPF.value +=  point.valueOf();
    } else if(inputCPF.value.length === 11 && e.keyCode !== 8 && e.keyCode !== 46)  {
        inputCPF.value +=  dash.valueOf();
    } else if(inputCPF.value.length === 14) {
        inputCPF.style.border = '2px solid green';
    } 
});

btnsub.addEventListener('click', function(e) {
    if (inputCPF.value.length !== 14) {
        inputCPF.style.border = '2px solid red';
    } else {
        inputCPF.style.border = '2px solid green';
    }
    if (textname.value.length === 0) {
        textname.style.border = '2px solid red';
    } else {
        textname.style.border = '2px solid green';
    }
    if(inputCPF.value.length === 14 && textname.value.length !== 0) {
        let CPF = inputCPF.value;
        let CPFclean = String(CPF.replace(/\D+/g, ''));

        if (CPFclean.length === 11) {

            let cpfArray = Array.from(CPFclean);// calcular

            let two = cpfArray.splice(-2, 2);// comparar

            let num1 = 10;

            let soma1 = cpfArray.reduce(function(acumulador, valor) {
                acumulador += (valor * num1);
                num1 = num1 - 1;
                
                return acumulador
            }, 0);

            soma1 = 11 - (soma1 % 11);
            if (soma1 > 9) soma1 = 9;
            cpfArray.push(String(soma1));
            
            let num2 = 11;

            let soma2 = cpfArray.reduce(function(acumulador, valor) {
                acumulador += (valor * num2);
                num2 = num2 - 1;

                return acumulador
            }, 0);

            soma2 = 11 - (soma2 % 11);
            if (soma2 > 9) soma2 = 9;
            cpfArray.push(String(soma2));
            
            let two2 = cpfArray.splice(-2, 2);

            if (two[0] === two2[0] && two[1] == two2[1]) {
                resp.style.display = 'block';
                resp.innerHTML = `Olá ${textname.value} este CPF é válido!`;
                let img = document.createElement('img');
                resp.appendChild(img)
                img.src = "image/correctt.png";

            } else {
                resp.style.display = 'block';
                resp.innerHTML = `Olá ${textname.value} este CPF não é válido!`;
                let img = document.createElement('img');
                resp.appendChild(img)
                img.src = "image/wrong.png";
            }

        } else {
            resp.style.display = 'block';
            resp.innerHTML = `Olá ${textname.value} este CPF não é válido!`;
            let img = document.createElement('img');
            resp.appendChild(img)
            img.src = "image/wrong.png";
        }

    }
// 0  1 2 3 4 5 6 7 8 9 10

// 0  7 7 8 0 0 7 3 9 1 2 
// 10 9 8 7 6 5 4 3 2 

});