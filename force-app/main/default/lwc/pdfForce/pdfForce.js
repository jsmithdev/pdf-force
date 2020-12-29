import { api, LightningElement } from 'lwc';
import html2pdf from './html2pdf'

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

        const slot = this.template.querySelector('slot')
        const element = slot.assignedElements({flatten: true})[0]

        console.log(element)

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
                quality: 0.98 
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

        console.log(options)
          
        html2pdf().set(options).from(element).save();        
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