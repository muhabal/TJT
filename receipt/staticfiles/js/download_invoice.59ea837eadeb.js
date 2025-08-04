
document.getElementById('capture').addEventListener('click', () => {
  //select the section to screenshot
  const receipt = document.getElementById('my-node')

  var toggle_alert = "Please toggle the Order Entry before printing"
  if (orderBlk.style.display == ''){
    alert(toggle_alert)
  }else if(orderBlk.style.display != 'none'){
    alert(toggle_alert)
  }else{
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
})