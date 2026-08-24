import { LoadCSS } from './utils.js';

export class TablaView {
	constructor() {
		

		LoadCSS('./mvc-form.css', import.meta.url);
	}

	

	renderMain(){
		// TODO: implementar.
	}

	renderForm() {
		return `
		<div class="mvc-form">
			
		</div>
		<button id="tabla-btn">Guardar</button>
		`;
	}
}
