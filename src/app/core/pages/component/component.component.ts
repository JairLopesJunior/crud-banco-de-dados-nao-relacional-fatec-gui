import { ComponentEntity } from './../../../entities/component-entity';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComponentService } from 'src/app/services/component.service';
import { CssSelector } from '@angular/compiler';

@Component({
  selector: 'app-component',
  templateUrl: './component.component.html',
  styleUrls: ['./component.component.css']
})
export class ComponentComponent implements OnInit {

  componentRegistration: FormGroup;

  componentsList: ComponentEntity[];

  isSave: boolean = true;

  isUpdate: boolean = false;

  componentId: number;

  indice: number;

  constructor(private fb: FormBuilder,
              private _componentService: ComponentService) { }

  ngOnInit(): void {
    this.componentForm();
    this.getComponentsList();
  }

  public componentForm(): void {
    this.componentRegistration = this.fb.group({
      component: ['',  Validators.required]
    })
  }

  public save(): void {
    this._componentService.save(this.componentRegistration.getRawValue()).subscribe({
      next: component => {
        this.componentRegistration.reset();
        this.getComponentsList();
        alert("Salvo com sucesso.");
      },
      error: err => {
        alert("Erro" + err);
      }
    });
  }

  public getComponentsList(): void {
    this._componentService.getComponentsList().subscribe({
      next: cs => {
        cs.forEach(c => {
          if(!!c.component) {
            c.component = c.component.split('\\').join('').trim().replace('"<', '<').replace('>"', '>');
            console.log(c.component)
          }
        });
        this.componentsList = cs;
      },
      error: err => {
        alert("Erro" + err);
      }
    });
  }

  public deleteById(id: number | undefined): void {
    if(!!id) {
      this._componentService.deleteById(id).subscribe({
        next: cs => {
          this.getComponentsList();
          alert("Deletado com sucesso!");
        },
        error: err => {
          alert("Erro" + err);
        }
      });
    }
  }

  public findById(id: number | undefined, indice: number): void {
    if(!!id) {
      this._componentService.findById(id).subscribe({
        next: resp => {
          this.indice = indice;
          this.componentId = id;
          this.isSave = false;
          this.isUpdate = true;
          this.componentRegistration.patchValue({ component: resp.component });
          alert("Dados carregados com sucesso!");
        },
        error: err => {
          alert("Error" + err);
        }
      });
    }
  }

  public update(): void {
    let entity = new ComponentEntity();
    entity.id = this.componentId;
    entity.component = this.componentRegistration.get('component')!.value;
    this._componentService.update(entity).subscribe({
      next: resp => {
        this.componentsList[this.indice].component = resp.component;
        this.isSave = true;
        this.isUpdate = false;
        this.getComponentsList();
        alert("Dados atualizados com sucesso!");
        this.componentRegistration.reset();
      },
      error: err => {
        alert("Error" + err);
      }
    });
  }
}