import { api, LightningElement, } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';

import jsPDFUri from '@salesforce/resourceUrl/jsPDF';
import dompurifyUri from '@salesforce/resourceUrl/dompurify';
import html2canvasUri from '@salesforce/resourceUrl/html2canvas';

const host = location.hostname

export default class pdf extends LightningElement {

    @api filename = host.substring(0, host.includes('.') ? host.indexOf('.') : host.length)

    @api scale = 2
    @api margin = 1

    @api orientation = 'portrait'
    //@api unit = 'in'
    //@api format = 'letter'

    @api 
    save(){

        const content = this.template.querySelector('slot')
			.assignedElements({flatten: true})
			.map(el => el?.innerHTML || '')
			.join('')

        const {
            unit,
            scale,
            margin,
            format,
            filename,
            orientation,
        } = this;

        const options = {
            filename: `${filename}.pdf`,
            margin: Number(margin),
            image: {
                type: 'jpeg', 
                quality: 0.98,
            },
            html2canvas: {
                scale: Number(scale), 
            },
            jsPDF: {
                //unit, 
                //format, 
                orientation,
            },
        }

        console.log(JSON.parse(JSON.stringify({
			content,
			options,
		})))
        
		const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

		doc.setFontSize(5);

		doc.html(`<!DOCTYPE html><html>${content}</html>`, 
		{
			callback: (doc) => doc.save(options.filename),
		});


        //jsPDF().set(options).from(element).save();        
    }

    renderedCallback() {

		if(!this._initialized){
			this._initialized = true
			this.loadScripts()
		}
    }

	loadScripts(){
		Promise.all([
			loadScript(this, jsPDFUri),
			loadScript(this, dompurifyUri),
			loadScript(this, html2canvasUri),
		])
		.then(console.log)
		.catch(console.error)
	}
}
// todo: option for url below
/*
<template if:true={fileUrl.length}>
    <iframe src={fileUrl} class="document" ></iframe>
</template>
<template if:false={fileUrl.length}>
    no data
</template>
@track fileUrl = ''
const testURL = 'https://raw.githubusercontent.com/jsmithdev/lwc-pdf-example/919c140022801a1782d34b75a06d19009919d2ca/dummy.pdf'
const opts = {
    //mode: 'no-cors'
}
//const data = await (await fetch('http://www.africau.edu/images/default/sample.pdf', opts)).blob()
//const resp = await fetch(testURL, opts)
//console.dir(resp)
//const data = await resp.blob()
//console.dir(data)
//const blob = new Blob([data], {type: 'application/pdf'})
//window.open(URL.createObjectURL(data)) //"data:application/pdf;base64,"+escape(data)
*/