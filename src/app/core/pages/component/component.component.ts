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
        alert("Salvo com sucesso.")
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

  public deleteById(id: string | undefined): void {
    if(!!id) {
      this._componentService.deleteById(+id).subscribe({
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
}