export interface Model {
	id: number;
}

export interface FooModel extends Model {
	name: string;
}

export interface BarModel extends Model {
	name: string;
	foo: FooModel;
	foos: FooModel[];
}

export type UnsavedModel<T extends Model> = Omit<T, 'id'> & { id?: number };

export const isSaved = <T extends Model>(t: UnsavedModel<T>): t is T => typeof t.id === 'number';

export type ConvertModelPropertiesTo<T extends Model, P, K extends keyof T = keyof T> = {
	[p in K]: T[p] extends Model[] ? P[] : T[p] extends Model ? P : T[p];
};

export type FlatModel<T extends Model, K extends keyof T = keyof T> =
	| ConvertModelPropertiesTo<T, number, K>
	| Omit<T, K>;

const bar: BarModel = { foo: { id: 1, name: '' }, id: 1, name: '', foos: [] };
const bar2: FlatModel<BarModel, 'foo'> = { foo: 1, foos: [], id: 2, name: '' };
