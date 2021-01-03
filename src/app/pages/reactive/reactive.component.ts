import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidadoresService } from 'src/app/services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css'],
})
export class ReactiveComponent implements OnInit {
  forma: FormGroup;
  constructor(
    private form: FormBuilder,
    private validadores: ValidadoresService
  ) {
    this.crearFormulario();
    this.cargarDataAlFormulario();
  }

  ngOnInit(): void {}

  get pass1NoValido() {
    return this.forma.get('pass1').invalid && this.forma.get('pass1').touched;
  }

  get pass2NoValido() {
    const pass1 = this.forma.get('pass1').value;
    const pass2 = this.forma.get('pass2').value;

    return pass1 === pass2 ? false : true;
  }

  get nombreNoValido() {
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched;
  }

  get apellidoNoValido() {
    return (
      this.forma.get('apellido').invalid && this.forma.get('apellido').touched
    );
  }

  get correoNoValido() {
    return this.forma.get('correo').invalid && this.forma.get('correo').touched;
  }

  get usuarioNoValido() {
    return (
      this.forma.get('usuario').invalid && this.forma.get('usuario').touched
    );
  }

  get distritoNoValido() {
    return (
      this.forma.get('direccion.distrito').invalid &&
      this.forma.get('direccion.distrito').touched
    );
  }

  get ciudadNoValido() {
    return (
      this.forma.get('direccion.ciudad').invalid &&
      this.forma.get('direccion.ciudad').touched
    );
  }

  get pasatiempo() {
    return this.forma.get('pasatiempos') as FormArray;
  }

  crearFormulario() {
    this.forma = this.form.group(
      {
        nombre: ['', [Validators.required, Validators.minLength(5)]],
        apellido: ['', [Validators.required, this.validadores.noHerrera]],
        correo: [
          '',
          [
            Validators.required,
            Validators.email,
            Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
          ],
        ],
        usuario: ['', , this.validadores.existeUsuario],
        pass1: ['', Validators.required],
        pass2: ['', Validators.required],
        direccion: this.form.group({
          distrito: ['', Validators.required],
          ciudad: ['', Validators.required],
        }),
        pasatiempos: this.form.array([]),
      },
      {
        validators: [this.validadores.passwordsIguales('pass1', 'pass2')],
      }
    );
  }

  agregarPasatiempo() {
    this.pasatiempo.push(this.form.control('', Validators.required));
  }

  borrarPasatiempo(i: number) {
    this.pasatiempo.removeAt(i);
  }

  guardar() {
    console.log(this.forma);
    if (this.forma.invalid) {
      return Object.values(this.forma.controls).forEach((control) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach((control) => {
            control.markAllAsTouched();
          });
        } else {
          control.markAllAsTouched();
        }
      });
    }

    this.forma.reset({
      nombre: 'sin nombre',
    });
  }

  cargarDataAlFormulario() {
    // this.forma.setValue({
    this.forma.reset({
      nombre: 'Diego',
      apellido: 'Pagini',
      correo: 'diegopagini@dev.com',

      direccion: {
        distrito: 'Mdq',
        ciudad: 'Mar del Plata',
      },
    });
  }
}
