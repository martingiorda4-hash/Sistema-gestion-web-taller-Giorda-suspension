export class TablaDom {
	constructor() {
		
	}

	

	getFormData() {
		return {
			
		};
	}

	clearErrors() {
		
		document.getElementById('tabla-status').innerHTML = '';
	}

	showForm(_title, _html) {
		// TODO: implementar modal
	}

	showSuccess(_text) {
		// TODO: implementar modal
	}

	showError(_text) {
		// TODO: implementar modal
	}

	showFormError(_text) {
		document.getElementById('tabla-status').innerHTML = _text;
	}
}
