export interface IFilter {
  (id: string): boolean;
}

export interface ICreateFilter {
  (
    params: {
      includes: string | Array<string>;
      excludes: string | Array<string>;
    },
  ): IFilter;
}

export interface IImporterOptions {
  includes?: string | Array<string>;
  excludes?: string | Array<string>;
  minified?: true;
}

export interface ITranspiledSASS {
  hash: string;
  style: string;
}
