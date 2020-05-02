import pick from "lodash/pick";

export const MapFromTMDToMovie = (TMDResult) => pick(TMDResult, ["id", "title"]);
