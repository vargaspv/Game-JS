

const a = document.getElementById('a')
const b = document.getElementById('b')
const c = document.getElementById('c')
const d = document.getElementById('d')
const e = document.getElementById('e')
const f = document.getElementById('f')
const g = document.getElementById('g')
const h = document.getElementById('h')
const i = document.getElementById('i')
const btnEmpezar = document.getElementById('btnEmpezar')
const ULTIMO_NIVEL = 10



class Juego {
    constructor() {
        this.inicializar = this.inicializar.bind(this)
        this.inicializar()
        this.generarSecuencia()
        this.siguienteNivel()
        setTimeout(this.siguienteNivel, 1000)
    }

    inicializar() {
        this.siguienteNivel = this.siguienteNivel.bind(this)
        this.elegirLetra = this.elegirLetra.bind(this)
        this.toggleBtnEmpezar()
        this.nivel = 1
        this.letras = {
            a,
            b,
            c,
            d,
            e,
            f,
            g,
            h,
            i
        }
    }


    toggleBtnEmpezar(){
        if (btnEmpezar.classList.contains('hide')) {
            btnEmpezar.classList.remove('hide')
        } else {
            btnEmpezar.classList.add('hide')
        }
    }

    generarSecuencia() {
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 9))
    }

    siguienteNivel() {
        this.subnivel = 0
        this.iluminarSecuencia()
        this.agregarEventoClick()
    }

    transformarNumeroALetra (numero) {
        switch (numero) {
            case 0:
                return 'a'
            case 1:
                return 'b'
            case 2:
                return 'c'
            case 3:
                return 'd'
            case 4:
                return 'e'
            case 5:
                return 'f'
            case 6:
                return 'g'
            case 7:
                return 'h'
            case 8:
                return 'i'
        }
    }

    transformarLetraANumero (letra) {
        switch (letra) {
            case 'a':
                return 0
            case 'b':
                return 1
            case 'c':
                return 2
            case 'd':
                return 3
            case 'e':
                return 4
            case 'f':
                return 5
            case 'g':
                return 6
            case 'h':
                return 7
            case 'i':
                return 8
        }
    }

    iluminarSecuencia() {
        for(let i = 0; i < this.nivel; i++) {
            const letra = this.transformarNumeroALetra(this.secuencia[i])
            setTimeout(() => this.iluminarLetra(letra), 700 * i)
        }
    }

    iluminarLetra(letra) {
        //debugger
        this.letras[letra].classList.add('light')
        setTimeout(() => this.apagarLetra(letra), 350)
    }

    apagarLetra(letra) {
        this.letras[letra].classList.remove('light')
    }

    agregarEventoClick() {
        this.letras.a.addEventListener('click', this.elegirLetra)
        this.letras.b.addEventListener('click', this.elegirLetra)
        this.letras.c.addEventListener('click', this.elegirLetra)
        this.letras.d.addEventListener('click', this.elegirLetra)
        this.letras.e.addEventListener('click', this.elegirLetra)
        this.letras.f.addEventListener('click', this.elegirLetra)
        this.letras.g.addEventListener('click', this.elegirLetra)
        this.letras.h.addEventListener('click', this.elegirLetra)
        this.letras.i.addEventListener('click', this.elegirLetra)
    }

    eliminarEventosClick() {
        this.letras.a.removeEventListener('click', this.elegirLetra)
        this.letras.b.removeEventListener('click', this.elegirLetra)
        this.letras.c.removeEventListener('click', this.elegirLetra)
        this.letras.d.removeEventListener('click', this.elegirLetra)
        this.letras.e.removeEventListener('click', this.elegirLetra)
        this.letras.f.removeEventListener('click', this.elegirLetra)
        this.letras.g.removeEventListener('click', this.elegirLetra)
        this.letras.h.removeEventListener('click', this.elegirLetra)
        this.letras.i.removeEventListener('click', this.elegirLetra)
    }

    elegirLetra(ev) {
        const nombreLetra = ev.target.dataset.letra
         const numeroLetra = this.transformarLetraANumero(nombreLetra)
        this.iluminarLetra(nombreLetra)
        
        if (numeroLetra === this.secuencia[this.subnivel]) {
            this.subnivel++
            if (this.subnivel === this.nivel) {
                this.nivel++
                this.eliminarEventosClick()
                if (this.nivel === (ULTIMO_NIVEL + 1)) {
                    this.ganoElJuego()
                } else {
                    setTimeout(this.siguienteNivel, 1500)
                }
            }
        } else {
            this.perdioElJuego()
        } 
    }

    ganoElJuego() {
        swal('Simon dice:', 'Ganaste!!', 'success')
        .then(this.inicializar)
    }

    perdioElJuego() {
        swal('Simon dice:', 'Perdiste!', 'error')
        .then(() => {
            this.eliminarEventosClick()
            this.inicializar()
        }) 
    }
}

function empezarJuego() {
    window.juego = new Juego()
}