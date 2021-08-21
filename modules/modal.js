const modal = {
	callOpen: () => {
		modal.opener = document.activeElement
		openModal()
	},
	callClose: () => {
		closeModal(modal.opener)
	},
	handleOverlayClick: (event) => {
		if(event.target.className === 'overlay'){
			closeModal(modal.opener)
		}
	}
}

function openModal(){
	setVisibile(true)
	setFocus()	
	setInertBehindModal(true)
}

function closeModal(opener){
	setVisibile(false)
	setInertBehindModal(false)
	opener.focus()
}

function attachEventListener(openButtons, closeButtons, overlay) {
	openButtons.forEach(b => {
		b.addEventListener('click', modal.callOpen)
	});
	closeButtons.forEach(b => {
		b.addEventListener('click', modal.callClose)
	});
	overlay.addEventListener('click', modal.handleOverlayClick)
	window.addEventListener('keydown', clallIfEscPress)
}

function setVisibile(visible) {
	const display = visible? 'block' : 'none'
	document.querySelector('.overlay').style.display = display
}

function setFocus() {
	document.querySelectorAll('.modal button, modal input, modal textarea, modal select')[0].focus()
}

function setInertBehindModal(inert) {	
	const element = document.querySelector('main')
	element.inert = inert
	element.setAttribute('aria-hidden', inert)
}

function clallIfEscPress(event){
	if(event.key === 'Escape') {
		modal.callClose()
	}
}

const openButtons = document.querySelectorAll('.open-modal')
const closeButtons = document.querySelectorAll('.close-modal')
const overlay = document.querySelector('.overlay')
attachEventListener(openButtons, closeButtons, overlay)