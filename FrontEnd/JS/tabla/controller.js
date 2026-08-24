import { TablaModel } from './model.js';
import { TablaView } from './view.js';
import { TablaDom } from './dom.js';

export class TablaController {
	constructor() {
		this.model = new TablaModel();
		this.view = new TablaView();
		this.dom = new TablaDom();
		
	}

	

async new(){
		try{
			let html = this.view.renderForm();
			this.dom.showForm('Nuevo', html);
		}catch(err){
			console.error('${_name}Model: ', err);
			throw err;
		}
	}

	async edit(_idcod){
		try{
			let tuple = await this.model.read(_idcod);
			let html = this.view.renderForm(tuple.data);
			this.dom.showForm('Editar', html);
		}catch(err){
			console.error('${_name}Model: ', err);
			throw err;
		}
	}

	async save(){
		try{
			let data = this.dom.getFormData();
			let validation = this.model.validate(data);
			if(validation.status == 'OK'){
				let result  = await this.model.save(data);
				if(result.status == 'OK'){
					this.dom.showSuccess("Se guardaron los cambios con éxito.");
				}else{
					this.dom.showError("No pudimos guardar los cambios. Inténtelo nuevamente.");
				}
			}else{
				this.dom.showFormError(validation.message);
			}
		}catch(err){
			console.error('${_name}Model: ', err);
			throw err;
		}
	}
}
