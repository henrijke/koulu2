const loginbutton = document.querySelector("#loginbutton");
const eiVielaTilia = document.querySelector("#eiVielaTilia");
const onJoTili = document.querySelector("#onJoTili");

loginbutton.addEventListener("click", ()=>{
	$('#loginModal').modal('show');
});

eiVielaTilia.addEventListener("click", ()=>{
	$('#loginModal').modal('hide');
	$('#registerModal').modal('show');
});

onJoTili.addEventListener("click", ()=>{
	$('#registerModal').modal('hide');
	$('#loginModal').modal('show');
});