import { Component } from '@angular/core';


@Component({
  selector: 'sp-home',
  styles: [`
    :host {
      display: block;
      width: 100%;
      margin: 80px 0 50px 0;
    }

    h1 {
        color: #ffc421;
        margin-bottom: 30px;
    }
    h1 > small {
      color: #000000;
    }

    .jumbotron {
      margin-bottom: 0;
    }
    .jumbotron > div {
      margin: 20px;
    }
  `],
  template: `
    <div class="container">
        <div class="jumbotron">
            <h1>angular-split 
              <a href="https://badge.fury.io/js/angular-split"><img src="https://badge.fury.io/js/angular-split.svg" alt="npm version" height="18"></a>
              <small><br>Angular (2+) UI library to split views using CSS flexbox layout.</small>
            </h1>
            <h4>Install npm module:</h4>
            <pre [innerText]="code1"></pre>
            <br>
            <h4>Add angular module to your app module:</h4>
            <pre [innerText]="code2"></pre>
            <p>If you are using <b>angular-cli</b> / <b>webpack</b>, that's it!</p>
            <br>
            <h4>Systemjs:</h4>
            <p>Add this to your config:</p>
            <pre [innerText]="code3"></pre>
            <br>
            <h4>Bug report:</h4>
            <p>If you find a bug, open an issue with a <a href="https://stackblitz.com/edit/angular-bz2ohj" target="_blank">stackblitz</a> / <a href="https://plnkr.co/edit/17IWKz?p=preview" target="_blank">plunker</a> demo showing it.</p>
            <br>
            <button class="btn btn-outline-warning" routerLink="/documentation">Documentation</button>
            <button class="btn btn-outline-warning" routerLink="/examples">Examples</button>
            <br><br>
            <h5>Note:</h5>
            <div>
              <p>Previously, I coded an angular (2+) wrapper to <a href="https://nathancahill.github.io/Split.js/">Split.js</a> library (<a href="https://github.com/bertrandg/ng2-split/">ng2-split</a>) but I decided to rewrite it purely in Angular for following reasons:</p>
              <ul>
                <li>No more dependency except Angular.</li>
                <li>Use base64 images instead PNG files.</li>
                <li>Angular AOT compilation compliant.</li>
                <li>Use latest Flexbox CSS grid system.</li>
                <li>Fun!</li>
              </ul>
            </div>
        </div>
    </div>`
})
export class HomeComponent {
  code1: string = `npm install angular-split`

  code2: string = `import { AngularSplitModule } from 'angular-split';
  
@NgModule({
  declarations: [
    AppComponent,
    ...
  ],
  imports: [
    AngularSplitModule,
    ...
  ],
  providers: [...],
  bootstrap: [AppComponent]
})
export class AppModule {}`

  code3: string = `System.config({
  ...
  map: {
    ...
    'angular-split': 'node_modules/angular-split/bundles/angular-split.umd.js'
  }
});`
}
