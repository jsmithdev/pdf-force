import { LightningElement } from 'lwc';

export default class PdfExample extends LightningElement {

    generatePDF(){
        this.template.querySelector('c-pdf-force').save()
    }
}