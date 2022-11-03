export type ProductDefinition = {
    name: string;
    httpPort: number;
    ajpPort: number;
    contextPath: string;
    plugins: string[];
};

export type RunnerOptions = {
    ampsVersion: string;
    productVersion: string;
    withPlugins: string;
};
