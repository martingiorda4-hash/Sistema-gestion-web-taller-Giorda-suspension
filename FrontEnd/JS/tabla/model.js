import { GenerateIdcod } from './utils.js';

/**
 * @typedef {Object} TablaData
 * @property {string} [idcod] - ID autogenerado
 */
export class TablaModel {
	// TODO: definir urlBase
	static urlBase = '';
	
	constructor() {
		
	}

	

	/**
	* @param {string} [_idcod] - ID opcional; si existe, agrega la query a la URL.
	* @returns {Promise<{status: string, data?: any}>}
	*/
	async read(_idcod) {
		try {
			return await this._router(_idcod ? '?idcod=' + _idcod : '', 'GET').data;
		} catch (error) {
			console.error('Tabla.read: ', error);
			throw { status: 'KO', message: error };
		}
	}
	
	/**
	 * @param {TablaData} _obj
	 * @returns {Promise<{status: string, data?: any}>}
	 */
	async save(_obj) {
		try {
			let method = 'POST';
			if (_obj.idcod) {
				method = 'PUT';
			} else {
				_obj.idcod = GenerateIdcod(20);
			}
			return await this._router('', method, _obj);
		} catch (error) {
			console.error('Tabla.save: ', error);
			throw error;
		}
	}

  /**
	 * @param {string} _idcod
	 */
	async delete(_idcod) {
		try {
			return await this._router('', 'DELETE', { idcod : _idcod });
		} catch (error) {
			console.error('Tabla.delete: ', error);
			throw error;
		}
	}

	async _router(_endpoint, _method, _data) {
		try {
			let opts = {
				method: _method,
				headers: { "Content-type" : "application/json" }
			};
			if (_data) {
				opts.body = JSON.stringify(_data);
			}
			const response = await fetch(TablaModel.urlBase + _endpoint, opts);
			if (!response.ok) {
				throw new Error(`Error de servidor: ${response.status} ${response.statusText}`);
			}
			const data = await response.json();
			return { status: 'OK', data: data };
		} catch (error) {
			console.error('Tabla._router: ', error);
			throw { status: 'KO', message: error };
		}
	}

	/**
	 * @param {TablaData} _obj
	 * @returns {{status: string, message?: string}}
	 */
	validate(_obj) {
		
		return { status: 'OK' };
	}
}
