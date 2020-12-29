# pdf-force

Generate PDF from HTML (Salesforce, Client-side)

![screenshot](https://i.imgur.com/QSR5BoY.png)

## Issues

There's an issue [#1](https://github.com/jsmithdev/pdf-force/issues/1) that needs to be resolved

## API

`save` -- function,  save the file to the client's machine

`filename` -- String,  name of the file when saving

`orientation` -- String,  orientation of PDF; Defaults to `'portrait'`

`scale` -- String,  scale of PDF; Defaults to `1`

`margin` -- String,  PDF margin (in jsPDF units). Can be a single number, [vMargin, hMargin], or [top, left, bottom, right]; Defaults to `0`

[comment]: <> (Below is being held until later)
[comment]: <> (`unit` -- String,  unit of PDF; Defaults to `'in'`)
[comment]: <> (`format` -- String,  format of PDF; Defaults to `'letter'`)

## Examples

A parent component would add content to the content slot as so:

```html

<c-pdf-force>
    <span slot="content">

        <table>
            <tr>
            <th>Company</th>
            <th>Contact</th>
            </tr>
            <tr>
            <td>Alfreds Futterkiste</td>
            <td>Maria Anders</td>
            </tr>
            <tr>
            <td>Centro comercial Moctezuma</td>
            <td>Francisco Chang</td>
            </tr>
        </table>
    </span>
</c-pdf-force>

<lightning-button 
    label="Generate PDF"
    onclick={generatePDF}>
</lightning-button>
```

Now the parent component can run the save function

```javascript
import { LightningElement } from 'lwc';

export default class PdfExample extends LightningElement {
    generatePDF(){
        this.template.querySelector('c-pdf-force').save()
    }
}
```

The browser will initiate a download of the resulting PDF

## Deploy

### Click to Deploy

Select Production/Developer or Sandbox @ [https://component.land?share=jsmithdev%2Fpdf-force](https://component.land?share=jsmithdev%2Fpdf-force)

### SFDX Deployment

Instructions can be found @ [https://github.com/jsmithdev/sfdx-deploy-instructions](https://github.com/jsmithdev/sfdx-deploy-instructions)

## Projects Used

[html2pdf](https://github.com/eKoopmans/html2pdf.js)

- [jsPDF](https://github.com/MrRio/jsPDF)
- [pako](https://github.com/nodeca/pako)
- [html2canvas](https://github.com/niklasvh/html2canvas)
- [DOMPurify](https://github.com/cure53/DOMPurify)

---

written on ☕ by [Jamie Smith](https://jsmith.dev)
