import { useEffect, useState } from 'react';

const getWindowWidth = (): { innerWidth: number } => {
	const { innerWidth } =
		typeof window !== 'undefined' ? window : { innerWidth: 0 };
	return { innerWidth };
};

const useWindowWidth = (): {
	windowWidth: { innerWidth: number };
	handleResize: () => void;
} => {
	const [windowWidth, setWindowWidth] = useState(getWindowWidth());
	const handleResize = (): void => setWindowWidth(getWindowWidth());
	useEffect(() => {
		window.addEventListener('resize', handleResize, true);
		return (): void =>
			window.removeEventListener('resize', handleResize, true);
	}, []);
	return { windowWidth, handleResize };
};

export const useMediaQuery = (maxWidth: number): boolean => {
	const {
		windowWidth: { innerWidth },
		handleResize,
	} = useWindowWidth();
	const [isMedia, setIsMedia] = useState(false);
	useEffect(() => {
		if (innerWidth <= maxWidth) {
			setIsMedia(true);
		} else {
			setIsMedia(false);
		}
	}, [handleResize, maxWidth, innerWidth]);
	return isMedia;
};
