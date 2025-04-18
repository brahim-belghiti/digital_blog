declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"blog": {
"Built-in React hooks/index.md": {
	id: "Built-in React hooks/index.md";
  slug: "built-in-react-hooks";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"Core concepts to understand in React JS/index.md": {
	id: "Core concepts to understand in React JS/index.md";
  slug: "core-concepts-to-understand-in-react-js";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"Features using third party libraries with React/index.md": {
	id: "Features using third party libraries with React/index.md";
  slug: "features-using-third-party-libraries-with-react";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"In React JS components are reusable pieces of UI that can be defined as functions/index.md": {
	id: "In React JS components are reusable pieces of UI that can be defined as functions/index.md";
  slug: "in-react-js-components-are-reusable-pieces-of-ui-that-can-be-defined-as-functions";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"In React JS props are used to pass data from a parent component to a child component/index.md": {
	id: "In React JS props are used to pass data from a parent component to a child component/index.md";
  slug: "in-react-js-props-are-used-to-pass-data-from-a-parent-component-to-a-child-component";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"In React JS state represents the internal data or condition of a component/index.md": {
	id: "In React JS state represents the internal data or condition of a component/index.md";
  slug: "in-react-js-state-represents-the-internal-data-or-condition-of-a-component";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"Key Things to Know About React/index.md": {
	id: "Key Things to Know About React/index.md";
  slug: "key-things-to-know-about-react";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"React JS introduction/index.md": {
	id: "React JS introduction/index.md";
  slug: "react-js-introduction";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"React application architecture/index.md": {
	id: "React application architecture/index.md";
  slug: "react-application-architecture";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"React uses a virtual DOM to optimize updates to the actual DOM/index.md": {
	id: "React uses a virtual DOM to optimize updates to the actual DOM/index.md";
  slug: "react-uses-a-virtual-dom-to-optimize-updates-to-the-actual-dom";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"Rules of React JS/index.md": {
	id: "Rules of React JS/index.md";
  slug: "rules-of-react-js";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"Suspense is React feature that allows you to suspend rendering until certain conditions are met/index.md": {
	id: "Suspense is React feature that allows you to suspend rendering until certain conditions are met/index.md";
  slug: "suspense-is-react-feature-that-allows-you-to-suspend-rendering-until-certain-conditions-are-met";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"Techniques to practice about React JS/index.md": {
	id: "Techniques to practice about React JS/index.md";
  slug: "techniques-to-practice-about-react-js";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"client side rendering vs server side rendering/index.md": {
	id: "client side rendering vs server side rendering/index.md";
  slug: "client-side-rendering-vs-server-side-rendering";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"reconciliation is the process by which React determines what has changed in the virtual DOM and updates the actual DOM efficiently/index.md": {
	id: "reconciliation is the process by which React determines what has changed in the virtual DOM and updates the actual DOM efficiently/index.md";
  slug: "reconciliation-is-the-process-by-which-react-determines-what-has-changed-in-the-virtual-dom-and-updates-the-actual-dom-efficiently";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
};
"projects": {
"abex landing page/index.md": {
	id: "abex landing page/index.md";
  slug: "abex-landing-page";
  body: string;
  collection: "projects";
  data: any
} & { render(): Render[".md"] };
"careerlink/index.md": {
	id: "careerlink/index.md";
  slug: "careerlink";
  body: string;
  collection: "projects";
  data: any
} & { render(): Render[".md"] };
"fiamane platform/index.md": {
	id: "fiamane platform/index.md";
  slug: "fiamane-platform";
  body: string;
  collection: "projects";
  data: any
} & { render(): Render[".md"] };
"fimane landing page/index.md": {
	id: "fimane landing page/index.md";
  slug: "fimane-landing-page";
  body: string;
  collection: "projects";
  data: any
} & { render(): Render[".md"] };
"mindful-tube/index.md": {
	id: "mindful-tube/index.md";
  slug: "mindful-tube";
  body: string;
  collection: "projects";
  data: any
} & { render(): Render[".md"] };
"spamarket/index.md": {
	id: "spamarket/index.md";
  slug: "spamarket";
  body: string;
  collection: "projects";
  data: any
} & { render(): Render[".md"] };
};
"work": {
"apple.md": {
	id: "apple.md";
  slug: "apple";
  body: string;
  collection: "work";
  data: any
} & { render(): Render[".md"] };
"facebook.md": {
	id: "facebook.md";
  slug: "facebook";
  body: string;
  collection: "work";
  data: any
} & { render(): Render[".md"] };
"google.md": {
	id: "google.md";
  slug: "google";
  body: string;
  collection: "work";
  data: any
} & { render(): Render[".md"] };
"mcdonalds.md": {
	id: "mcdonalds.md";
  slug: "mcdonalds";
  body: string;
  collection: "work";
  data: any
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = never;
}
