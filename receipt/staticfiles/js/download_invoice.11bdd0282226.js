const receipt = document.getElementById('my-node')
document.getElementById('capture').addEventListener('click', () => {
  //select the section to screenshot

  var toggle_alert = "Please toggle the Order Entry before printing"
  
  if (window.innerWidth <! 500){
     if (enterOrder.style.opacity == ''){
    alert(toggle_alert)
    }else if(enterOrder.style.opacity != 'none'){
      alert(toggle_alert)
    }else{
      invoiceDownload()
    }
  }else{
    invoiceDownload()
  }
})

function invoiceDownload(){
  html2canvas(receipt, {
    scale: 3
  }).then(canvas => {
    // document.getElementById('preview-container').appendChild(canvas);
    const dataURL = canvas.toDataURL("invoice/png");
    const link = document.createElement('a')
    link.href = dataURL
    link.download = 'invoice.png'
    link.click()
  })  
}
