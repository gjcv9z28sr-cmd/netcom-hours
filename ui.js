window.selectedDate = "";

window.editIndex = null;

function openModal(date){

  selectedDate = date;

  editIndex = null;

  document.getElementById("entryModal")
    .style.display = "flex";

  document.getElementById("modalDate")
    .innerText = date;

  clearForm();

  renderShiftList();
}

function closeModal(){

  document.getElementById("entryModal")
    .style.display = "none";
}

window.onclick = function(event){

  const modal =
    document.getElementById("entryModal");

  if(event.target === modal){
    closeModal();
  }
}
window.openModal = openModal;
window.closeModal = closeModal;