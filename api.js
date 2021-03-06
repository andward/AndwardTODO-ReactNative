var apiWrapper = (...params) => ROOT_API + params.join('/') + '?format=json';
var resourceWrapper = (res_name) => ROOT_RES + res_name;


const ROOT =  'http://172.23.113.63:8000/';

const ROOT_API = ROOT + 'api/';

const ROOT_RES = ROOT + 'static/media/';

const TOP_API = apiWrapper('tasks', 'top');

const TODO_API = apiWrapper('tasks', 'todo');

const DONE_API = apiWrapper('tasks', 'done');

const TAGS_API = apiWrapper('tags');

const SIGN_IN  = ROOT_API + 'token-auth';

module.exports = {
	ROOT_API,
	TOP_API,
	TODO_API,
	DONE_API,
	TAGS_API,
	SIGN_IN,

	apiWrapper,
	resourceWrapper,
};