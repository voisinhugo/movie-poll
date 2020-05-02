import { parseISO, getYear } from "date-fns";

export const mapFromTMDToMovie = (TMDResult) => ({
  id: TMDResult.id,
  title: `${TMDResult.title} (${getYear(parseISO(TMDResult.release_date))})`
});
