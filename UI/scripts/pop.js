const popup = () => {
	const del = document.querySelector('.del');
	const modal = document.querySelector('.popup');
	const ok = document.querySelector('.ok');
	const cancel = document.querySelector('.cancel');

	del.addEventListener('click', () => {
		modal.classList.add('modal');
		modal.classList.remove('popup');
	});

	cancel.addEventListener('click', () => {
		modal.classList.add('popup');
		modal.classList.remove('modal');
	});

	ok.addEventListener('click', () => {
		modal.classList.toggle('popup');
		modal.classList.toggle('modal');
	});
};
popup();
