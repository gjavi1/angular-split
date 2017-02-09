import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';


interface IConfig {
    columns: Array<{
        visible: boolean,
        size: number,
        rows: Array<{
            visible: boolean,
            size: number,
            type: string
        }>
    }>
    disabled: boolean
}


const defaultConfig: IConfig = {
    columns: [
        {
            visible: true,
            size: 25,
            rows: [
                { visible: true, size: 25, type: 'A' },
                { visible: true, size: 75, type: 'B' }
            ]
        },
        {
            visible: true,
            size: 50,
            rows: [
                { visible: true, size: 60, type: 'doc' },
                { visible: true, size: 40, type: 'C' }    
            ]
        },
        {
            visible: true,
            size: 25,
            rows: [
                { visible: true, size: 20, type: 'D' },
                { visible: true, size: 30, type: 'E' },    
                { visible: true, size: 50, type: 'F' }    
            ]
        }
    ],
    disabled: false
};


@Component({
  selector: 'sp-advanced-example',
  styles: [`
    :host {
        display: block;
        width: 100%;
        height: 100%;
    }

    .explanations {
        padding: 15px;
    }

    .panel {
        font-size: 100px;
        font-weight: bold;
        text-align: center;
        color: #cccccc;
    }
  `],
    template: `
        <split *ngIf="config" 
               direction="horizontal"
               [disabled]="config.disabled"
               (dragEnd)="onDragEnd(-1, $event)">
            <template ngFor let-column [ngForOf]="config.columns" let-icol="index">
                <split-area *ngIf="column.visible"
                            [order]="icol" 
                            [size]="column.size">
                    <split direction="vertical"
                           [disabled]="config.disabled"
                           (dragEnd)="onDragEnd(icol, $event)">
                        <template ngFor let-row [ngForOf]="column.rows" let-irow="index">
                            <split-area *ngIf="row.visible"
                                        [order]="irow" 
                                        [size]="row.size">
                                <div [ngSwitch]="row.type">
                                    <p *ngSwitchCase="'doc'" class="explanations">
                                        Here all areas sizes and visibilities are editable and saved to localStorage.<br>
                                        On component initialization, if present inside localStorage, it uses it.<br>
                                        You can drag any gutters or click following buttons to toggle areas visibility:
                                        <br>
                                        <template ngFor let-c [ngForOf]="config.columns">
                                            <template ngFor let-r [ngForOf]="c.rows">
                                                <button *ngIf="r.type !== 'doc'" #btn
                                                        (click)="r.visible = !r.visible; refreshColumnVisibility(); btn.blur()" 
                                                        [class.active]="r.visible"
                                                        class="btn btn-outline-warning">{{ r.type }}</button>
                                            </template>
                                        </template>
                                        <br><br>
								        <button (click)="toggleDisabled(); btn.blur()" #btn
                                                [class.active]="config.disabled"
                                                class="btn btn-outline-warning">Disable splitters</button>
                                        <br><br>
								        <button (click)="resetConfig()" class="btn btn-outline-warning">Reset localStorage</button>
                                        <br><br>
								        <a href="https://github.com/bertrandg/angular-split/blob/website-src/src/app/advancedExample/advancedExample.route.component.ts" class="btn btn-outline-warning">View sources</a>
                                    </p>
                                    <p *ngSwitchDefault class="panel">{{ row.type }}</p>
                                </div>
                            </split-area>
                        </template>
                    </split>
                </split-area>
            </template>
        </split>`
})
export class AdvancedExampleComponent implements OnInit {
    localStorageName = 'angular-split'
    config: IConfig = null

    ngOnInit() {
        if(localStorage.getItem(this.localStorageName)) {
            this.config = JSON.parse(localStorage.getItem(this.localStorageName));
        }
        else {
            this.resetConfig();
        }
    }

    resetConfig() {
        this.config = _.cloneDeep(defaultConfig);

        localStorage.removeItem(this.localStorageName);
    }

    onDragEnd(columnindex: number, sizesArray: Array<number>) {
        // Column dragged
        if(columnindex === -1) {
            // Set size for all visible columns
            this.config.columns.filter(c => c.visible === true).forEach((column, index) => column.size = sizesArray[index]);
        }
        // Row dragged
        else {
            // Set size for all visible rows from specified column
            this.config.columns[columnindex].rows.filter(r => r.visible === true).forEach((row, index) => row.size = sizesArray[index]);
        }

        this.saveLocalStorage();
    }

    toggleDisabled() {
        this.config.disabled = !this.config.disabled;

        this.saveLocalStorage();
    }

    refreshColumnVisibility() {
        this.config.columns.forEach((column, index) => {
            column.visible = column.rows.some(row => row.visible === true);
        });

        this.saveLocalStorage();
    }

    saveLocalStorage() {
        localStorage.setItem(this.localStorageName, JSON.stringify(this.config));
    }
}