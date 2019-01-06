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

export interface IEnvOptions {
  stage?: number | string;
  features?: string | Array<string>;
  browsers?: string | Array<string>;
}

export interface IImporterOptions {
  includes?: string | Array<string>;
  excludes?: string | Array<string>;
  minified?: true;
  presetEnv?: IEnvOptions;
}

export interface ITranspiledSASS {
  hash: string;
  style: string;
}
