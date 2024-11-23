import { ReactNode } from 'react';

export interface Product {
	[x: string]: ReactNode;
	count: number;
	id: number;
	name: string;
	price?: number;
	ingredients: string[];
	image: string;
	rating: number;
}
