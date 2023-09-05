export const generateKey = (prefix) => {
	return `${prefix}_${new Date().getTime()}`;
};
