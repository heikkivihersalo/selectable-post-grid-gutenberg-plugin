export function formatDateString( ISODate ) {
	const date = new Date( ISODate );
	return `${ date.getDate() }.${
		date.getMonth() + 1
	}.${ date.getFullYear() }`;
}
