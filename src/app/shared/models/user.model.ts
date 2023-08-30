export interface User {
    id?: number;
    name: string;
	type: string;
	document: string;
	registry: string;
	birthday: string;
	phone: string;
	active: boolean;
}

export interface UserFilter {
	name: string | null;
	active: any;
}