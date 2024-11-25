import React, { useCallback, useState } from 'react';
import {
	headerContainer,
	inputGroupStyle,
	profileButtonStyle,
	searchButton,
	selectorsContainer,
} from '~shared/components/header/header.styles';
import { Button, Icon, InputGroup, MenuItem } from '@blueprintjs/core';
import { ItemRenderer, Select } from '@blueprintjs/select';
import { css } from '@emotion/css';
import { StatusOptions, VisibilityOptions } from '~shared/services/types';
import { PRIVATE_ROUTER_KEYS } from '~shared/keys';
import { useNavigate } from 'react-router-dom';
import { useTodoStore } from '~store/todo.store';

const Header: React.FC = () => {
	const navigate = useNavigate();
	const { filters, setFilters } = useTodoStore();
	const [searchValue, setSearchValue] = useState(filters.search);

	const handleVisibilityChange = useCallback(
		(visibility: VisibilityOptions) => {
			setFilters({ ...filters, visibility });
		},
		[filters, setFilters],
	);

	const handleStatusChange = useCallback(
		(status: StatusOptions) => {
			setFilters({ ...filters, status });
		},
		[filters, setFilters],
	);

	const handleSearch = useCallback(() => {
		setFilters({ ...filters, search: searchValue });
	}, [searchValue, filters, setFilters]);

	const renderItem: ItemRenderer<VisibilityOptions | StatusOptions> = (
		item,
		{ handleClick, modifiers },
	) => (
		<MenuItem
			key={item}
			text={item}
			onClick={handleClick}
			active={modifiers.active}
		/>
	);

	return (
		<div className={headerContainer}>
			<div className="profile">
				<Button
					text="My Profile"
					onClick={() => navigate(PRIVATE_ROUTER_KEYS.PROFILE)}
					className={profileButtonStyle}
					icon="user"
				/>
			</div>
			<div className="search-filter">
				<div className={selectorsContainer}>
					<Select
						items={Object.values(VisibilityOptions)}
						itemRenderer={renderItem}
						onItemSelect={handleVisibilityChange}
						filterable={false}
					>
						<Button
							text={filters.visibility}
							rightIcon="caret-down"
							className={css`
								margin-right: 1rem;
							`}
						/>
					</Select>

					<Select
						items={Object.values(StatusOptions)}
						itemRenderer={renderItem}
						onItemSelect={handleStatusChange}
						filterable={false}
					>
						<Button text={filters.status} rightIcon="caret-down" />
					</Select>
				</div>
				<div>
					<InputGroup
						className={inputGroupStyle}
						placeholder="Search..."
						type="search"
						value={searchValue}
						onChange={(e) => setSearchValue(e.target.value)}
						rightElement={
							<Icon
								icon="search"
								className={searchButton}
								onClick={handleSearch}
							/>
						}
					/>
				</div>
			</div>
		</div>
	);
};

export default React.memo(Header);
