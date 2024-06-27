import { PostProcessor, PreProcessor } from "matrix-requirements-sdk/client";

export const postProcessorExample: PostProcessor = {
    run: (rendering, params) => rendering,
};

export const preProcessorExample: PreProcessor = {
    run: (mf, params) => {},
};
