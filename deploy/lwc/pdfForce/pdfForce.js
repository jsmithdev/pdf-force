import { api, LightningElement } from 'lwc';
import { jsPDF } from './jsPDF'

export default class pdf extends LightningElement {

    @api 
    save(){

        const slot = this.template.querySelector('slot')
        const element = slot.assignedElements({flatten: true})[0]

        console.log(element)

        const doc = new jsPDF('p', 'pt', 'a4', true)
        doc.html(element, {
            x: 10,
            y: 10,
            filename: this.filename ? this.filename : 'GeneratedPDF',
            callback: function (doc) {
              doc.save();
            }
        })
        
    }
}
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