import { THEME } from '~shared/styles';

export const DEFAULT_FORM_VALUES = {
	title: '',
	description: '',
	isPrivate: false,
	isComplete: false,
};

export const SLIDER_SETTINGS = {
	dots: true,
	infinite: true,
	speed: 500,
	slidesToShow: 1,
	slidesToScroll: 1,
	centerMode: true,
	centerPadding: THEME.spacing.large,
	responsive: [
		{
			breakpoint: 768,
			settings: {
				slidesToShow: 1,
				centerMode: false,
			},
		},
	],
};
