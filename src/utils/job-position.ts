import { IJobPositionFilter } from "@/providers/http/job-positions/interface";

const appendSignFilterString = (filter?: string) => {
  return filter !== null && filter !== undefined && filter !== "" ? "&" : "?";
};

export const appendFilterString = (filters?: IJobPositionFilter) => {
  let filtersString: string = "";

  filters?.jobOrSkill && (filtersString += `?jobOrSkill=${filters.jobOrSkill}`);

  filters?.location &&
    (filtersString += `${appendSignFilterString(filters?.jobOrSkill)}location=${
      filters.location
    }`);

  filters?.workType &&
    (filtersString += `${appendSignFilterString(
      filters?.location
    )}workType=${filters.workType}`);

  return filtersString;
};

export function debounceWithParameters<T extends (...args: any[]) => any>(
	fn: T,
	delay: number
): (...args: Parameters<T>) => void {
	let timeoutId: ReturnType<typeof setTimeout>;

	return function (...args: Parameters<T>): void {
		if (timeoutId) {
			clearTimeout(timeoutId);
		}

		timeoutId = setTimeout(() => {
			fn(...args);
		}, delay);
	};
}
