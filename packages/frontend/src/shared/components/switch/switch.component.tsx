import React from 'react';
import { BaseFormValues } from '~shared/services/types';
import { Control, Controller } from 'react-hook-form';
import { Switch as BpSwitch } from '@blueprintjs/core';
import { errorText } from '~shared/styles';
import {
	switchContainerStyle,
	switchStyle,
} from '~shared/components/switch/switch.styles';

interface SwitchProps {
	name: keyof BaseFormValues;
	control: Control<BaseFormValues>;
	label: string;
	errors: Record<string, any>;
}

const Switch: React.FC<SwitchProps> = ({ name, control, label, errors }) => {
	return (
		<div className={switchContainerStyle}>
			<Controller
				name={name}
				control={control}
				render={({ field }) => (
					<div className={switchStyle}>
						<BpSwitch
							{...field}
							checked={!!field.value}
							label={label}
							onChange={(event) =>
								field.onChange(event.target.checked)
							}
							value={
								typeof field.value === 'boolean'
									? ''
									: field.value
							}
							large
						/>
					</div>
				)}
			/>
			{errors[name] && (
				<p className={errorText}>{errors[name].message}</p>
			)}
		</div>
	);
};

export default Switch;
